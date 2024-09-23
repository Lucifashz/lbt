import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Matches from "../components/MatchesList/Matches";
import NavbarHeader from "../components/Navbar/NavbarHeader";

export default function MatchListByUser() {
   const [profile, setProfile] = React.useState("");
   const [update, setUpdate] = React.useState(false)
   const [matches, setMatches] = React.useState([]);

   // Agar axios dapat membaca cookies
   axios.defaults.withCredentials = true;

   React.useEffect(() => {
   const refreshToken = async () => {
      await axios.get("https://lbt-api.vercel.app/token")
      .then((response) => {
         const decode = jwtDecode(response.data.accessToken);
         setProfile(decode);
         setUpdate(true);
      }).catch((error) => {
         console.log(error);
      });
   }

      const getMatchesByUserId = async () => {
         const response = await axios.get(`https://lbt-api.vercel.app/matches/by-user/${profile.userId}`);
         setMatches(response.data);
      }

         refreshToken();
         getMatchesByUserId();
   }, [update])
   

   return (
         <>
            <NavbarHeader/>
            <div className="mt-6 flex w-full h-auto justify-center">
               <div className="flex px-6 py-6 gap-4 w-full flex-col max-w-[1280px]">
                  <h1>History Matches</h1>
                  <p>{profile.userId}</p>
                  <Matches matches={matches}/>
               </div>
            </div>
         </>
   )
}
