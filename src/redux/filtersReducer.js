import axios from "axios";

const GET_FILTERS = "GET_FILTERS";
const CHANGE_FILTER = "CHANGE_FILTER";
const CLEAR_FILTERS = "CLEAR_FILTERS";
const CHANGE_SEARCH = "CHANGE_SEARCH";
const CHANGE_RANGE = "CHANGE_RANGE";
const SET_RANGE = "SET_RANGE"

export const AC = {
    getFilters(filters) {
        return ({type: GET_FILTERS, payload: filters})
    },
    changeFilter(title) {
        return ({type: CHANGE_FILTER, payload: title})
    },
    clearFilters() {
        return ({type: CLEAR_FILTERS})
    },
    changeSearch(search) {
        return ({type:CHANGE_SEARCH, payload: search})
    },
    changeRange(range) {
        return ({type:CHANGE_RANGE, payload: range})
    },
    setRange(rangeStart) {
        return ({type:SET_RANGE, payload: rangeStart})
    },
};

export const getFilters = () => {
    return (dispatch) => {
        async function getCategories() {
            return await axios.get('http://localhost:3001/categories')
                .then(res => {
                    return res.data.map(item => ({
                        title: item,
                        checked: false
                    }));
                });
        }

        async function getBrands() {
            return await axios.get('http://localhost:3001/brands')
                .then(res => {
                    return res.data.map(item => ({
                        title: item,
                        checked: false
                    }));
                });
        }

        Promise.all([getCategories(), getBrands()])
            .then(values => {
                const filters = [
                    {title: "category", items: values[0], isAnyActive:false},
                    {title: "brand", items: values[1], isAnyActive:false},
                ]
                dispatch(AC.getFilters(filters))
            });
    }
}

export const changeFilter = (title) => {
    return (dispatch) => {
        dispatch(AC.changeFilter(title))
    }
}
export const clearFilters = () => {
    return (dispatch) => {
        dispatch(AC.clearFilters())
    }
}
export const changeSearch = (search) => {
    return (dispatch) => {
        dispatch(AC.changeSearch(search))
    }
}
export const changeRange = (range) => {
    return (dispatch) => {
        dispatch(AC.changeRange(range))
    }
}
export const setRange = (range) => {
    return (dispatch) => {
        //console.log(range)
        dispatch(AC.setRange(range))
    }
}

let initState = {
    filters: [],
    search:'',
    rangeStart:{},
    range:{}
};

const filtersReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_FILTERS:
            return ({...state, filters: action.payload});
        case CHANGE_FILTER:
            return ({...state, filters: changeFilterRed(state.filters, action.payload)});
        case CLEAR_FILTERS:
            return ({...state, filters: clearFiltersRed(state.filters)});
        case CHANGE_SEARCH:
            return ({...state, search: action.payload});
        case CHANGE_RANGE:
            return ({...state, range: {...action.payload}});
        case SET_RANGE:
            return ({...state, rangeStart: {...action.payload}, range: {...action.payload}});
    }
    return state;
};
export default filtersReducer;

const changeFilterRed = (filters, title) => {
    return filters.map(filter =>{
        let res = {...filter, items: filter.items.map(item =>
                item.title === title ? {...item, checked: !item.checked} : item)}
        let active = res.items.filter(item => item.checked === true )
        res.isAnyActive = active.length > 0
        return (res)}
    )
}
const clearFiltersRed = (filters,) => {
    return filters.map(filter =>{
        return ({...filter, isAnyActive:false, items: filter.items.map(item =>
                item.checked ? {...item, checked: !item.checked} : item
            )})}
    )
}