import { ZeroExAbi } from "@/ABIs/ZeroEx";
import axios from "axios";
import { ethers } from "ethers";

(BigInt.prototype as any).toJSON = function() { return this.toString(); }

export async function GET(r: Request) {
  const {data} = await axios.get("https://api.wallet.coinbase.com/rpc/v3/swap/trade?fromAddress=0x82ca6006ed51FBA325b1A53342825f9FE230ad6b&from=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913&to=0x4200000000000000000000000000000000000006&amount=100000&amountReference=from&chainId=8453");  
  console.log(data);
  const tx = data.result.tx;
  const iface = ethers.Interface.from(ZeroExAbi);
  const functionName = iface.getFunctionName(tx.data.slice(0,10))
  const argsResult = iface.decodeFunctionData(functionName, tx.data);
  console.log(functionName,argsResult);
  const transformedData = { 
    address: data.result.tx.to,
    abi:ZeroExAbi,
    functionName: functionName,
    args: [...argsResult],
    };
    console.log(transformedData);
  return Response.json(transformedData);
}
