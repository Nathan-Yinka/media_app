import { routeConstants } from '@/constants/route-const';
import { handleLogout } from '@/helpers/auth';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();


    useEffect(()=>{
        handleLogout()
        navigate(routeConstants.login)
    },[])
  return (
    <div></div>
  )
}

export default Logout