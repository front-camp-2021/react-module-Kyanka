import s from './Card.module.css'
//props = {id, imageSrc, rating, price, brand, category, title, addToFavorites, addToBasket}
import icons from '../../../icons/icons.js'
import {useState,useEffect} from "react";
const Card = (props) => {
    const {id, imageSrc, rating, price, brand, category, title, addToFavorites, addToBasket} = props;
    const [isFavorite, setIsFavorite] = useState(false)
    useEffect(() => {
        if (isFavorite) {
            window.alert(id);
        }
    }, [isFavorite]);

    return (
        <section className={s.card} id={id}>
        <figure>
            <img className={s.product} src={imageSrc} alt="product image"/>
        </figure>

        <div className={s.rate_cost}>
            <div className={s.rate}>
                <span>{rating}</span>
                <img className={s.icon} src={icons.star} alt="Rate Star"/>
            </div>

            <div className={s.cost}>
                <span>{price} $</span>
            </div>
        </div>

        <article className={s.description}>
            <span>{brand} {category}</span>
            <p>{title}</p>
        </article>

        <div className={s.action}>
            <button className={s.wishlist} onClick={()=>{addToFavorites(id); setIsFavorite(true)}}><img className={s.icon} src={icons.wishlist}/>wishlist</button>
            <button className={s.purchase} onClick={()=>addToBasket(id)}><img className={s.icon} src={icons.basket}/>add to card</button>
        </div>
    </section>);
}
export default Card