import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Components/navbar";
import PostCard from "../Components/postCard";
import FooterButton from "../Components/footerbutton";
import { FetchPublishedPostAction  } from "../Redux/actionCreators/postAction";

const Blog = () => {
  const [hamburger, setHamburger] = useState(0);
  const post = useSelector((state) => state.publishedPost);
  const [searchText, SetSearchText]= useState("")
  const dispatch= useDispatch();

  const fetchNextPost= (url)=>{
    dispatch(FetchPublishedPostAction(url))
  }

  const fetchPreviousPost= (url)=>{
    dispatch(FetchPublishedPostAction(url))
  }

  const handleSearchButtonClick= ()=>{
    if (searchText){
      dispatch(FetchPublishedPostAction(null, searchText))
    }
  }

  const renderPostList= ()=>{ 
    if (post && post.results){
        return post.results.map((post, index) => {
            return <div key={index} className="mt-5"><PostCard post={post} /></div>
        })
    }
    else{
        return ""
    }
  }

  useEffect(()=>{
    dispatch(FetchPublishedPostAction())
}, [dispatch])

  return (
    <div>
      <Navbar
        title="Blog"
        hamburger={hamburger}
        setHamburger={setHamburger}
      />
        <div className="tablet:grid tablet:w-[calc(100%-220px)] tablet:relative tablet:left-[220px]">
        <div className={`${hamburger ? "blur-sm h-screen" : ""}`}>
        <div className="px-6 z-5 tablet:mb-[50px] mb-[95px] mt-[110px]">
        {/* ---------page content begin------- */}
        <div className="flex justify-end">
          <div className="w-full laptop:w-[40%] flex">
            <input
              onChange={(e)=>{ SetSearchText(e.target.value)}}
              value={searchText}
              type="text"
              id="text"
              placeholder="search......."
              required
              className="w-full tablet:!text-[15px] tablet:h-[40px] h-[35px] outline-none border-2 border-[#62C78A] p-2"
            />
            <button onClick={handleSearchButtonClick} className="bg-[#0E4E48] text-[white] font-[600] px-3">SEARCH</button>
          </div>
        </div>
        <div className="text-[#0E4E48] text-[18px] font-[700] mt-5 py-2 border-t-[5px] border-b-[1px] border-[#0E4E48]">TRENDING POSTS</div>
          <div className="tablet:grid tablet:grid-cols-1 laptop:grid-cols-2 bigscreen:grid-cols-3 tablet:gap-2">
            {renderPostList().slice(0,3)}
          </div>
        <div className="text-[#0E4E48] text-[18px] font-[700] mt-10 py-2 border-t-[5px] border-b-[1px] border-[#0E4E48]">RECENT POSTS</div>
          <div className="tablet:grid tablet:grid-cols-1 laptop:grid-cols-2 bigscreen:grid-cols-3 tablet:gap-2">
            {renderPostList()}
          </div>
        {/* ------button begin------- */}
        <div className="flex justify-end mt-5">
            {post && post.previous? <div onClick={()=>{fetchPreviousPost(post.previous)}} className="rounded-l-full border-[black] border-2 px-3 py-1 mr-1 cursor-pointer">Prev</div>:""}
            {post && post.next? <div onClick={()=>{fetchNextPost(post.next)}} className=" rounded-r-full border-[black] border-2 px-3 py-1 cursor-pointer">Next</div>:""}
        </div>
        {/* ------button end------- */}
        {/* -------page content end------- */}
        </div>
        </div>
      </div>
      <FooterButton/>
    </div>
  );
};

export default Blog;
