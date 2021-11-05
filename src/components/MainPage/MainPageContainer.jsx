import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {getProducts} from "../../redux/productsReducer";
import {setTotalPages} from "../../redux/pagesReducer";
import {changePage} from "../../redux/pagesReducer";
import MainPage from "./MainPage";

const MainPageContainer = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsRed.products)
    let {currentPage, viewProducts, totalPages} = useSelector((state) => state.pagesRed)
    const filters = useSelector((state) => state.filtersRed.filters)

    useEffect(() => {
        dispatch(getProducts());
    }, []);



    // useEffect(() => {
    //     const res = getFilterProducts();
    //     dispatch(setTotalPages(Math.ceil(res.length / viewProducts)));
    //     console.log(res.length)
    // }, [currentPage]);

    const onSubmit = event => {
        const res = getFilterProducts();
        dispatch(setTotalPages(Math.ceil(res.length / viewProducts)));
        console.log(res.length)
    };

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
        if(true){

        }

        let end = (viewProducts * currentPage);
        let start = end - viewProducts
        return {filtered:res, viewed:res.slice(start, end)}
    }

    const memoizedCallback = useCallback(getFilterProducts, [filters, currentPage, products,]);

    useEffect(() => {
        const filteredProducts = memoizedCallback().filtered;

        dispatch(setTotalPages(Math.ceil(filteredProducts.length / viewProducts)));
        //console.log(currentPage,totalPages, filteredProducts.length)
    }, [dispatch,currentPage,memoizedCallback, products]);

    const {filtered, viewed} = getFilterProducts();
    return <MainPage totalLen={filtered.length} products={viewed}/>
}
export default MainPageContainer