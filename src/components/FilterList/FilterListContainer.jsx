import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getFilters,changeFilter,clearFilters} from "../../redux/filtersReducer";
import FilterList from "./FilterList";
import {changePage} from "../../redux/pagesReducer";

const FiltersListContainer = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filtersRed.filters)
    useEffect(() => {
        dispatch(getFilters());
    }, []);

    const onFilterChange = (event) => {
        dispatch(changePage(1));
        dispatch(changeFilter(event.target.id));
    }
    const onClearFilters = () => {
        dispatch(changePage(1));
        dispatch(clearFilters())
    }
    return (<FilterList filters={filters} changeFilter={onFilterChange} clearFilters={onClearFilters}/>)
}
export default FiltersListContainer;