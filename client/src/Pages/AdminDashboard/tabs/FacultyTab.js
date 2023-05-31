import React, { useEffect, useState } from "react";
import AdminService from "../../../service/AdminService";
import "./faculty.css";

const FacultyTab = () => {
  const [faculties, setFaculties] = useState([]);
  const [editingFacultyId, setEditingFacultyId] = useState(null);
  const [createFacultyName, setCreateFacultyName] = useState("");
  const [editFacultyName, setEditFacultyName] = useState("");

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await AdminService.getFaculties();
      setFaculties(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createFaculty = async () => {
    if (!createFacultyName) {
      alert("Имя факультета не может быть пустым");
      return;
    }

    try {
      const response = await AdminService.createFaculty({ name: createFacultyName });
      setFaculties([...faculties, response.data]);
      setCreateFacultyName("");
    } catch (error) {
      console.log(error);
    }
  };

  const startEditingFaculty = (id, name) => {
    setEditingFacultyId(id);
    setEditFacultyName(name);
  };

  const cancelEditingFaculty = () => {
    setEditingFacultyId(null);
    setEditFacultyName("");
  };

  const saveFaculty = async (id) => {
    if (!editFacultyName) {
      alert("Имя факультета не может быть пустым");
      return;
    }

    try {
      await AdminService.updateFaculty(id, { name: editFacultyName });
      const updatedFaculties = faculties.map((faculty) =>
        faculty.id === id ? { ...faculty, name: editFacultyName } : faculty
      );
      setFaculties(updatedFaculties);
      setEditingFacultyId(null);
      setEditFacultyName("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await AdminService.deleteFaculty(id);
      const filteredFaculties = faculties.filter((faculty) => faculty.id !== id);
      setFaculties(filteredFaculties);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="faculty-tab">
      <div className="faculty-control">
        <h2>Управление факультетами</h2>
        <div>
          <h3>Создать факультет</h3>
          <input
            type="text"
            value={createFacultyName}
            onChange={(e) => setCreateFacultyName(e.target.value)}
          />
          <button onClick={createFaculty}>Создать</button>
        </div>
      </div>
      <div className="faculty-list">
        <h3>Список факультетов</h3>
        {faculties.map((faculty) => (
          <div className="faculty-item" key={faculty.id}>
            <div className="faculty-item-content">
              {editingFacultyId === faculty.id ? (
                <div className="edit-input">
                  <input
                    type="text"
                    value={editFacultyName}
                    onChange={(e) => setEditFacultyName(e.target.value)}
                  />
                </div>
              ) : (
                <span>{faculty.name}</span>
              )}
              <div className="edit-buttons">
                {editingFacultyId === faculty.id ? (
                  <>
                    <button onClick={() => saveFaculty(faculty.id)}>Сохранить</button>
                    <button onClick={cancelEditingFaculty}>Отмена</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditingFaculty(faculty.id, faculty.name)}>
                      Изменить
                    </button>
                    <button onClick={() => deleteFaculty(faculty.id)}>Удалить</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyTab;
