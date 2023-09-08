import React, { useEffect, useState } from 'react'
import {Card } from 'react-bootstrap'
import LoadingSpinner from '../components/LoadingSpinner'
import { useParams } from "react-router-dom"
import {allUsers} from "../services/allApi"
import { BASE_URL } from '../services/baseUrl'

function View() {

    const {id} = useParams()
    const [user,setUser] = useState({})
    const [showSpin,setShowSpin]= useState(true)

    const getuser = async ()=>{
        const {data} = await allUsers("")
        setUser(data.find(item=>item._id===id));  

    }
    console.log(user);
    useEffect(()=>{
        getuser()
        setTimeout(()=>{
            setShowSpin(false)
        },2000);
    },[]);
  return (
   <>
    {showSpin ?(
         <LoadingSpinner/>
        ) : (
   <div className='container' >
    { user?
        <Card className='shadow col-lg-6 mx-auto mt-5 p-3' >
    <div className='image text-center' >
        <img
             style={{ width: "150px", height: "155px", borderRadius: "50%" }}
            src={`${BASE_URL}/uploads/${user.profile}`}
            alt=""
          />
    </div>
    <div className='text-center mt-3' >
        <h2>{user.fname} {user.lname}</h2>
        <h5>Email: {user.email}</h5>
        <h5>phone:{user.mobile}</h5>
        <h5>Gender:{user.gender}</h5>
        <h5>Status:{user.status}</h5>
        <h5>Location:{user.location}</h5>
    </div>
    </Card>:""
    }
   </div>
   )}
   </>
  )
}

export default View