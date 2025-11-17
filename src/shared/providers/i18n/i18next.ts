import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Ресурсы для перевода
const resources = {
  en: {
    translation: {
        "theme":"Theme",
        "changeTheme":"Change theme",
        "welcome": "Welcome to my app!",
        "deleteButtonName": "Delete",
        "basketButtonName": "To Basket",
        "confirm": "Confirm",
        "home": "Home",
        "addToCart": "Cart",
        "profile": "Profile",
        "catalog": "Catalog",
        "category": "Category",
        "categories": "Categories",
        "addCategory": "Add Category",
        "changeCategory": "Change category",
        "chooseCategory": "Choose category",
        "changeProduct": "Change Product",
        "addProduct": "Add Product",
        "updateProduct": "Update Product",
        "addNewProduct": "Add Product",
        "name": "Name",
        "file": "File",
        "enterProductName": "Enter product name",
        "chooseFile": "Choose File",
        "price": "Price",
        "enterProductPrice": "Enter Product Price",
        "description": "Description"
    }
  },
  ru: {
    translation: {
        "theme":"Тема",
        "changeTheme":"Поменять тему",
        "welcome": "Добро пожаловать в моё приложение!",
        "deleteButtonName": "Удалить",
        "basketButtonName": "В корзину",
        "confirm": "Подтвердить",
        "home": "Домой",
        "addToCart": "Корзина",
        "profile": "Профиль",
        "catalog": "Каталог",
        "category": "Категория",
        "categories": "Категории",
        "addCategory": "Добавить категорию",
        "changeCategory": "Поменять категорию",
        "chooseCategory": "Выберите категорию",
        "changeProduct": "Изменение товара",
        "addProduct": "Добавление товара",
        "updateProduct": "Обновить товар",
        "addNewProduct": "Добавить",
        "name": "Название",
        "file": "Файл",
        "enterProductName": "Введите название товара",
        "chooseFile": "Выберите файл",
        "price": "Цена",
        "enterProductPrice": "Введите цену товара",
        "description": "Описание"
    }
  }
};

i18next
  .use(initReactI18next) // Передаем i18next в react-i18next
  .init({
    resources,
    lng: 'ru', // Язык по умолчанию
    fallbackLng: 'ru', // Запасной язык, если перевода нет
    interpolation: {
      escapeValue: false, // Не экранировать значения, для React
    },
  });

export default i18next;