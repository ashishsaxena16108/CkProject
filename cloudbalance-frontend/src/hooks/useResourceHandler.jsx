import React, { useState } from 'react'
import { fetchApi } from '../axios/fetch';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const useResourceHandler = () => {
  const [ec2, setEc2] = useState([]);
  const [rds, setRds] = useState([]);
  const [asg, setAsg] = useState([]);
  const {role}=useSelector(state=>state.auth.user);
const [loading, setLoading] = useState(false);
  const getResources = ()=>{
    setLoading(true);
    fetchApi.get(`/${role==='USER'?'user':'admin'}/resources`,{timeout:60000})
    .then(response=>{
        console.log(response);
        const {ec2Instances,rdsInstances,asgInstances} = response.data;
        setEc2(ec2Instances);
        setRds(rdsInstances);
        setAsg(asgInstances);
    })
    .catch(error=>toast.error(error.response?.data.message))
    .finally(()=>setLoading(false));
  }
  return {ec2,rds,asg,loading,getResources};
}

export default useResourceHandler