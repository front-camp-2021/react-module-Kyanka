const SET_TOTAL_PAGES = "SET_TOTAL_PAGES"
const CHANGE_PAGE = "CHANGE_PAGE"

const AC = {
    setTotalPages: (total) => {
        return {type: SET_TOTAL_PAGES, payload: total}
    },
    changePage: (page) => {
        return {type: CHANGE_PAGE, payload: page}
    },
}

export const setTotalPages = (total) => {
    return (dispatch) => {
        dispatch(AC.setTotalPages(total))
    }
}
export const changePage = (page) => {
    return (dispatch) => {
        dispatch(AC.changePage(page))
    }
}

const initialState = {
    totalPages: 0,
    startPage: 1,
    currentPage: 1,
    viewProducts: 9
}

const pagesReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_TOTAL_PAGES:
            return {...state, totalPages: action.payload};
        case CHANGE_PAGE:
            return {...state, currentPage: action.payload};
    }
    return state;
}
export default pagesReducer;