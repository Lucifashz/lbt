import React from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";


export default function HandleSubmit(props) {
   const updateMatch = async () => {
      await axios.patch(`http://localhost:3000/matches/${props.id}`, 
         {
            "match": props.match,
            "status": "finished"
         }
      ).then((response) => {
      }).catch((error) => {
      })
   }

   return (
      <Button onClick={updateMatch} className="bg-cyan-950 text-white">Selesaikan pertandingan</Button>
   )
}
