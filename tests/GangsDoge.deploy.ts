import {Contract, Signer} from "ethers";
import {HardhatRuntimeEnvironment} from "hardhat/types";

const deploySwap = async(hre: HardhatRuntimeEnvironment, admin: Signer) => {
  // setup
  const WETH = await hre.ethers.getContractFactory("WETH");
  const weth = await WETH.deploy();
  await weth.deployed();

  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factory = await Factory.deploy(await admin.getAddress());
  await factory.deployed();

  const Router = await hre.ethers.getContractFactory("UniswapV2Router02");
  const router = await Router.deploy(factory.address, weth.address);
  await factory.deployed();

  return {weth, factory, router};
}

export const deployGangsDoge = async(hre: HardhatRuntimeEnvironment): Promise<{
  admin: Signer, users: Signer[], marketing: string,
  weth: Contract, factory: Contract, router: Contract, gsDoge: Contract
}> =>{
  const signers = await hre.ethers.getSigners();
  const admin = signers[0];
  const marketing = "0xF158740ca4097707fBd03bC27B83f4E18f1eA05C";
  const users = signers.slice(1,);

  const {weth, factory, router} = await deploySwap(hre, admin);
  // console.log("weth", weth.address);
  // console.log("factory", factory.address);
  // console.log("router", router.address);

  const GSDoge = await hre.ethers.getContractFactory("GangsDoge");
  let gsDoge;
  try {
    gsDoge = await GSDoge.deploy(router.address, marketing);
    await gsDoge.deployed();
  } catch(e) {
    console.error(e);
  }

  return {admin, users, marketing, weth, factory, router, gsDoge};
};
