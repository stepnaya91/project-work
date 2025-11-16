import clsx from "clsx"
import React from "react"
import { useForm } from 'react-hook-form';
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "src/shared/providers/ThemeProvider";
import { useGetCategoryQuery, usePostCategoryMutation, useUpdateCategoryMutation } from "src/store/services/categoryApi";
import { useLanguage } from "src/shared/providers/LanguageProvider";

const formSchema = z
  .object({
        name: z.string().min(1, "Введите название категории"),
    })


type CategorySchema = z.infer<typeof formSchema>;

export const CategoryAdd: React.FC = () => {
    const {categoryId} = useParams();
    const {theme} = useTheme();
    const {t} = useLanguage();
    const [postCategory] = usePostCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const { data: category } = useGetCategoryQuery(categoryId);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ resolver: zodResolver(formSchema) });

    const addItem = async (name: string) => {
        try{
            await postCategory({name}).unwrap();
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
    const updateItem = async (name: string) => {
        await updateCategory({id: categoryId, params: {name: name}});
    }
    
    const navigate = useNavigate();

    const onSubmit = (data: CategorySchema) => {
        console.log('Category Add: ', data);

        if(categoryId){
            updateItem(data.name);
        }
        else{
            addItem(data.name);
        }   
        navigate(-1);             
    }

    const name = category?category.name:undefined;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>{categoryId?"Изменение":"Добавление"} категории</h2>
            <label htmlFor="name">Название: </label>
            <input
                defaultValue={name?name:undefined}
                id="name"
                type="text"
                placeholder="Введите название категории"
                className={clsx({ 'input-error': errors.name })}
                {...register('name')}            
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
        
            {errors.root && <p className="error">Ошибка: {errors.root.message}</p>}

            <button className={"button-"+theme} type="submit" >{categoryId?t('changeCategory'):t('addCategory')}</button>
        </form>
    )
}

