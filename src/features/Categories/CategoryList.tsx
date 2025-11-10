import React, { memo } from "react"
import { useGetCategoriesQuery } from "src/store/services/categoryApi";
import { useLanguage } from "src/shared/providers/LanguageProvider";
import { NavButton } from "../NavButton/NavButton";
import { Link, useLocation } from "react-router-dom";

export const CategoryList: React.FC = () => {

    const {t} = useLanguage();
    const location = useLocation();  
    const { data: categories, isLoading, isError, error } = useGetCategoriesQuery();    
    if (isLoading) return <p>Загрузка...</p>;
    if (isError){
        console.log(error);      
        return <p>Ошибка загрузки категорий</p>;
    }  
    if (categories.data.length==0)
    return (
      <>
        <p>Список категорий пуст</p>   
        <NavButton linkTo="/EditCategory" label={t('addCategory')}/>   
      </>
    )

    return (
      <>
        <div className="add-div">
          <table>
            <thead>
              <tr>
                <th>Название</th>
                <th>Дата создания</th>
                <th>Дата изменения</th>
              </tr>
            </thead>
            <tbody>
              {categories.data.map(item => (
                <tr key={item.id}>
                  
                  <td><Link to={"/EditCategory/"+item.id}  state={{ background: location }}>{item.name}</Link></td>
                  <td>{item.createdAt.toString()}</td>
                  <td>{item.updatedAt.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <NavButton linkTo="/EditCategory" label={t('addCategory')}/>   
        </div>
      </>
    )
}

export default memo(CategoryList)