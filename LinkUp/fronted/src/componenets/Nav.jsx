import React, { useContext, useEffect, useState } from "react";
import logo2 from "../assets/logo2.jpg";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import dp from "../assets/dp.webp";
import { userDataContext } from "../context/UserContext.jsx";
import { authDataContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Nav() {
  let [activeSearch, setActiveSearch] = useState(false);
  let { userData, setUserData } = useContext(userDataContext);
  let [showPopup, setShowPopup] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate();

  //
  const handleSignOut = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/login");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-[80px] bg-[#9a2b57] fixed top-0 shadow-lg flex justify-between md:justify-around items-center px-[10px] left-0 z-[80] ">
      <div className="flex justify-center items-center gap-[10px]">
        <div
          onClick={() => {
            setActiveSearch(false);
          }}
        >
          <img src={logo2} alt="" className="w-[50px]" />
        </div>
        <div>
          <IoSearchSharp
            className="w-[23px] h-[23px] text-white lg:hidden"
            onClick={() => setActiveSearch(true)}
          />
        </div>
        <form
          className={`w-[190px] lg:w-[350px] h-[40px] bg-[#f0efe7] lg:flex items-center gap-[10px] px-[10px] py-[5px] rounded-md ${
            !activeSearch ? "hidden" : "flex"
          } `}
        >
          <div>
            <IoSearchSharp className="w-[23px] h-[23px] text-white " />
          </div>

          <input
            type="text"
            className="w-[80%] h-full bg-transparent outline-none"
            placeholder="search users..."
          />
        </form>
      </div>
      <div className="flex justify-center items-center gap-[20px] relative ">
        {showPopup && (
          <div className="w-[300px] min-h-[300px] bg-white shadow-lg absolute top-[75px] rounded-lg flex flex-col items-center p-[20px] gap-[20px] right-[20px] lg:right-[100px]">
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <img src={userData.profileImage || dp} alt="" className="w-full h-full" />
            </div>
            <div className="text-[19px] font-semibold text-gray-700">{`${userData.firstName} ${userData.lastName}`}</div>
            <button className="w-[100%] h-[40px] rounded-full border-2 border-[#9a2b57] text-[#9a2b57]">
              View Profile
            </button>
            <div className="w-full h-[1px] bg-gray-700 "></div>
            <div className="flex  w-full items-center justify-start text-gray-600 gap-[10px] cursor-pointer" onClick={() => navigate("/network")  }>
              <FaUserGroup className="w-[23px] h-[23px] text-gray-600 " />
              <div>My Networks</div>
            </div>
            <button
              className="w-[100%] h-[40px] rounded-full border-2 border-[#ff2d2d] text-[#ff2d2d]"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        )}

        <div className=" lg:flex flex-col items-center justify-center text-white hidden" onClick={() => navigate("/login")  }>
          <IoMdHome className=" w-[23px] h-[23px] text-white" />
          <div>Home</div>
        </div>
        <div className="lg:flex flex-col items-center justify-center text-white hidden cursor-pointer" onClick={() => navigate("/network")}>
          <FaUserFriends className=" w-[23px] h-[23px] text-white" />
          <div>My Network</div>
        </div>
        <div className="flex flex-col items-center justify-center text-white">
          <IoIosNotifications className=" w-[23px] h-[23px] text-white" />

          <div className="hidden md:block">Notifications</div>
        </div>
        <div
          className="w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer"
          onClick={() => setShowPopup((prev) => !prev)}
        >
          <img
            src={userData.profileImage || dp}
            alt=""
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Nav;
