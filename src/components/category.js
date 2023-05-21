import { useState, useEffect, useRef } from 'react'
import { collection, doc, getFirestore, getDoc, updateDoc, deleteDoc, addDoc } from "firebase/firestore"
function Category({ id, name, disa, where }) {
    const refInputTitle = useRef('')
    const db = getFirestore()
    const itemUse = doc(db, where, id)

    useEffect(() => {
        refInputTitle.current.value = name
    }, [])
    return (
        <div className='card'>
            <h2 className='id'>{id}</h2>
            <input disabled={disa} className="inputNormal inputNormal2" ref={refInputTitle} />
            <div className='butContEs'>
                <button disabled={disa} onClick={(evt) => {
                    const newt = {
                        name: refInputTitle.current.value,
                        title: refInputTitle.current.value
                    }
                    updateDoc(itemUse, newt).then(snap => {
                        window.location.reload(false);
                    })
                }} className="sumButtom sumVut" type="submit">Save</button>
                <button disabled={disa} onClick={(evt) => {
                    deleteDoc(itemUse).then(snap => {
                        window.location.reload(false);
                    })
                }} className="sumButtom sumVut del" type='button'>Delete</button>
            </div>
        </div>

    )
}
export default Category;