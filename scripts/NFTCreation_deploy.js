const hre = require("hardhat");

async function main() {
  const nftmarketplaceaddress= "0xF9Eb05e4332865a1C3D8E06f7d49F3550a4d1197";
  const NFTCREATION = await hre.ethers.getContractFactory("NFTCreation");
  const nftcreation = await NFTCREATION.deploy(nftmarketplaceaddress);

  await nftcreation.deployed();

  console.log(
    ` NFT Creation contract is deployed with address:  ${nftcreation.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
