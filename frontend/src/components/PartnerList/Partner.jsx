import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Receiver from "./Receiver";
import Sender from "./Sender";


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
      await axios.get("https://lbt-api.vercel.app/token")
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
            profile.userId === props.sender ? 
            <Sender 
               login={profile}
               search={props.search}
               sender={props.sender}
               receiver={props.receiver}
               status={props.status}
            /> 
            : 
            <Receiver
               login={profile}
               search={props.search}
               sender={props.sender}
               receiver={props.receiver}
               status={props.status}
               onClickAccept={props.onClickAccept}
               onClickReject={props.onClickReject}
            />
         }
      </>
   )
}
