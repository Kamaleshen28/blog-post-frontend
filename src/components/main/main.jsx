
import React from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
// import { blogPostContext } from "../contexts/BlogPostContext";
import { blogPostContext } from "../contexts/BlogPostContext";
import Card from "../card/card";
import './main.css'

export default function Main() {
    // const [allPostData, setAllPostData] = React.useState([])
    // const {allPostData, setAllPostData} = React.useContext(blogPostContext)

    const {allPostData, setAllPostData} = React.useContext(blogPostContext)
    const navigate = useNavigate();

    React.useEffect(() => {

        (async() => {
            try{
                const data = await axios.get('http://localhost:8080/blog-posts');
                setAllPostData(data.data);
            }catch(error){
                const errorStatus = error.message;
                if(errorStatus){
                    navigate(`${'/error'}/${errorStatus}`)
                }else {
                    navigate('/error');
                }
            }
        })()        
        // const makeRequest = async(navigateFunction) => {
        //     try{
        //         const data = await axios.get('http://localhost:8080/blog-posts');
        //         setAllPostData(data.data);
        //     }catch(error){
        //         const errorStatus = error.message;
        //         if(errorStatus){
        //             navigateFunction(`${'/error'}/${errorStatus}`)
        //         }else {
        //             navigateFunction('/error');
        //         }
        //     }
        // }
        // makeRequest(navigate);
        
        // axios.get('http://localhost:8080/blog-posts')
        // .then((data)=>{
        //     setAllPostData(data.data);
        // })
        // .catch(error => {
        //     const errorStatus = error.message;
        //     if(errorStatus){
        //         navigate(`${'/error'}/${errorStatus}`)
        //     }else {
        //         navigate('/error');
        //     }
        // })
   
    }, [])

    const handleClickHeart = (id) => {
        const allPost = allPostData.filter(data => (data.id===id))
        const allPostNew = allPostData.map(data => {
            if(data.id === id){
                return {...data, liked:!allPost[0].liked}
            }
            return data
        })
        axios.put(`http://localhost:8080/blog-posts/${id}`,{
            liked:!allPost[0].liked
        });
        setAllPostData(allPostNew)
    }

    const handleClickClap =  async (id) => {
        const allPost = allPostData.filter(data => (data.id===id))
        const allPostNew = allPostData.map(data => {
            if(data.id === id){
                return {...data, claps:allPost[0].claps+1}
            }
            return data
        })
        axios.put(`http://localhost:8080/blog-posts/${id}`,{
            claps:  allPost[0].claps + 1
        });
        setAllPostData(allPostNew)
    }

    const postArray = allPostData.map(postData => {
        return (<Card key={postData.id} data={postData} handleClickClap={handleClickClap} handleClickHeart= {handleClickHeart} />)
    })
    return(
        <main>
            <div className="all-post-container" data-testid="postRender">
                {postArray}
            </div>
        </main>
    )
}