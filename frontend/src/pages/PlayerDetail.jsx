import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Player from "../components/PlayerDetail/Player";


export default function PlayerDetail() {
   const [player, setPlayer] = React.useState({});

   const { id } = useParams();

   React.useEffect(() => {
      getPlayerById();
   }, [])

   const getPlayerById = async() => {
      const response = await axios.get(`https://lbt-api.vercel.app/users/${id}`);         
      setPlayer(response.data);
   }



   return (
      <>
         <Player 
            key={player._id} 
            player={player}
         />
      </>
   )
}
