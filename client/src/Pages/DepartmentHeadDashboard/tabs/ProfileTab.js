import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { context } from "../../..";
import DepHeadService from "../../../service/DepHeadService";
import './ProfileTab.css'

const ProfileTab = observer(() => {
    const { store } = useContext(context);
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [faculties, setFaculties] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
  
    useEffect(() => {
      fetchProfileData();
      fetchFaculties();
      fetchDepartments();
    }, []);
  
    const fetchProfileData = async () => {
      try {
        const response = await DepHeadService.getProfile(store.user.id);
        setProfileData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
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
        if (formData.facultyId) {
          filterDepartmentsByFacultyId(formData.facultyId);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleFacultyChange = (e) => {
      const facultyId = e.target.value;
      setFormData((prev)=>({
        ...prev,
        facultyId,
        departmentId:""
      }))
      filterDepartmentsByFacultyId(facultyId);
    };
  
    const filterDepartmentsByFacultyId = (facultyId) => {
      const filtered = allDepartments.filter(
        (department) => department.facultyId === +facultyId
      );
      setFilteredDepartments(filtered);
    };
  
    const handleEditClick = () => {
      setIsEditing(true);
      filterDepartmentsByFacultyId(formData.facultyId);
    };
  
    const handleCancelClick = () => { 
      setIsEditing(false);
      setFormData(profileData);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        await DepHeadService.updateProfile(store.user.id, formData);
        setProfileData(formData);
        setIsEditing(false);
        fetchProfileData()
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    };
  
    if (!profileData) {
      return <div>Loading...</div>;
    }
  
    return (
        <div className="profile-tab">
          {isEditing ? (
            <div>
              <h2>Изменение профиля</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <label className="form-label">Фамилия:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Имя:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Отчество:</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName || ""}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Факультет:</label>
                  <select
                    name="facultyId"
                    value={formData.facultyId || ""}
                    onChange={handleFacultyChange}
                    className="form-select"
                  >
                    <option value="">Select Faculty</option>
                    {faculties.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <label className="form-label">Кафедра:</label>
                  <select
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Выбрать кафедру</option>
                    {filteredDepartments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>
    
                <div className="form-buttons">
                  <button type="submit" className="form-button">Сохранить</button>
                  <button onClick={handleCancelClick} className="form-button">Отмена</button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h2>Профиль</h2>
              <div className="profile-row">
                <label className="profile-label">Фамилия:</label>
                <span>{profileData.lastName}</span>
              </div>
              <div className="profile-row">
                <label className="profile-label">Имя:</label>
                <span>{profileData.firstName}</span>
              </div>
              <div className="profile-row">
                <label className="profile-label">Отчество:</label>
                <span>{profileData.middleName}</span>
              </div>
              <div className="profile-row">
                <label className="profile-label">Факультет:</label>
                <span>
                  {faculties.find((faculty) => faculty.id === profileData.facultyId)?.name}
                </span>
              </div>
              <div className="profile-row">
                <label className="profile-label">Кафедра:</label>
                <span>
                  {allDepartments.find((dep) => dep.id === profileData.departmentId)?.name}
                </span>
              </div>
              <button onClick={handleEditClick} className="profile-button">Изменить</button>
            </div>
          )}
        </div>
      );
    });
    
    export default ProfileTab;
  
