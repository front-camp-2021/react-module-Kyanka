import axios from "axios";

const GET_FILTERS = "GET_FILTERS";
const CHANGE_FILTER = "CHANGE_FILTER";
const CLEAR_FILTERS = "CLEAR_FILTERS";

export const AC = {
    getFiltersAC(filters) {
        return ({type: GET_FILTERS, payload: filters})
    },
    changeFilter(title) {
        return ({type: CHANGE_FILTER, payload: title})
    },
    clearFilters() {
        return ({type: CLEAR_FILTERS})
    }
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
                    {title: "Categories", items: values[0]},
                    {title: "Brands", items: values[1]},
                ]
                dispatch(AC.getFiltersAC(filters))
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

let initState = {
    filters: []
};

const filtersReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_FILTERS:
            return ({...state, filters: action.payload});
        case CHANGE_FILTER:
            return ({...state, filters: changeFilterRed(state.filters, action.payload)});
        case CLEAR_FILTERS:
            return ({...state, filters: clearFiltersRed(state.filters)});
    }
    return state;
};
export default filtersReducer;

const changeFilterRed = (filters, title) => {
    return filters.map(filter =>{
        return ({...filter, items: filter.items.map(item =>
            item.title === title ? {...item, checked: !item.checked} : item
            )})}
    )
}
const clearFiltersRed = (filters,) => {
    return filters.map(filter =>{
        return ({...filter, items: filter.items.map(item =>
                item.checked ? {...item, checked: !item.checked} : item
            )})}
    )
}