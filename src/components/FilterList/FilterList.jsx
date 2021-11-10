import s from './FilterList.module.css'
import index from "../../icons";
import Slider from "./Slider/Slider";
const FilterItem = (props) => {
    const {title, checked, changeFilter} = props;
    return (
        <p>
            <input type="checkbox" onChange={event => changeFilter(event)} className={s.filter_item} id={title} checked={checked}/>
            {title}
        </p>)
}
const FilterCard = (props) => {
    const {title, items, changeFilter} = props;
    return (
        <div className={s.filter_card}>
            <span className={s.filters_caption}>{title}</span>
            <div>
                {items.map(item => <FilterItem key={item.title} changeFilter={changeFilter} checked={item.checked} title={item.title} />)}
            </div>
        </div>)
}

const FilterList = (props) => {
    const {filters, changeFilter, clearFilters} = props;
    return (
        <div className={s.filters}>
            <div className={s.caption}>
                <span>Filters</span>
                <button><img src={index.arrows}/></button>
            </div>
            <Slider/>
            <div className={s.filter_cards}>
                {filters.map(filter => {
                    return filter === filters[filters.length-1]
                    ? <FilterCard key={filter.title} changeFilter={changeFilter} title={filter.title} items={filter.items}/>
                    : <div key={filter.title}><FilterCard changeFilter={changeFilter} title={filter.title} items={filter.items}/><div className={s.divider}/></div>})}
            </div>
            <button onClick={clearFilters}>clear all filters</button>
        </div>);
}

export default FilterList;