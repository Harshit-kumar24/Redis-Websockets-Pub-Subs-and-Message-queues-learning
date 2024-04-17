import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [socket,setSocket] = useState<null | WebSocket>(null);
  const [latestMessage,setLatestMessage] = useState("");


  useEffect(()=>{
    const socket = new WebSocket('ws://localhost:8080');
    setTimeout(socket.onopen = () =>{
      console.log("connected");
      setSocket(socket);
    },5000);

    socket.onmessage = (message) =>{
      console.log("Recieved message: ",message.data);
      setLatestMessage(message.data);
    }

    return ()=>{
      socket.close();
    }
   
  },[])

  if(!socket){
    return(
      <div>Connecting to the socket server loading...</div>
    )
  }
  return (
    <>
    <h1>{latestMessage}</h1>
    </>
  )
}

export default App;
