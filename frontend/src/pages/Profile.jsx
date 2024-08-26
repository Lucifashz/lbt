import React from "react"
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import NavbarHeader from "../components/Navbar/NavbarHeader";
import { Card } from "@nextui-org/react";
import TableChallenges from "../components/ChallengeList/TableChallenges";


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
      await axios.get("http://localhost:3000/token")
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
         <div className="flex px-6 py-6 gap-4 w-full flex-col max-w-[1280px]">
            <Card className="p-3 overflow-scroll md:overflow-hidden">
               <TableChallenges/>
            </Card>
         </div>
      </div>
      <p>Profile</p>
      <p>{profile.name}</p>
      <p>{profile.userId}</p>
      <Link to="/">Kembali</Link>
   </>
)
}
