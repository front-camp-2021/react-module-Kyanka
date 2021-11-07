import axios from "axios";
const GET_PRODUCTS = "GET_PRODUCTS"
const UPDATE_WISHLIST = "UPDATE_WISHLIST"
export const AC = {
    getProductsAC(products) {
        return ({type: GET_PRODUCTS, payload: products})
    },
    updateWishList(id) {
        return ({type: UPDATE_WISHLIST, payload: id})
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
export const updateWishList = (id) => {
    return (dispatch) => {
        dispatch(AC.updateWishList(id))
    }
}

let initState = {
    products: [],
    wishList: []
};

const productsReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return ({...state, products: action.payload});
        case UPDATE_WISHLIST:
            return ({...state, wishList:updateWishListRed(state.wishList,action.payload)});
    }
    return state;
}
const updateWishListRed =(wishList, prodId) => {
    const index = wishList.findIndex(id => id === prodId)
    if(index >=0){
        console.log(index)
        wishList.splice(index, 1)
    }
    else
        wishList.push(prodId)
    return wishList
}
export default productsReducer;