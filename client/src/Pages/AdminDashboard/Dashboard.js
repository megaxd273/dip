
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $axi from "../../http/index";

const Dashboard = ()=>{
    const navigate = useNavigate();
    const [users,setUsers]= useState([]);
    const handleLogout = async () => {
        await $axi.post('/api/auth/logout');
        localStorage.removeItem('accessToken');
        navigate('/');
      };

    useEffect(()=>{
      const fetchUsers = async ()=>{
        const response = await $axi.get('/api/admin/users');
        console.log(response)
        setUsers(response.data)
      };
      fetchUsers();
    }, []);
  return (
    <div>
      <div className="sidebar">
        {users.map((user) => (
          <div key={user.id}>
            <p>{`${user.id} <${user.password}> ${user.login} ${user.role} `}</p>
          </div>
        ))}
      </div>
      <div className="content">
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}
export default Dashboard;