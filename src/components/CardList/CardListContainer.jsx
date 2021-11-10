import CardList from "./CardList";
import {useDispatch} from "react-redux";
import {updateWishList} from "../../redux/productsReducer";

const CardListContainer = (props) => {
    const dispatch = useDispatch();
    const onWishListUpdate = (prod) => {
       dispatch(updateWishList(prod))
    }
    return (<CardList addToFavorites={onWishListUpdate} cards={props.products}/>)
}
export default CardListContainer;