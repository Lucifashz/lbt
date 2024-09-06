import React from "react";
import {Avatar, Card, CardBody} from "@nextui-org/react";
import { Link } from "react-router-dom";
import NavbarHeader from "../Navbar/NavbarHeader";
import PlayerPartner from "./PlayerPartner";


export default function Player(props) {

   return (
      <>
         <NavbarHeader/>
         <div className="mt-10 p-5 flex w-full h-auto justify-center">
            <Card className="w-96">
               <CardBody className="flex flex-col p-5">
                  <div className="flex flex-col justify-center mb-2 items-end">
                     <Link to={"/users"}>Kembali</Link>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                     <Avatar className="w-20 h-20 text-large grow" />
                  </div>
                  <h2 className="text-center text-2xl font-semibold mt-3">{props.player.name}</h2>
                  <p className="text-center text-gray-600 mt-1">@{props.player.username}</p>
                  <div className="mt-5">
                     <h3 className="text-xl font-semibold">Partner</h3>
                     {props.player.partnerId ?
                        <PlayerPartner id={props.player.partnerId} />: ""}
                  </div>
               </CardBody>
            </Card>
         </div>
      </>
   )
}
