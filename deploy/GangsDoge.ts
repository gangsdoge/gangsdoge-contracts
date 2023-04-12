import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';


const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const accounts = await hre.getNamedAccounts();
  const deployer = accounts.admin;

  console.log((await hre.ethers.provider.getBalance(deployer)).toString());

  const {address} = await hre.deployments.deploy("GangsDoge", {
    from: deployer,
    args: [
      // bsc
      "0x10ed43c718714eb63d5aa57b78b54704e256024e", // pancake router
      "0xF158740ca4097707fBd03bC27B83f4E18f1eA05C",

      // // bsc testnet
      // "0xD99D1c33F9fC3444f8101754aBC46c52416550D1", // pancake router
      // "0xF158740ca4097707fBd03bC27B83f4E18f1eA05C",
    ],
    log: true,
  });

  console.log((await hre.ethers.provider.getBalance(deployer)).toString());
};

func.tags = ["GangsDoge"];

export default func;
