import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getFilters,changeFilter,clearFilters} from "../../redux/filtersReducer";
import FilterList from "./FilterList";

const FiltersListContainer = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filtersRed.filters)
    useEffect(() => {
        dispatch(getFilters());
    }, []);
    const onFilterChange = (title) => {
        dispatch(changeFilter(title))
    }
    const onClearFilters = () => {
        dispatch(clearFilters())
    }
    return (<FilterList filters={filters} changeFilter={onFilterChange} clearFilters={onClearFilters}/>)
}
export default FiltersListContainer;