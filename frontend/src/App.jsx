<<<<<<< HEAD

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Checkout from "./pages/Checkout";
import { useSelector } from "react-redux";
import PlaceOrder from "./pages/PlaceOrder";
import OrderConfirmation from "./pages/OrderConfirm";
import { OrderHistory } from "./pages/OrderHistory";

function App() {

  const userLoginReducer = useSelector((state) => state.userLoginReducer)
  const {userInfo} = userLoginReducer
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/products/:id" element={<ProductDetail />}></Route>
          <Route
            exact
            path="/login"
            element={userInfo ? <Navigate to="/"></Navigate> : <Login />}
          ></Route>
          <Route
            exact
            path="/register"
            element={userInfo ? <Navigate to="/"></Navigate> : <Register />}
          ></Route>
          <Route path="/order/:id" element={<OrderConfirmation />} />
          <Route path="/order-history" element={<OrderHistory />} />

          <Route exact path="/checkout" element={<Checkout />}></Route>
          <Route exact path="/placeorder" element={<PlaceOrder />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
=======
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from "axios";
import Home from "./pages/Home";
import MatchList from "./pages/MatchList";
import MatchDetail from "./pages/MatchDetail";
import PlayerList from "./pages/PlayerList";
import PlayerDetail from "./pages/PlayerDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Challenges from "./pages/Challenges";
import Partners from "./pages/Partners";
import RedirectLogin from "./utils/RedirectLogin";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import "./assets/css/index.css";

export default function App() {
   const [matches, setMatches] = React.useState([]);
   const [update, setUpdate] = React.useState(0);
   const [msg, setMsg] = React.useState("");

   React.useEffect(() => {
      const getMatches = async() => {
         const response = await axios.get('http://localhost:3000/matches');
         setMatches(response.data);
      }

      const refreshToken = async () => {
         await axios.get("http://localhost:3000/token")
         .then(response => setMsg(response.data.message))
      }

      const updateData = setInterval(() => {
         setUpdate(update => update + 1)
      }, 1000);

      getMatches();
      refreshToken()

      return () => clearInterval(updateData);
   }, [update])


   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home matches={matches}/>} />
            <Route element={<RedirectLogin msg={msg}/>} >
               <Route path="/login" element={<Login/>} />
               <Route path="/register" element={<Register/>} />
            </Route>
            <Route path="/users" element={<PlayerList/>} />
            <Route element={<ProtectedRoutes msg={msg}/>} >
               <Route path="/challenges" element={<Challenges/>} />
               <Route path="/partners" element={<Partners/>} />
               <Route path="/profile" element={<Profile/>} />
            </Route>
            <Route path="/users/:id" element={<PlayerDetail/>} />
            <Route path="/matches" element={<MatchList matches={matches}/>} />
            <Route path="/matches/:id" element={<MatchDetail/>} />
         </Routes>
      </BrowserRouter>
   )
}
>>>>>>> bd117058ee4d01e6fc9596bc87d402f7f452659e
