import React, { useContext, useEffect, useState } from 'react';
import Nav from '../componenets/Nav';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import dp from "../assets/dp.webp";

function Network() {
    let { serverUrl } = useContext(authDataContext);
    let [connection, setConnection] = useState([]);
    let { userData } = useContext(userDataContext);

    const handleGetRequests = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/connection/requests`, { withCredentials: true });
            setConnection(result.data);
        }
        catch (error) {
            console.error("Error fetching connection requests:", error);
        }
    }

    useEffect(() => {
        handleGetRequests();
    }, []);

    return (
        <div className="w-fullh-[100vh] bg-bg-[#f0efe7] pt-[100px] px-[20px] flex flex-col gap-[40px] ">
            <Nav />
            <div className='w-full h-[100px] bg-[white] shadow-lg rounded-lg flex items-center p-[10px] text-[22px] text-gray-600'>
                Invitations {connection.length}
            </div>

            {connection.length > 0 &&
                <div className="w-full shadow-lg rounded-lg flex flex-col gap-[10px] min-h[100px]">




                    {connection.map((connection, index) => (
                        <div className="w-full min-h-[100px] flex justify-between item-center">
                            <div className='flex justify-start items-center gap-[10px]'>
                                <div className="w-[60px] h-[60px] rounded-full overflow-hidden cursor-pointer justify-center items-center">
                                    <img
                                        src={connection.sender?.profileImage || dp}
                                        alt=""
                                        className="w-full h-f ull"
                                    />
                                </div>
                                <div className="text-[19px] font-semibold text-gray-700">{`${connection.sender.firstName} ${connection.sender.lastName}`}</div>

                            </div>
                            <div></div>

                        </div>






                    ))}


                </div>}

        </div>





    );
}

export default Network;