import React, { useState } from "react";
import clsx from "clsx"
import { useForm } from "react-hook-form";
import "./auth.scss";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useSigninMutation, useSignupMutation } from "../../store/services/userApi";
import { useDispatch } from "react-redux";
import { tokenActions } from "../../store/slices/token";
import { comandID } from "../../constants";


interface LoginFormProps{
    onClick?: () => void;
}

const formSchema = z.object({
        email: z.string(),  
        password: z.string()            
            .min(1,'Укажите пароль')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
                "Пароль не менее 8 символов, должен содержать буквы в верхнем и нижнем регистре, цифры и специальные символы: @$!%*?&"),
        commandId: z.string().default(comandID)
    })

type User = z.infer<typeof formSchema>;


export const LoginForm: React.FC<LoginFormProps> = ({onClick}:LoginFormProps) => {
    const [signUpUser] = useSignupMutation();
    const [signInUser] = useSigninMutation();
    const [registration, setRegistration] = useState<boolean>(false);
    const {
        register,
        reset,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm({ 
        resolver: zodResolver(formSchema) 
    }); 

    const dispatch = useDispatch();
    
    const onSubmit = async (user: User) => {    
        try{
            console.log('User Data: ', user);

            const response = registration?await signUpUser(user).unwrap():await signInUser(user).unwrap();
            reset();
            dispatch(tokenActions.set(response.token));
            onClick();
        }catch(e){
            console.log('Error: ', e);
            if (e && 'data' in e && e.data?.errors) {
                Object.entries(e.data.errors).forEach(([field,message]) => {
                    setError('root', message);
                });
            } else {                
                console.log('Error: ', e);
                setError('root', {type: "commonErr", message: "Непредвиденная ошибка"});
            }            
        }        
    }

    const showFields = () => {
        setRegistration(!registration);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <h2>{registration?"Регистрация":"Вход"}</h2>

                <label htmlFor="email">Почта: </label>
                <input 
                    id="email"
                    type="text"
                    className={clsx({ 'input-error': errors.email})}
                    {...register('email',{
                        required: 'Укажите почту'
                    })}
                />         
                {errors.email && <p className="error">{errors.email.message}</p>}

                <label htmlFor="password">Пароль: </label>
                <input 
                    id="password"
                    type="password"
                    className={clsx({ 'input-error': errors.password})}
                    {...register('password')}            
                />
                {errors.password && <p className="error">{errors.password.message}</p>}
                <button type="submit">{registration?"Зарегистрироваться":"Войти"}</button>

                
                {errors.root && <p className="error">Ошибка: {errors.root.message}</p>}
            </form>
            <a id="registration" onClick={showFields}>Нажмите, чтобы перейти на форму {registration?"входа":"регистрации"}</a>
        </>
    )
}
