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
  
  const fetchSwap = async () => {
    const data = await fetch('/api/swap');
    console.log(data);
    const swapTx:any =  await data.json();
    return swapTx;
  }

  useEffect(() => {
    if(swapTx.length === 0){     
      fetchSwap().then((st)=>{
        let batchTxs:any[] = [
          {
            address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
            abi: ERC20Abi,
            functionName: "approve",
            args: ["0xDef1C0ded9bec7F1a1670819833240f027b25EfF", 100_000_000],
          },st];
          console.log(batchTxs);
        setSwapTx([...swapTx, ...batchTxs]);
      })
    }
  }, [swapTx]);
  
  //TODO viem decode 
  return (
    <div>
      <h2>Swap0x</h2>
      <div>
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
