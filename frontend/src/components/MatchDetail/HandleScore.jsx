import React from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { Plus, Minus } from 'lucide-react';


export default function HandleScore(props) {

   const [score, setScore] = React.useState(props.score)

React.useEffect(() => {
   const updateScore = async () => {
      await axios.patch(`http://localhost:3000/matches/${props.id}`, 
         {
            "match": props.match,
            [props.team]: {
               "score": score
            }
         }
      ).then((response) => {
      }).catch((error) => {
      })
   }

   updateScore();
}, [score])

   function handleDecrease() {
      if (score > 0) {
         setScore(score - 1);
      };
   }

   function handleIncrease() {
      if (score < 30) {
         setScore(score + 1);
      }
   }

   return (
      <div className="flex gap-5 mt-2">
         <Button onClick={handleDecrease} className="bg-cyan-950 text-white">
            <Minus className="size-5"/>
         </Button>
         <p className="text-2xl font-semibold">{score}</p> 
         <Button onClick={handleIncrease} className="bg-cyan-950 text-white">
            <Plus className="size-5"/>
         </Button>
      </div>
   )
}
