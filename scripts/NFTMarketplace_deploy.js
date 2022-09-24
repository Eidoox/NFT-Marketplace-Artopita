const hre = require("hardhat");

async function main() {
  const NFTMARKETPLACE = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftmarketplace = await NFTMARKETPLACE.deploy(1,"");
  //the nft marketplace contract take the percentage of market fees which equla to 1 and the address of Eidoox token
  // I have my project  on remix and connect it to the nft marketplace UI


  await nftmarketplace.deployed();

  console.log(
    ` NFT marketplace contract is deployed with address:  ${nftmarketplace.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
