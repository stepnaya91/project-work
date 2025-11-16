
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useTheme } from '../../../src/shared/providers/ThemeProvider';
import { useLanguage } from '../../../src/shared/providers/LanguageProvider';
import { useGetProfileQuery, usePostProfileMutation } from 'src/store/services/profileApi';


const formSchema = z
  .object({
    name: z.string()
      .min(2, { message: 'Min Value 2' })
      .max(50, 'Max Value 50'),
    email: z.email('Wrong email format'),
    signUpDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' }),
  })

type FormData = z.infer<typeof formSchema>;

export const Profile: React.FC = () => {
    const [updated, setUpdated] = useState<Boolean>(false); 
    const {theme} = useTheme();
    const {t} = useLanguage();
    const { data: profile, isLoading, isError, error } = useGetProfileQuery();
    const [postProfile] = usePostProfileMutation();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: profile ? {
            name: profile.name,
            email: profile.email,
            signUpDate: profile.signUpDate
                ? new Date(profile.signUpDate).toISOString().split('T')[0]
                : '',
        } : undefined,
    });

    useEffect(() => {
        if (profile) {
            reset({
                name: profile.name,
                email: profile.email,
                signUpDate: profile.signUpDate
                    ? new Date(profile.signUpDate).toISOString().split('T')[0]
                    : '',
            });
        }
    }, [profile, reset]);

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {        
        console.log('Form submitted:', data);
        try{
            await postProfile(data).unwrap();   
            setUpdated(true);
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
    };

    if (isLoading) return <p>Загрузка...</p>;
    if (isError){
        console.log(error);      
        return <p>Ошибка загрузки профиля</p>;
    }

    return(    
        <form className={theme} onSubmit={handleSubmit(onSubmit)}>
        <h2>Форма профиля</h2>

        <label htmlFor="name">Name:</label>
        <input
            id = "name"
            type="text"
            placeholder="Enter your name"
            className={clsx({ 'input-error': errors.name }, theme)}
            {...register('name')}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <label htmlFor="email">Email:</label>
        <input
            type="email"
            id="email"
            className={clsx({ 'input-error': errors.email}, theme)}
            placeholder="Enter your email"
            {...register('email')}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label htmlFor="signUpDate">Last Sign Up:</label>
        <input
            type="date"
            value={
                profile.signUpDate
                ? new Date(profile.signUpDate).toISOString().split('T')[0]
                : ''
            }
            id="signUpDate"
            className={clsx({ 'input-error': errors.signUpDate}, theme)}
            {...register('signUpDate')}
        />
        {errors.signUpDate && <p className="error">{errors.signUpDate.message}</p>}
        <button type="submit" className={theme}>{t('confirm')}</button>
        
        {errors.root && <p className="error">Ошибка: {errors.root.message}</p>}
        {updated && !errors.root && <p>Данные обновлены успешно</p>}
        </form>
    )
}