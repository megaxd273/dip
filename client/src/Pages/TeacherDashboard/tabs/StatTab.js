import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { context } from '../../..';
import TeacherService from '../../../service/TeacherService';
import './Stattab.css';

const Stattab = observer(() => {
  const { store } = useContext(context);
  const [semestrLoad, setSemestrLoad] = useState({});
  const [yearLoad, setYearLoad] = useState({});
  const [selectedSemester, setSelectedSemester] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const semestrResponse = await TeacherService.getSemestrLoad(store.user.id, selectedSemester);
        const yearResponse = await TeacherService.getYearLoad(store.user.id);

        setSemestrLoad(semestrResponse.data);
        console.log(semestrResponse.data)
        setYearLoad(yearResponse.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, [selectedSemester]);

  const calculateRowTotal = (load) => {
    return Object.values(load).reduce((acc, value) => acc + value, 0);
  };

  const calculateColumnTotal = (columnKey) => {
    return Object.values(semestrLoad).reduce((acc, load) => acc + load[columnKey], 0);
  };
  const loadTypes = {
    lectures: 'Лекции',
    practicalLessons: 'Практ. зан.',
    labWorks: 'Лабор. зан.',
    courseProjects: 'Курс. проекты',
    RGR: 'РГР',
    controlWorks: 'Контр. раб.',
    credits: 'Зачеты',
    consultations: 'Консультации',
    exams: 'Экзамены',
    practiceGuidance: 'Рук. практик',
    diplomaGuidance: 'Рук. дип. раб.',
    diplomaConsultation: 'Конс. дипл. раб.',
    diplomaReview: 'Реценз. дипл. раб.',
    GEC: 'ГЭК',
    magistracyGuidance: 'Рук. магистр.',
    postgraduateGuidance: 'Рук. аспирант.',
  };
  

  return (
    <div>
      <div>
        <label htmlFor="semester-select">Выберите семестр:</label>
        <select
          id="semester-select"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(Number(e.target.value))}
        >
          <option value={1}>Семестр 1</option>
          <option value={2}>Семестр 2</option>
        </select>
      </div>
      <h2>Нагрузка за семестр {selectedSemester}</h2>
      <table className="stattab-table">
        <thead>
          <tr>
            <th>Месяц</th>
            <th className="vertical-header">Лекции</th>
            <th className="vertical-header">Практ. зан.</th>
            <th className="vertical-header">Лабор. зан.</th>
            <th className="vertical-header">Курс. проекты</th>
            <th className="vertical-header">РГР</th>
            <th className="vertical-header">Контр. раб</th>
            <th className="vertical-header">Зачеты</th>
            <th className="vertical-header">Консультации</th>
            <th className="vertical-header">Экзамены</th>
            <th className="vertical-header">Рук. практик</th>
            <th className="vertical-header">Рук. дип. раб.</th>
            <th className="vertical-header">Конс. дипл. раб.</th>
            <th className="vertical-header">Реценз. дипл. раб.</th>
            <th className="vertical-header">ГЭК</th>
            <th className="vertical-header">Рук. магистр.</th>
            <th className="vertical-header">Рук. аспирант.</th>
            <th className="vertical-header">Итого:</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(semestrLoad).map(([month, load]) => (
            <tr key={month}>
              <td>{month}</td>
              <td>{load.lectures}</td>
              <td>{load.practicalLessons}</td>
              <td>{load.labWorks}</td>
              <td>{load.courseProjects}</td>
              <td>{load.RGR}</td>
              <td>{load.controlWorks}</td>
              <td>{load.credits}</td>
              <td>{load.consultations}</td>
              <td>{load.exams}</td>
              <td>{load.practiceGuidance}</td>
              <td>{load.diplomaGuidance}</td>
              <td>{load.diplomaConsultation}</td>
              <td>{load.diplomaReview}</td>
              <td>{load.GEC}</td>
              <td>{load.magistracyGuidance}</td>
              <td>{load.postgraduateGuidance}</td>
              <td>{calculateRowTotal(load)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Итого:</td>
            <td>{calculateColumnTotal('lectures')}</td>
            <td>{calculateColumnTotal('practicalLessons')}</td>
            <td>{calculateColumnTotal('labWorks')}</td>
            <td>{calculateColumnTotal('courseProjects')}</td>
            <td>{calculateColumnTotal('RGR')}</td>
            <td>{calculateColumnTotal('controlWorks')}</td>
            <td>{calculateColumnTotal('credits')}</td>
            <td>{calculateColumnTotal('consultations')}</td>
            <td>{calculateColumnTotal('exams')}</td>
            <td>{calculateColumnTotal('practiceGuidance')}</td>
            <td>{calculateColumnTotal('diplomaGuidance')}</td>
            <td>{calculateColumnTotal('diplomaConsultation')}</td>
            <td>{calculateColumnTotal('diplomaReview')}</td>
            <td>{calculateColumnTotal('GEC')}</td>
            <td>{calculateColumnTotal('magistracyGuidance')}</td>
            <td>{calculateColumnTotal('postgraduateGuidance')}</td>
            <td>{Object.values(semestrLoad).reduce((acc, load) => acc + calculateRowTotal(load), 0)}</td>
          </tr>
        </tfoot>
      </table>

      <h2>Годовая нагрузка</h2>
<table className="stattab-table">
  <tbody>
    {Object.entries(yearLoad).map(([field, value]) => (
      <tr key={field}>
        <td>{loadTypes[field]}</td>
        <td>{value}</td>
      </tr>
    ))}
  </tbody>
</table>

      
    </div>
  );
});

export default Stattab;
