import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {getProducts} from "../../redux/productsReducer";
import {setTotalPages} from "../../redux/pagesReducer";
import MainPage from "./MainPage";
import {setRange} from "../../redux/filtersReducer";

const MainPageContainer = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsRed.products)
    const search = useSelector((state) => state.filtersRed.search)
    let {currentPage, viewProducts} = useSelector((state) => state.pagesRed)
    const {filters,range,rangeStart} = useSelector((state) => state.filtersRed)


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

        if(!!search){
            res = res.filter(prod => prod.title.toLowerCase().includes(search));
        }
        let max = 0;
        res.forEach(product => {
            max = product.price > max ? product.price : max;
        })
        let min = max;
        res.forEach(product => {
            min = product.price < min ? product.price : min;
        })
        if(range.max){
            res = res.filter(prod => prod.price >= range.min && prod.price <= range.max);
        }
        const end = (viewProducts * currentPage);
        const start = end - viewProducts
        return {price:{max,min}, filtered:res, viewed:res.slice(start, end)}
    }
    const [needSetRange,setNeedSetRange] = useState(true)

    const memoizedCallback = useCallback(getFilterProducts, [filters, currentPage, products, search, range]);

    useEffect(() => {
        const {price,filtered} = memoizedCallback();

        if(needSetRange){
            if(rangeStart.max){
                setNeedSetRange(false)
            }
            dispatch(setRange(price))
        }
        dispatch(setTotalPages(Math.ceil(filtered.length / viewProducts)));
    }, [dispatch,currentPage,memoizedCallback, products, search,range,]);

    const {filtered, viewed} = getFilterProducts();
    return <MainPage totalLen={filtered.length} products={viewed}/>
}
export default MainPageContainer