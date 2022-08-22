import React, {useCallback, useEffect, useMemo, useState} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutFlex from "../../components/layout-flex";
import {sortCategories} from "../../utils/sort-categories";

function CatalogFilter() {

    const store = useStore();

    const [categories, setCategories] = useState([]);

    const select = useSelector(state => ({
        sort: state.catalog.params.sort,
        query: state.catalog.params.query,
        category: state.catalog.params.category
    }));

    const {t} = useTranslate();

    useEffect(() => {
        const getCategories = async () => {
            await fetch('/api/v1/categories').then(r => {
                if (r.ok) {
                    return r.json();
                }
            }).then(rJson => {
                setCategories(sortCategories(rJson.result.items));
            })
        }
        getCategories();
    }, []);

    useEffect(() => {
        console.log(categories);
    }, [categories])


    const callbacks = {
        // Сортировка
        onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
        // Поиск
        onSearch: useCallback(query => store.get('catalog').setParams({query, page: 1}), []),
        // Сброс
        onReset: useCallback(() => store.get('catalog').resetParams(), []),

        onChoose: useCallback(category => store.get('catalog').setParams({category}), [])
    };

    // Опции для полей
    const options = {
        sort: useMemo(() => ([
            {value: 'order', title: 'По порядку'},
            {value: 'title.ru', title: 'По именованию'},
            {value: '-price', title: 'Сначала дорогие'},
            {value: 'edition', title: 'Древние'},
        ]), [])
    }

    return (
        <LayoutFlex flex="start">
            <Select onChange={callbacks.onChoose} value={select.category} options={categories}/>
            <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
            <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
            <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
        </LayoutFlex>
    );
}

export default React.memo(CatalogFilter);
