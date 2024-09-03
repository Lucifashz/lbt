import React from "react";
import MatchList from "./MatchList";


export default function Home(props) {

   return (
         <>
            <MatchList matches={props.matches}/>
         </>
   )
}
