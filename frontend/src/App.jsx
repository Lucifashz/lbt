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
         const response = await axios.get('https://lbt-api.vercel.app/matches');
         setMatches(response.data);
      }

      const refreshToken = async () => {
         await axios.get("https://lbt-api.vercel.app/token")
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
