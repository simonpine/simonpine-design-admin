import { useState, useEffect } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore"
import CatCon from "../components/categoryCont";
import Nav from "../components/nav";
function CatCom() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const db = getFirestore()
        const itemsColection = collection(db, 'items')
        getDocs(itemsColection).then((snap) => {
            const prov = []
            snap.docs.map((c) => {
                let a = { category: c.data().category, company: c.data().company }
                prov.push(a)
            })
            setProducts(prov)
        }).then((data) => setLoading(!!data))
    }, [])
    // console.log(products)
    return (
        <>
            <Nav main={3} />
            {loading && <div className="loading"><div className="lds-dual-ring"></div></div>}

            <div className="productContainer por2">
                <CatCon where={'company'} list={products}></CatCon>
                <CatCon where={'category'} list={products}></CatCon>
            </div>
        </>
    );
}

export default CatCom;