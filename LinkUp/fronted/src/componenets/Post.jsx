import React, { useState,useContext,useEffect } from "react";
import dp from "../assets/dp.jpeg";
import moment from "moment"; // Ensure you import moment if you're using it
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { userDataContext } from "../context/UserContext";
import { FaRegCommentDots } from "react-icons/fa";




function Post({ id, author, like, comment, description, image, createdAt }) {
  let[more,setMore]=useState(false)
    let {userData,setUserData,getPost,handleGetProfile}=useContext(userDataContext)
  
  let [likes,setLikes]=useState(like)
 let [commentContent,setCommentContent]=useState("")
  let [comments,setComments]=useState(comment)
  let [showComment,setShowComment]=useState(false)
    const handleLike=async ()=>{
          try {
            let result=await axios.get(serverUrl+`/api/post/like/${id}`,{withCredentials:true})
           setLikes(result.data.like)
          } catch (error) {
            console.log(error)
          }
        }
        const handleComment=async (e)=>{
           e.preventDefault()
            try {
              let result=await axios.post(serverUrl+`/api/post/comment/${id}`,{
                content:commentContent
              },{withCredentials:true})
              setComments(result.data.comment)
            setCommentContent("")
            } catch (error) {
              console.log(error)
            }
          }
    
    
         
    
    
  return (
    // Add the return statement
    <div className="w-full min-h-[200px] flex flex-col gap-[10px] bg-white rounded-lg shadow-lg p-[20px]">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-start gap-[10px]">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer">
            <img src={author?.profileImage || dp} alt="" className="h-full" />
          </div>
          <div>
            <div className="text-[22px] font-semibold">
              {`${author?.firstName || "Unknown"} ${author?.lastName || ""}`}
            </div>
            <div className="text-[16px]">
              {author?.headline || "No headline"}
            </div>
            <div className="text-[16px]">{moment(createdAt).fromNow()}</div>
          </div>
        </div>
        <div> {/*Button*/}</div>
        
      </div>
      <div className={`w-full ${!more?"max-h-[100px] overflow-hidden":""} pl-[50px]`}>{description}</div>
      <div className="pl-[50px] text-[19px] font-semibold cursor-pointer" onClick={()=>setMore(prev=>!prev)}>{more?"read less...":"read more..."}</div>
         {image && 
         <div className='w-full h-[300px] overflow-hidden flex justify-center rounded-lg'>
<img src={image} alt="" className='h-full rounded-lg'/>
</div>}
<div>
<div className='w-full flex justify-between items-center p-[20px] border-b-2 border-gray-500'>
<div className='flex items-center justify-center gap-[5px] text-[18px]'>
    <BiLike className='text-[#1ebbff] w-[20px] h-[20px]'/><span >{likes.length}</span></div>
<div className='flex items-center justify-center gap-[5px] text-[18px] cursor-pointer' onClick={()=>setShowComment(prev=>!prev)}><span>{comment.length}</span><span>comments</span></div>
</div>
<div className='flex justify-start items-center w-full p-[20px] gap-[20px]'>
{!likes.includes(userData._id) &&  <div className='flex justify-center items-center gap-[5px] cursor-pointer' onClick={handleLike}>
<BiLike className=' w-[24px] h-[24px]'/>
<span>Like</span>
</div>}
{likes.includes(userData._id) &&  <div className='flex justify-center items-center gap-[5px] cursor-pointer' onClick={handleLike}>
<BiSolidLike className=' w-[24px] h-[24px] text-[#07a4ff]'/>
<span className="text-[#07a4ff] font-semibold">Liked</span>
</div>}
<div className='flex justify-center items-center gap-[5px] cursor-pointer' onClick={()=>setShowComment(prev=>!prev)}>
<FaRegCommentDots className=' w-[24px] h-[24px]'/>
<span>comment</span>
</div>
</div>

    </div>
    </div>
  );
}

export default Post;
