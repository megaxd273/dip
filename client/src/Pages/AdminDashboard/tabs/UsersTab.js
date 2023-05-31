import React, { useEffect, useState } from "react";
import AdminService from "../../../service/AdminService";
import './Users.css'

const getRoleName = (role) => {
  switch (role) {
    case "ADMIN":
      return "Админ";
    case "DEPARTMENT_HEAD":
      return "Зав. кафедры";
    case "METHODIST":
      return "Методист";
    case "TEACHER":
      return "Преподаватель";
    default:
      return "";
  }
};

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [sortField, setSortField] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await AdminService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeUser = async (id) => {
    try {
      await AdminService.removeUser(id);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const sortUsers = (field) => {
    if (field === sortField) {
      setUsers([...users].reverse());
    } else {
      const sortedUsers = [...users].sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
  
        if (aValue === null || aValue === undefined) {
          return 1;
        }
        if (bValue === null || bValue === undefined) {
          return -1;
        }
  
        if (aValue === bValue) {
          return 0;
        }
  
        return aValue.localeCompare(bValue);
      });
      setUsers(sortedUsers);
    }
    setSortField(field);
  };
  

  return (
    <div className="cont">
      <div className="panel">
        <div className="panel-item" onClick={() => sortUsers("login")}>
          Логин
        </div>
        <div className="panel-item" onClick={() => sortUsers("role")}>
          Роль
        </div>
        <div className="panel-name" onClick={() => sortUsers("profile.firstName")}>
          Имя
        </div>
        <div className="panel-item" onClick={() => sortUsers("profile.lastName")}>
          Фамилия
        </div>
        <div className="panel-item" onClick={() => sortUsers("profile.middleName")}>
          Отчество
        </div>
      </div>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <div className="user-info">
              <span className="user-details">
                <span className="user-login">{user.login}</span>
                <span className="user-role">{getRoleName(user.role)}</span>
                <span className="user-name">{user.profile?.firstName}</span>
                <span className="user-name">{user.profile?.lastName}</span>
                <span className="user-name">{user.profile?.middleName}</span>
              </span>
            </div>
            <div className="buttons">
              <button className="button button-delete" onClick={() => removeUser(user.id)}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersTab;
