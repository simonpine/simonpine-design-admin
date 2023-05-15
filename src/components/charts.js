import { useState, useEffect } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Chart({ color, cat1 }) {
  const [data2, setData2] = useState([])

  useEffect(() => {
    const db = getFirestore()
    const itemsColection2 = collection(db, cat1)
    let pronoun
    cat1 === 'items' ? pronoun = 'title' : pronoun = 'name';
    getDocs(itemsColection2).then((snap) => {
      const nameOfProducts = (snap.docs.map((c) => {
        let a = { name: c.data()[pronoun], 'Were sold': 0 }
        return a
      }))
      return nameOfProducts
    }).then((a) => {
      const itemsColection = collection(db, 'orders')
      getDocs(itemsColection).then((snap) => {
        const prov = []
        snap.docs.map((c) => {
          let a = c.data().items
          prov.push(a)
        })
        prov.flat(1).map(item => {
          if (item) {
            const index = a.findIndex(object => {
              return pronoun === "title" ? object.name === item[pronoun] : object.name === item[cat1];
            })
            a[index]['Were sold'] += item.number
          }
        })
        a.map((item) => {
          return cat1 === 'items' ? item.name = `${item.name}` : item.name = `${item.name} products`
        })
        setData2(a)
      })
    })
  }, [])
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data2}
        >
          <CartesianGrid strokeDasharray="9 10" />
          <XAxis dataKey="name" tick="" />
          <YAxis />
          <Tooltip itemStyle={{ backgroundColor: '#0c0c0c' }} wrapperStyle={{ backgroundColor: '#0c0c0c' }} contentStyle={{ backgroundColor: '#0c0c0c' }} />
          <Bar dataKey="Were sold" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default Chart;