import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActivePost } from '../Redux/actionCreators/postAction';

const PostCard= ({post})=> {
    const navigate= useNavigate()
    const dispatch = useDispatch()

  return (
    <div  className='shadow-[1px_-1px_21px_rgba(0,0,0,0.25)]'>
        {post.picture? <img onClick={()=>{dispatch(setActivePost(post)); navigate(`/blog/${post.id}`)}} src={post.picture} alt="" className="h-[110px] w-full cursor-pointer" />:""}
        <div onClick={()=>{dispatch(setActivePost(post)); navigate(`/blog/${post.id}`)}} className="font-[600] text-[18px] text-[#616262] p-3 mb-2 cursor-pointer hover:text-[red]">{post.title}</div>
    </div>
  )
}

export default PostCard