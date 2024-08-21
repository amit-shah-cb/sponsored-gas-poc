import axios from 'axios';
import { UserOperation } from 'permissionless';

export async function simulateAssetChanges(userOp:UserOperation<"v0.6">){
    try{
        
        const {data} = await axios.post(`${process.env.TENDERLY_API_URL}`,
        {
           "jsonrpc": "2.0",
            "id": 0,
            "method": "tenderly_simulateTransaction",
            "params": [
                {
                "to": userOp.sender,
                //we cant use userOp.sender because we dont have ETH in the account so we try with another holding address
                // this is not very safe but we can use it for testing
               
                "input": userOp.callData,
                },
                "latest"
            ]});
      console.log(JSON.stringify(data));
      return data;
    }catch(e){
        console.error(e);
    }
    return null;
}