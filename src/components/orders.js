import { useState, useEffect, useRef } from 'react'
import { collection, doc, getFirestore, getDocs, updateDoc, deleteDoc, addDoc } from "firebase/firestore"
import Order from './order'
function Orders() {
    const [orde, setOrde] = useState([])
    const [loading, setLoading] = useState(true)
    const db = getFirestore()
    useEffect(() => {
        const itemsColection = collection(db, 'orders')

        getDocs(itemsColection).then((snap) => {
            const prov = []
            snap.docs.map((c) => {
                let a = { ...c.data(), id: c.id }
                prov.push(a)
            })
            setOrde(prov)
        }).then((data) => setLoading(!!data))
    }, [])
    // console.log(orde)
    return (
        <div className='o'>
            {loading && <div className="loading"><div className="lds-dual-ring"></div></div>}
            <h2 className='h2Chart'>Orders</h2>
            <div className='productContainer ordersCont'>
                {orde.map(item => {
                    return <Order key={item.id} ord={item} />
                })}
            </div>
        </div>

    )
}
export default Orders