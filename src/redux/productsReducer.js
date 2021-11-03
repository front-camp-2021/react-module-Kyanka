import axios from "axios";
const GET_PRODUCTS = "GET_PRODUCTS"
export const AC = {
    getProductsAC(products) {
        return ({type: GET_PRODUCTS, payload: products})
    }
};

export const getProducts = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/products')
            .then(res => {
                dispatch(AC.getProductsAC(res.data))
            })
    }
}

let initState = {
    products: [],
};

const productsReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return ({...state, products: action.payload.slice(0,6)});
    }
    return state;
}
export default productsReducer;