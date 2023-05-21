import { useState, useEffect, useRef } from "react";
import { collection, doc, getFirestore, addDoc, getDocs } from "firebase/firestore"
import Category from "./category";
import Nav from "../components/nav";
function CatCon({ list }) {
    const refInputTitle = useRef('')
    
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const db = getFirestore()
    const itemsColection = collection(db, 'category')

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
                <h2 className="categorySpacion">Categories</h2>
                {products.map(cat => {
                    const dis = list.some(item => item.category === cat.title)
                    return (
                        <Category key={cat.id} name={cat.name} disa={dis} id={cat.id}></Category>
                    )
                })}
                <div className='card'>
                    <h2 className='id'>New Category</h2>
                    <input placeholder="Bathroom" className="inputNormal inputNormal2" ref={refInputTitle} />
                    <div className='butContEs butContEs2'>
                        <button onClick={(evt) => {
                            const newt = {
                                name: refInputTitle.current.value,
                                title: refInputTitle.current.value
                            }
                            addDoc(itemsColection, newt).then(snap => {
                                window.location.reload(false);
                            })
                        }} className="sumButtom" type="submit">Create Category</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CatCon;