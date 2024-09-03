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

let selisih = Math.abs(props.scoreP1 - props.scoreP2);

console.log(selisih === 2 || props.scoreP1 > 29 || props.scoreP2 > 29 ? " a" : "b");


   return (
      <>
         {selisih === 2 || props.scoreP1 > 29 || props.scoreP2 > 29 ? 
         <Button onClick={updateMatch} className="bg-cyan-950 text-white">Selesaikan pertandingan</Button>
         : ""}
      </>
   )
}
