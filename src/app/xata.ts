import { buildClient } from '@xata.io/client';

const xata = buildClient({
 "https://Gabriel-Orpinelli-s-workspace-d6rv5m.us-east-1.xata.sh/db/metas",
    apiKey: process.env.NEXT_PUBLIC_XATA_API_KEY,
    enableBrowser: true, 
});



export default xata;
