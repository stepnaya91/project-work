import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { LoginForm } from '../../features/LoginForm/LoginFom';
import { NavigationState } from '../../shared/navigation/types';
import "../../app/Modal.css"

const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const login = () => {
    const state = location.state as NavigationState;    
    navigate(state?.from || '/');
  };

  return (
    <div>
      {createPortal(      
            <div className="modal">
                <div className='modal-dialog'>
                    <div className='modal-body'>
                        <div className='modal-content'>
                          <LoginForm onClick={login}/>                            
                        </div>
                    </div>
                </div>
            </div>
        ,document.body)}        
    </div>
  );
};

export default Auth;