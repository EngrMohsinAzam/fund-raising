const hre = require("hardhat");

async function main() {
  console.log("Deploying CrowdFunding contract to Sepolia testnet...");

  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying with account:", deployer.address);

  const crowdFundingContract = await CrowdFunding.deploy();

  await crowdFundingContract.waitForDeployment();

  console.log("CrowdFunding contract deployed to:", await crowdFundingContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });