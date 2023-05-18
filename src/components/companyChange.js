
import { useState, useEffect } from 'react'
import { collection, getDocs, getFirestore } from "firebase/firestore"
function CompanyChan({ funt, curr }) {
    const [options, setOptions] = useState([])

    useEffect(() => {
        const db = getFirestore()
        const itemsColection = collection(db, 'company')
        getDocs(itemsColection).then((snap) => {
            const prov = []
            snap.docs.map((c) => {
                prov.push(c.data().name)
            })
            setOptions(prov)
        })
    }, [])
    const changeValue = (evt) => {
        funt(evt.target.value, 'com')
    }
    return (



        <select id="company" className='companysContainer' onChange={changeValue}>
            <optgroup label="Current">
                <option value={curr}>{curr}</option>
            </optgroup>
            <optgroup label="Others">
            {options.map(option => {
                if (option === curr){
                    return null
                }
                return (
                    <option key={`company${option}`} className='companys'>{option}</option>
                )
            })}
            </optgroup>
        </select>


    )
}
export default CompanyChan;