const hre = require("hardhat");
const { ethers } = require("hardhat");

async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return ethers.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}

async function consoleCampaigns(campaigns) {
  console.log("\nCampaigns:");
  for (const campaign of campaigns) {
    console.log(`
      Owner: ${campaign.owner}
      Title: ${campaign.title}
      Description: ${campaign.description}
      Target: ${ethers.formatEther(campaign.target)} ETH
      Deadline: ${new Date(Number(campaign.deadline)).toLocaleString()}
      Amount Collected: ${ethers.formatEther(campaign.amountCollected)} ETH
      Image: ${campaign.image}
    `);
  }
}

async function main() {
  try {
    console.log("Starting the script...");

    const [owner, addr1, addr2, addr3] = await hre.ethers.getSigners();

    console.log("Signers obtained. Logging addresses:");
    console.log("Owner address:", owner.address);
    console.log("Addr1 address:", addr1.address);
    console.log("Addr2 address:", addr2.address);
    console.log("Addr3 address:", addr3.address);

    const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
    const contract = await CrowdFunding.deploy();

    await contract.waitForDeployment();

    console.log("Address of contract:", await contract.getAddress());

    const addresses = [
      owner.address,
      addr1.address,
      addr2.address,
      addr3.address,
    ];

    console.log("\nBefore creating campaign and donations");
    await consoleBalances(addresses);

    // Create a campaign
    const futureDate = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    await contract.createCampaign(
      addr1.address,
      "Test Campaign",
      "This is a test campaign",
      ethers.parseEther("1"), // 1 ETH target
      futureDate,
      "ipfs://testimage"
    );

    console.log("\nAfter creating campaign");
    let campaigns = await contract.getCampaigns();
    await consoleCampaigns(campaigns);

    // Make donations
    await contract.connect(addr2).donateToCampaign(0, { value: ethers.parseEther("0.5") });
    await contract.connect(addr3).donateToCampaign(0, { value: ethers.parseEther("0.3") });

    console.log("\nAfter donations");
    await consoleBalances(addresses);

    campaigns = await contract.getCampaigns();
    await consoleCampaigns(campaigns);

    // Get donators
    const [donators, donations] = await contract.getDonators(0);
    console.log("\nDonators:");
    for (let i = 0; i < donators.length; i++) {
      console.log(`Donator: ${donators[i]}, Amount: ${ethers.formatEther(donations[i])} ETH`);
    }

    console.log("Script completed.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exitCode = 1;
});