import React, { useEffect, useState } from "react";
import AdminService from "../../../service/AdminService";
import './DepHeads.css'
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
const DepartmentHeadTab = () => {
    const [departmentHeads, setDepartmentHeads] = useState([]);
    const [newDepartmentHead, setNewDepartmentHead] = useState({
        login: "",
        password: "",
        role: "DEPARTMENT_HEAD",
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
        fetchDepartmentHeads();
        fetchFaculties();
        fetchDepartments();
    }, []);

    const fetchDepartmentHeads = async () => {
        try {
            const response = await AdminService.getUsers();
            const filteredDepartmentHeads = response.data.filter(
                (user) => user.role === "DEPARTMENT_HEAD"
            );
            setDepartmentHeads(filteredDepartmentHeads);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchFaculties = async () => {
        try {
            const response = await AdminService.getFaculties();
            setFaculties(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await AdminService.getDepartments();
            setAllDepartments(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteDepartmentHead = async (id) => {
        try {
            await AdminService.removeUser(id);
            fetchDepartmentHeads(); // Refresh the list of department heads
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdatePassword = async (id) => {
        try {
            const response = await AdminService.updatePassword(id);
            alert(`Новый пароль ${response.data.newPassword}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateDepartmentHead = async (e) => {
        e.preventDefault();
        try {
            await AdminService.createDepartmentHead(newDepartmentHead);
            fetchDepartmentHeads(); // Refresh the list of department heads
            setNewDepartmentHead({
                login: "",
                password: "",
                role: "DEPARTMENT_HEAD",
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
        setNewDepartmentHead((prevDepartmentHead) => ({
            ...prevDepartmentHead,
            [name]: value,
        }));
    };

    const handleFacultyChange = (e) => {
        const facultyId = e.target.value;
        setNewDepartmentHead((prevDepartmentHead) => ({
            ...prevDepartmentHead,
            facultyId,
            departmentId: "", // Reset the department selection when changing faculty
        }));
        filterDepartmentsByFacultyId(facultyId);
    };

    const filterDepartmentsByFacultyId = (facultyId) => {
        // console.log(allDepartments.filter(item => item.facultyId === facultyId))
        const filtered = allDepartments.filter(
            (department) => department.facultyId === +facultyId

        );
        setFilteredDepartments(filtered);
    };

    return (
        <div className="department-container">
            <div className="department-heads">
                <h2>Список заведующих кафедрой</h2>
                {departmentHeads.map((departmentHead) => (
                    <div key={departmentHead.id} className="department-head">
                        <div>
                            Логин: {departmentHead.login} | Роль: {getRoleName(departmentHead.role)}
                        </div>
                        <div>
                            Имя: {departmentHead.profile.firstName} | Фамилия:{" "}
                            {departmentHead.profile.lastName} | Отчество:{" "}
                            {departmentHead.profile.middleName}
                        </div>
                        <div>
                            Факультет:{" "}
                            {faculties.find((faculty) => faculty.id === departmentHead.profile.facultyId)?.name} |
                            Кафедра:{" "}
                            {allDepartments.find((dep) => dep.id === departmentHead.profile.departmentId)?.name}
                        </div>
                        <div className="buttons">
                        <button onClick={() => handleUpdatePassword(departmentHead.id)}>
                            Обновить пароль
                        </button>
                        <button onClick={() => handleDeleteDepartmentHead(departmentHead.id)}>
                            Удалить
                        </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="create-department-head">
                <h2>Создание заведующего кафедрой</h2>
                <form onSubmit={handleCreateDepartmentHead}>
                    <label>
                        Логин:
                        <input
                            type="text"
                            name="login"
                            required
                            value={newDepartmentHead.login}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Пароль:
                        <input
                            type="password"
                            name="password"
                            required
                            value={newDepartmentHead.password}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Факультет:
                        <select
                            name="facultyId"
                            value={newDepartmentHead.facultyId}
                            required
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
                            required
                            value={newDepartmentHead.departmentId}
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
                            value={newDepartmentHead.firstName}
                            required
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Фамилия:
                        <input
                            type="text"
                            name="lastName"
                            value={newDepartmentHead.lastName}
                            required
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Отчество:
                        <input
                            type="text"
                            name="middleName"
                            value={newDepartmentHead.middleName}
                            required
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit">Создать</button>
                </form>
            </div>
        </div>
    );
};

export default DepartmentHeadTab;
