import clsx from "clsx"
import React, { useEffect } from "react"
import { useForm } from 'react-hook-form';
import "./ProductAdd.css";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "src/shared/providers/ThemeProvider";
import { useGetCategoriesQuery } from "src/store/services/categoryApi";
import { useGetProductQuery, usePostProductMutation, useUpdateProductMutation } from "src/store/services/productApi";

const formSchema = z
  .object({
        name: z.string().min(1, "Введите название товара"),
        price: z.number('Укажите цену').min(1,'Введите цену').max(5000, 'Не более 5000'),
        categoryId: z.string().min(1, "Выберите категорию"),
        desc: z.string().optional()
    })


type ProductSchema = z.infer<typeof formSchema>;

export const ProductAdd: React.FC = () => {
    const {productId} = useParams();
    const {theme} = useTheme();
    const {data: categories} = useGetCategoriesQuery();
    const [postProduct] = usePostProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const { data: product } = useGetProductQuery(productId);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ 
        resolver: zodResolver(formSchema)
    });

    useEffect(()=>{
        if(product)    
            reset({
                name: product.name,
                price: product.price,
                categoryId: product.category.id,
                desc: product.desc,
            });
    }, [product, reset])

    const addItem = async (product: CreateProduct) => {
        await postProduct(product).unwrap();
    };

    const updateItem = async (product: UpdateProduct) => {
        await updateProduct({id:productId,params:product}).unwrap();
    }
    
    const navigate = useNavigate();

    const onSubmit = (data: ProductSchema) => {
        console.log('Product Add: ', data);
        try{
            if(productId){
                updateItem({categoryId:data.categoryId, name:data.name, price:data.price, desc:data.desc});
            }
            else{
                addItem({categoryId:data.categoryId, name:data.name, price:data.price, desc:data.desc});
            }   
            navigate(-1); // Возвращает на предыдущую страницу    
        }catch(e){
            console.log(e)
        }        
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>{productId?"Изменение":"Добавление"} товара</h2>
            <label htmlFor="name">Название: </label>
            <input
                id="name"
                type="text"
                placeholder="Введите название товара"
                className={clsx({ 'input-error': errors.name })}
                {...register('name')}            
            />
            {errors.name && <p className="error">{errors.name.message}</p>}

            <label htmlFor="price">Цена: </label>
            <input
                id="price"
                type="number"
                placeholder="Введите цену товара"
                className={clsx({ 'input-error': errors.price })}
                {...register('price',{ valueAsNumber: true })}            
            />
            {errors.price && <p className="error">{errors.price.message}</p>}

            <label htmlFor="categoryId">Категория: </label>
            <select 
                id="categoryId"
                {...register("categoryId")}            >
                <option value="">Выберите категорию..</option>
                {categories?categories.data.map((category)=>(<option key={category.id} value={category.id}>{category.name}</option>)):undefined}
            </select>
            {errors.categoryId && <p className="error">{errors.categoryId.message}</p>}

            <label htmlFor="description">Описание: </label>
            <textarea
                id="description"
                {... register("desc")}
            />

            <button className={"button-"+theme} type="submit" >{productId?"Обновить":"Добавить"} товар</button>
        </form>
    )
}

