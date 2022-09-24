const hre = require("hardhat");

async function main() {
  const NFTCREATION = await hre.ethers.getContractFactory("NFTCreation");
  const nftcreation = await NFTCREATION.deploy("");

  await nftmarketplace.deployed();

  console.log(
    ` NFT Creation contract is deployed with address:  ${nftcreation.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
