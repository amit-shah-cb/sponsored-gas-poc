import axios from 'axios';

export async function simulateAssetChanges(userOp:any){
    try{
        const {data} = await axios.post(`${process.env.TENDERLY_API_URL}`,
        {
           "jsonrpc": "2.0",
            "id": 0,
            "method": "tenderly_simulateTransaction",
            "params": [
                {
                "from": `0x382fFCe2287252F930E1C8DC9328dac5BF282bA1`,
                //we cant use userOp.sender because we dont have ETH in the account so we try with another holding address
                // this is not very safe but we can use it for testing
                "to": userOp.target,
                "input": userOp.callData,
                "value": userOp.value,  
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