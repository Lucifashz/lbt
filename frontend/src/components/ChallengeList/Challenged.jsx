import React from "react";
import axios from "axios";
import { Card, Button } from "@nextui-org/react";
import { Check, X } from 'lucide-react';

export default function Challenged(props) {
   const [challenger, setChallenger] = React.useState({});

   React.useEffect(() => {
      getChallengerById();
   }, []);

   const getChallengerById = async() => {
      const response = await axios.get(`https://lbt-api.vercel.app/users/${props.challenger}`);         
      setChallenger(response.data);
   }

   if (!challenger.name) {
      return <div></div>;
   }

   return (
   <>
      {challenger.name.toLowerCase().includes(props.search.toLocaleLowerCase()) || 
      challenger.username.toLowerCase().includes(props.search.toLocaleLowerCase())
      ?
      <Card className="flex p-5 bg-default-200"> 
      {
         props.status === "accepted" ? 
            <p>Kamu telah <span className="text-green-500">menerima</span> bertading {props.type} dengan {challenger.name} <span className="text-sm text-default-500">({challenger.username})</span>.</p>
            : props.status === "rejected" ? 
            <p>Kamu telah <span className="text-red-500">menolak</span> bertading {props.type} dengan {challenger.name} <span className="text-sm text-default-500">({challenger.username})</span>.</p>
            :
            <div className="flex justify-between">
               <p>{challenger.name} <span className="text-sm text-default-500">({challenger.username})</span> telah menantangmu untuk bertanding {props.type}. Terima atau tolak?</p>
               <div className="flex gap-6">
                  <Button onClick={props.onClickReject} radius="md" className="bg-white border border-cyan-950 text-cyan-950">
                     Tolak
                  <X/> 
                  </Button> 
                  <Button onClick={props.onClickAccept} radius="md" className="bg-cyan-950 text-white">
                     Terima
                     <Check /> 
                  </Button> 
               </div>
            </div>
         }
      </Card> : props.search === "" ? 
      <Card className="flex p-5 bg-default-200"> 
      {
         props.status === "accepted" ? 
            <p>Kamu telah <span className="text-green-500">menerima</span> bertading {props.type} dengan {challenger.name} <span className="text-sm text-default-500">({challenger.username})</span>.</p>
            : props.status === "rejected" ? 
            <p>Kamu telah <span className="text-red-500">menolak</span> bertading {props.type} dengan {challenger.name} <span className="text-sm text-default-500">({challenger.username})</span>.</p>
            :
            <div className="flex justify-between">
               <p>{challenger.name} <span className="text-sm text-default-500">({challenger.username})</span> telah menantangmu untuk bertanding {props.type}. Terima atau tolak?</p>
               <div className="flex gap-6">
                  <Button onClick={props.onClickReject} radius="md" className="bg-white border border-cyan-950 text-cyan-950">
                     Tolak
                  <X/> 
                  </Button> 
                  <Button onClick={props.onClickAccept} radius="md" className="bg-cyan-950 text-white">
                     Terima
                     <Check /> 
                  </Button> 
               </div>
            </div>
         }
      </Card> : ""}
   </>
   )
}
