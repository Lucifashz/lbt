import React from "react";
import NavbarHeader from "../components/Navbar/NavbarHeader"
import TablePlayers from "../components/PlayerList/TablePlayers";

export default function PlayerList() {

   return (
      <>
         <NavbarHeader/>
         <div className="mt-6 flex w-full h-auto justify-center">
            <div className="flex px-6 py-6 gap-4 w-full flex-col max-w-[1280px]">
                  <p>ada</p>
                  <TablePlayers/>
            </div>
         </div>
      </>
   )
}
