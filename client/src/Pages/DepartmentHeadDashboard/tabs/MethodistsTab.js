import React, { useEffect, useState } from "react";
import DepHeadService from "../../../service/DepHeadService";
import '../../AdminDashboard/tabs/DepHeads.css';

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

const MethodistTab = () => {
  const [methodists, setMethodists] = useState([]);
  const [newMethodist, setNewMethodist] = useState({
    login: "",
    password: "",
    role: "METHODIST",
    firstName: "",
    lastName: "",
    middleName: "",
    facultyId: "",
    departmentId: "",
  });
  const [faculties, setFaculties] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  useEffect(() => {
    fetchMethodists();
    fetchFaculties();
    fetchDepartments();
  }, []);

  const fetchMethodists = async () => {
    try {
      const response = await DepHeadService.getMethodists();
      console.log(response.data)
      setMethodists(response.data);
    } catch (error) {
      console.log("Failed to fetch methodists:", error);
    }
  };

  const fetchFaculties = async () => {
    try {
      const response = await DepHeadService.getFaculties();
      setFaculties(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await DepHeadService.getDepartments();
      setAllDepartments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMethodist = async (id) => {
    try {
      await DepHeadService.deleteMethodist(id);
      fetchMethodists(); // Refresh the list of methodists
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePassword = async (id) => {
    try {
      const response = await DepHeadService.updateMethodistPassword(id);
      alert(`Новый пароль ${response.data.newPassword}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateMethodist = async (e) => {
    e.preventDefault();
    try {
      await DepHeadService.createMethodist(newMethodist);
      fetchMethodists(); // Refresh the list of methodists
      setNewMethodist({
        login: "",
        password: "",
        role: "METHODIST",
        firstName: "",
        lastName: "",
        middleName: "",
        facultyId: "",
        departmentId: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMethodist((prevMethodist) => ({
      ...prevMethodist,
      [name]: value,
    }));
  };

  const handleFacultyChange = (e) => {
    const facultyId = e.target.value;
    setNewMethodist((prevMethodist) => ({
      ...prevMethodist,
      facultyId,
      departmentId: "", // Reset the department selection when changing faculty
    }));
    filterDepartmentsByFacultyId(facultyId);
  };

  const filterDepartmentsByFacultyId = (facultyId) => {
    const filtered = allDepartments.filter(
      (department) => department.facultyId === +facultyId
    );
    setFilteredDepartments(filtered);
  };

  return (
    <div className="department-container">
      <div className="department-heads">
        <h2>Список методистов</h2>
        {methodists.map((methodist) => (
          <div key={methodist.id} className="department-head">
            <div>
              Логин: {methodist.login} | Роль: {getRoleName(methodist.role)}
            </div>
            <div>
              Имя: {methodist.profile.firstName} | Фамилия: {methodist.profile.lastName} | Отчество: {methodist.profile.middleName}
            </div>
            <div>
              Факультет: {faculties.find((faculty) => faculty.id === methodist.profile.facultyId)?.name} |
              Кафедра: {allDepartments.find((dep) => dep.id === methodist.profile.departmentId)?.name}
            </div>
            <div className="buttons">
              <button onClick={() => handleUpdatePassword(methodist.id)}>
                Обновить пароль
              </button>
              <button onClick={() => handleDeleteMethodist(methodist.id)}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="create-department-head">
        <h2>Создание методиста</h2>
        <form onSubmit={handleCreateMethodist}>
          <label>
            Логин:
            <input
              type="text"
              name="login"
              value={newMethodist.login}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Пароль:
            <input
              type="password"
              name="password"
              value={newMethodist.password}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Факультет:
            <select
              name="facultyId"
              value={newMethodist.facultyId}
              onChange={handleFacultyChange}
            >
              <option value="">Выберите факультет</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Кафедра:
            <select
              name="departmentId"
              value={newMethodist.departmentId}
              onChange={handleInputChange}
            >
              <option value="">Выберите кафедру</option>
              {filteredDepartments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Имя:
            <input
              type="text"
              name="firstName"
              value={newMethodist.firstName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Фамилия:
            <input
              type="text"
              name="lastName"
              value={newMethodist.lastName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Отчество:
            <input
              type="text"
              name="middleName"
              value={newMethodist.middleName}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Создать</button>
        </form>
      </div>
    </div>
  );
};

export default MethodistTab;
