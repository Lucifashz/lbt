import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {User} from "@nextui-org/react";

export default function PlayerPartner(props) {
   const [player, setPlayer] = React.useState({});

   React.useEffect(() => {
      getPlayerById();
   }, [])

   const getPlayerById = async() => {
      const response = await axios.get(`http://localhost:3000/users/${props.id}`);         
      setPlayer(response.data);
   }


   return (
      <>
         <User
            className="mt-3"
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
