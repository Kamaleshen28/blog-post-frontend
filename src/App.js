
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import { ERROR_ROUTE, HOME_ROUTE } from "./constants/routes";
import Error from "../src/pages/Error/index";
import PageNotFound from "../src/pages/PageNotFound/index";
import Home from "../src/pages/Home/index";
import { BlogPostProvider } from "./components/contexts/BlogPostContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} 
            element={
              <BlogPostProvider>
                  <Home />
              </BlogPostProvider>
              } 
            />
          <Route path={`${'/error'}/:errorCode?`} element={<Error />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;






// import './App.css';
// import Main from './components/Main';

// function App() {
//   return (
//     <div className="App">
//       <Main />
//     </div>
//   );
// }

// export default App;
