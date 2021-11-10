import WishList from "./WishList";
import {useSelector} from "react-redux";

const WishListContainer = () => {
    const {wishList} = useSelector((state) => state.productsRed)
    return <WishList products={wishList}/>
}
export default WishListContainer