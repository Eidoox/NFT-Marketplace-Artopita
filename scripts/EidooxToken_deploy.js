const hre = require("hardhat");

async function main() {
  const EidooxToken = await hre.ethers.getContractFactory("Eidoox");
  const eidooxtoken = await EidooxToken.deploy();

  await eidooxtoken.deployed();

  console.log(
    `Eidoox token contract is deployed with address:  ${eidooxtoken.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
