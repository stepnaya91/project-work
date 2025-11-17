import React, { memo } from "react"
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "src/store/services/categoryApi";
import { useLanguage } from "src/shared/providers/LanguageProvider";
import { Link, useLocation } from "react-router-dom";
import { NavButton } from "src/features/NavButton/NavButton";
import './CategoryList.css'
import { Button } from "src/features/Button/Button";

export const CategoryList: React.FC = () => {

    const {t} = useLanguage();
    const location = useLocation();  
    const { data: categories, isLoading, isError, error } = useGetCategoriesQuery();    
    const [deleteCategory] = useDeleteCategoryMutation();
    if (isLoading) return <p>Загрузка списка категорий...</p>;
    if (isError){
        let errorMessage = "Ошибка загрузки списка категорий";
        if ('data' in error && error.data) {
            if (Array.isArray((error.data as any).errors) && (error.data as any).errors.length > 0) {
                errorMessage = (error.data as any).errors[0].message || errorMessage;
            } else if ((error.data as any).message) {
                errorMessage = (error.data as any).message;
            }
        } else if ('error' in error && error.error) {
            errorMessage = error.error;
        }
        return <p>{errorMessage}</p>;
    }
    if (categories.data.length==0)
    return (
      <>
        <p>Список категорий пуст</p>   
        <NavButton className="add-category" linkTo="/EditCategory" label={t('addCategory')}/>   
      </>
    )

    return (
      <>
        <div className="add-div categories-table">
          <table>
            <thead>
              <tr>
                <th>Название</th>
                <th>Дата создания</th>
                <th>Дата изменения</th>
                <th><NavButton linkTo="/EditCategory" label={t('addCategory')} /></th>
              </tr>
            </thead>
            <tbody>
              {categories.data.map(item => (
                <tr key={item.id}>                  
                  <td><Link to={"/EditCategory/"+item.id}  state={{ background: location }} className="category-link">{item.name}</Link></td>
                  <td>{item.createdAt.toString()}</td>
                  <td>{item.updatedAt.toString()}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
             
        </div>
      </>
    )
}

export default memo(CategoryList)