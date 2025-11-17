import React, { memo } from "react"
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "src/store/services/categoryApi";
import { useLanguage } from "src/shared/providers/LanguageProvider";
import { Link, useLocation } from "react-router-dom";
import { NavButton } from "src/features/NavButton/NavButton";

import { useGetOrderQuery } from "src/store/services/orderApi";

export const OrderList: React.FC = () => {return(<></>)
}

export default OrderList