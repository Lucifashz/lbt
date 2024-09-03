import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, Badge } from "@nextui-org/react";
import { UserRound } from 'lucide-react';
import {NotificationIcon} from "./NotificationIcon";
import Player from "./Player";

export default function Notification(props) {
   const [challengesByChallenged, setChallengesByChallenged] = React.useState([]);
   const [challengesByChallenger, setChallengesByChallenger] = React.useState([]);
   const [partnersByReceiver, setPartnersByReceiver] = React.useState([]);
   const [partnersBySender, setPartnersBySender] = React.useState([]);
   const [isInvisible, setIsInvisible] = React.useState(false);
   const [update, setUpdate] = React.useState(0);

   React.useEffect(() => {
      const updateData = setInterval(() => {
         setUpdate(update => update + 1)
      }, 1000);

      getChallengesByChallenged();
      getChallengesByChallenger();

      getPartnersByReceiver();
      getPartnersBySender()

      return () => clearInterval(updateData);
   }, [update]);

   const getChallengesByChallenged = async () => {
      await axios.get(`https://lbt-api.vercel.app/challenges-by-challenged-id/${props.profile.userId}`)
      .then((response) => {
         setChallengesByChallenged(response.data);
      })
      .catch((error) => {
      })
   }

   const getChallengesByChallenger = async () => {
      await axios.get(`https://lbt-api.vercel.app/challenges-by-challenger-id/${props.profile.userId}`)
      .then((response) => {
         setChallengesByChallenger(response.data);
      })
      .catch((error) => {
      })
   }

   const getPartnersByReceiver = async () => {
      await axios.get(`https://lbt-api.vercel.app/partners-by-receiver-id/${props.profile.userId}`)
      .then((response) => {
         setPartnersByReceiver(response.data);
      })
      .catch((error) => {
      })
   }

   const getPartnersBySender = async () => {
      await axios.get(`https://lbt-api.vercel.app/partners-by-sender-id/${props.profile.userId}`)
      .then((response) => {
         setPartnersBySender(response.data);
      })
      .catch((error) => {
      })
   }

   const updateChallengeByChallenged = async (challangeId) => {
      await axios.patch(`https://lbt-api.vercel.app/challenges-by-challenged-id/${challangeId}`, {
         "notification-status": "read"
      })
      .then((response) => {
      })
      .catch((error) => {
      })
   }

   const updateChallengeByChallenger = async (challangeId) => {
      await axios.patch(`https://lbt-api.vercel.app/challenges-by-challenger-id/${challangeId}`, {
         "notification-status": "read"
      })
      .then((response) => {
      })
      .catch((error) => {
      })
   }

   const updatePartnersByReceiver = async (partnerId) => {
      await axios.patch(`https://lbt-api.vercel.app/partners-by-receiver-id/${partnerId}`, {
         "partner-status": "read"
      })
      .then((response) => {
      })
      .catch((error) => {
      })
   }

   const updatePartnersBySender = async (partnerId) => {
      await axios.patch(`https://lbt-api.vercel.app/partners-by-sender-id/${partnerId}`, {
         "partner-status": "read"
      })
      .then((response) => {
      })
      .catch((error) => {
      })
   }

// Sort the array in descending order by the `created` property
const sortedArrayByChallenged = challengesByChallenged.sort((challengeA, challengeB) => new Date(challengeB.createdAt) - new Date(challengeA.createdAt));
const sortedArrayByChallenged2 = sortedArrayByChallenged.filter((challenge) => challenge.challenged.notificationStatus === "unread");

const sortedArrayByChallenger = challengesByChallenger.sort((challengeA, challengeB) => new Date(challengeB.updateAt) - new Date(challengeA.updateAt));
const sortedArrayByChallenger2 = sortedArrayByChallenger.filter((challenge) => challenge.challenger.notificationStatus === "unread");

const sortedArrayByReceiver= partnersByReceiver.sort((partnerA, partnerB) => new Date(partnerB.createdAt) - new Date(partnerA.createdAt));
const sortedArrayByReceiver2 = sortedArrayByReceiver.filter((partner) => partner.receiver.notificationStatus === "unread");

const sortedArrayBySender = partnersBySender.sort((partnerA, partnerB) => new Date(partnerB.updateAt) - new Date(partnerA.updateAt));
const sortedArrayBySender2 = sortedArrayBySender.filter((partner) => partner.sender.notificationStatus === "unread");

// Filter the sorted array to only show the first 6 items
const topSixByChallenged = sortedArrayByChallenged2.slice(0, 5);
const topSixByChallenger = sortedArrayByChallenger2.slice(0, 5);
const topSixByReceiver = sortedArrayByReceiver2.slice(0, 5);
const topSixBySender = sortedArrayBySender2.slice(0, 5);

const findLogin = (array, userId) => {
   for (const item of array) {
      if (item.challenged.id === userId) {
         return "challenged";
      } else if (item.challenger.id === userId) {
         return "challenger";
      }
   }
}

const findLogin2 = (array, userId) => {
   for (const item of array) {
      if (item.receiver.id === userId) {
         return "receiver";
      } else if (item.sender.id === userId) {
         return "sender";
      }
   }
}


   return (
      <Dropdown>
         <DropdownTrigger>
         <Button className="bg-transparent">
         {
            findLogin(topSixByChallenged, props.profile.userId) === "challenged" ? 
            <Badge color="danger" content={topSixByChallenged.length + topSixByChallenger.length + topSixByReceiver.length + topSixBySender.length} isInvisible={isInvisible} shape="circle">
               <NotificationIcon className="fill-current text-cyan-950" size={26} />
            </Badge>
            :
            findLogin(topSixByChallenger, props.profile.userId) === "challenger" ? 
            <Badge color="danger" content={topSixByChallenged.length + topSixByChallenger.length + topSixByReceiver.length + topSixBySender.length} isInvisible={isInvisible} shape="circle">
               <NotificationIcon className="fill-current text-cyan-950" size={26} />
            </Badge>
            : findLogin2(topSixByReceiver, props.profile.userId) === "receiver" ? 
            <Badge color="danger" content={topSixByChallenged.length + topSixByChallenger.length + topSixByReceiver.length + topSixBySender.length} isInvisible={isInvisible} shape="circle">
               <NotificationIcon className="fill-current text-cyan-950" size={26} />
            </Badge> 
            : findLogin2(topSixBySender, props.profile.userId) === "sender" ? 
            <Badge color="danger" content={topSixByChallenged.length + topSixByChallenger.length + topSixByReceiver.length + topSixBySender.length} isInvisible={isInvisible} shape="circle">
               <NotificationIcon className="fill-current text-cyan-950" size={26} />
            </Badge> 
            :
            <Badge 
               color="danger" 
               isInvisible={topSixByChallenged.length === 0 && topSixByChallenger.length === 0 && topSixByReceiver.length === 0 && topSixBySender.length === 0} 
               shape="circle"
            >
               <NotificationIcon className="fill-current text-cyan-950" size={26} />
            </Badge> }
         </Button>
         </DropdownTrigger>
         <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
            <DropdownSection title="Notifikasi tantangan dan partner">  
               {
                  topSixByChallenged.map((challenge, i) => (
                     <DropdownItem
                        key={challenge._id}
                        textValue="Profil"
                        className="block p-0 mb-3 last:mb-0 bg-gray-200"
                        startContent=
                        {
                           <Link 
                              className="flex items-center gap-2 py-1.5 px-2"  
                              to="/challenges"
                              onClick={() => updateChallengeByChallenged(challenge._id)}
                           >
                              <UserRound className="size-4"/>
                              {
                                 challenge.challenged.id === props.profile.userId
                                 && challenge.matchStatus === "rejected" ? 
                                 <Player 
                                    id={challenge.challenger.id} 
                                    status="rejected"
                                    text="Kamu telah menolak ajakan untuk bertanding dengan"
                                 /> :
                                 challenge.challenged.id === props.profile.userId
                                 && challenge.matchStatus === "accepted" ? 
                                 <Player 
                                    id={challenge.challenger.id} 
                                    status="accepted" 
                                    text="Kamu telah menerima ajakan untuk bertanding dengan"
                                 /> : 
                                 <Player 
                                    id={challenge.challenger.id}
                                    textRight="telah menantang Kamu untuk bertanding"
                                 /> 
                              }
                           </Link>
                        }
                     >
                     </DropdownItem>
                  ))
               }
               {
                  topSixByChallenger.map((challenge, i) => (
                     <DropdownItem
                        key={challenge._id}
                        textValue="Profil"
                        className="block p-0 mb-3 last:mb-0 bg-gray-200"
                        startContent=
                        {
                           <Link 
                              className="flex items-center gap-2 py-1.5 px-2"  
                              to="/challenges"
                              onClick={() => updateChallengeByChallenger(challenge._id)}
                           >
                              <UserRound className="size-4"/>
                              {
                                 challenge.challenged.id !== props.profile.userId
                                 && challenge.matchStatus === "rejected" ? 
                                 <Player 
                                    id={challenge.challenged.id} 
                                    status="rejected"
                                    text="Ajakan Kamu untuk bertanding telah ditolak oleh"
                                 /> : 
                                 challenge.challenged.id !== props.profile.userId
                                 && challenge.matchStatus === "accepted" ? 
                                 <Player 
                                    id={challenge.challenged.id} 
                                    status="accepted"
                                    text="Ajakan Kamu untuk bertanding telah diterima oleh"
                                 /> : 
                                 <Player 
                                    id={challenge.challenged.id} 
                                    textLeft="Kamu telah mengirim ajakan untuk bertanding ke"
                                 />
                              }
                           </Link>
                        }
                     >
                     </DropdownItem>
                  ))
               }
               {
                  topSixByReceiver.map((partner, i) => (
                     <DropdownItem
                        key={i+3}
                        textValue="Profil"
                        className="block p-0 mb-3 last:mb-0 bg-gray-200"
                        startContent=
                        {
                           <Link 
                              className="flex items-center gap-2 py-1.5 px-2"  
                              to="/partners"
                              onClick={() => updatePartnersByReceiver(partner._id)}
                           >
                              <UserRound className="size-4"/>
                              {
                                 partner.receiver.id === props.profile.userId
                                 && partner.partnerStatus === "rejected" ?
                                 <Player 
                                    id={partner.sender.id} 
                                    status="rejected"
                                    text="Kamu telah menolak untuk menjadi partner dengan"
                                 /> : 
                                 partner.receiver.id === props.profile.userId
                                 && partner.partnerStatus === "accepted" ? 
                                 <Player 
                                    id={partner.sender.id} 
                                    status="rejected"
                                    text="Kamu telah menerima untuk menjadi partner dengan"
                                 /> : 
                                 <Player 
                                    id={partner.sender.id} 
                                    textRight="telah mengirim permintaan untuk menjadi partner Kamu"
                                 />
                              }
                           </Link>
                        }
                     >
                     </DropdownItem>
                  ))
               }
               {
                  topSixBySender.map((partner, i) => (
                     <DropdownItem
                        key={i+2}
                        textValue="Profil"
                        className="block p-0 mb-3 last:mb-0 bg-gray-200"
                        startContent=
                        {
                           <Link 
                              className="flex items-center gap-2 py-1.5 px-2"  
                              to="/partners"
                              onClick={() => updatePartnersBySender(partner._id)}
                           >
                              <UserRound className="size-4"/>
                              {
                                 partner.receiver.id !== props.profile.userId
                                 && partner.partnerStatus === "rejected" ? 
                                 <Player 
                                    id={partner.receiver.id} 
                                    status="rejected"
                                    text="Ajakan berpartner Kamu telah ditolak oleh"
                                 /> : 
                                 partner.receiver.id !== props.profile.userId
                                 && partner.partnerStatus === "accepted" ? 
                                 <Player 
                                    id={partner.receiver.id} 
                                    status="rejected"
                                    text="Ajakan berpartner Kamu telah diterima oleh"
                                 /> : 
                                 <Player 
                                    id={partner.receiver.id} 
                                    textLeft="Kamu telah mengirim partner dengan ke"
                                 />
                              }
                           </Link>
                        }
                     >
                     </DropdownItem>
                  ))
               }
            </DropdownSection>
         </DropdownMenu>
      </Dropdown>
   )
}
