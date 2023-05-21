import { useState, useEffect, useRef } from "react";
import { collection, doc, getFirestore, addDoc, getDocs } from "firebase/firestore"
import Category from "./category";
import Nav from "../components/nav";
function CatCon({ list, where }) {
    const refInputTitle = useRef('')
    
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const db = getFirestore()
    const itemsColection = collection(db, where)

    useEffect(() => {
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
            {loading && <div className="loading"><div className="lds-dual-ring"></div></div>}
            <div className="dicv">
                <h2 className="categorySpacion">{where}</h2>
                <form onSubmit={(evt) => {
                            const newt = {
                                name: refInputTitle.current.value,
                                title: refInputTitle.current.value
                            }
                            addDoc(itemsColection, newt).then(snap => {
                                window.location.reload(false);
                            })
                        }} className='card'>
                    <h2 className='id'>New {where}</h2>
                    <input required={true} placeholder={where} className="inputNormal inputNormal2" ref={refInputTitle} />
                    <div className='butContEs butContEs2'>
                        <button className="sumButtom" type="submit">Create new {where}</button>
                    </div>
                </form>
                {products.map(cat => {
           
                    const dis = list.some(item => item[where] === cat.name)
                    return (
                        <Category where={where} key={cat.id} name={cat.name} disa={dis} id={cat.id}></Category>
                    )
                })}
            </div>
        </>
    );
}

export default CatCon;