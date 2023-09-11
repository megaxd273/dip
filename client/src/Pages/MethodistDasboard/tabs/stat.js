import React, { useEffect, useState } from 'react';
import MethodistService from '../../../service/MethodistService';
import './stat.css'

const StatTab = () => {
    const [statistics, setStatistics] = useState([]);
    const [sortedStatistics, setSortedStatistics] = useState([]);
    const [sortField, setSortField] = useState('');
  
    useEffect(() => {
      async function fetchStatistics() {
        try {
          const response = await MethodistService.getStatistics();
          setStatistics(response.data);
        } catch (error) {
          console.error('Error fetching statistics:', error);
        }
      }
  
      fetchStatistics();
    }, []);
  
    useEffect(() => {
      const sortedData = [...statistics];
  
      if (sortField === 'contractDate') {
        sortedData.sort((a, b) => new Date(a.contractDate) - new Date(b.contractDate));
      } else if (sortField === 'contractPeriodStart') {
        sortedData.sort((a, b) => new Date(a.contractPeriodStart) - new Date(b.contractPeriodStart));
      } else if (sortField === 'contractPeriodEnd') {
        sortedData.sort((a, b) => new Date(a.contractPeriodEnd) - new Date(b.contractPeriodEnd));
      } else if (sortField === 'addendumDate') {
        sortedData.sort((a, b) => new Date(a.addendumDate) - new Date(b.addendumDate));
      }
  
      setSortedStatistics(sortedData);
    }, [statistics, sortField]);
  
    const handleSort = (field) => {
      if (field === sortField) {
        setSortedStatistics([...sortedStatistics].reverse());
      } else {
        setSortField(field);
      }
    };
  return (
    <div>
      <h2>Статистика</h2>
      <table className="stat-table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Номер договора</th>
            <th onClick={() => handleSort('contractDate')}>Дата договора</th>
            <th>Объем договора</th>
            <th onClick={() => handleSort('contractPeriodStart')}>Дата начала периода</th>
            <th onClick={() => handleSort('contractPeriodEnd')}>Дата окончания периода</th>
            <th>Номер дополнения</th>
            <th onClick={() => handleSort('addendumDate')}>Дата дополнения</th>
            <th>Объем дополнения</th>
            <th>Сумма</th>
            <th>Лекции</th>
            <th>Практические занятия</th>
            <th>Лабораторные работы</th>
            <th>Курсовые проекты</th>
            <th>РГР</th>
            <th>Контрольные работы</th>
            <th>Зачеты</th>
            <th>Консультации</th>
            <th>Экзамены</th>
            <th>Руководство практикой</th>
            <th>Руководство дипломом</th>
            <th>Консультация диплома</th>
            <th>Рецензирование диплома</th>
            <th>ГЭК</th>
            <th>Руководство магистратурой</th>
            <th>Руководство аспирантурой</th>
          </tr>
        </thead>
        <tbody>
          {sortedStatistics.map((stat) => (
            <tr key={stat.contractNumber}>
              <td>{stat.firstName}</td>
              <td>{stat.lastName}</td>
              <td>{stat.middleName}</td>
              <td>{stat.contractNumber}</td>
              <td>{stat.contractDate}</td>
              <td>{stat.contractVolume}</td>
              <td>{stat.contractPeriodStart}</td>
              <td>{stat.contractPeriodEnd}</td>
              <td>{stat.addendumNumber}</td>
              <td>{stat.addendumDate}</td>
              <td>{stat.addendumVolume}</td>
              <td>{stat.sum}</td>
              <td>{stat.activity.lectures}</td>
              <td>{stat.activity.practicalLessons}</td>
              <td>{stat.activity.labWorks}</td>
              <td>{stat.activity.courseProjects}</td>
              <td>{stat.activity.RGR}</td>
              <td>{stat.activity.controlWorks}</td>
              <td>{stat.activity.credits}</td>
              <td>{stat.activity.consultations}</td>
              <td>{stat.activity.exams}</td>
              <td>{stat.activity.practiceGuidance}</td>
              <td>{stat.activity.diplomaGuidance}</td>
              <td>{stat.activity.diplomaConsultation}</td>
              <td>{stat.activity.diplomaReview}</td>
              <td>{stat.activity.GEC}</td>
              <td>{stat.activity.magistracyGuidance}</td>
              <td>{stat.activity.postgraduateGuidance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatTab;
