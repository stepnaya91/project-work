import clsx from "clsx"
import React from "react"
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
    } = useForm({ resolver: zodResolver(formSchema) });

    const addItem = async (product: CreateProduct) => {
        await postProduct(product).unwrap();
    };

    const updateItem = async (product: UpdateProduct) => {
        await updateProduct(product).unwrap();
    }
    
    const navigate = useNavigate();

    const onSubmit = (data: ProductSchema) => {
        console.log('Product Add: ', data);

        if(productId){
            updateItem({categoryId:data.categoryId, name:data.name, price:data.price, desc:data.desc});
        }
        else{
            addItem({categoryId:data.categoryId, name:data.name, price:data.price, desc:data.desc});
        }   
        navigate(-1); // Возвращает на предыдущую страницу            
    }

    const name = product?product.name:undefined;
    const price = product?product.price:undefined;
    const categoryId = product?product.category.id:undefined;
    const photo = product?product.photo:undefined;
    const description = product?product.description:undefined;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Добавление/изменение товара</h2>
            <label htmlFor="name">Название: </label>
            <input
                defaultValue={name?name:undefined}
                id="name"
                type="text"
                placeholder="Введите название товара"
                className={clsx({ 'input-error': errors.name })}
                {...register('name')}            
            />
            {errors.name && <p className="error">{errors.name.message}</p>}

            <label htmlFor="price">Цена: </label>
            <input
                defaultValue={price?price:undefined}
                id="price"
                type="number"
                placeholder="Введите цену товара"
                className={clsx({ 'input-error': errors.price })}
                {...register('price',{ valueAsNumber: true })}            
            />
            {errors.price && <p className="error">{errors.price.message}</p>}

            <label htmlFor="categoryId">Категория: </label>
            <select 
                defaultValue={categoryId?categoryId:undefined}
                id="categoryId"
                {...register("categoryId")}            >
                <option value="">Выберите категорию..</option>
                {categories.data.map((category)=>(<option key={category.id} value={category.name}>{category.name}</option>))}
            </select>
            {errors.categoryId && <p className="error">{errors.categoryId.message}</p>}

            <label htmlFor="description">Описание: </label>
            <textarea
                defaultValue={description?description:undefined}
                id="description"
                {... register("desc")}
            />

            <button className={"button-"+theme} type="submit" >Добавить товар</button>
        </form>
    )
}

