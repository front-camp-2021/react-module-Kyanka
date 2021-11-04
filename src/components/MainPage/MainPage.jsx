import s from "./MainPage.module.css"
import icons from "../../icons/icons";
import CardListContainer from "../CardList";
import FilterListContainer from "../FilterList/FilterListContainer";
import Search from "../Search/Search";
import PaginationContainer from "../Pagination";
const MainPage = () => {
return (
    <div className={s.body}>
        <FilterListContainer/>
        <div className={s.results}>
            <div className={s.caption}>
                <span>7,618 results found</span>
                <button><img src={icons.wishlist}/></button>
            </div>
            <div className={s.under_caption}>
            <Search/>
            <CardListContainer/>
            </div>
        </div>
        <PaginationContainer/>

    </div>)
}
export default MainPage;