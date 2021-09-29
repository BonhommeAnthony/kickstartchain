pragma solidity ^0.8.7;

contract CampaignFactory{
    address[] public deployedCampaigns;
    
    
    function createCampaign(uint _minimum, string memory _campaignName, string memory _campaignDescription, string memory _campaignImage) public {
        
       Campaign newCampaign = new Campaign(_minimum, msg.sender, _campaignName, _campaignDescription, _campaignImage );
       deployedCampaigns.push(address(newCampaign)); 
        
    }
    
    function getDeployedCampaigns() public view returns ( address[] memory) {
        return deployedCampaigns;
    }
    
}


contract Campaign {
    
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalsCount;
        mapping(address => bool) approvals;
        
    }
    
    modifier restricted() {
        require(msg.sender == manager,"You are not the manager of this contract");
        _;
    }

    
    address public manager;
    uint public minimumContribution;
    string public campaignName;
    string public campaignDescription;
    string public campaignImage;
    mapping(address => bool) public approvers ;
    uint numRequests;
    mapping (uint => Request) public requests;
    uint public approversCount;
    
    constructor(uint _minimum, address _creator,string memory _campaignName, string memory _campaignDescription, string memory _campaignImage )  {
        manager = _creator;
        minimumContribution = _minimum;
        campaignName = _campaignName;
        campaignDescription = _campaignDescription;
        campaignImage = _campaignImage;
    }
    
    function contribute() public payable {
        require(msg.value >= minimumContribution, "Contribution is too low");
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string memory  _description, uint  _value, address payable  _recipient)  public  restricted {
       Request storage newRequest = requests[numRequests++];
                newRequest.description = _description;
                newRequest.value = _value;
                newRequest.recipient = _recipient;
                newRequest.complete = false;
                newRequest.approvalsCount = 0;
    }
    
    function approveRequest(uint _index) public {
        
        Request storage request = requests[_index];
        
        require(approvers[msg.sender],"You are not the approvers");
        require(!request.approvals[msg.sender],"You already approve it");
        
        request.approvals[msg.sender] = true;
        request.approvalsCount++;
    }
    
    function finalizeRequest(uint _index) public restricted {
        
        Request storage request = requests[_index];
        
        require(request.approvalsCount > (approversCount/2),"Less than 50% of contributors approve this");
        require(!request.complete,"Request already complete");
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }
    
    function getSummary() public view returns (uint,uint,uint,uint, address,string memory,string memory,string memory) {
        return (
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager,
            campaignName,
            campaignDescription,
            campaignImage
        );
    }

    function getRequestsCount() public view returns (uint) {
        return numRequests;
    }
    
}