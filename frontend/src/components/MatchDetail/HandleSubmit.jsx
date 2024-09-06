import React from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";


export default function HandleSubmit(props) {
   const updateMatch = async () => {
      await axios.patch(`https://lbt-api.vercel.app/matches/${props.id}`, 
         {
            "match": props.match,
            "status": "finished"
         }
      ).then((response) => {
      }).catch((error) => {
      })
   }

const selisih = Math.abs(props.scoreP1 - props.scoreP2);
const deuce = (props.scoreP1 >= 20 && props.scoreP2 >= 20 && selisih !== 2);
const gameover = ((x === 21 || y === 21) && !deuce);


   return (
      <>
         {gameover ? 
         <Button onClick={updateMatch} className="bg-cyan-950 text-white">Selesaikan pertandingan</Button>
         : ""}
      </>
   )
}
