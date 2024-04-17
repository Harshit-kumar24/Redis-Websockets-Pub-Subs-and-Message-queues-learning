import express from 'express';
import { createClient } from 'redis';

const app = express();
app.use(express.json());

const client = createClient();
client.connect();

app.post("/submit",async(req,res)=>{
    const {problemId,userId,code,language} = req.body;
    //push into a database first
    //pushing into a queue
    await client.lPush("submissions",JSON.stringify({problemId,userId,code,language}));
    res.json({
        message:"submission recieved!"
    });
})

app.listen(3000, ()=>{
    console.log("the server is listening on the port 3000");
});