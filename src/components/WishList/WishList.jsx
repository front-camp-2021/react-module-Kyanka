import s from "./WishList.module.css";
import Header from "../Header";

import CardList from "../CardList";

const WishList = (props) => {
    console.log(props.products)
    return (
        <div className={s.body}>
            <Header/>
            <div className={s.results}>
                <div className={s.under_caption}>
                    <CardList products={props.products}/>
                </div>
            </div>
        </div>
    )
}
export default WishList