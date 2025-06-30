import React, { useContext, useEffect ,useState} from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import io from 'socket.io-client';
import { userDataContext } from '../context/UserContext';
const socket = io("http://localhost:4000");
function ConnectionButton({ userId }) {
    let { serverUrl } = useContext(authDataContext);
    let {userData,setUserData} = useContext(userDataContext);
    let [status, setStatus] = useState("");

    const handleSendConnection = async () => {
        try {
            let result =await axios.post(`${serverUrl}/api/connection/send/${userId}`, {}, { withCredentials: true });
            console.log(result);
        } catch (error) {
            console.error("Error connecting:", error);
        }

    } 

const handleGetStatus = async () => {
    try {
        let result = await axios.get(
            `${serverUrl}/api/connection/getStatus/${userId}`,
            { withCredentials: true } // ✅ correct position
        );
        console.log(result);
        setStatus(result.data.status);
    } catch (error) {
        console.error(error);
    }
};



    useEffect(() => {
        socket.emit("register", userData._id)
        handleGetStatus();
        socket.on("statusUpdate", ({updateUserId, newStatus}) => {
            if (updateUserId === userId) {
                setStatus(newStatus);
            }


            setStatus(newStatus);
    })
    
   return () => {
        socket.off("statusUpdate");
    }
    }, [userId]);

    const handleClick=async () => {
        if (status === "disconnect") {
            await handleSendConnection()
            }else if (status === "recived") {

            }
        }

  return (
   <div>
    <button className="min-w-[100px] h-[40px] rounded-full  border-2 border-[#2dc0ff] text-[#2dc0ff]">{status}</button>

   </div>
     
  );
}
export default ConnectionButton;