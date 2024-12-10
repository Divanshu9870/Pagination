import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// import './Pagination.css'

function Pagination() {

let [data,setdata]=useState([])
let [currentPage, setcurrentpage]=useState(1)
let [rowsperpage,setrowspage]=useState(10)

let indexoflastpage=currentPage*rowsperpage
let indexoffirst=indexoflastpage-rowsperpage

let currentitems=data?.users?.slice(indexoffirst,indexoflastpage)

let totalpage=Math.ceil(data?.total/rowsperpage)
 
let fetchdata=async()=>{
    let getdata=await fetch(`https://dummyjson.com/users?limit=0`)
    let info = await getdata.json()
    setdata(info)
   
}


useEffect(()=>{
    document.title='Pagination'
    fetchdata()
},[])

let handlePrev=()=>{
    setcurrentpage((prev)=>Math.max(prev-1,1))
}
let handleNext=()=>{
    setcurrentpage((prev)=>Math.min(prev+1,totalpage))
}
let handlePage=(page)=>{
    setcurrentpage(page+1)
}


return (
    <div >
        <h1 style={{textAlign:'center',marginTop:'10px',color:'Blue'}}>Pagination</h1>
        <Table style={{marginTop:'25px'}} striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>E-mail</th>
        </tr>
      </thead>
     

      {
        currentitems && currentitems.map((ele,ind)=>{
            return <tbody>
                <tr key={ind}>
                <td>{ele?.firstName}</td>
                <td>{ele?.username}</td>
                <td>{ele?.email}</td>
                </tr>
             </tbody>

        })
        
      }
      </Table>
   
       <div style={{marginLeft:'35px'}}>
       <Button onClick={handlePrev} variant="success" disabled={currentPage===1}>Prev</Button>
       {
        Array.from({length:totalpage},(_,index)=>(
            <Button onClick={()=>handlePage(index)}
             className= { currentPage===index+1?'active mx-2 btn btn-primary':'mx-2 btn btn-success'}>{index+1}</Button>
        ))
       }
       <Button onClick={handleNext} variant="success" disabled={currentPage===totalpage}>Next</Button>
       </div>
    </div>
  )
}

export default Pagination