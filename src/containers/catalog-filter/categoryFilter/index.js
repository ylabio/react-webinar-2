import React, { useCallback, useMemo } from "react";
import useSelector from "../../../hooks/use-selector";
import useStore from "../../../hooks/use-store";
import Select from "../../../components/form/select";
import useInit from "../../../hooks/use-init";

// Этот фильтр помещен отдельно, тк только ему необходимо получать данные с сервера
function CategoryFilter() {

    const store = useStore();

    const select = useSelector(state => ({
        category: state.catalog.params.category,
        categories: state.category.categories
    }));

    const callbacks = {
        //выбор категории
        onCategory: useCallback(category => store.get('catalog').setParams({ category, page: 1 })),
    };

    const categories = useMemo(() => ([{ value: "", title: "Все" }, ...select.categories]), [select.categories])

    useInit(async () => {
        await store.get('category').loadCategories();
    }, [], { backForward: false });

    return (
        <Select options={categories} value={select.category} onChange={callbacks.onCategory} />
    )
}

export default React.memo(CategoryFilter);
