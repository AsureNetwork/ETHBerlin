pragma solidity ^0.4.0;

import "./DecentralizedPensionToken.sol";
import "./DateTime.sol";
//import "./Math.sol";

contract DecentralizedPension {
    DateTime dateTime;
    //Math math;
    DecentralizedPensionToken public pensionToken;

    event PensionTokensClaimed(address indexed sender, uint256 amount);

    mapping(address => mapping(uint16 => mapping(uint8 => uint256))) public depositsByUser;
    mapping(uint16 => mapping(uint8 => uint256)) public totalDepositsAmountByMonth;
    mapping(uint16 => mapping(uint8 => uint256)) public totalDepositsByMonth;
    mapping(uint16 => mapping(uint8 => uint256)) public minDepositByMonth;
    mapping(uint16 => mapping(uint8 => uint256)) public maxDepositByMonth;


    constructor(address _dateTime/*, address _math*/) public {
        dateTime = DateTime(_dateTime);
        //math = Math(_math);
        pensionToken = new DecentralizedPensionToken();
    }

    /*
     * @dev Deposit eth for for the current month
     */
    function deposit(uint _amount) public payable returns (bool) {
        require(msg.value == _amount, "msg.value must equal amount");

        uint16 _year = dateTime.getYear(now);
        uint8 _month = dateTime.getMonth(now);

        totalDepositsByMonth[_year][_month] += 1;
        totalDepositsAmountByMonth[_year][_month] += _amount;

        depositsByUser[msg.sender][_year][_month] += _amount;

        if (_amount > maxDepositByMonth[_year][_month]) {
            maxDepositByMonth[_year][_month] = _amount;
        }
        if (_amount < minDepositByMonth[_year][_month]) {
            minDepositByMonth[_year][_month] = _amount;
        }

        return true;
    }

    /*
     * @dev Call with period to claim all pension tokens for that period
     */
    function claim(uint16 _year, uint8 _month) public returns (bool) {
        uint256 _amount = depositsByUser[msg.sender][_year][_month];
        uint256 _minAmount = minDepositByMonth[_year][_month];
        uint256 _maxAmount = maxDepositByMonth[_year][_month];

        uint256 _targetPrice = targetPrice(_year, _month);

        uint256 _tokenAmount;
        if (_amount >= _targetPrice) {
            _tokenAmount = (1 + ((_amount - _targetPrice + 10**18)  / (_maxAmount - _targetPrice + 10**18))) * bonusFactor();
            // 1 + ((1-1+1) / (1-1+1) * 1000
        } else {
            _tokenAmount = ((_amount - _minAmount) / (_targetPrice - _minAmount)) * bonusFactor();
        }

        emit PensionTokensClaimed(msg.sender, _tokenAmount * 10**15);
        pensionToken.mint(msg.sender, _tokenAmount * 10**15);

        return true;
    }

    function bonusFactor() internal pure returns (uint256) {
        return 1000; // (135 * math.ln(_yearsRunning));
    }

    /*
     * TODO: use median instead of average. But we need a sorted array first
     */
    function targetPrice(uint16 _year, uint8 _month) internal view returns (uint256) {
        return totalDepositsAmountByMonth[_year][_month] / totalDepositsByMonth[_year][_month];
    }
}
