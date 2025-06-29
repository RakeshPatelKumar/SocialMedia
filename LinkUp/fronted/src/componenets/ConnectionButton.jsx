import React, { useContext, useEffect } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import io from 'socket.io-client';
import { userDataContext } from '../context/UserContext';
const socket = io("http://localhost:4000");
function ConnectionButton({ userId }) {
    let { serverUrl } = useContext(authDataContext);
    let {userData,setUserData} = useContext(userDataContext);
    const handleConnection = async () => {
        try {
            let result =await axios.post(`${serverUrl}/api/connection/send/${userId}`, {}, { withCredentials: true });
            console.log(result);
        } catch (error) {
            console.error("Error connecting:", error);
        }

    }

    useEffect(() => {
        socket.emit("register", userData._id)
    },[userId])

  return (
   <div>
    <button className="min-w-[100px] h-[40px] rounded-full  border-2 border-[#2dc0ff] text-[#2dc0ff]">Connect</button>

   </div>
     
  );
}
export default ConnectionButton;