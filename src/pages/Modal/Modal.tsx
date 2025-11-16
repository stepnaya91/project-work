import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import "../../app/Modal.css";

interface ModalProps{
    withHeader?: boolean,
    children: ReactNode
}

export const Modal: React.FC<ModalProps> =  ({children, withHeader=true}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
        {createPortal(
            <div className="modal">
                <div className='modal-dialog'>
                    {withHeader &&
                    <div className='modal-header'>
                        <h3 className='modal-title'>Подтвердите действие</h3>
                    </div>  
                    }
                    <div className='modal-body'>
                        <div className='modal-content'>{children}</div>
                    </div>
                    <div className='modal-footer'>
                        <button onClick={handleClose}>Закрыть</button>
                    </div>                                      
                </div>
            </div>
        ,document.body)}
    </>
  );
};
