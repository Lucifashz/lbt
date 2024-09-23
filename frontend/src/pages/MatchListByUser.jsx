import React from "react";
import axios from "axios";
import Matches from "../components/MatchesList/Matches";
import NavbarHeader from "../components/Navbar/NavbarHeader";

export default function MatchListByUser(props) {
   const [matches, setMatches] = React.useState([]);


   React.useEffect(() => {
      const getMatchesByUserId = async () => {
         const response = await axios.get(`http://localhost:3000/matches/by-user/${props.profile.userId}`);
         setMatches(response.data);
         console.log(props.profile.userId);
         
      }

         getMatchesByUserId();
   }, [])
   

   return (
         <>
            <NavbarHeader/>
            <div className="mt-6 flex w-full h-auto justify-center">
               <div className="flex px-6 py-6 gap-4 w-full flex-col max-w-[1280px]">
                  <h1>History Matches</h1>
                  <Matches matches={matches}/>
               </div>
            </div>
         </>
   )
}
