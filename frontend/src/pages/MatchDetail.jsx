import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import NavbarHeader from "../components/Navbar/NavbarHeader";
import MatchDouble from "../components/MatchesList/MatchDouble";
import MatchSingle from "../components/MatchesList/MatchSingle";
import HandleScore from "../components/MatchDetail/HandleScore";
import HandleSubmit from "../components/MatchDetail/HandleSubmit";


export default function MatchDetail() {
   const [match, setMatch] = React.useState([]);
   const [update, setUpdate] = React.useState(0);
   const [profile, setProfile] = React.useState({});
   const [token, setToken] = React.useState("");
   const [expire, setExpire] = React.useState("");

   const { id } = useParams();

   // Agar axios dapat membaca cookies
   axios.defaults.withCredentials = true;

   React.useEffect(() => {
      const getMatchById = async() => {
         const response = await axios.get(`http://localhost:3000/matches/${id}`);
         setMatch(response.data);
      }

      const refreshToken = async () => {
         await axios.get("http://localhost:3000/token")
         .then((response) => {
            setToken(response.data.accessToken);
            const decode = jwtDecode(response.data.accessToken);
            setProfile(decode);
            setExpire(decode.exp);
         }).catch((error) => {
         });
      }

      const updateData = setInterval(() => {
         setUpdate(update => update + 1)
      }, 1000);

      getMatchById();
      refreshToken();
      return () => clearInterval(updateData);
   }, [update]);


const dateNow = new Date().toISOString()




   return (
      <>
         <NavbarHeader/>
         <div className="mt-6 flex w-full h-auto justify-center">
            <div className="flex px-6 py-6 gap-4 w-full flex-col max-w-[1280px]">
               {
                  match.matchType === "double" ? 
                  <MatchDouble 
                     match={match} 
                     link="/matches" 
                     linkName="Kembali"
                     handleScoreMacthOneTeamOne={
                        match.matchOne &&
                        dateNow > match.matchDate &&
                        match.matchOne.winner === "none" && 
                        match.matchOne.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleScore 
                           id={match._id}
                           score={match.matchOne.teamOne.score} 
                           team="teamOne"
                           match="matchOne"
                        /> : "" 
                     }
                     handleScoreMacthOneTeamTwo={
                        match.matchOne &&
                        dateNow > match.matchDate &&
                        match.matchOne.winner === "none" && 
                        match.matchOne.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleScore 
                           id={match._id}
                           score={match.matchOne.teamTwo.score} 
                           team="teamTwo"
                           match="matchOne"
                        /> : "" 
                     }
                     handleSubmitMacthOne={
                        match.matchOne &&
                        dateNow > match.matchDate &&
                        (match.matchOne.teamOne.score > 20 || match.matchOne.teamTwo.score > 20) &&
                        match.matchOne.winner === "none" && 
                        match.matchOne.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleSubmit 
                           id={match._id}
                           scoreP1={match.matchOne.teamOne.score}
                           scoreP2={match.matchOne.teamTwo.score}
                           match="matchOne"
                        /> : "" 
                     }
                     handleScoreMacthTwoTeamOne={
                        match.matchTwo &&
                        dateNow > match.matchDate &&
                        match.matchTwo.winner === "none" && 
                        match.matchTwo.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleScore 
                           id={match._id}
                           score={match.matchTwo.teamOne.score} 
                           team="teamOne"
                           match="matchTwo"
                        /> : "" 
                     }
                     handleScoreMacthTwoTeamTwo={
                        match.matchTwo &&
                        dateNow > match.matchDate &&
                        match.matchTwo.winner === "none" && 
                        match.matchTwo.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleScore 
                           id={match._id}
                           score={match.matchTwo.teamTwo.score} 
                           team="teamTwo"
                           match="matchTwo"
                        /> : "" 
                     }
                     handleSubmitMacthTwo={
                        match.matchTwo &&
                        dateNow > match.matchDate &&
                        (match.matchTwo.teamOne.score > 20 || match.matchTwo.teamTwo.score > 20) &&
                        match.matchTwo.winner === "none" && 
                        match.matchTwo.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleSubmit 
                           id={match._id}
                           scoreP1={match.matchTwo.teamOne.score}
                           scoreP2={match.matchTwo.teamTwo.score}
                           match="matchTwo"
                        /> : "" 
                     }
                     handleScoreMacthThreeTeamOne={
                        match.matchThree &&
                        dateNow > match.matchDate &&
                        match.matchThree.winner === "none" && 
                        match.matchThree.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleScore 
                           id={match._id}
                           score={match.matchThree.teamOne.score} 
                           team="teamOne"
                           match="matchThree"
                        /> : "" 
                     }
                     handleScoreMacthThreeTeamTwo={
                        match.matchThree &&
                        dateNow > match.matchDate &&
                        match.matchThree.winner === "none" && 
                        match.matchThree.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleScore 
                           id={match._id}
                           score={match.matchThree.teamTwo.score} 
                           team="teamTwo"
                           match="matchThree"
                        /> : "" 
                     }
                     handleSubmitMacthThree={
                        match.matchThree &&
                        dateNow > match.matchDate &&
                        (match.matchThree.teamOne.score > 20 || match.matchThree.teamTwo.score > 20) &&
                        match.matchThree.winner === "none" && 
                        match.matchThree.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleSubmit 
                           id={match._id}
                           scoreP1={match.matchThree.teamOne.score}
                           scoreP2={match.matchThree.teamTwo.score}
                           match="matchThree"
                        /> : "" 
                     }
                  /> : 
                  match.matchType === "single" ?
                  <MatchSingle 
                     match={match} 
                     link="/matches" 
                     linkName="Kembali"
                     handleScoreMacthOneTeamOne={
                        match.matchOne &&
                        dateNow > match.matchDate &&
                        match.matchOne.winner === "none" && 
                        match.matchOne.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleScore 
                           id={match._id}
                           score={match.matchOne.teamOne.score} 
                           team="teamOne"
                           match="matchOne"
                        /> : "" 
                     }
                     handleScoreMacthOneTeamTwo={
                        match.matchOne &&
                        dateNow > match.matchDate &&
                        match.matchOne.winner === "none" && 
                        match.matchOne.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleScore 
                           id={match._id}
                           score={match.matchOne.teamTwo.score} 
                           team="teamTwo"
                           match="matchOne"
                        /> : "" 
                     }
                     handleSubmitMacthOne={
                        match.matchOne &&
                        dateNow > match.matchDate &&
                        (match.matchOne.teamOne.score > 20 || match.matchOne.teamTwo.score > 20) &&
                        match.matchOne.winner === "none" && 
                        match.matchOne.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleSubmit 
                           id={match._id}
                           scoreP1={match.matchOne.teamOne.score}
                           scoreP2={match.matchOne.teamTwo.score}
                           match="matchOne"
                        /> : "" 
                     }
                     handleScoreMacthTwoTeamOne={
                        match.matchTwo &&
                        dateNow > match.matchDate &&
                        match.matchTwo.winner === "none" && 
                        match.matchTwo.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleScore 
                           id={match._id}
                           score={match.matchTwo.teamOne.score} 
                           team="teamOne"
                           match="matchTwo"
                        /> : "" 
                     }
                     handleScoreMacthTwoTeamTwo={
                        match.matchTwo &&
                        dateNow > match.matchDate &&
                        match.matchTwo.winner === "none" && 
                        match.matchTwo.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleScore 
                           id={match._id}
                           score={match.matchTwo.teamTwo.score} 
                           team="teamTwo"
                           match="matchTwo"
                        /> : "" 
                     }
                     handleSubmitMacthTwo={
                        match.matchTwo &&
                        dateNow > match.matchDate &&
                        (match.matchTwo.teamOne.score > 20 || match.matchTwo.teamTwo.score > 20) &&
                        match.matchTwo.winner === "none" && 
                        match.matchTwo.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleSubmit 
                           id={match._id}
                           scoreP1={match.matchTwo.teamOne.score}
                           scoreP2={match.matchTwo.teamTwo.score}
                           match="matchTwo"
                        /> : "" 
                     }
                     handleScoreMacthThreeTeamOne={
                        match.matchThree &&
                        dateNow > match.matchDate &&
                        match.matchThree.winner === "none" && 
                        match.matchThree.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleScore 
                           id={match._id}
                           score={match.matchThree.teamOne.score} 
                           team="teamOne"
                           match="matchThree"
                        /> : "" 
                     }
                     handleScoreMacthThreeTeamTwo={
                        match.matchThree &&
                        dateNow > match.matchDate &&
                        match.matchThree.winner === "none" && 
                        match.matchThree.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleScore 
                           id={match._id}
                           score={match.matchThree.teamTwo.score} 
                           team="teamTwo"
                           match="matchThree"
                        /> : "" 
                     }
                     handleSubmitMacthThree={
                        match.matchThree &&
                        dateNow > match.matchDate &&
                        (match.matchThree.teamOne.score > 20 || match.matchThree.teamTwo.score > 20) &&
                        match.matchThree.winner === "none" && 
                        match.matchThree.status === "unfinished" &&
                        match.refereeId === profile.userId ? 
                        <HandleSubmit 
                           id={match._id}
                           scoreP1={match.matchThree.teamOne.score}
                           scoreP2={match.matchThree.teamTwo.score}
                           match="matchThree"
                        /> : "" 
                     }
                  />  : ""
               }
            </div>
         </div>

      </>
   )
}
