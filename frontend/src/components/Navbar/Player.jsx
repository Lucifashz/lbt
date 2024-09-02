import React from "react";
import axios from "axios";


export default function Player(props) {
   const [player, setPlayer] = React.useState({});

   React.useEffect(() => {
      getPlayerById();
   }, [])

   const getPlayerById = async() => {
      const response = await axios.get(`http://localhost:3000/users/${props.id}`);         
      setPlayer(response.data);
   }

   if (!props.id) {
      return <div></div>;
   }

   return (
      <>
         {props.status === "rejected" ?
            <p>{props.text} {player.username}</p>
         : props.status === "accepted" ?
         <p>{props.text} {player.username}</p>
         : <p>{props.textLeft} {player.username} {props.textRight} </p>}
      </>
   )
}
