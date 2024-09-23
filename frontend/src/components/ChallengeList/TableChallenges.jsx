import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Input } from "@nextui-org/react";
import Challenges from "./Challenges";
import { X, Search  } from 'lucide-react';

export default function TableChallenges() {
   const [page, setPage] = React.useState(1);
   const [search, setSearch] = React.useState("");
   const [profile, setProfile] = React.useState({});
   const [token, setToken] = React.useState("");
   const [expire, setExpire] = React.useState("");
   const [challenger, setChallenger] = React.useState([]);
   const [challenged, setChallenged] = React.useState([]);
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
         getChallengesByChallenged(decode.userId);
         getChallengesByChallenger(decode.userId);
      }).catch((error) => {
         if (error.response) {
            navigate("/");
         }
      });
   }


   const getChallengesByChallenged = async(userId) => {
      await axios.get(`https://lbt-api.vercel.app/challenges-by-challenged-id/${userId}`)
      .then((response) => {
         setChallenged(response.data);
      })
      .catch((error) => {
         console.log(error.response);
         
      })
   }

   const getChallengesByChallenger = async(userId) => {
      await axios.get(`https://lbt-api.vercel.app/challenges-by-challenger-id/${userId}`)
      .then((response) => {
         setChallenger(response.data);
      })
      .catch((error) => {
         console.log(error.response);
         
      })
   }

   const updateChallenge = async (id, status, referee, type, date, challengerId, challengerPartner, challengedId, challengedPartner) => {
      if (type === "single") {
         const single = {
            "refereeId": referee,
            "matchOne": {
               "teamOne": {
                  "playerOneId": challengerId
               },
               "teamTwo": {
                  "playerOneId": challengedId
               }
            },
            "matchType": type,
            "matchDate": date
         }
         await axios.post("https://lbt-api.vercel.app/matches", single)
            .then((response) => {  })
            .catch((error) => {  })
      } else if (type === "double") {
         const double = {
            "refereeId": referee,
            "matchOne": {
               "teamOne": {
                  "playerOneId": challengerId,
                  "playerTwoId": challengerPartner
               },
               "teamTwo": {
                  "playerOneId": challengedId,
                  "playerTwoId": challengedPartner
               }
            },
            "matchType": type,
            "matchDate": date
         }
         await axios.post("https://lbt-api.vercel.app/matches", double)
            .then((response) => {  })
            .catch((error) => {  })
      } else {
         console.log(status);
      }
      
      setUpdate((update) => !update)
      await axios.patch(`https://lbt-api.vercel.app/challenges-match-status/${id}`, {
         "match-status": status,
         "notification-status": "unread",
      })
      .then((response) => {
      }).catch((error) => {
         console.log(error);
      })
   }

   const sortedArrayByChallenger = challenger.sort((challengeA, challengeB) => new Date(challengeB.createdAt) - new Date(challengeA.createdAt));
   const sortedArrayByChallenged = challenged.sort((challengeA, challengeB) => new Date(challengeB.createdAt) - new Date(challengeA.createdAt));

   const sortedArrayMerged = [...sortedArrayByChallenged, ...sortedArrayByChallenger]

   const rowsPerPage = 30;

   const pages = Math.ceil(sortedArrayMerged.length / rowsPerPage);

   const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return sortedArrayMerged.slice(start, end);
   }, [page, sortedArrayMerged]);

   const challengesElement = items.map((challenge) => (
      <Challenges 
         key={challenge._id}
         search={search}
         challenger={challenge.challenger.id}
         challenged={challenge.challenged.id}
         referee={challenge.matchReferee}
         status={challenge.matchStatus}
         type={challenge.matchType}
         onClickAccept={
            () => updateChallenge(
               challenge._id, 
               'accepted', 
               challenge.matchReferee, 
               challenge.matchType,
               challenge.matchDate,
               challenge.challenger.id,
               challenge.challenger.partnerId,
               challenge.challenged.id,
               challenge.challenged.partnerId
            )}
         onClickReject={
            () => updateChallenge(
               challenge._id,
               'rejected'
            )}
      />
   ));

   const handleSearch = (event) => {
      setSearch(event.target.value);
   };


   return (
      <div className="flex flex-col gap-6">
         <div>
            <div className="relative z-0" >
               <input type="text" id="search" className={`block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " name="search" onChange={handleSearch} value={search} required/>
               <label htmlFor="search" className={`absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 ${search ? "z-10" : "-z-10"} origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:z-10 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}>Cari tantangan berdasarkan nama atau username</label>
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
         {challengesElement}
         <Pagination 
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
         />
      </div>
   )
}
