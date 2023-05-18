import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import Items from './items.js';
import { collection, getDocs, getFirestore } from "firebase/firestore"
import Nav from "../components/nav";
import Product from "../components/product";
function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const db = getFirestore()
        const itemsColection = collection(db, 'items')
        getDocs(itemsColection).then((snap) => {
            const prov = []
            snap.docs.map((c) => {
                let a = { ...c.data(), id: c.id, }
                prov.push(a)
            })
            setProducts(prov)
        }).then((data) => setLoading(!!data))
    }, [])
    return (
        <>
            <Nav main={2} />
            {loading && <div className="loading"><div className="lds-dual-ring"></div></div>}
            <div className="productContainer">
                {products.map(product => {
                    return (
                        <Product key={product.id} product={product} />
                    )
                })}
            </div>
        </>
    );
}

export default Products;