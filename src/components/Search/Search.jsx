import s from "./Search.module.css"
import icons from "./../../icons/icons"

const Search = (props) => {
    return <div className={s.search}>
        <input onChange={props.onChange} onInput={props.onInput}  value={props.value} placeholder="Search" type="search"/>
        <button onClick={props.onSubmit} type="submit"> <img src={icons.search}/></button>
    </div>
};
export default Search;