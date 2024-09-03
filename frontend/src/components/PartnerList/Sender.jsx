import React from "react";
import axios from "axios";
import {Card} from "@nextui-org/react";

export default function PartnerSender(props) {
   const [receiver, setReceiver] = React.useState({});
   const [update, setUpdate] = React.useState(false);

   React.useEffect(() => {
      getReceiverById();
   }, [update]);

   const getReceiverById = async() => {
      const response = await axios.get(`https://lbt-api.vercel.app/users/${props.receiver}`);         
      setReceiver(response.data);
   }

   if (!receiver.name) {
      return <div></div>;
   }

   return (
   <>
      {receiver.name.toLowerCase().includes(props.search.toLocaleLowerCase()) || 
      receiver.username.toLowerCase().includes(props.search.toLocaleLowerCase())
      ?
      <Card className="flex p-5 bg-default-200"> 
      {
         props.status === "accepted" ? 
            <p>Permintaan partner Kamu dengan <span className="text-default-500">{receiver.name} <span className="text-sm text-default-500">({receiver.username})</span></span> telah <span className="text-green-500">diterima</span>.</p>
            : props.status === "rejected" ? 
            <p>Permintaan partner Kamu dengan <span className="text-default-500">{receiver.name} <span className="text-sm text-default-500">({receiver.username})</span></span> telah <span className="text-red-500">ditolak</span>.</p>
            :
            <div className="flex justify-between">
               <p>Kamu telah mengirim permintaan partner kepada <span className="text-default-500">{receiver.name} <span className="text-sm text-default-500">({receiver.username})</span></span></p>
            </div>
         }
      </Card> : props.search === "" ? 
      <Card className="flex p-5 bg-default-200"> 
      {
         props.status === "accepted" ? 
            <p>Permintaan partner Kamu dengan <span className="text-default-500">{receiver.name} <span className="text-sm text-default-500">({receiver.username})</span></span> telah <span className="text-green-500">diterima</span>.</p>
            : props.status === "rejected" ? 
            <p>Permintaan partner Kamu dengan <span className="text-default-500">{receiver.name} <span className="text-sm text-default-500">({receiver.username})</span></span> telah <span className="text-red-500">ditolak</span>.</p>
            :
            <p>Kamu telah mengirim permintaan partner kepada <span className="text-default-500">{receiver.name} <span className="text-sm text-default-500">({receiver.username})</span></span></p>
         }
      </Card> : ""}
   </>
   )
}
