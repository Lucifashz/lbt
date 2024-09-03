import React from "react"
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import NavbarHeader from "../components/Navbar/NavbarHeader";
import { Card, CardBody, Avatar } from "@nextui-org/react";
import PlayerPartner from "../components/PlayerDetail/PlayerPartner";


export default function Profile() {
   const [profile, setProfile] = React.useState({});
   const [token, setToken] = React.useState("");
   const [expire, setExpire] = React.useState("");
   const [challenges, setChallenges] = React.useState([]);
   const [update, setUpdate] = React.useState(false);


   const navigate = useNavigate();

   React.useEffect(() => {
      refreshToken();
   }, [update]);

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
         if (error.response) {
            navigate("/");
         }
      });
   }


return (
   <>
      <NavbarHeader/>
      <div className="mt-6 flex w-full h-auto justify-center">
         <div className="flex px-6 py-6 gap-4 w-full flex-col max-w-[1280px]  items-center">
            <Card className="w-96">
               <CardBody className="flex flex-col p-5">
                  <div className="flex flex-col justify-center mb-2 items-end">
                     <Link to={"/"}>Kembali</Link>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                     <Avatar className="w-20 h-20 text-large grow" />
                  </div>
                  <h2 className="text-center text-2xl font-semibold mt-3">{profile.name}</h2>
                  <p className="text-center text-gray-600 mt-1">@{profile.username}</p>
                  <div className="mt-5">
                     <h3 className="text-xl font-semibold">Partner</h3>
                     {profile.partnerId ?
                        <PlayerPartner id={profile.partnerId} />: ""}
                  </div>
               </CardBody>
            </Card>
         </div>
      </div>
   </>
)
}
