import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Challenger from "./Challenger";
import Challenged from "./Challenged";


export default function Partner(props) {
   const [profile, setProfile] = React.useState({});
   const [token, setToken] = React.useState("");
   const [expire, setExpire] = React.useState("");


   React.useEffect(() => {
      refreshToken();
   }, []);

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
         }
      });
   }


   return (
      <>
         {
            profile.userId === props.challenger ? 
            <Challenger 
               login={profile}
               search={props.search}
               challenger={props.challenger}
               challenged={props.challenged}
               referee={props.referee}
               status={props.status}
               type={props.type}
            /> 
            :
            <Challenged
               login={profile}
               search={props.search}
               challenger={props.challenger}
               challenged={props.challenged}
               referee={props.referee}
               status={props.status}
               type={props.type}
               onClickAccept={props.onClickAccept}
               onClickReject={props.onClickReject}
            />
         }
      </>
   )
}
