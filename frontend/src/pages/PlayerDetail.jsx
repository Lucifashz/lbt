import React from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Player from "../components/Player";


export default function PlayerDetail() {
   const [player, setPlayer] = React.useState({});

   const { id } = useParams();

   React.useEffect(() => {
      getPlayerById();
   }, [])

   const getPlayerById = async() => {
      const response = await axios.get(`http://localhost:3000/users/${id}`);         
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
