import React, { useContext } from 'react';
import './css/Navbar.css';
import logo from './css/media/logo_bntu_2018.png'
import { context } from '../..';
import { observer } from 'mobx-react-lite';

const Navbar = observer(({ selectedTab, setSelectedTab }) => {
  const { store } = useContext(context)
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src={logo}
          alt="bntu"
        />
      </div>
      <ul className="navbar-menu">
        {store.user.role === 'ADMIN' && (
          <>
            <li
              className={`navbar-menu-item ${selectedTab === "def" ? "active" : ""}`}
              onClick={() => handleTabChange("def")}
            >
              Все пользователи
            </li>
            <li
              className={`navbar-menu-item ${selectedTab === "depheads" ? "active" : ""}`}
              onClick={() => handleTabChange("depheads")}
            >
              Зав. кафедрой
            </li>
            <li
              className={`navbar-menu-item ${selectedTab === "departments" ? "active" : ""
                }`}
              onClick={() => handleTabChange("departments")}
            >
              Кафедры
            </li>
            <li
              className={`navbar-menu-item ${selectedTab === "faculties" ? "active" : ""
                }`}
              onClick={() => handleTabChange("faculties")}
            >
              Факультеты
            </li>
          </>
        )}
        {store.user.role === 'DEPARTMENT_HEAD' && (
          <>
            <li
              className={`navbar-menu-item ${selectedTab === "def" ? "active" : ""}`}
              onClick={() => handleTabChange("def")}
            >
              Профиль
            </li>
            <li
              className={`navbar-menu-item ${selectedTab === "depheads" ? "active" : ""}`}
              onClick={() => handleTabChange("methodists")}
            >
              Методисты
            </li>
            <li
              className={`navbar-menu-item ${selectedTab === "departments" ? "active" : ""
                }`}
              onClick={() => handleTabChange("teachers")}
            >
              Преподаватели
            </li>
            
          </>
        )}

      </ul>
      <div className='.navbar-user'>
        {store.user.login}
      </div>
      <div className='.logout'>
        <button className='.logout-button' onClick={()=>store.logout()}>
                Выйти
        </button>
      </div>
    </nav>
  );
});

export default Navbar;
