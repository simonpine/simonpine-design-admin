import { useState, useEffect } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Chart({color, cat1, cat2}) {
    const [data1, setData1] = useState('')
    const [data2, setData2] = useState([])

    useEffect(() => {
        const db = getFirestore()
        const itemsColection2 = collection(db, cat1)

        if(cat1 === 'items') {
            getDocs(itemsColection2).then((snap) => {
              const nameOfProducts = (snap.docs.map((c) => {
                let a = { name: c.data().title, 'Were sold': 0 }
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
                  if(item){
                    const index = a.findIndex(object => {
                      return object.name === item.title;
                    })
                    a[index]['Were sold'] += item.number
                  }
                })
                setData2(a)
              })
            })
        }
        else{
            getDocs(itemsColection2).then((snap) => {
                const nameOfProducts = (snap.docs.map((c) => {
                  let a = { name: c.data().name, 'Were sold': 0 }
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
                    if(item){
                      const index = a.findIndex(object => {
                        return object.name === item.category;
                      })
                      a[index]['Were sold'] += item.number
                    }
                  })
                  setData2(a)
                })
              })
        }
    }, [])
    return (
      <>
          <BarChart
            width={500}
            height={300}
            data={data2}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick=""/>
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="pv" fill="#8884d8" /> */}
            <Bar dataKey="Were sold" fill={color} />
          </BarChart>
      </>
    );
  }
  
  export default Chart;