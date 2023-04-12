import { expect } from "chai";
import colors from "ansi-colors";
import hre from "hardhat";
import {deployGangsDoge} from "./GangsDoge.deploy";

describe("GangsDoge", function () {
  it("deploy", async()=>{
    const {users, gsDoge, router, weth} = await deployGangsDoge(hre);
  });
});