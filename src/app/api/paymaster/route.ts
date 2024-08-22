import axios from "axios";
import { paymasterClient } from "../config";
import { willSponsor } from "../utils";
import { simulateAssetChanges } from "./simulate";

const ToToken = "0x532f27101965dd16442E59d40670FaF5eBB142E4"//"0x4200000000000000000000000000000000000006";
const BENEFICIARY_WALLET = (process.env.BENEFICIARY_WALLET  || "0x382ffce2287252f930e1c8dc9328dac5bf282ba1").toLowerCase();

export async function POST(r: Request) {
  const req = await r.json();
  const method = req.method;
  const [userOp, entrypoint, chainId] = req.params;
  console.log(userOp, entrypoint, chainId);

  const simResult = await simulateAssetChanges(userOp);
  let sponsorable = false;
  for(let i=0;i<simResult.result.logs.length;i++){
    const log = simResult.result.logs[i];
    if(log.name === "Transfer" && log.inputs && log.inputs.length ===3 && 
      //to address is the beneficiary wallet address
    log.inputs[1].name === "to" &&
    (log.inputs[1].value as string).toLowerCase() === BENEFICIARY_WALLET    
    //TODO: check the amount is non-zero
    //&& BigInt(log.inputs[2] as string) > BigInt(0)
    //TODO: we should also check the token address and price to see how fee we collected in $ amount    
    ){
      if(log.inputs[2].name === "value" && log.raw && log.raw.address){
        try{
          const amount = BigInt(log.inputs[2].value as string);
          const quote:any = await axios.get(`https://api.wallet.coinbase.com/rpc/v1/swap/quote?fromAddress=${BENEFICIARY_WALLET}&from=${log.raw.address}&to=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913&amount=${log.inputs[2].value}&amountReference=from&chainId=8453`)
          if(quote.result && quote.result.quote && quote.result.quote.toAmount){
            const amountUSDC = BigInt(quote.result.quote.toAmount);
            console.log("fee value collected in USDC",amountUSDC.toString());
            // fee value in USDC > $0.01 
            // sponsorable = amountUSDC > BigInt(1_000);
          }
        }catch(e){
          console.log("error getting fee amount",log.inputs[2].value);
          // break;
        }
       
      } 
      
      sponsorable = true;
      console.log("can sponsor this operation");
      break;
    }
  }

  // const sponsorable = await willSponsor({
  //   chainId: parseInt(chainId),
  //   entrypoint,
  //   userOp,
  // });
  if (!sponsorable) {
    return Response.json({ error: "Not a sponsorable operation" });
  }

  if (method === "pm_getPaymasterStubData") {
    const result = await paymasterClient.getPaymasterStubData({
      userOperation: userOp,
    });
    return Response.json({ result });
  } else if (method === "pm_getPaymasterData") {
    const result = await paymasterClient.getPaymasterData({
      userOperation: userOp,
    });
    return Response.json({ result });
  }
  return Response.json({ error: "Method not found" });
}
