import { createClient } from "redis";



async function main(){
    const client = createClient();
    await client.connect();
    while(1){
        const response = await client.brPop("submissions",0);
        console.log(response);

        //in reality run the user code here
        await new Promise((resolve)=>setTimeout(resolve,1000));
        console.log("process under submission");

    }
}

main();

