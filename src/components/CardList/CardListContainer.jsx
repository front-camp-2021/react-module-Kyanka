import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../redux/productsReducer";
import CardList from "./CardList";
import {setTotalPages} from "../../redux/pagesReducer";

const CardListContainer = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsRed.products)
    const {currentPage, viewProducts, totalPages} = useSelector((state) => state.pagesRed)
    useEffect(() => {
        dispatch(getProducts());
    }, []);
    useEffect(() => {
        dispatch(setTotalPages(Math.ceil(products.length/viewProducts)));
    }, [products]);
    const getFilterProducts = () => {
        let end = Math.ceil((products.length / totalPages) * currentPage);
        let start = end - viewProducts
        return products.slice(start,end)
    }
    return (<CardList cards={getFilterProducts()}/>)
}
export default CardListContainer;