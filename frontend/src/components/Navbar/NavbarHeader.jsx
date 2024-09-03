import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import {Navbar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem} from "@nextui-org/react";
import LoggedAvatar from "./LoggedAvatar";
import Notification from "./Notification";
import LoginAndRegister from "./LoginAndRegister";
import "../../assets/css/logo.css"


export default function NavbarHeader() {
   const [profile, setProfile] = React.useState({});
   const [token, setToken] = React.useState("");
   const [expire, setExpire] = React.useState("");

   const navigate = useNavigate();

   React.useEffect(() => {
      refreshToken();
   }, []);

   // Agar axios dapat membaca cookies
   axios.defaults.withCredentials = true;

   const refreshToken = async () => {
      await axios.get("https://lbt-api.vercel.app/token")
      .then((response) => {
         setToken(response.data.accessToken);
         const decode = jwtDecode(response.data.accessToken);
         setProfile(decode);
         setExpire(decode.exp);
      }).catch((error) => {
         console.log(error);
      });
   }

   const logout = async () => {
      await axios.delete("https://lbt-api.vercel.app/logout")
         .then((response) => { 
            navigate("/");
            setProfile({});
         })
         .catch((error) => { 
            console.log(error);
         })
   }

   const menuItems = [
      {
         name: "Beranda",
         link: "/",
      },
      {
         name: "Pertandingan",
         link: "/matches",
      },
      {
         name: "Pemain",
         link: "/users",
      }
   ];


   return (
      <>
         <Navbar disableAnimation isBordered isBlurred={false} maxWidth="xl" className="justify-center py-6" >
            <Link to="/" aria-label="Brand">
               <div className="flex flex-col h-auto">
                  <p className="text-6xl text-cyan-950 uppercase karantina-regular">lbt</p>
                  <p className="text-2xl text-cyan-950 capitalize pathway-gothic-one-regular">Live Bulu Tangkis</p>
               </div>
            </Link>

            <NavbarContent className="grow-0" justify="end">
               <NavbarContent className="hidden sm:flex gap-4" justify="center">
               {menuItems.map((item, index) => (
                  <Link key={index} className="p-2 flex items-center text-md text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" to={item.link} aria-current="page">
                     {item.name}
                  </Link>
               ))}
               </NavbarContent>

               <div className="hidden sm:inline-block md:me-2">
                  <div className="w-px h-4 bg-gray-300"></div>
               </div>

               {profile.username ? 
               <>
                  <Notification profile={profile}/>
                  <LoggedAvatar profile={profile} logout={logout}/>  
               </> :
               <LoginAndRegister/>}

               <div className="block sm:hidden md:me-2">
                  <div className="w-px h-4 bg-gray-300"></div>
               </div>

               <NavbarItem className="sm:hidden grow-0" justify="end">
                  <NavbarMenuToggle className="p-5"/>
               </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="max-sm:border-t">
               <div className="md:hidden p-2 flex justify-between items-center">
                  <h3 id="hs-header-base-label" className="font-bold text-gray-800">
                  Menu title
                  </h3>
               </div>
            {menuItems.map((item, index) => (
               <NavbarMenuItem key={`${item}-${index}`}>
                  <Link className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" to={item.link} aria-current="page">
                     {item.name}
                  </Link>
               </NavbarMenuItem>
            ))}
            </NavbarMenu>

         </Navbar>
      </>
   )
}


