import hardhat from "hardhat";

const { ethers } = hardhat;

async function main() {
  const TouristKYC = await ethers.getContractFactory("TouristKYC");
  const contract = await TouristKYC.deploy();
  await contract.waitForDeployment();

  console.log("TouristKYC deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
