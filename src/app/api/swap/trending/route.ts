import axios from "axios";
import { NextRequest } from "next/server";


export async function GET(r: NextRequest) {
  const {data} = await axios.get(`https://api.wallet.coinbase.com/rpc/v2/explore/trendingSwapsByNetworkId?networkId=8543`);  
  return Response.json(data.result.data);
}