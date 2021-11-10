import s from "./MainPage.module.css"
import icons from "../../icons";
import CardList from "../CardList";
import FilterList from "../FilterList";
import Search from "../Search";
import Pagination from "../Pagination";
import Header from "../Header";
import {NavLink} from "react-router-dom";
const MainPage = (props) => {
return (
    <div className={s.body}>
        <Header/>
        <FilterList />
        <div className={s.results}>
            <div className={s.caption}>
                <span>{props.totalLen} results found</span>
                <NavLink to="/wishList"><img src={icons.wishlist}/></NavLink>
            </div>
            <div className={s.under_caption}>
            <Search onSubmit={props.onSubmit} setSearch={props.setSearch}/>
            <CardList products={props.products}/>
            </div>
        </div>
        <Pagination/>

    </div>)
}
export default MainPage;