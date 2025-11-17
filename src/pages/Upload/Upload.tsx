
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import React, { useState } from 'react';
import { z } from 'zod';
import { useTheme } from '../../../src/shared/providers/ThemeProvider';
import { usePostUploadMutation } from 'src/store/services/filesApi';

const formSchema = z
  .object({
    photo: z.any()
        .refine(
        (file) => file?.[0]?.type === "image/jpeg",
        "Можно загружать только JPG файлы"
    )
  })

type FormData = {
  photo: FileList;
};

export const Upload: React.FC = () => {
    const [updated, setUpdated] = useState<Boolean>(false); 
    const {theme} = useTheme();
    const [postUpload] = usePostUploadMutation();
    const [imageUrl, setImageUrl] = useState<string | null>(null); 
    
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {        
        console.log('Form submitted:', data);
        const file = data.photo[0];

        const formData = new FormData();
        formData.append("file", file);
        console.log(formData)
        try{
            const url = await postUpload(formData).unwrap();   
            console.log(url);
            setImageUrl(url);
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

    return(    
        <form className={theme} onSubmit={handleSubmit(onSubmit)}>
            <h2>Загрузка файла</h2>

            <label htmlFor="name">Файл:</label>
            <input
                id = "photo"
                type="file"
                accept="image/jpeg"
                placeholder="Select file"
                className={clsx({ 'input-error': errors.photo }, theme)}
                {...register('photo')}
            />
            {errors.photo && <p className="error">{errors.photo.message}</p>}
            

                <div style={{ marginTop: 20 }}>
                    <h3>Предпросмотр:</h3>
                    <img
                        src={"https://19429ba06ff2.vps.myjino.ru/img/boots.jpg"}
                        alt="uploaded"
                        style={{ maxWidth: '300px', borderRadius: '8px' }}
                    />
                </div>


            {errors.root && <p className="error">Ошибка: {errors.root.message}</p>}
            {updated && !errors.root && <p>Данные обновлены успешно</p>}
            <button className={"button-"+theme} type="submit" >Загрузить</button>
        </form>
    )
}