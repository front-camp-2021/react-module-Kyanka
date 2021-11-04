import Pagination from "./Pagination";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {changePage} from "../../redux/pagesReducer";

const PaginationContainer = () => {
    const dispatch = useDispatch();
    const total = useSelector((state) => state.pagesRed.totalPages)
    const current = useSelector((state) => state.pagesRed.currentPage)
    const start = useSelector((state) => state.pagesRed.startPage)

    const onChangePage = (id) => {
        id = id > total ? total: id;
        id = id < start ? start : id;
        dispatch(changePage(id))
    }
    useEffect(() => {

    }, []);
    return <Pagination total={total} current={current} start={start} changePage={onChangePage}/>
}
export default PaginationContainer