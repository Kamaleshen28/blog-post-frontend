// import React, { createContext } from 'react'

// export const blogPostContext = createContext({}) //always give intial state

// //Provider is the component that is passing down the context
// export const BlogPostProvider = ({children}) => {
//     const [allPostData, setAllPostData] = React.useState([]);
//     console.log("children", children)
//     return (
//         <blogPostContext.Provider value = {{allPostData, setAllPostData}}>
//             {children}
//         </blogPostContext.Provider>
//     )
// }



import React, {createContext} from 'react'

export const blogPostContext = createContext({})


export const BlogPostProvider = ({children}) => {
    const [allPostData, setAllPostData] = React.useState([]);
    console.log("children", children)
   return ( <blogPostContext.Provider value={{allPostData, setAllPostData}} >
        {children}
    </blogPostContext.Provider>)
}