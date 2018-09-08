pragma solidity ^0.4.0;

import "./DecentralizedPensionToken.sol";
import "./DateTime.sol";
//import "./Math.sol";

contract DecentralizedPension {
    DateTime dateTime;
    //Math math;
    DecentralizedPensionToken public pensionToken;

    event Deposit(address indexed sender, uint256 amount);
    event Claim(address indexed sender, uint256 amount);
    event Withdraw(address indexed sender, uint256 myActivatedPart, uint256 distributionPercentage, uint256 distributionAmount, uint256 amount);
    event Retire(address indexed sender, uint256 amount, uint256 monthFactor, uint256 totalMonthFactor);

    mapping(address => bool) public isRetired;

    mapping(address => mapping(uint16 => mapping(uint8 => uint256))) public depositsByUser;
    mapping(uint16 => mapping(uint8 => uint256)) public totalDepositsAmountByMonth;
    mapping(uint16 => mapping(uint8 => uint256)) public totalDepositsByMonth;
    mapping(uint16 => mapping(uint8 => uint256)) public minDepositByMonth;
    mapping(uint16 => mapping(uint8 => uint256)) public maxDepositByMonth;
    mapping(uint16 => mapping(uint8 => bool)) public hasWithdrawed;

    mapping(address => uint256) public monthPaidCount;
    mapping(address => uint256) public monthFactors;
    uint256 public totalMonthFactor;

    uint256 public globalFond;


    constructor(address _dateTime/*, address _math*/) public {
        dateTime = DateTime(_dateTime);
        //math = Math(_math);
        pensionToken = new DecentralizedPensionToken();
    }

    /*
     * @dev Deposit eth for for the current month
     */
    function deposit(uint256 _amount) public payable returns (bool) {
        require(_amount == msg.value, "amount must equal msg.value");
        require(_amount > 0, "amount must be greater 0");
        require(!isRetired[msg.sender], "msg.sender must not be retired");

        uint16 _year = dateTime.getYear(now);
        uint8 _month = dateTime.getMonth(now);

        totalDepositsByMonth[_year][_month] += 1;
        totalDepositsAmountByMonth[_year][_month] += _amount;

        if (depositsByUser[msg.sender][_year][_month] == 0) {
            monthPaidCount[msg.sender] += 1;
        }

        depositsByUser[msg.sender][_year][_month] += _amount;

        if (_amount > maxDepositByMonth[_year][_month]) {
            maxDepositByMonth[_year][_month] = _amount;
        }
        if (_amount < minDepositByMonth[_year][_month]) {
            minDepositByMonth[_year][_month] = _amount;
        }

        emit Deposit(msg.sender, _amount);

        return true;
    }

    /*
     * @dev Call with period to claim all pension tokens for that period
     */
    function claim(uint16 _year, uint8 _month) public returns (bool) {
        require(!isRetired[msg.sender], "msg.sender must not be retired");

        uint256 _amount = depositsByUser[msg.sender][_year][_month];
        uint256 _minAmount = minDepositByMonth[_year][_month];
        uint256 _maxAmount = maxDepositByMonth[_year][_month];

        uint256 _targetPrice = targetPrice(_year, _month);

        uint256 _tokenAmount;
        if (_amount >= _targetPrice) {
            _tokenAmount = (1 + ((_amount - _targetPrice + 10 ** 18) / (_maxAmount - _targetPrice + 10 ** 18))) * bonusFactor();
            // 1 + ((1-1+1) / (1-1+1) * 1000
        } else {
            _tokenAmount = ((_amount - _minAmount) / (_targetPrice - _minAmount)) * bonusFactor();
        }

        pensionToken.mint(msg.sender, _tokenAmount * 10 ** 15);
        emit Claim(msg.sender, _tokenAmount * 10 ** 15);

        return true;
    }

    function retire(uint256 _amount) public returns (bool)  {
        require(!isRetired[msg.sender], "msg.sender must not be retired");

        isRetired[msg.sender] = true;

        pensionToken.burnFrom(msg.sender, _amount);

        monthFactors[msg.sender] = _amount / monthPaidCount[msg.sender];
        totalMonthFactor += monthFactors[msg.sender];

        emit Retire(msg.sender, _amount, monthFactors[msg.sender], totalMonthFactor);

        return true;
    }

    function withdraw(uint16 _year, uint8 _month) public returns (bool) {
        require(isRetired[msg.sender], "msg.sender must be retired");
        require(!hasWithdrawed[_year][_month], "withdrawal only allowed once");

        hasWithdrawed[_year][_month] = true;

        uint256 myActivatedPart = monthFactors[msg.sender] / totalMonthFactor;

        uint256 distributionPercentage;
        if (pensionToken.totalSupply() > 0) {
            distributionPercentage = totalMonthFactor / pensionToken.totalSupply();
        }

        uint256 distributionAmount = (globalFond * distributionPercentage) + totalDepositsAmountByMonth[_year][_month] * (1 - distributionPercentage);

        uint256 pensionPayout = distributionAmount * myActivatedPart;

        msg.sender.transfer(pensionPayout);
        emit Withdraw(msg.sender, myActivatedPart, distributionPercentage, distributionAmount, pensionPayout);

        return true;
    }

    function bonusFactor() internal pure returns (uint256) {
        return 1000;
        // (135 * math.ln(_yearsRunning));
    }

    /*
     * TODO: use median instead of average. But we need a sorted array first
     */
    function targetPrice(uint16 _year, uint8 _month) internal view returns (uint256) {
        return totalDepositsAmountByMonth[_year][_month] / totalDepositsByMonth[_year][_month];
    }
}
