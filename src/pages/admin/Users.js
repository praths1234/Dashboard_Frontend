import React , {useState , useEffect} from 'react'
import AdminMenu from '../../components/AdminMenu';
import Layout from '../../components/Layout';
import axios from 'axios';
const Users = () => {
  const [users , setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/all-users");
        const filteredUsers = response.data.users.filter(user => user.role!==1)
        setUsers(filteredUsers);
      } catch (error) {
        console.error("error fetching users :" , error);
      }
    }
    fetchUsers();
  },[]);
    return (
        <Layout title={"Dashboard - All Users"}>
          <div className="container-fluid m-3 p-3">
            <div className="row">
              <div className="col-md-3">
                <AdminMenu />
              </div>
              <div className='col-md-9'>
                <h2>All users</h2>
                {users.length > 0 ? (
                            <ul>
                                {users.map((user) => (
                                    <li key={user._id}>
                                        <p>Name: {user.name}</p>
                                        <p>Email: {user.email}</p>
                                        <p>Phone: {user.phone}</p>
                                        <p>Address: {user.address}</p>
                                        <p>Role: {user.role}</p>
                                        <hr />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No users found.</p>
                        )}
              </div>
             </div>
             </div>
        </Layout>
      );
};

export default Users;