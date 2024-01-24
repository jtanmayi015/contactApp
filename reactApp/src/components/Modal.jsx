import React from 'react'
import { createPortal } from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
const Modal = ({onClose, isOpen, children}) => {
  return createPortal (
    <>
        {isOpen && ( <>
                        <div className='relative z-50 m-auto min-h-[200px] max-w-[80%] rounded-lg bg-white p-4'>
                            <div className='flex'>
                                <AiOutlineCloseCircle onClick ={onClose} className='self-end text-2xl'/>
                            </div>
                            {children}
                        </div>
                        <div onClick ={onClose}  
                             className='absolute top-0 z-40 h-screen backdrop-blur w-screen'/>
                    </>    
        )}

    </>
  ,document.getElementById("modal-root"));
};

export default Modal;