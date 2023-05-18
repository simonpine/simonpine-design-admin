import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getFirestore, getDoc } from "firebase/firestore"
import { Link } from 'react-router-dom'
import CompanyChan from "../components/companyChange";
import CategoryChan from "../components/categoryChange";
import Nav from "../components/nav";
function ItemDetail() {
    const refInputDes = useRef('')
    const refInputPrice = useRef('')
    const refInputStock = useRef('')
    const refInputTitle = useRef('')
    const [refInputCat, setrefInputCat] = useState('')
    const [refInputCom, setrefInputCom] = useState('')
    const params = useParams()
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        const db = getFirestore()
        const itemUse = doc(db, 'items', `${params.id}`)
        getDoc(itemUse).then((snap) => {
            if (snap.exists()) {
                setProduct({ ...snap.data(), id: snap.id, })
                refInputDes.current.value = snap.data().description;
                refInputPrice.current.value = snap.data().price;
                refInputStock.current.value = snap.data().stock;
                refInputTitle.current.value = snap.data().title

                setrefInputCat(snap.data().category)
                setrefInputCom(snap.data().company)
            }
        }).then((data) => setLoading(!!data))
    }, [])
    function save() {
        const db = getFirestore()
        const itemsColl = collection(db, 'items')

        const quizz = {
            // title: otherThings.title,
            // theme: otherThings.theme,
            // creator: otherThings.creator,
            // urlImg: otherThings.urlImg,
            // description: otherThings.description,
            // questions: questions,

        }
    }
    function changeComp(name, from) {
        if (from === 'cat') {
            setrefInputCat(name)
        }
        else {

        }
    }
    return (
        <div>
            <Nav main={2} />
            <section className="itemDatail">
                {loading && <div className="loading"><div className="lds-dual-ring"></div></div>}
                <div className="img">
                    <div className="minImgCon">
                        <img className="mainImg" src={product.pictureUrl} />
                    </div>
                </div>
                <div className="details">
                    <h2 className="priceInfo">Title: <input ref={refInputTitle} className="inputNormal" /></h2>
                    <h2 className="ittleEspe">Product description:</h2>
                    <textarea className="pDetail textInput" ref={refInputDes} />
                    <h2 className="priceInfo">Price: $<input ref={refInputPrice} className="inputNormal" /></h2>

                    <h2 className="priceInfo white">Stock: <input ref={refInputStock} className="inputNormal" /></h2>

                    <h2 className="priceInfo">Company: <CompanyChan curr={product.company} funt={changeComp} /></h2>
                    <h2 className="priceInfo">Category: <CategoryChan curr={product.category} funt={changeComp} /></h2>
                    <button onClick={save}>Save Changes</button>
                </div>

            </section>
        </div>
    )
}
export default ItemDetail;