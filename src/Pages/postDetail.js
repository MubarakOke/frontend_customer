import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import DOMPurify from 'dompurify'
import Navbar from "../Components/navbar";
import FooterButton from "../Components/footerbutton";
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import toast from "react-hot-toast";
import baseAPI from "../Api/baseApi"
import CommentCard from "../Components/commentCard";
import { fetchActivePost } from "../Redux/actionCreators/postAction";

const PostDetail= ()=> {
    const [hamburger, setHamburger] = useState(0)
    const auth = useSelector((state) => state&&state.auth?state.auth:null)
    const activePost = useSelector((state) => state.activePost)
    const [content, setContent]= useState("")
    const [name, setName]= useState("")
    const navigate= useNavigate()
    const params= useParams()
    const dispatch= useDispatch()
    
    useEffect(()=>{
        if(!activePost){
            dispatch(fetchActivePost(params.id))
        }
    }, [dispatch, params.id])

    const reconstructDate= (date)=>{
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
      let newDate= new Date(date)
      const year= String(newDate.getFullYear())
      const month= months[newDate.getMonth()]
      const day= String(newDate.getDate())
      newDate= `${month} ${day}, ${year}`
      return newDate
    }

    const renderComments= (comments)=>{
      if (comments){
        return comments.map((comment)=>{
          return (
            <div className="mt-2">
              <div><CommentCard image={comment.imageURL} name={comment.name} content={comment.content} date={comment.date}/></div>
            </div>
          )
        })
      }
      else{
        return ""
      }
    }

    const handlePostCommentClick= async (postID)=>{
      const formData = new FormData();
      let username= name
      let headers={}
      let imageURl=""
      if (auth){
        username= auth.user.first_name
        headers["Authorization"]= `Bearer ${auth.token}`
        if (auth.picture){
          imageURl= auth.picture
        }
      }
      formData.append("post", postID)
      formData.append("imageURL", imageURl)
      formData.append("name", username)
      formData.append("content", content)
  
      let toastID= toast.loading("Posting Comment........", {position: "top-center", style: { color: "#0E4E48" }});
      try{
        await baseAPI.post("/blog/comment/", formData, {headers});
        toast.dismiss(toastID)
        toast.success("Comment Posted")
      }
      catch(err){
        toast.dismiss(toastID)
        toast.error("comment not posted")
      }
    }
  
    return (
      <div>
        <Navbar
          title="Blog"
          hamburger={hamburger}
          setHamburger={setHamburger}
        />
        {activePost?
          <div className="tablet:grid tablet:w-[calc(100%-220px)] tablet:relative tablet:left-[220px]">
          <div className={`${hamburger ? "blur-sm h-screen" : ""}`}>
          <div className="px-6 z-5 tablet:mb-[50px] mb-[95px] mt-[90px]">
          {/* ---------page content begin------- */}
          {/* --------back button start------- */}
            <MdOutlineArrowBackIosNew onClick={() => navigate("/blog")} className="text-[#0E4E48] text-[22px] cursor-pointer" />
          {/* --------back button end------- */}
          <div className='mt-1'>
            <div className="font-[700] laptop:text-[30px] text-[25px] text-[#616262] mb-1">{activePost.title}</div>
            <div className="mt-2 text-sm">On <span className="font-[700]">{reconstructDate(activePost.date)}</span></div>
          </div>
          <div className=" laptop:flex">
            <div className='mt-5 laptop:w-[70%]'>
              {activePost.picture? <img src={activePost.picture} className="h-[230px] tablet:h-[300px] laptop:h-[400px] w-full" alt="" />:""}
              <div className="mt-5" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(activePost.content)}} />
            </div>
            {/* -------comment section start-------- */}
            <div className="laptop:w-[30%] laptop:ml-5">
              <div className="text-[#999A9A] text-[20px] mt-5">Comments ({activePost.comment.length})</div>
              <div>
                {renderComments(activePost.comment)}
              </div>
              <div className="text-[#0E4E48] text-[18px] font-[700] mt-5 py-2 border-t-[5px] border-b-[1px] border-[#0E4E48]">LEAVE A COMMENT</div>
              <textarea
                name=""
                id=""
                rows="5"
                className="shadow-[5px_5px_5px_5px_rgba(0,0,0,0.25)] rounded-[25px] outline-none peer text-[15px] w-full mt-5 p-4"
                placeholder="Your Comment"
                value={content}
                onChange={(e)=>{ setContent(e.target.value) }}
                >
                </textarea>
                {auth?"":<div className="flex items-center shadow-[5px_5px_5px_5px_rgba(0,0,0,0.25)] mt-[10px] rounded-[8px] p-[6px] w-full">
                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="w-full h-10 text-[15px] peer outline-none p-2" placeholder="Your name"/>
                </div>}
                <div className="flex justify-end mt-5">
                  <button onClick={()=>{handlePostCommentClick(activePost.id)}} className="rounded-[10px] bg-[#62C78A] text-[#fff] py-2 px-5 font-semibold text-[13px] cursor-pointer">
                    Post Comment
                  </button>
                </div>
              </div>
            {/* -------comment section end-------- */}
            </div>
            {/* -------page content end------- */}
            </div>
          </div>
        </div>:""}
        <FooterButton/>
      </div>
    );
}

export default PostDetail