import { useAccount } from "wagmi";
import { ERC20Abi} from "@/ABIs/Erc20";
import { TransactButton } from "./TransactButton";
import { ZeroExAbi } from "@/ABIs/ZeroEx";
import { useCapabilities } from "wagmi/experimental";
import { useEffect, useMemo, useState } from "react";

// example batch transaction, making two mint NFT calls
export function ApproveZeroEx() {
  const account = useAccount();

  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });
  const capabilities = useMemo(() => {
    
    if (!availableCapabilities || !account.chainId) return;
    const capabilitiesForChain = availableCapabilities[account.chainId];
  
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) 
    {
      console.log("paymaster:", `${document.location.origin}/api/paymaster`);
      return {
        paymasterService: {
          url:`${document.location.origin}/api/paymaster`,
        },
      };
    }else{
      console.log("no paymaster service available");
    }
  }, [availableCapabilities, account.chainId]);
  
  const [swapTx, setSwapTx] = useState([] as any[]); 
  
  const fetchSwap = async (address:`0x${string}`) => {
    const data = await fetch(`/api/swap?fromAddress=${address}`);
    console.log(data);
    const swapTxs:any[] =  await data.json();        
    setSwapTx([...swapTxs]);
  } 
  
  //TODO viem decode 
  return (
    <div>
      <h2>Swap0x</h2>
      <button onClick={() => {
        setSwapTx([]);
        return fetchSwap(account.address as `0x${string}`)
      }}>Fetch Updated Swap</button>
      <div>
        <div>
          {swapTx.map((tx, i) => {
            return JSON.stringify({"functionName":tx.functionName, "data":tx.args})
          })}
        </div>
        <TransactButton
          id="swap-button"
          contracts={swapTx}
          capabilities={capabilities}
          text="Swap"
        />
      </div>
    </div>
  );
}
