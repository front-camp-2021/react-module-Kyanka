import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {getProducts} from "../../redux/productsReducer";
import {setTotalPages} from "../../redux/pagesReducer";
import MainPage from "./MainPage";
import {changeSearch} from "../../redux/filtersReducer";

const MainPageContainer = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsRed.products)
    const search = useSelector((state) => state.filtersRed.search)
    let {currentPage, viewProducts, totalPages} = useSelector((state) => state.pagesRed)
    const filters = useSelector((state) => state.filtersRed.filters)
    useEffect(() => {
        dispatch(getProducts());
    }, []);

    const getFilterProducts = () => {
        const formatTitle = (title) => title.toLowerCase().split(' ').join('_')
        let res = products
        filters.forEach(filter => {
            if(filter.isAnyActive){
                res = res.filter(product => {
                    let isActive = false;
                    filter.items.forEach(item => {
                        if (item.checked && product[filter.title] === formatTitle(item.title)) {
                            isActive = true;
                        }
                    })
                    return isActive;
                })
            }
        })
        console.log(search)
        if(!!search){
            res = res.filter(prod => prod.title.toLowerCase().includes(search));

        }
        const end = (viewProducts * currentPage);
        const start = end - viewProducts
        return {filtered:res, viewed:res.slice(start, end)}
    }

    const memoizedCallback = useCallback(getFilterProducts, [filters, currentPage, products, search]);

    useEffect(() => {
        const filteredProducts = memoizedCallback().filtered;
        dispatch(setTotalPages(Math.ceil(filteredProducts.length / viewProducts)));
    }, [dispatch,currentPage,memoizedCallback, products, search]);

    const {filtered, viewed} = getFilterProducts();
    return <MainPage totalLen={filtered.length} products={viewed}/>
}
export default MainPageContainer