import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { context } from "../../..";
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

const TeacherTab = observer(() => {
  const {store} = useContext(context)
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    login: "",
    password: "",
    role: "TEACHER",
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
    fetchTeachers();
    fetchFaculties();
    fetchDepartments();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await DepHeadService.getTeachers(store.faculty);
      setTeachers(response.data);
    } catch (error) {
      console.log(error.response?.data?.message);
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

  const handleDeleteTeacher = async (id) => {
    try {
      await DepHeadService.deleteTeacher(id);
      fetchTeachers(); // Refresh the list of teachers
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePassword = async (id) => {
    try {
      const response = await DepHeadService.updateTeacherPassword(id);
      alert(`Новый пароль ${response.data.newPassword}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    try {
      await DepHeadService.createTeacher(newTeacher);
      fetchTeachers(); // Refresh the list of teachers
      setNewTeacher({
        login: "",
        password: "",
        role: "TEACHER",
        firstName: "",
        lastName: "",
        middleName: "",
        facultyId: "",
        departmentId: "",
      });
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
  };

  const handleFacultyChange = (e) => {
    const facultyId = e.target.value;
    setNewTeacher((prevTeacher) => ({
      ...prevTeacher,
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
        <h2>Список преподавателей</h2>
        {teachers.map((teacher) => (
          <div key={teacher.id} className="department-head">
            <div>
              Логин: {teacher.login} | Роль: {getRoleName(teacher.role)}
            </div>
            <div>
              Имя: {teacher.profile.firstName} | Фамилия: {teacher.profile.lastName} | Отчество: {teacher.profile.middleName}
            </div>
            <div>
              Факультет: {faculties.find((faculty) => faculty.id === teacher.profile.facultyId)?.name} |
              Кафедра: {allDepartments.find((dep) => dep.id === teacher.profile.departmentId)?.name}
            </div>
            <div className="buttons">
              <button onClick={() => handleUpdatePassword(teacher.id)}>
                Обновить пароль
              </button>
              <button onClick={() => handleDeleteTeacher(teacher.id)}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="create-department-head">
        <h2>Создание преподавателя</h2>
        <form onSubmit={handleCreateTeacher}>
          <label>
            Логин:
            <input
              type="text"
              name="login"
              value={newTeacher.login}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Пароль:
            <input
              type="password"
              name="password"
              value={newTeacher.password}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Факультет:
            <select
              name="facultyId"
              value={newTeacher.facultyId}
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
              value={newTeacher.departmentId}
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
              value={newTeacher.firstName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Фамилия:
            <input
              type="text"
              name="lastName"
              value={newTeacher.lastName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Отчество:
            <input
              type="text"
              name="middleName"
              value={newTeacher.middleName}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Создать</button>
        </form>
      </div>
    </div>
  );
});

export default TeacherTab;
