import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, doc, getFirestore, getDoc, updateDoc, deleteDoc, addDoc } from "firebase/firestore"

import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

import { Link } from 'react-router-dom'
import CompanyChan from "../components/companyChange";
import CategoryChan from "../components/categoryChange";
import Nav from "../components/nav";
function ItemDetail() {
    const navigate = useNavigate();
    const [obli, setObli] = useState(false);
    const [imageUpload, setImageUpload] = useState(null);
    const [disa, setDisa] = useState(false);
    const [disa2, setDisa2] = useState(true);
    const refInputDes = useRef('')
    const refInputPrice = useRef('')
    const refInputStock = useRef('')
    const refInputTitle = useRef('')
    const [refInputCat, setrefInputCat] = useState('')
    const [refInputCom, setrefInputCom] = useState('')
    const params = useParams()
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)

    const storage = getStorage()
    const db = getFirestore()
    const itemUse = doc(db, 'items', `${params.id}`)
    useEffect(() => {
        if (params.id === 'new') setObli(true)

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

    useEffect(() => {
        if (params.id === 'new') {
            if (imageUpload !== null) {
                setDisa2(false)
            }
            else {
                setDisa2(true)
            }
        }
        else {
            setDisa2(false)
        }
    }, [imageUpload])

    function save(evt) {
        setDisa(true)
        evt.preventDefault()
        const updateItem = {
            title: refInputTitle.current.value,
            description: refInputDes.current.value,
            company: refInputCom,
            category: refInputCat,
            pictureUrl: product.pictureUrl,
            price: refInputPrice.current.value,
            stock: refInputStock.current.value
        }
        if (params.id !== 'new') {
            if (imageUpload !== null) {
                const imageRef = ref(storage, `img/${imageUpload.name + Math.floor(Math.random() * 1000) + 1}`);

                uploadBytes(imageRef, imageUpload).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        updateItem.pictureUrl = url
                        updateDoc(itemUse, updateItem).then(snap => {
                            window.location.reload(false);
                        })
                    });
                });
            }
            else {
                updateDoc(itemUse, updateItem).then(snap => {
                    window.location.reload(false);
                })
            }
        }
        else {
            const imageRef = ref(storage, `img/${imageUpload.name + Math.floor(Math.random() * 1000) + 1}`);
            uploadBytes(imageRef, imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    const newItColle = collection(db, 'items')
                    updateItem.pictureUrl = url
                    addDoc(newItColle, updateItem).then((y) => { navigate(`/products/item/${y.id}`) })
                });
            })
        }

    }
    function changeComp(name, from) {
        if (from === 'cat') {
            setrefInputCat(name)
        }
        else {
            setrefInputCom(name)
        }
    }
    function fileItmeChange(evt) {
        setImageUpload(evt.target.files[0])
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
                    <div className="file-input">
                        <input
                            required={obli}

                            disabled={disa}
                            type="file"
                            name="file-input"
                            id="file-input"
                            className="file-input__input"

                            onChange={fileItmeChange}

                            accept="image/png, image/jpeg"
                        />
                        <label className="file-input__label" htmlFor="file-input">
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="upload"
                                className="svg-inline--fa fa-upload fa-w-16"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                ></path>
                            </svg>
                            <span>Change the picture</span></label
                        >
                    </div>
                </div>
                <form onSubmit={save} className="details">
                    <h2 className="priceInfo">Title: <input required ref={refInputTitle} disabled={disa} className="inputNormal" /></h2>
                    <h2 className="ittleEspe">Product description:</h2>
                    <textarea className="pDetail textInput" required disabled={disa} ref={refInputDes} />
                    <h2 className="priceInfo">Price: $<input required min={0} disabled={disa} type="number" ref={refInputPrice} className="inputNormal" /></h2>

                    <h2 className="priceInfo white">Stock: <input required min={0} disabled={disa} type="number" ref={refInputStock} className="inputNormal" /></h2>

                    <h2 className="priceInfo">Company: <CompanyChan curr={product.company} funt={changeComp} /></h2>
                    <h2 className="priceInfo">Category: <CategoryChan disabled={disa} curr={product.category} funt={changeComp} /></h2>
                    <button className="sumButtom" disabled={disa || disa2} type="submit">Save Changes</button>
                </form>

            </section>
        </div>
    )
}
export default ItemDetail;