import WishList from "./WishList";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getProducts} from "../../redux/productsReducer";

const WishListContainer = () => {
    const dispatch = useDispatch();
    const {wishList, products} = useSelector((state) => state.productsRed)
    useEffect(() => {
        dispatch(getProducts());
    }, []);

    const getFilterProducts = () => {
        let res = []
        if (wishList.length > 0){
            wishList.forEach(id => {
                const prod = products.filter(prod => prod.id === id)
                if(prod[0].id)
                    res.push(prod[0])
            })
        }
        return res;
    }

    //const [needSetRange,setNeedSetRange] = useState(true)
    // const setPriceRange = (price) => {
    //     dispatch(setRange(price))
    // }
    //const memoFilteredProducts = useCallback(getFilterProducts, [filters, currentPage, products, search, range]);
    //const memoPriceRange = useCallback(setPriceRange,[needSetRange])
    // useEffect(() => {
    //     const {filtered} = memoFilteredProducts();
    //     console.log(filtered)
    //     if(needSetRange){
    //         if(rangeStart.max){
    //             setNeedSetRange(false)
    //         }
    //         setPriceRange(price)
    //     }
    //     dispatch(setTotalPages(Math.ceil(filtered.length / viewProducts)));
    // }, [dispatch,currentPage,memoFilteredProducts, products, search,range]);

    //const {filtered, viewed} = getFilterProducts();

    return <WishList products={getFilterProducts()}/>
}
export default WishListContainer