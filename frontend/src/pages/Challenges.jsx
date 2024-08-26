import React from "react"
import NavbarHeader from "../components/Navbar/NavbarHeader";
import { Card } from "@nextui-org/react";
import TableChallenges from "../components/ChallengeList/TableChallenges";

export default function Challenges() {

   return (
   <>
      <NavbarHeader/>
      <div className="mt-6 flex w-full h-auto justify-center">
         <div className="flex px-6 py-6 gap-4 w-full flex-col max-w-[1280px]">
            <Card className="p-3 overflow-scroll md:overflow-hidden">
               <TableChallenges/>
            </Card>
         </div>
      </div>
   </>
   )
}
