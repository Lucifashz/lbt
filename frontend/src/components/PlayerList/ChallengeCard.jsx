import React from "react";
import axios from "axios";
import {Modal, ModalContent, ModalBody, Button, useDisclosure, DatePicker, Select, SelectItem, TimeInput} from "@nextui-org/react";
import Swal from "sweetalert2";
import {getLocalTimeZone, today} from "@internationalized/date";


export default function ChallengeCard(props) {
   const {isOpen, onOpen, onOpenChange} = useDisclosure();
   const [matchDate, setMatchDate] = React.useState(today(getLocalTimeZone()).add({ days: 1 }));
   const [matchReferee, setMatchReferee] = React.useState();
   const [matchType, setMatchType] = React.useState();
   const [matchTime, setMatchTime] = React.useState();
   const [challenges, setChallenges] = React.useState([]);
   const [playersItem, setPlayersItem] = React.useState([]);
   const [playersItem2, setPlayersItem2] = React.useState([]);


   const types = [
      {key: "single", label: "Tunggal"},
      {key: "double", label: "Ganda"},
   ];

   React.useEffect(() => {
      getChallenges();
      getPlayers();
   }, [matchDate, matchType, matchTime]);

   const getChallenges = async () => {
      await axios.get(`https://lbt-api.vercel.app/challenges`)
      .then((response) => {
         setChallenges(response.data);
      })
      .catch((error) => {
      })
   }

   const getPlayers = async () => {
      await axios.get(`https://lbt-api.vercel.app/users`)
      .then((response) => {
         updatePlayersItem(response.data);
         updatePlayersItem2(response.data);
      })
      .catch((error) => {
      })
   }


   const createChallenge = async (e) => {
      e.preventDefault()
      await axios.post("https://lbt-api.vercel.app/challenge", {
         "challenger": props.playerLogin.userId,
         "challengerPartner": props.playerLogin.partnerId,
         "challenged": props.player._id,
         "challengedPartner": props.player.partnerId,
         "matchReferee": matchReferee,
         "matchType": matchType,
         "matchDate": `${matchDate.toString()} ${matchTime.toString()}`
      })
      .then((response) => { 
         setMatchDate(today(getLocalTimeZone()));
         setMatchReferee("");
         setMatchType("");
         setMatchTime("");
         Swal.fire({
               title: 'Berhasil!',  
               text: `Kamu berhasil mengirim ajakan untuk bertanding`,  
               icon: 'success',  
               confirmButtonText: 'OK'
         });
      })
      .catch((error) => { 
         setMatchDate(today(getLocalTimeZone()).add({ days: 1 }));
         setMatchReferee("");
         setMatchType("");
         setMatchTime("");
         Swal.fire({
               title: 'Gagal!',  
               text: `${error.response.data.messageError}`,  
               icon: 'error',  
               confirmButtonText: 'OK'
         });
      });
   }

   const isRequested = challenges.find((challenge) => {
      return props.playerLogin.userId === challenge.challenger.id && challenge.challenged.id === props.player._id  && challenge.matchStatus === "requested"
   })


   const updatePlayersItem = (players) => {
      const newPlayers = players.filter((player) => player.partnerId !== props.playerLogin.userId && player._id !== props.playerLogin.partnerId && player._id !== props.player._id && player._id !== props.playerLogin.userId).map((player) => ({
            key: player._id,
            label: player.name
         }));

      setPlayersItem(newPlayers);
   };

const updatePlayersItem2 = (players) => {
   const newPlayers = players.filter((player) => player._id !== props.player._id && player._id !== props.playerLogin.userId).map((player) => ({
         key: player._id,
         label: player.name
      }));

   setPlayersItem2(newPlayers);
};

   console.log(`${matchDate.toString()} ${matchTime.toString()}`)


      return (
         <>
            <Button 
               onPress={!isRequested ? onOpen : ""} 
               className="bg-white border border-cyan-950 text-cyan-950 font-bold"
               onClick={props.onClick}
            >
               {isRequested ? "Requested" : "Ajak tanding"}
            </Button>
            <Modal 
               isOpen={isOpen} 
               onOpenChange={onOpenChange} 
               isDismissable={false} 
               isKeyboardDismissDisabled={true}
               classNames={{
                  backdrop: "bg-cyan-950 bg-opacity-40",
               }}
            >
               <ModalContent className="py-5">
                  {(onClose) => (
                     <>
                        <ModalBody>
                           <h1 className="text-xl font-semibold text-cyan-950 mb-5">Kamu ngajak {props.player.name} buat tanding, nih?</h1>
                           <form className="flex w-full max-w flex-col gap-7" onSubmit={createChallenge}>
                              <Select
                                 items={types}
                                 label="Jenis pertandingan"
                                 placeholder="Pilih jenis pertandingan"
                                 className="max-w"
                                 name="match-type"
                                 selectedKeys={[matchType]}
                                 onChange={(e) => setMatchType(e.target.value)}
                                 isRequired={true}
                              >
                                 {(type) => <SelectItem value={type.key}>{type.label}</SelectItem>}
                              </Select>
                              <Select
                                 items={matchType === "double" ? playersItem : playersItem2}
                                 label="Wasit pertandingan"
                                 placeholder="Pilih wasit pertandingan"
                                 className="max-w"
                                 name="match-type"
                                 selectedKeys={[matchReferee]}
                                 onChange={(e) => setMatchReferee(e.target.value)}
                                 isRequired={true}
                              >
                                 {(player) => <SelectItem value={player.key}>{player.label}</SelectItem>}
                              </Select>
                              <DatePicker 
                                 className="max"
                                 label="Tanggal pertandingan"
                                 minValue={today(getLocalTimeZone()).add({ days: 1 })}
                                 defaultValue={today(getLocalTimeZone()).add({ days: 1 })}
                                 onChange={setMatchDate}
                                 isRequired={true}
                              /> 
                              <TimeInput 
                                 label="Jam pertandingan" 
                                 onChange={setMatchTime}
                                 isRequired
                              />
                              <Button 
                                 type="submit" 
                                 className="bg-cyan-950 text-white" 
                                 onPress={onClose}
                                 isDisabled={!matchType || !matchTime || !matchReferee ? true : false}
                              >
                                 Ajak tanding
                              </Button>
                           </form>
                           <Button 
                              className="border border-cyan-950 text-cyan-950" 
                              variant="bordered" 
                              onPress={onClose}
                           >
                              Kembali
                           </Button>
                        </ModalBody>
                     </>
                  )}
               </ModalContent>
            </Modal>
         </>
      )
}
