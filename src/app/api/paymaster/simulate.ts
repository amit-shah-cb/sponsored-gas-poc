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
                "from": userOp.sender,
                "to": userOp.target,
                "input": userOp.callData,
                "value": userOp.value,  
                },
                "latest"
            ]});
      console.log(data);
      return data;
    }catch(e){
        console.error(e);
    }
    return null;
}