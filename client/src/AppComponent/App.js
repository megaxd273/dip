import { useContext, useEffect, useState } from 'react';
import { context } from '..';
import Login from '../Pages/AuthPage/Login/Login';
import { observer } from "mobx-react-lite"
import Navbar from '../components/Navbar/Navbar';
import AdminDashboard from '../Pages/AdminDashboard/AdminDashboard';
import DepHeadDashboard from '../Pages/DepartmentHeadDashboard/DepartmentHeadDashboard';

function App() {
  const { store } = useContext(context)
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      store.checkAuth()
    }
  }, [])
  const [selectedTab, setSelectedTab] = useState("def");
  if (store.isLoading) {
    return <div>Загрузка....</div>
  }

  if(!store.isAuth){
    return (
      <div>
        <Login/>
      </div>
      
    )
  }
  return (
    <div>
      <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      {store.user.role ==="ADMIN" && <AdminDashboard selectedTab={selectedTab} />}
      {store.user.role ==="DEPARTMENT_HEAD" && <DepHeadDashboard selectedTab={selectedTab} />}
      
    </div>
  );
}

export default observer(App);