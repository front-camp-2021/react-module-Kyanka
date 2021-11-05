import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../redux/productsReducer";
import CardList from "./CardList";
import {setTotalPages} from "../../redux/pagesReducer";

const CardListContainer = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsRed.products)
    const {currentPage, viewProducts, totalPages} = useSelector((state) => state.pagesRed)
    const filters = useSelector((state) => state.filtersRed.filters)
    useEffect(() => {
        dispatch(getProducts());
    }, []);
    useEffect(() => {
        dispatch(setTotalPages(Math.ceil(products.length / viewProducts)));
    }, [products]);
    const formatTitle = (title) => {
        return title.toLowerCase().split(' ').join('_')
    }
    const getFilterProducts = () => {
        let res = products;
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

        let end = Math.ceil((products.length / totalPages) * currentPage);
        let start = end - viewProducts
        return res.slice(start, end)
    }
    return (<CardList cards={getFilterProducts()}/>)
}
export default CardListContainer;