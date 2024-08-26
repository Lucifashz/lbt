import React from "react";
import Matches from "../components/MatchesList/Matches";
import NavbarHeader from "../components/Navbar/NavbarHeader";


export default function MatchList(props) {

   return (
         <>
            <NavbarHeader/>
            <div className="mt-6 flex w-full h-auto justify-center">
               <div className="flex px-6 py-6 gap-4 w-full flex-col max-w-[1280px]">
                  <h1>List Matches</h1>
                  <Matches matches={props.matches}/>
               </div>
            </div>
         </>
   )
}
