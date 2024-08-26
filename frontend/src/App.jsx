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
import ProtectedRoutes from "./utils/ProtectedRoutes";
import "./assets/css/index.css";

export default function App() {
   const [matches, setMatches] = React.useState([]);
   const [update, setUpdate] = React.useState(0);

   React.useEffect(() => {
      const getMatches = async() => {
         const response = await axios.get('http://localhost:3000/matches');
         setMatches(response.data);
      }

      const updateData = setInterval(() => {
         setUpdate(update => update + 1)
      }, 1000);

      getMatches();

      return () => clearInterval(updateData);
   }, [update])

   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home matches={matches}/>} />
            <Route element={<ProtectedRoutes/>} >
               <Route path="/login" element={<Login/>} />
            </Route>
            <Route path="/register" element={<Register/>} />
            <Route path="/players" element={<PlayerList/>} />
            <Route path="/challenges" element={<Challenges/>} />
            <Route path="/partners" element={<Partners/>} />
            <Route path="/settings/profile" element={<Profile/>} />
            <Route path="/users/:id" element={<PlayerDetail/>} />
            <Route path="/matches" element={<MatchList matches={matches}/>} />
            <Route path="/matches/:id" element={<MatchDetail/>} />
         </Routes>
      </BrowserRouter>
   )
}