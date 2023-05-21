import { useState, useEffect, useRef } from 'react'
import { collection, doc, getFirestore, getDocs, updateDoc, deleteDoc, addDoc } from "firebase/firestore"
function Order({ ord }) {
    const db = getFirestore()
    const itemUse = doc(db, 'orders', `${ord.id}`)
    function delte(evt) {
        deleteDoc(itemUse).then((y) => { window.location.reload(false) })
    }
    return (
        <div className='card orederCard'>
            <h2 className='h2Ored'>Order code #: {ord.id}</h2>
            <h2 className='h2Ored'>User: {ord.name}</h2>
            <h2 className='h2Ored'>Delivery: {ord.delivery}</h2>
            <h2 className='h2Ored'>Buy on: {ord.orderDate}</h2>
            <h2 className='h2Ored'>Cost: ${ord.total}</h2>

            <div>
                <button className="sumButtom del" onClick={delte} type='button'>Delete Product</button>
            </div>
        </div>

    )
}
export default Order