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
      const response = await axios.get(`https://lbt-api.vercel.app/users/${props.id}`);         
      setPlayer(response.data);
   }

   if (!props.id) {
      return <div></div>;
   }

   return (
      <>
         {
            props.direction === "right" ?
               <div className="flex gap-3">
                  <div className="flex flex-col items-end text-sm">
                     <p>{player.name}</p>
                     <Link to={`/players/${player._id}`} className="text-default-400">@{player.username}</Link>
                  </div>
                  <Avatar showFallback src='https://images.unsplash.com/broken' />
               </div>
            : 
            <User
               typeof="key"
               name={player.name}
               description={(
               <Link to={`/players/${player._id}`}>
                  @{player.username}
               </Link>
               )}
            />
         }
      </>
   )
}
