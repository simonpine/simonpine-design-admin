import ed from "../img/edit-button.png"
import { Link } from "react-router-dom";
function Product({ product }) {
    return (
        <div className="card">
            <div className="hoverCard">
                <Link className="more"
                    to={{
                        pathname: `/products/item/${product.id}`,
                    }}
                >
                    <img src={ed} />
                </Link>
            </div>
            <img className="imgCard" src={product.pictureUrl} />
            <div className="textCard">
                <h2 className="titleCard">{product.title}</h2>
                <h3 className=" titleCard brand">{product.company}</h3>
            </div>
        </div>
    );
}

export default Product;