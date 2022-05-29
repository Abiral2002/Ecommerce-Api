import {useDispatch} from "react-redux"
import { login } from "../store/userSlice"
import { useEffect, useState } from "react"
import axios from "axios"



const onStateChange= function onStateChange(callback) {
    axios.get(
      "http://localhost:65000/user/auth/user-logged-in"
      ,{
        withCredentials:true
      }
    ).then(response=>{
      callback(response.data,null)
    }).catch(err=>{
      callback(null,null)
    })
  }

const EffectHook=()=>{
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    onStateChange((success,err)=>{
      setLoading(false)
      if (success) dispatch(login(success.data))
    })
  },[dispatch])
  return loading
}

const $=(element)=>document.querySelector(element)


export default EffectHook 
export {onStateChange, $}