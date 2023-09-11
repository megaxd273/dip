import React, { useEffect, useState } from 'react';
import MethodistService from '../../../service/MethodistService';
import './add.css'
import FileSaver from 'file-saver';

const AddendumTab = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [addendum, setAddendum] = useState(null);
  const [editingAddendum, setEditingAddendum] = useState(null);
  

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const teachers = await MethodistService.getTeachers();
      setTeachers(teachers);
    } catch (error) {
      console.log('Error fetching teachers:', error);
    }
  };

  const handleTeacherChange = (e) => {
    setSelectedTeacherId(e.target.value);
    setAddendum(null);
  };

  const fetchAddendum = async () => {
    try {
      const response = await MethodistService.getAddendum(selectedTeacherId);
      setAddendum(response.data);
    } catch (error) {
      console.log('Error fetching addendum:', error);
    }
  };
  const handlePrintContract = async () => {
    try {
      const response = await MethodistService.printAddendum(selectedTeacherId);
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      FileSaver.saveAs(blob, 'addendum.docx');
    } catch (error) {
      console.log('Error printing add:', error);
    }
  };

  const createAddendum = async () => {
    try {
      await MethodistService.createAddendum(selectedTeacherId);
      fetchAddendum();
    } catch (error) {
      alert('Error creating addendum:', error);
    }
  };

  const deleteAddendum = async () => {
    try {
      await MethodistService.deleteAddendum(selectedTeacherId);
      setAddendum(null);
    } catch (error) {
      alert('Error deleting addendum:', error);
    }
  };

  const handleActivityChange = (e, activityName) => {
    const { value } = e.target;
    setEditingAddendum((prevState) => ({
      ...prevState,
      activity: {
        ...prevState.activity,
        [activityName]: value,
      },
      addendumVolume: calculateContractVolume(prevState.activity, activityName, value),
    }));
  };
  const calculateContractVolume = (activity, changedActivityName, changedActivityValue) => {
    const sum = Object.entries(activity).reduce((acc, [activityName, value]) => {
      if (activityName === changedActivityName) {
        return acc + Number(changedActivityValue);
      }
      return acc + Number(value);
    }, 0);
    return sum.toString();
  };

  const handleEditFieldChange = (e) => {
    const { name, value } = e.target;
    setEditingAddendum((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateAddendum = async () => {
    try {
      await MethodistService.updateAddendum(selectedTeacherId, editingAddendum);
      fetchAddendum();
      setEditingAddendum(null);
    } catch (error) {
      alert('Error updating addendum:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingAddendum(null);
  };

  useEffect(() => {
    if (selectedTeacherId) {
      fetchAddendum();
    }
  }, [selectedTeacherId]);

  return (
    <div>
      <label htmlFor="teacher-select">Выберите учителя:</label>
      <select className="teacher-select" value={selectedTeacherId} onChange={handleTeacherChange}>
        <option value="">Выбор учителя</option>
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.profile.lastName} {teacher.profile.firstName} {teacher.profile.middleName}
          </option>
        ))}
      </select>

      {addendum ? (
        <div className="addendum-tab">
          <h2>Дополненительное соглашение № {addendum.addendumNumber}</h2>
          <p>от: {addendum.addendumDate}</p>
          <p>Объем дополнения: {addendum.addendumVolume}</p>
          <p>К договору №: {addendum.contractNumber}</p>
          <p>от: {addendum.contractDate}</p>
          <h3>Деятельность</h3>
          {editingAddendum ? (
            <form>
              <h2>
                Дополнительное соглашение №
                <input
                  type="text"
                  name="addendumNumber"
                  value={editingAddendum.addendumNumber}
                  onChange={handleEditFieldChange}
                />
              </h2>
              <p>
                от:
                <input
                  type="text"
                  name="addendumDate"
                  value={editingAddendum.addendumDate}
                  onChange={handleEditFieldChange}
                />
              </p>
              <p>
                Объем дополнения:
                <input
                  type="text"
                  name="addendumVolume"
                  value={editingAddendum.addendumVolume}
                  onChange={handleEditFieldChange}
                />
              </p>
              <table>
                <tbody>
                  {Object.entries(addendum.activity).map(([field, value]) => (
                    <tr key={field}>
                      <td>{field}</td>
                      <td>
                        <input
                          type="text"
                          name={field}
                          value={editingAddendum.activity[field]}
                          onChange={(e) => handleActivityChange(e, field)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" onClick={updateAddendum}>Сохранить</button>
              <button type="button" onClick={handleCancelEdit}>Отменить</button>
            </form>
          ) : (
            <div>
              <table>
                <tbody>
                  {Object.entries(addendum.activity).map(([field, value]) => (
                    <tr key={field}>
                      <td>{field}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={() => handlePrintContract()}>Сохранить docx</button>
              <button type="button" onClick={() => setEditingAddendum(addendum)}>Изменить</button>
              <button type="button" onClick={deleteAddendum}>Удалить дополнение</button>
            </div>
          )}
        </div>
      ) : (
        <p>{selectedTeacherId ? 'У выбранного учителя нет дополнения' : 'Выберите учителя'}</p>
      )}

      {selectedTeacherId && !addendum && (
        <button onClick={createAddendum}>Создать дополнение</button>
      )}
    </div>
  );
};

export default AddendumTab;
