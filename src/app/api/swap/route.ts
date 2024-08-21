import { ZeroExAbi } from "@/ABIs/ZeroEx";
import axios from "axios";
import { ethers } from "ethers";
import { NextRequest } from "next/server";
import { erc20Abi } from "viem";

(BigInt.prototype as any).toJSON = function() { return this.toString(); }

export async function GET(r: NextRequest) {
  const txs = [];
  const fromAddress = r.nextUrl.searchParams.get("fromAddress");
  const {data} = await axios.get(`https://api.wallet.coinbase.com/rpc/v3/swap/trade?fromAddress=${fromAddress}&from=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913&to=0x4200000000000000000000000000000000000006&amount=100000&amountReference=from&chainId=8453`);  
  if(data.result.approveTx){
    const approveTx = data.result.approveTx;
    const iface = ethers.Interface.from(erc20Abi);
    const functionName = iface.getFunctionName(approveTx.data.slice(0,10))
    const argsResult = iface.decodeFunctionData(functionName,approveTx.data);
    const approveData = {
      address: approveTx.to,
      abi: erc20Abi,
      functionName: functionName,
      args: [...argsResult],
    };
    txs.push(approveData);
  }
  const tx = data.result.tx;
  const iface = ethers.Interface.from(ZeroExAbi);
  const functionName = iface.getFunctionName(tx.data.slice(0,10))
  const argsResult = iface.decodeFunctionData(functionName, tx.data);

  const transformedData = { 
    address: tx.to,
    abi:ZeroExAbi,
    functionName: functionName,
    args: [...argsResult],
    };
    console.log(transformedData);
  txs.push(transformedData);
  
  return Response.json(txs);
}
