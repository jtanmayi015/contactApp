import React from 'react'
import { ErrorMessage, Field, Form, Formik} from "formik";
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({  
     name:Yup.string().required("Name Required"),
     email:Yup.string().email("Invalid Email").required("Email Required")
 }
)


const AddandContact = ({isOpen, onClose, isUpdate, contact}) => {

    const addContact = async (contact) => {
        try{
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef, contact);
            onClose();
        }catch(error){
            console.log(error);
        }
    };

    const updateContact = async (contact, id) => {
        try{
            const contactRef = doc(db, "contacts",id);
            await updateDoc(contactRef, contact);
            onClose();
        }catch(error){
            console.log(error);
        }
    };

   

  return (
    <div>
        <Modal isOpen = {isOpen} onClose={onClose} >
            <Formik
                validationSchema={contactSchemaValidation}
                initialValues={isUpdate?{
                    name:contact.name,
                    email:contact.email,
                }:{
                    name:"",
                    email:"",
                }}
                onSubmit={(values)=>{
                    console.log(values);
                    isUpdate ?
                    updateContact(values, contact.id):
                    addContact(values);
                }}
            
            >
            <Form className='flex flex-col gap-2'>
               <div className='flex flex-col gap-1'>
                <label htmlFor="name">Name</label>
                <Field name="name" className="h-10 border"/> 
                <div className=''><ErrorMessage/></div>
               </div>
               <div className='flex flex-col gap-1'>
                <label htmlFor="email">Email</label>
                <Field name="email" className="h-10 border"/> 
               </div>
               <button type="submit" className=' self-end bg-orange px-3 py-2 rounded-lg' >{isUpdate ?"Update" :"Add" } Contact</button>
            </Form>
            </Formik>
        </Modal>
    </div>
  );
};

export default AddandContact;