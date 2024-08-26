import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Input } from "@nextui-org/react";
import Partner from "./Partner";
import DeletePartner from "./DeletePartner";
import { X, Search  } from 'lucide-react';

export default function TablePartners() {
   const [page, setPage] = React.useState(1);
   const [search, setSearch] = React.useState("");
   const [profile, setProfile] = React.useState({});
   const [token, setToken] = React.useState("");
   const [expire, setExpire] = React.useState("");
   const [sender, setSender] = React.useState([]);
   const [receiver, setReceiver] = React.useState([]);
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
         getPartnersBySender(decode.userId);
         getPartnersByReceiver(decode.userId);
      }).catch((error) => {
         if (error.response) {
            navigate("/");
         }
      });
   }

   const getPartnersBySender = async(userId) => {
      await axios.get(`http://localhost:3000/partners-by-sender-id/${userId}`)
      .then((response) => {
         setSender(response.data);
      })
      .catch((error) => {
         console.log(error.response);
         
      })
   }

   const getPartnersByReceiver = async(userId) => {
      await axios.get(`http://localhost:3000/partners-by-receiver-id/${userId}`)
      .then((response) => {
         setReceiver(response.data);
      })
      .catch((error) => {
         console.log(error.response);
         
      })
   }

   const updatePartner = async (id, status, senderId, receiverId) => {
      setUpdate((update) => !update);
      await axios.patch(`http://localhost:3000/partners-partner-status/${id}`, {
         "partner-status": status,
         "notification-status": "unread",
      })
      .then((response) => {
      })
      .catch((error) => {
         console.log(error);
      })
      if (status === "accepted") {
         axios.patch(`http://localhost:3000/add-partner/${senderId}`, {
            partner: receiverId
         })
         .then(response => console.log('Success:', response.data))
         .catch(error => console.error('Error:', error));
      }
   }


   const sortedArrayBySender = sender.sort((partnerA, partnerB) => new Date(partnerB.createdAt) - new Date(partnerA.createdAt));
   const sortedArrayByReceiver = receiver.sort((partnerA, partnerB) => new Date(partnerB.createdAt) - new Date(partnerA.createdAt));

   const sortedArrayMerged = [...sortedArrayByReceiver, ...sortedArrayBySender]

   const rowsPerPage = 15;

   const pages = Math.ceil(sortedArrayMerged.length / rowsPerPage);

   const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return sortedArrayMerged.slice(start, end);
   }, [page, sortedArrayMerged]);

   const receiversElement = items.map((partner) => (
      <Partner 
         key={partner._id}
         search={search}
         sender={partner.sender.id}
         receiver={partner.receiver.id}
         status={partner.partnerStatus}
         onClickAccept={
            () => updatePartner(
               partner._id, 
               'accepted', 
               partner.sender.id,
               partner.receiver.id
            )}
         onClickReject={
            () => updatePartner(
               partner._id,
               'rejected'
            )}
      />
   ));

   const handleSearch = (event) => {
      setSearch(event.target.value);
   };

   const deletePartner = async (e) => {
      e.preventDefault()
      await axios.patch(`http://localhost:3000/delete-partner/${profile.userId}`, {
         "partner": profile.partnerId
   }).then((response) => setUpdate(prev => !prev))
      .catch((error) => console.log(error))
   }

   return (
      <div className="flex flex-col gap-6">
         <div>
            <div className="relative z-0" >
               <input type="text" id="search" className={`block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " name="search" onChange={handleSearch} value={search} required/>
               <label htmlFor="search" className={`absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 ${search ? "z-10" : "-z-10"} origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:z-10 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>Cari partner berdasarkan nama atau username</label>
                  {
                     search ?
                     <button onClick={() => setSearch("")} type="button" className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600">
                        <X className="size-3.5"/>
                     </button> :
                     <div className="absolute inset-y-0 end-0 flex items-center z-20 px-3 text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600">
                        <Search className="size-3.5"/>
                     </div>
                  }
            </div>
         </div>
         {profile.partnerId === "" ? "" : <DeletePartner deletePartner={deletePartner} partner={profile.partnerId}/>}
         {receiversElement}
         <Pagination 
            showControls
            isCompact 
            initialPage={1}
            showShadow
            color="secondary"
            page={page}
            total={pages}
         />
      </div>
   )
}
