import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {Modal, ModalContent, ModalBody, Button, useDisclosure} from "@nextui-org/react";


export default function PartnerCard(props) {
   const {isOpen, onOpen, onOpenChange} = useDisclosure();
   const [partners, setPartners] = React.useState([]);
   const [update, setUpdate] = React.useState(false)


   React.useEffect(() => {
      getPartners();
   }, [update]);

   const getPartners = async () => {
      await axios.get("https://lbt-api.vercel.app/partners")
      .then((response) => {
         setPartners(response.data);
      })
      .catch((error) => {
      })
   }

   const createPartner = async (e) => {
      e.preventDefault();
      setUpdate((update) => !update)
      await axios.post("https://lbt-api.vercel.app/partner", {
         "sender": props.playerLogin.userId,
         "receiver": props.player._id
      })
      .then((response) => { 
         Swal.fire({
               title: 'Berhasil!',  
               text: `Kamu berhasil mengirim ajakan untuk menjadi partner`,  
               icon: 'success',  
               confirmButtonText: 'OK'
         });
      })
      .catch((error) => { 
         Swal.fire({
               title: 'Gagal!',  
               text: `Gagal mengirim ajakan untuk menjadi partner!`,  
               icon: 'error',  
               confirmButtonText: 'OK'
         });
      })
   }

   const isRequested = partners.find((partner) => {
      return props.playerLogin.userId === partner.sender.id && partner.receiver.id === props.player._id  && partner.partnerStatus === "requested"
   })


      return (
         <>
            <Button 
               onPress={!isRequested ? onOpen : ""} 
               className="bg-white border border-cyan-950 text-cyan-950 font-bold"
            >
               {isRequested ? "Requested" : "Jadi partner"}
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
                           <h1 className="text-xl font-semibold text-cyan-950 mb-5">Kamu ngajak {props.player.name} buat jadi partner?</h1>
                           <form className="flex w-full max-w flex-col gap-7" onSubmit={createPartner}>
                              <Button 
                                 type="submit" 
                                 className="bg-cyan-950 text-white" 
                                 onPress={onClose}
                              >
                                 Jadi partner
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
