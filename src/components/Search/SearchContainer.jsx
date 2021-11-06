import Search from "./Search";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {changeSearch} from "../../redux/filtersReducer";
import {changePage} from "../../redux/pagesReducer";

const debounce = (fn) => {
    let timeout;
    return function(...args) {
        const later = () => {
            timeout = null;
            fn.apply(this, args);
        }
        clearTimeout(timeout);
        timeout = setTimeout(later, 10000)
    };
}

const SearchContainer = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    }
    const onInput = debounce((event) => {
        dispatch(changeSearch(event.target.value.trim()))
    })
    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(changeSearch(value.trim()))
        setValue('')
    }
    return <Search value={value} onSubmit={onSubmit} onInput={onInput} onChange={onChange}/>
}
export default SearchContainer