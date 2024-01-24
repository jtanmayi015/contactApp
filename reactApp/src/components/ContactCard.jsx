import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';
import { db } from '../config/firebase';
import AddandContact from './AddandContact';

const ContactCard = ({contact}) => {
    const[isOpen,setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
        };

        const onClose = () => {
            setOpen(false); // Corrected the state update
          };
        const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts",id));
        }catch (error){
            console.log(error);
        }
    }    

 
    return (
    <>    
    <div key={contact.id} className="flex items-center justify-between rounded-lg bg-yellow p-2">
                <div className="flex gap-1">
                <HiOutlineUserCircle className=" text-4xl text-orange"/>
                <div className="">
                  <h2 className=" text-medium ">{contact.name}</h2>
                  <p className=" text-sm ">{contact.email}</p>
                </div>
                </div>
                <div className="flex text-3xl ">
                    < RiEditCircleLine onClick={onOpen }className ="cursor-pointer"/>
                    <IoMdTrash onClick={()=> deleteContact(contact.id)} className=" cursor-pointer text-orange" />
                  </div>
              </div>
              <AddandContact contact={contact}isUpdate isOpen={isOpen} onClose={onClose}/>
         </>       
    );
  
};

export default ContactCard;