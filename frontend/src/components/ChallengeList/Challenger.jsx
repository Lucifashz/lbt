import React from "react";
import axios from "axios";
import { Card, Button } from "@nextui-org/react";
import { Check, X } from 'lucide-react';

export default function Challenger(props) {
   const [challenged, setChallenged] = React.useState({});

   React.useEffect(() => {
      getChallengedById();
   }, []);

   const getChallengedById = async() => {
      const response = await axios.get(`https://lbt-api.vercel.app/users/${props.challenged}`);         
      setChallenged(response.data);
   }

   if (!challenged.name) {
      return <div></div>;
   }

   return (
   <>
      {challenged.name.toLowerCase().includes(props.search.toLocaleLowerCase()) || 
      challenged.username.toLowerCase().includes(props.search.toLocaleLowerCase())
      ?
      <Card className="flex p-5 bg-default-200"> 
      {
         props.status === "accepted" ? 
            <p>Permintaan pertandingan {props.type} Kamu dengan <span className="text-default-500">{challenged.name} <span className="text-sm text-default-500">({challenged.username})</span></span> telah <span className="text-green-500">diterima</span>.</p>
            : props.status === "rejected" ? 
            <p>Permintaan pertandingan {props.type} Kamu dengan <span className="text-default-500">{challenged.name} <span className="text-sm text-default-500">({challenged.username})</span></span> telah <span className="text-red-500">ditolak</span>.</p>
            :
            <div className="flex justify-between">
               <p>Kamu telah mengirimkan permintaan pertandingan {props.type} kepada <span className="text-default-500">{challenged.name} <span className="text-sm text-default-500">({challenged.username})</span></span></p>
            </div>
         }
      </Card> : props.search === "" ? 
      <Card className="flex p-5 bg-default-200"> 
      {
         props.status === "accepted" ? 
            <p>Permintaan pertandingan {props.type} Kamu dengan <span className="text-default-500">{challenged.name} <span className="text-sm text-default-500">({challenged.username})</span></span> telah <span className="text-green-500">diterima</span>.</p>
            : props.status === "rejected" ? 
            <p>Permintaan pertandingan {props.type} Kamu dengan <span className="text-default-500">{challenged.name} <span className="text-sm text-default-500">({challenged.username})</span></span> telah <span className="text-red-500">ditolak</span>.</p>
            :
            <p>Kamu telah mengirimkan permintaan pertandingan {props.type} kepada <span className="text-default-500">{challenged.name} <span className="text-sm text-default-500">({challenged.username})</span></span></p>
         }
      </Card> : ""}
   </>
   )
}
