import Card from "./Card/Card";
import s from "./CardList.module.css"
const CardList = (props) => {
    let cards = props.cards.map(card =>
        <Card
            id={card.id}
            imageSrc={card.images[0]}
            rating={card.rating}
            price={card.price}
            brand={card.brand}
            category={card.category}
            title={card.title}
            addToFavorites={props.addToFavorites}
            addToBasket={props.addToBasket}
        />)
    if (props.cards.length === 0)
        return (<div className={s.no_data}>No data</div>)
    return (<main className={s.card_list}>{cards}</main>);

};
export default CardList;