import icons from "../../icons";
import s from "./Header.module.css"
import {useHistory} from "react-router";

const Header = () => {
    const history = useHistory().location.pathname;
    const historyParts = history.split("/")
    const path = historyParts.map(item => {
        if (item.length > 0) {
            return <><img src={icons.arrows}/> <a href={`/${item}`}>{item}</a></>
        }
    })
    return (
        <header>
            <div className={s.logo}>
                <img alt="Logo" src={icons.logo}/>
                <p>Online Store</p>
            </div>
            <nav>
                <a href="/"><span>&#8962;</span></a>
                {path}
            </nav>
        </header>
    )
}
export default Header;