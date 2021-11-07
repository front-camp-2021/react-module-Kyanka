import CardList from "./CardList";
import {useDispatch} from "react-redux";
import {updateWishList} from "../../redux/productsReducer";

const CardListContainer = (props) => {
    const dispatch = useDispatch();
    const onWishListUpdate = (id) => {
       dispatch(updateWishList(id))
    }
    return (<CardList addToFavorites={onWishListUpdate} cards={props.products}/>)
}
export default CardListContainer;