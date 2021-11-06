import s from "./MainPage.module.css"
import icons from "../../icons/icons";
import CardListContainer from "../CardList";
import FilterListContainer from "../FilterList/FilterListContainer";
import SearchContainer from "../Search";
import PaginationContainer from "../Pagination";
const MainPage = (props) => {
return (
    <div className={s.body}>
        <FilterListContainer />
        <div className={s.results}>
            <div className={s.caption}>
                <span>{props.totalLen} results found</span>
                <button><img src={icons.wishlist}/></button>
            </div>
            <div className={s.under_caption}>
            <SearchContainer onSubmit={props.onSubmit} setSearch={props.setSearch}/>
            <CardListContainer products={props.products}/>
            </div>
        </div>
        <PaginationContainer/>

    </div>)
}
export default MainPage;