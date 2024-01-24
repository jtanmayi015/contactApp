import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi"
import { AiFillPlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react";
import { collection,getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";

import ContactCard from "./components/ContactCard";
import AddandContact from "./components/AddandContact";
const App = () => {

const [contacts, setContacts] = useState([]);

const[isOpen,setOpen] = useState(false);

const onOpen = () => {
  setOpen(true);
};

const onClose = () => {
 setOpen(false);
};


useEffect (() => {
  const getContacts = async () =>{
    try{
      const contactsRef = collection(db, "contacts");
      const contactSnapshot = await getDocs(contactsRef);

     onSnapshot(contactsRef,(snapShot)=>{
      const contactLists = snapShot.docs.map((doc)=> {
        return{
                id:doc.id,
                ...doc.data(),
              };
    
     });

     setContacts(contactLists);
     return contactLists;
    });
    }catch(error){
      console.log(error);
    }
  };
  getContacts();
},[]);

const filterContacts = (e) =>{
  const value = e.target.value;
  const contactsRef = collection(db, "contacts");

  onSnapshot(contactsRef,(snapShot)=>{
    const contactLists = snapShot.docs.map((doc)=> {
      return{
              id:doc.id,
              ...doc.data(),
            };
  
   });

   const filteredContact = contactLists.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()));

   setContacts(filteredContact);
   
  });


}
  return(
    <>
    <div className="mx-auto max-w-[370px] px-4">
       <Navbar />
       <div className="flex gap-2">
        <div className="relative flex flex-grow items-center">
          <FiSearch className="absolute ml-1  text-3xl text-white" />
          <input onChange={filterContacts} type="text" 
                className=" h-10 
                            flex-grow
                            border
                            border-white
                            bg-transparent 
                            pl-9
                            text-white
                            rounded-md"/>
        </div>
   
          <AiFillPlusCircle onClick={onOpen} className="text-5xl cursor-pointer text-white"/>
       
       </div>
       <div className="mt-4  flex flex-col gap-4">{
              contacts.map(contact => 
              <ContactCard key={contact.id} contact={contact}/>)
            }
        </div>
    </div>
    <AddandContact 
      onClose = {onClose}
      isOpen = {isOpen}
    />
    </>
  );
  };
  export default App;