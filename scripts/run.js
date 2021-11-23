// hre -> Hardhat Runtime Environment

const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  // 1. Complies contract and generate necessary artifacts
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  // 2. Hardhat creates a fresh local Ethereum blockchain everytime
  const waveContract = await waveContractFactory.deploy();
  // 3. Wait until the contract is deployed to the local blockchain
  await waveContract.deployed();

  // The specific address of the contract since there can be many contracts on a single blockchain
  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by (owner):", owner.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  // Waving at ourself
  console.log("This is me waving at myself");
  let waveTxn = await waveContract.wave();
  await waveTxn.wait();
  waveCount = await waveContract.getTotalWaves();

  // Simulating random person(wallet) waving
  console.log("This is a randomly generated person (wallet) waving at me");
  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();
  waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
    // Hardhat destroys the local network (blockchain) once the script ends!
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
