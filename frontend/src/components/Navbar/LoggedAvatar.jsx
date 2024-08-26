import React from "react";
import { Link } from "react-router-dom";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, Avatar, ListboxItem } from "@nextui-org/react";
import img from "../../assets/imgs/profile-picture-5.jpg";
import { LogOut, UserRound, Swords, UsersRound  } from 'lucide-react';

export default function LoggedAvatar(props) {


   return (
      <Dropdown>
         <DropdownTrigger>
         <Button className="bg-transparent">
            <Avatar
               isBordered
               className="transition-transform ring-cyan-950"
               size="sm"
               src={img}
            />
            <p>{props.profile.username}</p>
         </Button>
         </DropdownTrigger>
         <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
            <DropdownSection title="Settings" showDivider>  
               <DropdownItem
                  key="profil"
                  textValue="Profil"
                  startContent=
                  {
                     <Link className="flex items-center gap-2 py-1.5 px-2"  to="/settings/profile">
                        <UserRound className="size-4"/>
                        Profil
                     </Link>
                  }
                  className="block p-0"
               >
               </DropdownItem>
               <DropdownItem
                  key="challenges"
                  textValue="Challenges"
                  startContent=
                  {
                     <Link className="flex items-center gap-2 py-1.5 px-2"  to="/challenges">
                        <Swords className="size-4"/>
                        Tantangan pemain
                     </Link>
                  }
                  className="block p-0"
               >
               </DropdownItem>
               <DropdownItem
                  key="partners"
                  textValue="Partners"
                  startContent=
                  {
                     <Link className="flex items-center gap-2 py-1.5 px-2"  to="/partners">
                        <UsersRound  className="size-4"/>
                           Partner
                     </Link>
                  }
                  className="block p-0"
               >
               </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Keluar">  
               <ListboxItem 
                  key="delete"
                  className="text-danger data-[hover=true]:bg-danger data-[hover=true]:text-white"
                  color="danger"
                  onClick={props.logout}
                  startContent={<LogOut className={"size-4"} />}
               >
                  Keluar akun
               </ListboxItem>
            </DropdownSection>
         </DropdownMenu>
      </Dropdown>
   )
}
