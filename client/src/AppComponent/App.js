import { useContext, useEffect, useState } from 'react';
import { context } from '..';
import Login from '../Pages/AuthPage/Login/Login';
import { observer } from "mobx-react-lite"
import Navbar from '../components/Navbar/Navbar';
import AdminDashboard from '../Pages/AdminDashboard/AdminDashboard';
import DepHeadDashboard from '../Pages/DepartmentHeadDashboard/DepartmentHeadDashboard';
import TeacherDashboard from '../Pages/TeacherDashboard/TeacherDashboard';
import Methboard from '../Pages/MethodistDasboard/board';

function App() {
  const { store } = useContext(context)
  const [selectedTab, setSelectedTab] = useState("");
  useEffect(() => {
    setSelectedTab("def");
    if (localStorage.getItem('accessToken')) {
      store.checkAuth()
    }
  }, [])
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
      {store.user.role ==="TEACHER" && <TeacherDashboard selectedTab={selectedTab} />}
      {store.user.role ==="METHODIST" && <Methboard selectedTab={selectedTab}/>}
      
    </div>
  );
}

export default observer(App);