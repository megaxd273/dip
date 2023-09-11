import React, { useEffect, useState } from 'react';
import MethodistService from '../../../service/MethodistService';
import FileSaver from 'file-saver';
import './Meth.css'

const Contracts = ()=>{
    const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [contracts, setContracts] = useState([]);
  const [editableContractId, setEditableContractId] = useState('');
  const [editableContractData, setEditableContractData] = useState({});
  const [editing, setEditing] = useState(false);
  const columnHeaders = [
    "Лекции",
    "Практ. зан.",
    "Лабор. зан.",
    "Курс. проекты",
    "РГР",
    "Контр. раб",
    "Зачеты",
    "Консультации",
    "Экзамены",
    "Рук. практик",
    "Рук. дип. раб.",
    "Конс. дипл. раб.",
    "Реценз. дипл. раб.",
    "ГЭК",
    "Рук. магистр.",
    "Рук. аспирант.",
  ];
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
    if (e.target.value) {
      fetchContracts(e.target.value);
    } else {
      setContracts([]);
    }
  };

  const fetchContracts = async (teacherId) => {
    try {
      const contracts = await MethodistService.getContracts(teacherId);
      setContracts(contracts.data);
    } catch (error) {
      console.log('Error fetching contracts:', error);
    }
  };

  const handlePrintContract = async (contractId) => {
    try {
      const response = await MethodistService.print(selectedTeacherId, contractId);
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      FileSaver.saveAs(blob, 'contract.docx');
    } catch (error) {
      console.log('Error printing contract:', error);
    }
  };

  const handleEditContract = (contractId) => {
    setEditing(true);
    setEditableContractId(contractId);
    const contract = contracts.find((contract) => contract.id === contractId);
    setEditableContractData(contract);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditableContractId('');
    setEditableContractData({});
  };
  const createEmptyContract = async () => {
    try {
      await MethodistService.createContract(selectedTeacherId);
      fetchContracts(selectedTeacherId);
    } catch (error) {
      console.log('Error creating empty contract:', error);
    }
  };

  const handleSaveContract = async () => {
    try {
      await MethodistService.updateContract(editableContractId, editableContractData);
      fetchContracts(selectedTeacherId);
      setEditing(false);
      setEditableContractId('');
      setEditableContractData({});
    } catch (error) {
      console.log('Error updating contract:', error);
    }
  };

  const handleInputChange = (e) => {
    setEditableContractData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleDeleteContract = async (contractId) => {
    try {
      await MethodistService.deleteContract(contractId);
      fetchContracts(selectedTeacherId);
    } catch (error) {
      console.log('Error deleting contract:', error);
    }
  };

  const handleActivityChange = (e, activityName) => {
    const { value } = e.target;
    setEditableContractData((prevState) => ({
      ...prevState,
      activity: {
        ...prevState.activity,
        [activityName]: value,
      },
      contractVolume: calculateContractVolume(prevState.activity, activityName, value),
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
  

  return (
    <div className="methodist-dashboard">
      <h2 className="dashboard-title">Панель договоров</h2>
      <select className="teacher-select" value={selectedTeacherId} onChange={handleTeacherChange}>
        <option value="">Выбор учителя</option>
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.profile.lastName} {teacher.profile.firstName} {teacher.profile.middleName}
          </option>
        ))}
      </select>

      <h3 className="contracts-heading">Договор</h3>
      {selectedTeacherId && contracts.length > 0 ? (
        <ul className="contracts-list">
          {contracts.map((contract) => (
            <li key={contract.id} className="contract-item">
              {editing && editableContractId === contract.id ? (
              
                  <div className="contract-form">
                    <label>Номер договора:</label>
                    <input
                      type="text"
                      name="contractNumber"
                      value={editableContractData.contractNumber || ''}
                      onChange={handleInputChange}
                    />

                    <label>Договор от:</label>
                    <input
                      type="text"
                      name="contractDate"
                      value={editableContractData.contractDate || ''}
                      onChange={handleInputChange}
                    />
                    <label>Объем договора:</label>
                    <input
                      type="text"
                      name="contractVolume"
                      value={editableContractData.contractVolume || ''}
                      onChange={handleInputChange}
                    />
                    <label>В период с:</label>
                    <input
                      type="text"
                      name="contractPeriodStart"
                      value={editableContractData.contractPeriodStart || ''}
                      onChange={handleInputChange}
                    />
                    <label>по:</label>
                    <input
                      type="text"
                      name="contractPeriodEnd"
                      value={editableContractData.contractPeriodEnd || ''}
                      onChange={handleInputChange}
                    />
                    <label>Оплата за счет средств:</label>
                    <input
                      type="text"
                      name="contractPayment"
                      value={editableContractData.contractPayment || ''}
                      onChange={handleInputChange}
                    />
                    <label>Почтовый индекс:</label>
                    <input
                      type="text"
                      name="postcode"
                      value={editableContractData.postcode || ''}
                      onChange={handleInputChange}
                    />
                    <label>Домашний адрес:</label>
                    <input
                      type="text"
                      name="homeAddress"
                      value={editableContractData.homeAddress || ''}
                      onChange={handleInputChange}
                    />
                    <label>Серия паспорта:</label>
                    <input
                      type="text"
                      name="passportSeries"
                      value={editableContractData.passportSeries || ''}
                      onChange={handleInputChange}
                    />
                    <label>Номер паспорта:</label>
                    <input
                      type="text"
                      name="passportNumber"
                      value={editableContractData.passportNumber || ''}
                      onChange={handleInputChange}
                    />
                    <label>выдан:</label>
                    <input
                      type="text"
                      name="issueDate"
                      value={editableContractData.issueDate || ''}
                      onChange={handleInputChange}
                    />
                    <label>кем:</label>
                    <input
                      type="text"
                      name="issuedBy"
                      value={editableContractData.issuedBy || ''}
                      onChange={handleInputChange}
                    />
                    <label>Личный номер по паспорту:</label>
                    <input
                      type="text"
                      name="personalNumber"
                      value={editableContractData.personalNumber || ''}
                      onChange={handleInputChange}
                    />
                    <label>Страховой номер:</label>
                    <input
                      type="text"
                      name="insuranceNumber"
                      value={editableContractData.insuranceNumber || ''}
                      onChange={handleInputChange}
                    />
                    <label>Основное место работы:</label>
                    <input
                      type="text"
                      name="mainWorkplace"
                      value={editableContractData.mainWorkplace || ''}
                      onChange={handleInputChange}
                    />
              
                    <label>Должность по основному месту работы:</label>
                    <input
                      type="text"
                      name="mainWorkplacePosition"
                      value={editableContractData.mainWorkplacePosition || ''}
                      onChange={handleInputChange}
                    />
                    <label>Домашний номер:</label>
                    <input
                      type="text"
                      name="homePhoneNumber"
                      value={editableContractData.homePhoneNumber || ''}
                      onChange={handleInputChange}
                    />
                    <label>Рабочий номер:</label>
                    <input
                      type="text"
                      name="workPhoneNumber"
                      value={editableContractData.workPhoneNumber || ''}
                      onChange={handleInputChange}
                    />
                    <label>Мобильный номер:</label>
                    <input
                      type="text"
                      name="mobilePhoneNumber"
                      value={editableContractData.mobilePhoneNumber || ''}
                      onChange={handleInputChange}
                    />
                  

                  <table>
                    <thead>
                      <tr>
                        <th>Виды деятельности</th>
                        <th>Кол-во часов</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(editableContractData.activity).map(([activityName, value]) => (
                        <tr key={activityName}>
                          <td>{activityName}</td>
                          <td>
                            <input
                              type="text"
                              name={activityName}
                              value={value}
                              onChange={(e) => handleActivityChange(e, activityName)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <button onClick={handleSaveContract}>Сохранить</button>
                  <button onClick={handleCancelEdit}>Отмена</button>
                </div>
              ) : (
                <div className="contract-details">
                  <div>Номер договора: {contract.contractNumber}</div>
                  <div>Договор от: {contract.contractDate}</div>
                  <div>Объем договора: {contract.contractVolume}</div>
                  <div>В период с: {contract.contractPeriodStart}</div>
                  <div>по: {contract.contractPeriodEnd}</div>
                  <div>Оплата за счет средств: {contract.contractPayment}</div>
                  <div>Почтовый индекс: {contract.postcode}</div>
                  <div>Домашний адрес: {contract.homeAddress}</div>
                  <div>
                    Паспорт серии: {contract.passportSeries} Номер: {contract.passportNumber}
                  </div>
                  <div>выдан: {contract.issueDate}</div>
                  <div>{contract.issuedBy}</div>
                  <div>Личный номер: {contract.personalNumber}</div>
                  <div>Страховой номер: {contract.insuranceNumber}</div>
                  <div>Основное место работы: {contract.mainWorkplace}</div>
                  <div>Должность по основному месту работы: {contract.mainWorkplacePosition}</div>
                  <div>Домашний номер: {contract.homePhoneNumber}</div>
                  <div>Рабочий номер: {contract.workPhoneNumber}</div>
                  <div>Мобильный номер: {contract.mobilePhoneNumber}</div>

                  <table>
                    <thead>
                      <tr>
                        <th>Виды деятельности</th>
                        <th>Кол-во часов</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(contract.activity).map(([activityName, value]) => (
                        <tr key={activityName}>
                          <td>{activityName}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <button onClick={() => handlePrintContract(contract.id)}>Сохранить docx</button>
                  <button onClick={() => handleEditContract(contract.id)}>Изменить</button>
                  <button onClick={() => handleDeleteContract(contract.id)}>Удалить договор</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>{selectedTeacherId ? 'Нет договора.' : 'Выберите преподавателя, чтобы посмотреть его договор.'}</p>
          {selectedTeacherId && (
            <button onClick={createEmptyContract}>Создать договор</button>
          )}
        </div>
      )}
    </div>
  );
}

export default Contracts;