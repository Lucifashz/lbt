import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import PlayerPartner from "./PlayerPartner";


export default function DeletePartner(props) {
   const {isOpen, onOpen, onOpenChange} = useDisclosure();

   if (!props.partner) {
      return <div></div>;
   }

   return (
      <>
         <PlayerPartner id={props.partner}/>
         <Button 
            onPress={onOpen} 
            className="bg-cyan-950 text-white"
         >
            Hapus partner
         </Button>
         <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange} 
            isDismissable={false} 
            isKeyboardDismissDisabled={true}
            classNames={{
               body: "py-6",
               backdrop: "bg-cyan-950 bg-opacity-40",
               header: "border-b border-[#e5e7eb]",
               footer: "border-t border-[#e5e7eb]",
               closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
         >
            <ModalContent className="py-5">
               {(onClose) => (
                  <>
                     <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                        <form className="flex w-full max-w flex-col gap-7" onSubmit={props.deletePartner}>
                           <ModalBody>
                              <h1 className="text-xl font-semibold text-cyan-950 mb-5">Yakin menghapus partner?</h1>
                              <p>Apakah Kamu yakin ingin menghapus partner? Jika iya, silakan tekan tombol hapus</p>
                           </ModalBody>
                           <ModalFooter>
                              <Button className="border border-cyan-950 text-cyan-950" color="foreground" variant="light" onPress={onClose}>
                                 Kembali
                              </Button>
                              <Button type="submit" className="bg-cyan-950 text-white shadow-indigo-500/20" onPress={onClose}>
                                 Hapus
                              </Button>
                           </ModalFooter>
                        </form>
                  </>
               )}
            </ModalContent>
         </Modal>
      </>
   )
}
