import axios from 'axios';

export async function simulateAssetChanges(userOp:any){
    try{
        const {data} = await axios.post('https://base-mainnet.g.alchemy.com/v2/TgCQlWhdFB1G-zFaih_Ux9Ltrg_605fO',
        {
            "jsonrpc": "2.0",
            "method": "alchemy_simulateAssetChanges",
            "id": 1,
            "params": [
            {
                "from": userOp.sender,
                "to": userOp.target,
                "value": userOp.value,
                "data": userOp.callData,
            }
            ]
        });
      console.log(data);
      return data;
    }catch(e){
        console.error(e);
    }
    return null;
}