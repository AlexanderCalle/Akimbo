import React, { useEffect, useState } from 'react'
import { GetUsers } from '../../services/Users';
import Loader from '../ui/Loader';
import Table from '../ui/TableComponent/Table';
import TableHead from '../ui/TableComponent/TableHead';
import TableHeadItem from '../ui/TableComponent/TableHeadItem';
import TableBody from '../ui/TableComponent/TableBody';
import TableRow from '../ui/TableComponent/TableRow';
import UserItem from './UserItem';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);

      GetUsers()
        .then(result => {
          setUsers(result);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }

    fetchData();
  }, [])

  if(isLoading) return <Loader />

  return (
    <div>
      <div className="w-full flex justify-between mb-5">
        <h2 className="text-2xl self-center lg:self-start font-medium underline">
          Overview Articles
        </h2>
        <div className="flex gap-2">
          <Link to={"/dashboard/users/create"} className='bg-akimbo-dark-900 px-3 py-1 text-akimbo-light hover:bg-akimbo-dark-500'>New user</Link>
        </div>
      </div>
      <div className='mb-5'>
        <Table>
          <TableHead>
            <TableHeadItem name="Full name" isSortable />
            <TableHeadItem name="Email" isSortable />
            <TableHeadItem name="Bio" />
            <TableHeadItem name="Description" />
            <TableHeadItem />
          </TableHead>
          <TableBody>
            {
              users.length > 0 ? (
                users.map(user => (
                  <UserItem user={user} />
                ))
              ) : (
                <TableRow>
                  <p>No users found</p>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default UsersList