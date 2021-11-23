const main = async () => {
  // First element of the array is the owner (deployer)
  const [deployer] = await hre.ethers.getSigners();
  // The account balance of the owner
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  //   Usual steps of deploying a contract to the blockchain
  const TOKEN = await hre.ethers.getContractFactory("WavePortal");
  const portal = await TOKEN.deploy();
  await portal.deployed();

  console.log(
    "The address of the smart contract (WavePortal) on the blockchain: ",
    portal.address
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
