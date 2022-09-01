import Loading from "./components/Loading"
import authHook from "./util/userState"
import "./styles/global.css"
import "./index.css"
import Home from "./pages/Home"
import { BrowserRouter as Router, Route,Routes} from "react-router-dom"
import Header from "./components/Header/Header"
import SearchPage from "./pages/SearchPage"
import SingleProduct from "./pages/SingleProduct"
import SideBar from "./components/SideBar/SideBar"


function App() {

  const load=authHook()
  return  load ? (<Loading/>):
    <Router>
        <Header/>
          <div className="flex lg:w-11/12 md:w-11/12 w-full m-auto justify-around flex-row">
            <SideBar/>
            <Routes>
              <Route  path="/" exact element={<Home/>} />
              <Route path="/search" element={<SearchPage/>}/>
              <Route path="/single-product" element={<SingleProduct/>}/>
            </Routes>
          </div>
    </Router>

}

export default App;

