import clsx from "clsx"
import React, { useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
import "./ProductAdd.css";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "src/shared/providers/ThemeProvider";
import { useGetCategoriesQuery } from "src/store/services/categoryApi";
import { useGetProductQuery, usePostProductMutation, useUpdateProductMutation } from "src/store/services/productApi";
import { useLanguage } from "src/shared/providers/LanguageProvider";
import { usePostUploadMutation } from "src/store/services/filesApi";

const formSchema = z
  .object({
        name: z.string().min(1, "Введите название товара"),    
        photo: z.any().refine(
                (file) => file?.[0]?.type === "image/jpeg",
                "Можно загружать только JPG файлы"
            ),
        price: z.number('Укажите цену').min(1,'Введите цену').max(5000, 'Не более 5000'),
        categoryId: z.string().min(1, "Выберите категорию"),
        desc: z.string().optional()
    })


type ProductSchema = {
    name: string,
    photo: FileList,
    price: number,
    categoryId: string,
    desc: string
}


export const ProductAdd: React.FC = () => {
    const {productId} = useParams();
    const {theme} = useTheme();
    const {t} = useLanguage();
    const {data: categories} = useGetCategoriesQuery();
    const [postProduct] = usePostProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [postUpload] = usePostUploadMutation();
    const { data: product } = useGetProductQuery(productId);
    const [imageUrl, setImageUrl] = useState<string | null>(null); 
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm({ 
        resolver: zodResolver(formSchema)
    });

    useEffect(()=>{
        if(product)    
            reset({
                name: product.name,
                photo: product.photo,
                price: product.price,
                categoryId: product.category.id,
                desc: product.desc,
            });
    }, [product, reset])

    const loadFile =async (formData: FormData) => {
        const url = await postUpload(formData).unwrap();  
        setImageUrl(url.url.replace("http","https"));
        return url.url.replace("http","https");
    }

    const addItem = async (product: CreateProduct, formData?:FormData) => {
        try{
            if(formData) {
                product.photo = await loadFile(formData);
            }else setImageUrl(null);
            const p = await postProduct(product).unwrap();
            console.log(p)
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

    const updateItem = async (product: UpdateProduct, formData?:FormData) => {
        try{
            if(formData) {
                product.photo = await loadFile(formData);
            }else setImageUrl(null);
            const p = await updateProduct({id:productId,params:product}).unwrap();
            console.log(p)
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
    
    const navigate = useNavigate();

    const onSubmit = (data: ProductSchema) => {
        console.log('Product Add: ', data);
        const file = data.photo[0];

        const formData = new FormData();
        formData.append("file", file);

        try{
            if(productId){
                updateItem({categoryId:data.categoryId, name:data.name, price:data.price, desc:data.desc}, formData);
            }
            else{
                addItem({categoryId:data.categoryId, name:data.name, price:data.price, desc:data.desc}, formData);
            }   
            navigate(-1); // Возвращает на предыдущую страницу    
        }catch(e){
            console.log(e)
        }        
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>{productId?t('changeProduct'):t('addProduct')}</h2>
            <label htmlFor="name">{t('name')}: </label>
            <input
                id="name"
                type="text"
                placeholder={t('enterProductName')}
                className={clsx({ 'input-error': errors.name })}
                {...register('name')}            
            />
            {errors.name && <p className="error">{errors.name.message}</p>}

            
            <label htmlFor="photo">{t('file')}:</label>
            <input
                id = "photo"
                type="file"
                accept="image/jpeg"
                placeholder={t('chooseFile')}
                className={clsx({ 'input-error': errors.photo }, theme)}
                {...register('photo')}
            />

            {imageUrl && <div style={{ marginTop: 20 }}>
                    <img
                        src={imageUrl}
                        alt="uploaded"
                        style={{ maxWidth: '300px', borderRadius: '8px' }}
                    />
                </div>      
            }      

            <label htmlFor="price">{t('price')}: </label>
            <input
                id="price"
                type="number"
                placeholder={t('enterProductPrice')}
                className={clsx({ 'input-error': errors.price })}
                {...register('price',{ valueAsNumber: true })}            
            />
            {errors.price && <p className="error">{errors.price.message}</p>}

            <label htmlFor="categoryId">{t('category')}: </label>
            <select 
                id="categoryId"
                {...register("categoryId")}            >
                <option value="">{t('chooseCategory')}..</option>
                {categories?categories.data.map((category)=>(<option key={category.id} value={category.id}>{category.name}</option>)):undefined}
            </select>
            {errors.categoryId && <p className="error">{errors.categoryId.message}</p>}

            <label htmlFor="description">{t('description')}: </label>
            <textarea
                id="description"
                {... register("desc")}
            />

            <button className={"button-"+theme} type="submit" >{productId?t('updateProduct'):t('addNewProduct')}</button>
        </form>
    )
}

