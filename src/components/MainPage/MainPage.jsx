import s from "./MainPage.module.css"
import icons from "../../icons/icons";
import CardListContainer from "../CardList";
import FilterListContainer from "../FilterList/FilterListContainer";
import Search from "../Search/Search";
import PaginationContainer from "../Pagination";
import {useState} from "react";
const MainPage = (props) => {
return (
    <div className={s.body}>
        <FilterListContainer onSubmit={props.onSubmit} />
        <div className={s.results}>
            <div className={s.caption}>
                <span>{props.totalLen} results found</span>
                <button><img src={icons.wishlist}/></button>
            </div>
            <div className={s.under_caption}>
            <Search/>
            <CardListContainer products={props.products}/>
            </div>
        </div>
        <PaginationContainer/>

    </div>)
}
export default MainPage;