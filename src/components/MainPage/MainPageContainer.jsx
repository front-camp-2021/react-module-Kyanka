import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getFilteredProducts} from "../../redux/productsReducer";
import {setTotalPages} from "../../redux/pagesReducer";
import MainPage from "./MainPage";
import {setRange} from "../../redux/filtersReducer";

const MainPageContainer = () => {
    const dispatch = useDispatch();
    const {products,productsAmount,startRange} = useSelector((state) => state.productsRed)
    const search = useSelector((state) => state.filtersRed.search)
    let {currentPage, viewProducts} = useSelector((state) => state.pagesRed)
    const {filters,range} = useSelector((state) => state.filtersRed)


    useEffect(() => {
        dispatch(getFilteredProducts(filters,search,range,currentPage,viewProducts));
    }, []);

    const [needSetRange,setNeedSetRange] = useState(true)

    useEffect(() => {
        if(needSetRange){
            if(startRange.max){
                setNeedSetRange(false)
            }
            dispatch(setRange(startRange))
        }
    }, [startRange]);
    useEffect(()=>{
        dispatch(setTotalPages(Math.ceil(productsAmount / viewProducts)));
    },[productsAmount])
    useEffect( ()=>{
        dispatch(getFilteredProducts(filters,search,range,currentPage,viewProducts));
    },[filters,search,range,currentPage])

    return <MainPage totalLen={productsAmount} products={products}/>
}
export default MainPageContainer