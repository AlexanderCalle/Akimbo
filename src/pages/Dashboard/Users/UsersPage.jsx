import React, { useEffect, useState } from 'react'
import { GetUser, GetUsers } from '../../../services/Users';
import Loader from '../../../components/ui/Loader';
import UsersList from '../../../components/Users/UsersList';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UsersPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      GetUser().then(result => {

        if(result) {
          if(result.is_admin) return;
        }
        navigate('/dashboard/overview');
      }).catch(err => {
        toast.error(`Something went wrong while fetching user data`);
        navigate('/dashboard/overview');
      })
    }
    fetchData();
  }, []);

 return (
  <div>
    <UsersList />
  </div>
 )
}

export default UsersPage