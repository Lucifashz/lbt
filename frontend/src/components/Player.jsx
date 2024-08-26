import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {User, Avatar} from "@nextui-org/react";

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
         <p>Partner Kamu :</p>
         <User
         typeof="key"
            name={player.name}
            description={(
            <Link to={`/players/${player._id}`}>
               @{player.username}
            </Link>
            )}
         />
      </>
   )
}
