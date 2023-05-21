import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import Items from './items.js';
import plus from '../img/plus.png'
import { collection, getDocs, getFirestore } from "firebase/firestore"
import Nav from "../components/nav";
import Product from "../components/product";
function Products() {
    const [products, setProducts] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const db = getFirestore()
        const itemsColection = collection(db, 'items')
        getDocs(itemsColection).then((snap) => {
            const prov = {}
            snap.docs.map((c) => {
                let a = { ...c.data(), id: c.id, }

                if (prov[a.category] !== undefined) {
                    prov[a.category].push(a)
                }
                else {
                    prov[a.category] = [a]
                }
            })
            setProducts(prov)
        }).then((data) => setLoading(!!data))
    }, [])
    return (
        <>
            <Nav main={2} />
            {loading && <div className="loading"><div className="lds-dual-ring"></div></div>}
            <div className="productContainer">

                <div className="card cardSpecial">
                    <div className="hoverCard">
                        <Link className="more"
                            to={{
                                pathname: `/products/item/new`,
                            }}
                        >
                            <img src={plus} />
                        </Link>
                    </div>
                    <img className="imgCard" src={''} />
                    <div className="textCard">
                        <h2 className="titleCard">New Item</h2>
                    </div>
                </div>
                {Object.keys(products).map(product => {
                    return (
                        <div className="dicv" key={product}>
                            <h2 className="categorySpacion">Category: {product}</h2>
                            {products[product].map(item => {
                                return (
                                    <Product key={item.id} product={item} />
                                )
                            })}
                        </div>
                    )

                })}
            </div>
        </>
    );
}

export default Products;