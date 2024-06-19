import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetUserById } from '../../../services/Users';
import toast from 'react-hot-toast';
import Loader from '../../../components/ui/Loader';
import UserForm from '../../../components/Users/UserForm';

const UpdateUserPage = () => {

  const { id } = useParams();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const user = await GetUserById(id);
        setUser(user);
      } catch (error) {
        toast.error('Something went wrong while fetching user');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id])

  if(loading) return <Loader />

  return (
    <div>
      <UserForm {...user} id={id} />
    </div>
  )
}

export default UpdateUserPage