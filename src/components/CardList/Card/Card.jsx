import s from './Card.module.css'
//props = {id, imageSrc, rating, price, brand, category, title, addToFavorites, addToBasket}
import index from '../../../icons'
const Card = (props) => {
    const {id, images, rating, price, brand, category, title, addToFavorites, addToBasket} = props;

    return (
        <section className={s.card} id={id}>
        <figure>
            <img className={s.product} src={images[0]} alt="product image"/>
        </figure>

        <div className={s.rate_cost}>
            <div className={s.rate}>
                <span>{rating}</span>
                <img className={s.icon} src={index.star} alt="Rate Star"/>
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
            <button className={s.wishlist} onClick={()=>addToFavorites({id, images, rating, price, brand, category, title})}><img className={s.icon} src={index.wishlist}/>wishlist</button>
            <button className={s.purchase} onClick={()=>addToBasket(id)}><img className={s.icon} src={index.basket}/>add to card</button>
        </div>
    </section>);
}
export default Card