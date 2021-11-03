import s from "./Search.module.css"
import icons from "./../../icons/icons"
const Search = () => {
    return <div className={s.search}>
        <input placeholder="Search" type="search"/>
        <button type="submit"> <img src={icons.search}/></button>
    </div>
};
export default Search;