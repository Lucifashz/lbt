import React from "react";
import axios from "axios";
import {Avatar, Card, CardBody} from "@nextui-org/react";

export default function PlayerPartner(props) {

   const [partner, setPartner] = React.useState({});

   React.useEffect(() => {
      getPartnerById();
   }, [])

   const getPartnerById = async() => {
      const response = await axios.get(`http://localhost:3000/users/${props.id}`);         
      setPartner(response.data);
   }


   return (
      <>
         <div className="mt-10 p-5 flex w-full h-auto justify-center">
            <Card className="w-96">
               <CardBody className="flex flex-col p-5">
                  <h1 className="font-bold text-xl text-center mb-4">Partner Kamu</h1>
                  <div className="flex flex-col justify-center items-center">
                     <Avatar className="w-20 h-20 text-large grow" />
                  </div>
                  <h2 className="text-center text-2xl font-semibold mt-3">{partner.name}</h2>
                  <p className="text-center text-gray-600 mt-1">@{partner.username}</p>
               </CardBody>
            </Card>
         </div>
      </>
   )
}
