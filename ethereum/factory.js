import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

// export default new web3.eth.Contract(
//   CampaignFactory.abi,
//   process.env.FACTORY_ADDRESS
// );

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  process.env.NEXT_PUBLIC_FACTORY_ADDRESS
);

export default instance;
