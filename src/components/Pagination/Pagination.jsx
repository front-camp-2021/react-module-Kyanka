import index from "../../icons";
import s from "./Pagination.module.css"

const Page = (props) => {
    const {current, value, changePage} = props;
    if (current === value)
        return <a id={value} className={s.current}>{value}</a>
    else return <a onClick={e => changePage(+e.target.id)} id={value} className={s.page}>{value}</a>
}
const Pagination = (props) => {
    const {start, total, current, changePage} = props;
    const pages = []
    for (let i = start; i <= total; i++) {
        pages.push(<Page current={current} value={i} changePage={changePage}/>)
    }
    if (total > 0)
        return <footer>
            <button className={s.back} onClick={() => changePage(current - 1)}><img src={index.arrow}/></button>
            <div className={s.pages}>
                {pages}
            </div>
            <button onClick={() => changePage(current + 1)} className={s.arrow}><img src={index.arrow}/></button>
        </footer>
    else return <footer/>
}
export default Pagination;