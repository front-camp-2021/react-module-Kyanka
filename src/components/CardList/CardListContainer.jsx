import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../redux/productsReducer";
import CardList from "./CardList";

const CardListContainer = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsRed.products)
    useEffect(() => {
        dispatch(getProducts());
    }, []);
    return (<CardList cards={products}/>)
}
export default CardListContainer;