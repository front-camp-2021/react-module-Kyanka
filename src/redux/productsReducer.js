import axios from "axios";
const GET_PRODUCTS = "GET_PRODUCTS"
const GET_FILTERED_PRODUCTS = "GET_FILTERED_PRODUCTS"
const UPDATE_WISHLIST = "UPDATE_WISHLIST"
export const AC = {
    getProducts(products) {
        return ({type: GET_PRODUCTS, payload: products})
    },
    getFilteredProducts(products,productsAmount,range) {
        return ({type: GET_FILTERED_PRODUCTS, payload: {products,productsAmount,range}})
    },
    updateWishList(prod) {
        return ({type: UPDATE_WISHLIST, payload: prod})
    }
};

export const getProducts = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/products')
            .then(res => {
                dispatch(AC.getProducts(res.data))
            })
    }
}

export const getFilteredProducts = (filters,search,range, currentPage,viewProducts) => {
    const formatTitle = (title) => title.toLowerCase().split(' ').join('_')
    return (dispatch) => {
        axios.get('http://localhost:3001/products')
            .then(res => {
                res = res.data
                filters.forEach(filter => {
                    if(filter.isAnyActive){
                        res = res.filter(product => {
                            let isActive = false;
                            filter.items.forEach(item => {
                                if (item.checked && product[filter.title] === formatTitle(item.title)) {
                                    isActive = true;
                                }
                            })
                            return isActive;
                        })
                    }
                })
                if(!!search){
                    res = res.filter(prod => prod.title.toLowerCase().includes(search));
                }
                let max = 0;
                res.forEach(product => {
                    max = product.price > max ? product.price : max;
                })
                let min = max;
                res.forEach(product => {
                    min = product.price < min ? product.price : min;
                })
                if(range.max){
                    res = res.filter(prod => prod.price >= range.min && prod.price <= range.max);
                }
                const end = (viewProducts * currentPage);
                const start = end - viewProducts
                const productsAmount = res.length
                //return {price:{max,min}, filtered:res, viewed:res.slice(start, end)}
                dispatch(AC.getFilteredProducts(res.slice(start, end), productsAmount, {max,min}))
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
    productsAmount: 0,
    startRange:{},
    wishList: []
};

const productsReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_FILTERED_PRODUCTS:{
            const {products,productsAmount,range} = action.payload
            return ({...state, products: products, productsAmount: productsAmount,startRange: range});
        }
        case GET_PRODUCTS:
            return ({...state, products: action.payload});
        case UPDATE_WISHLIST:
            return ({...state, wishList:updateWishListRed(state.wishList,action.payload)});
    }
    return state;
}
const updateWishListRed =(wishList, prod) => {
    const index = wishList.findIndex(p => p.id === prod.id)
    if(index >=0){
        wishList.splice(index, 1)
    }
    else
        wishList.push(prod)
    return wishList
}
export default productsReducer;