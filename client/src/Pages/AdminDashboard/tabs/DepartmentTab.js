import React, { useEffect, useState } from "react";
import AdminService from "../../../service/AdminService";
import "./Dep.css";

const DepartmentTab = () => {
  const [departments, setDepartments] = useState([]);
  const [createDepartmentName, setCreateDepartmentName] = useState("");
  const [createDepartmentFaculty, setCreateDepartmentFaculty] = useState("");
  const [editDepartmentId, setEditDepartmentId] = useState(null);
  const [editDepartmentName, setEditDepartmentName] = useState("");
  const [editDepartmentFaculty, setEditDepartmentFaculty] = useState("");
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetchDepartments();
    fetchFaculties();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await AdminService.getDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFaculties = async () => {
    try {
      const response = await AdminService.getFaculties();
      console.log(response.data);
      setFaculties(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createDepartment = async () => {
    if (!createDepartmentName || !createDepartmentFaculty) {
      alert("Имя отдела и факультет не могут быть пустыми");
      return;
    }

    try {
      const selectedFaculty = faculties.find(
        (faculty) => faculty.name === createDepartmentFaculty
      );
      if (!selectedFaculty) {
        alert("Выбранный факультет не найден");
        return;
      }

      await AdminService.createDepartment(
        createDepartmentName,
        selectedFaculty.id
      );
      setCreateDepartmentName("");
      setCreateDepartmentFaculty("");
      fetchDepartments();
    } catch (error) {
      console.log(error);
    }
  };

  const startEditingDepartment = (id, name, facultyName) => {
    setEditDepartmentId(id);
    setEditDepartmentName(name);
    setEditDepartmentFaculty(facultyName);
  };

  const cancelEditingDepartment = () => {
    setEditDepartmentId(null);
    setEditDepartmentName("");
    setEditDepartmentFaculty("");
  };

  const saveDepartment = async (id) => {
    if (!editDepartmentName || !editDepartmentFaculty) {
      alert("Имя отдела и факультет не могут быть пустыми");
      return;
    }

    try {
      const selectedFaculty = faculties.find(
        (faculty) => faculty.name === editDepartmentFaculty
      );
      if (!selectedFaculty) {
        alert("Выбранный факультет не найден");
        return;
      }

      await AdminService.updateDepartment(
        id,
        editDepartmentName,
        selectedFaculty.id
      );
      setEditDepartmentId(null);
      setEditDepartmentName("");
      setEditDepartmentFaculty("");
      fetchDepartments();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDepartment = async (id) => {
    try {
      await AdminService.deleteDepartment(id);
      fetchDepartments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="faculty-tab">
      <div className="faculty-control">
        <h2>Управление кафедрами</h2>
        <div>
          <h3>Имя кафедры:</h3>
          <input
            type="text"
            placeholder="Введите имя кафедры"
            value={createDepartmentName}
            onChange={(e) => setCreateDepartmentName(e.target.value)}
            className="department-input"
          />
        </div>
        <div>
          <h3>Факультет:</h3>
          <select
            value={createDepartmentFaculty}
            onChange={(e) => setCreateDepartmentFaculty(e.target.value)}
            className="department-select"
          >
            <option value="">Выберите факультет</option>
            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.name}>
                {faculty.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={createDepartment} className="department-button">
          Создать
        </button>
      </div>
      <div className="faculty-list">
        <h3>Список кафедр</h3>
        {departments.map((department) => (
          <div
            key={department.id}
            className={`faculty-item ${
              editDepartmentId === department.id ? "active" : ""
            }`}
          >
            <div className="faculty-item-content">
              <div className="divspan">
                <span>{department.name}</span>
                <span>{faculties.find((faculty) => faculty.id === department.facultyId)?.name}</span>
              </div>
              {editDepartmentId === department.id ? (
                <div className="edit-input">
                  <input
                    type="text"
                    placeholder="Имя кафедры"
                    value={editDepartmentName}
                    onChange={(e) => setEditDepartmentName(e.target.value)}
                    className="department-input"
                  />
                  <select
                    value={editDepartmentFaculty}
                    onChange={(e) => setEditDepartmentFaculty(e.target.value)}
                    className="department-select"
                  >
                    <option value="">Выберите факультет</option>
                    {faculties.map((faculty) => (
                      <option key={faculty.id} value={faculty.name}>
                        {faculty.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => saveDepartment(department.id)}
                    className="department-button"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={cancelEditingDepartment}
                    className="department-button"
                  >
                    Отмена
                  </button>
                </div>
              ) : (
                <div className="edit-buttons">
                  <button
                    onClick={() =>
                      startEditingDepartment(
                        department.id,
                        department.name,
                        department.faculty
                      )
                    }
                    className="department-button"
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => deleteDepartment(department.id)}
                    className="department-button"
                  >
                    Удалить
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentTab;
