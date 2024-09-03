import React from "react";
import axios from "axios";
import { Card, Button } from "@nextui-org/react";
import { Check, X } from 'lucide-react';


export default function Partner(props) {
   const [player, setPlayer] = React.useState({});
   const [update, setUpdate] = React.useState(false);

   React.useEffect(() => {
      getPlayerById();
   }, [update]);

   const getPlayerById = async() => {
      const response = await axios.get(`https://lbt-api.vercel.app/users/${props.sender}`);         
      setPlayer(response.data);
   }

   if (!player.name) {
      return <div></div>;
   }

   return (
   <>
      {player.name.toLowerCase().includes(props.search.toLocaleLowerCase()) || 
      player.username.toLowerCase().includes(props.search.toLocaleLowerCase())
      ?
      <Card className="flex p-5 bg-default-200"> 
      {
         props.status === "accepted" ? 
            <p>Kamu telah <span className="text-green-500">menerima</span> partner dengan {player.name} <span className="text-sm text-default-500">({player.username})</span>.</p>
            : props.status === "rejected" ? 
            <p>Kamu telah <span className="text-red-500">menolak</span> partner dengan {player.name} <span className="text-sm text-default-500">({player.username})</span>.</p>
            :
            <div className="flex justify-between">
               <p>{player.name} <span className="text-sm text-default-500">({player.username})</span> telah mengirim permintaan untuk partner. Terima atau tolak?</p>
               <div className="flex gap-6">
                  <Button onClick={props.onClickReject} radius="md" className="bg-white border border-cyan-950 text-cyan-950">
                     Tolak
                  <X/> 
                  </Button> 
                  <Button onClick={props.onClickAccept} radius="md" className="bg-cyan-950 text-white">
                     Terima
                     <Check /> 
                  </Button> 
               </div>
            </div>
         }
      </Card> : props.search === "" ? 
      <Card className="flex p-5 bg-default-200"> 
      {
         props.status === "accepted" ? 
            <p>Kamu telah <span className="text-green-500">menerima</span> partner dengan {player.name} <span className="text-sm text-default-500">({player.username})</span>.</p>
            : props.status === "rejected" ? 
            <p>Kamu telah <span className="text-red-500">menolak</span> partner dengan {player.name} <span className="text-sm text-default-500">({player.username})</span>.</p>
            :
            <div className="flex justify-between">
               <p>{player.name} <span className="text-sm text-default-500">({player.username})</span> telah mengirim permintaan untuk partner. Terima atau tolak?</p>
               <div className="flex gap-6">
                  <Button onClick={props.onClickReject} radius="md" className="bg-white border border-cyan-950 text-cyan-950">
                     Tolak
                  <X/> 
                  </Button> 
                  <Button onClick={props.onClickAccept} radius="md" className="bg-cyan-950 text-white">
                     Terima
                     <Check /> 
                  </Button> 
               </div>
            </div>
         }
      </Card> : ""}
   </>
   )
}
