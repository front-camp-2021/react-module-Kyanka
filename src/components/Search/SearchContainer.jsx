import Search from "./Search";
import {useDispatch, useSelector} from "react-redux";
import {changeSearch} from "../../redux/filtersReducer";
import {useEffect, useState} from "react";

const debounce = (fn) => {
    let timeout;
    return function(...args) {
        const later = () => {
            timeout = null;
            fn.apply(this, args);
        }
        clearTimeout(timeout);
        timeout = setTimeout(later, 1000)
    };
}

const SearchContainer = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const search = useSelector((state) => state.filtersRed.search)

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
    useEffect(()=>{
        setValue(search)
    },[search])
    useEffect(()=>{
        if(value===''){
            dispatch(changeSearch(''))
        }
    },[value])
    return <Search value={value} onSubmit={onSubmit} onInput={onInput} onChange={onChange}/>
}
export default SearchContainer