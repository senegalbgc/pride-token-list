Abstract:  
This document explains the token economics for PrideToken (PRD), detailing its initial supply, minting mechanism, distribution model, and use cases.  
  
1. Initial Supply:  
PrideToken (PRD) has an initial supply of 1,000,000 tokens. These tokens are minted at the time of deployment and allocated to the specified initial owner.  
  
2. Minting Mechanism:  
The owner of the contract has the exclusive right to mint additional tokens. The mint function ensures that newly minted tokens are added to the specified address, increasing the total supply accordingly.  
  
```solidity  
function mint(address to, uint256 amount) external onlyOwner {    
    require(to != address(0), "Invalid recipient address");    
    require(amount > 0, "Amount must be greater than zero");    
    _mint(to, amount);    
    assert(totalSupply() >= amount);  // Confirm state     
}    

3. Distribution Model:  
The tokens are distributed based on initial allocations. The owner can mint new tokens as needed to support various initiatives and projects. This ensures flexibility in managing the token supply to meet community needs.  

The tokens are distributed as follows:

40%: Initial owner and founders.
25%: Reserved for grants, scholarships, and community projects.
20%: For future development and marketing.
15%: For liquidity and exchange listings.

4. Use Cases:  
Funding LGBTQ+ initiatives and projects: Supporting essential projects that benefit the LGBTQ+ community.
Providing scholarships and grants: Financial awards for deserving individuals and organisations.
Facilitating transactions within the PrideToken ecosystem: Enabling seamless and secure transactions between users within the platform.
Staking and rewards: Users can stake their tokens to earn additional rewards.
Crowdfunding platform: We have established a crowdfunding platform specifically for LGBTQ+ users to raise funds for various causes and projects. Users can initiate crowdfunding campaigns and receive funds in PrideToken (PRD). Donors are also encouraged to contribute using PrideToken, fostering a supportive economic ecosystem.

5. Liquidity Mining
PrideToken (PRD) also offers a liquidity mining program that incentivizes users to provide liquidity to the platform. Participants can stake LP tokens and earn rewards in PRD.

Contract Address: 0xD657822fe05c3136025231A5A16Ebe255e3037F5
Verification Link: Verified on Sourcify

6. Governance and Control:  
The contract includes mechanisms for ownership transfer and renouncement, ensuring robust governance and control.  

function transferOwnership(address newOwner) public onlyOwner {    
    require(newOwner != address(0), "Invalid address");    
    _transferOwnership(newOwner);    
}    
    
function renounceOwnership() public onlyOwner {    
    _transferOwnership(address(0));    
}    


7. Security
Security measures implemented include:
Audits: Regular security audits by reputable third-party auditors.
Multi-signature wallets: Ensuring multiple approvals for significant transactions.
Bug bounty program: Encouraging the community to identify and report vulnerabilities.

8. Roadmap
Aiming to achieve the following milestones:
Q1 2025: Initial exchange listings and staking platform launch.
Q2 2025: Grant and scholarship program roll-out.
Q3 2025: Expansion of partnerships and ecosystem development.
Q4 2025: Launch of PrideToken DAO for community governance.

9. Benefits of Using PrideToken
Inclusive Finance: Providing financial tools to those within the LGBTQ+ community through decentralized finance.
Support and Empowerment: Directly funding projects, scholarships, and initiatives that benefit the community.
Transparency and Security: Leveraging blockchain technology to ensure all transactions are secure and transparent.

10. Contact Information
For any inquiries or support about the PrideToken, please contact us at pridetoken@pridefunding.org.


For specific questions regarding the development or technical aspects of PrideToken (PRD), you can reach out to our founder and lead developer, a pioneering woman in the blockchain industry:
Name: Natty Ndate Beye - Loeschke
Email: natty@pridefunding.org or nattyn@senegalbgc.org
  
11. Social Media  
Website: PrideToken Website
Twitter: @PrideFunding
Facebook: PrideFunding
LinkedIn: PrideFunding


