import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import { context } from '../../..';
import TeacherService from '../../../service/TeacherService';
import 'react-datepicker/dist/react-datepicker.css';

const LoadTab = observer(() => {
  const { store } = useContext(context);
  const columnHeaders = [
    'Лекции',
    'Практ. зан.',
    'Лабор. зан.',
    'Курс. проекты',
    'РГР',
    'Контр. раб',
    'Зачеты',
    'Консультации',
    'Экзамены',
    'Рук. практик',
    'Рук. дип. раб.',
    'Конс. дипл. раб.',
    'Реценз. дипл. раб.',
    'ГЭК',
    'Рук. магистр.',
    'Рук. аспирант.',
  ];

  const [dates, setDates] = useState(Array.from({ length: 26 }, () => null));
  const [editableColumns, setEditableColumns] = useState(
    Array.from({ length: 26 }, () => [])
  );
  const [disciplines, setDisciplines] = useState(
    Array.from({ length: 26 }, () => '')
  );
  const [loadIds, setLoadIds] = useState([]);
  const [totals, setTotals] = useState(Array.from({ length: 16 }, () => 0));
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    fetchData();
  }, [store.user.id, selectedMonth]);
  const fetchData = async () => {
    try {
      const loads = await TeacherService.getLoads(store.user.id, selectedMonth);
      populateTable(loads.data);
      console.log(loads.data);
    } catch (error) {
      console.log('Error fetching loads:', error);
    }
  };
  const populateTable = (loads) => {
    const sortedLoads = loads.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const initialDates = sortedLoads.map((load) => new Date(load.date));
    const initialColumns = sortedLoads.map((load) => {
      if (load.activity) {
        const { id, ...activityValues } = load.activity;
        return Object.values(activityValues);
      } else {
        return Array.from({ length: 16 }, () => null);
      }
    });
    const initialDisciplines = sortedLoads.map((load) => load.discipline);
    const loadIds = sortedLoads.map((load) => load.id);
    console.log(initialColumns);
    setDates(initialDates);
    setEditableColumns(initialColumns);
    setDisciplines(initialDisciplines);
    setLoadIds(loadIds);
    calculateColumnTotals(initialColumns);
  };
  const handleMonthChange = (event) => {
    const month = parseInt(event.target.value);
    setSelectedMonth(month);
  };

  const handleDateChange = (index, date) => {
    const updatedDates = [...dates];
    updatedDates[index] = date;
    setDates(updatedDates);
  };

  const handleColumnChange = (rowIndex, columnIndex, value) => {
    const updatedColumns = [...editableColumns];
    updatedColumns[rowIndex][columnIndex] = value;
    setEditableColumns(updatedColumns);
    calculateColumnTotals(updatedColumns);
  };

  const handleDisciplineChange = (index, value) => {
    const updatedDisciplines = [...disciplines];
    updatedDisciplines[index] = value;
    setDisciplines(updatedDisciplines);
  };

  const handleSaveClick = async (loadId) => {
    const rowIndex = loadIds.indexOf(loadId);

    const updatedLoad = {
      date: dates[rowIndex],
      lectures: editableColumns[rowIndex][0],
      practicalLessons: editableColumns[rowIndex][1],
      labWorks: editableColumns[rowIndex][2],
      courseProjects: editableColumns[rowIndex][3],
      RGR: editableColumns[rowIndex][4],
      controlWorks: editableColumns[rowIndex][5],
      credits: editableColumns[rowIndex][6],
      consultations: editableColumns[rowIndex][7],
      exams: editableColumns[rowIndex][8],
      practiceGuidance: editableColumns[rowIndex][9],
      diplomaGuidance: editableColumns[rowIndex][10],
      diplomaConsultation: editableColumns[rowIndex][11],
      diplomaReview: editableColumns[rowIndex][12],
      GEC: editableColumns[rowIndex][13],
      magistracyGuidance: editableColumns[rowIndex][14],
      postgraduateGuidance: editableColumns[rowIndex][15],
      discipline: disciplines[rowIndex],
    };

    try {
      await TeacherService.updateLoad(loadId, updatedLoad);
      console.log(`Load with id ${loadId} updated successfully`);
    } catch (error) {
      console.log(`Error updating load with id ${loadId}:`, error);
    }
  };

  const handleDeleteClick = async (loadId) => {
    try {
      await TeacherService.deleteLoad(loadId);
      console.log(`Load with id ${loadId} deleted successfully`);
      const updatedDates = [...dates];
      const updatedColumns = [...editableColumns];
      const updatedDisciplines = [...disciplines];
      const updatedLoadIds = loadIds.filter((id) => id !== loadId);

      const rowIndex = loadIds.indexOf(loadId);
      updatedDates.splice(rowIndex, 1);
      updatedColumns.splice(rowIndex, 1);
      updatedDisciplines.splice(rowIndex, 1);

      setDates(updatedDates);
      setEditableColumns(updatedColumns);
      setDisciplines(updatedDisciplines);
      setLoadIds(updatedLoadIds);
      calculateColumnTotals(updatedColumns);
    } catch (error) {
      console.log(`Error deleting load with id ${loadId}:`, error);
    }
  };
  const calculateColumnTotals = (columns) => {
    const updatedTotals = Array.from({ length: 16 }, () => 0);

    columns.forEach((row) => {
      row.forEach((value, columnIndex) => {
        updatedTotals[columnIndex] += parseInt(value, 10) || 0;
      });
    });

    setTotals(updatedTotals);
  };
  const handleCreateClick = async () => {
    const newDate = new Date();
    const currentYear = newDate.getFullYear();
    const selectedYear = selectedMonth >= 9 ? currentYear - 1 : currentYear;
    newDate.setFullYear(selectedYear);
    newDate.setMonth(selectedMonth - 1);
    newDate.setDate(1);
    try {
      const newLoad = {
        date: newDate.toISOString().slice(0, 10),
        lectures: null,
        practicalLessons: null,
        labWorks: null,
        courseProjects: null,
        RGR: null,
        controlWorks: null,
        credits: null,
        consultations: null,
        exams: null,
        practiceGuidance: null,
        diplomaGuidance: null,
        diplomaConsultation: null,
        diplomaReview: null,
        GEC: null,
        magistracyGuidance: null,
        postgraduateGuidance: null,
        discipline: 'Дисциплина',
      };

      const response = await TeacherService.createLoad(store.user.id, newLoad);
      fetchData();
      const createdLoad = response.data;

      const updatedDates = [...dates, null];
      const updatedColumns = [
        ...editableColumns,
        Array.from({ length: 16 }, () => ''),
      ];
      const updatedDisciplines = [...disciplines, ''];
      const updatedLoadIds = [...loadIds, createdLoad.id];

      setDates(updatedDates);
      setEditableColumns(updatedColumns);
      setDisciplines(updatedDisciplines);
      setLoadIds(updatedLoadIds);
      calculateColumnTotals(updatedColumns);

      console.log(`Load created with id ${createdLoad.id}`);
    } catch (error) {
      console.log('Error creating load:', error);
    }
  };

  return (
    <div>
      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value={9}>Сентябрь</option>
        <option value={10}>Октябрь</option>
        <option value={11}>Ноябрь</option>
        <option value={12}>Декабрь</option>
        <option value={1}>Январь</option>
        <option value={2}>Февраль</option>
        <option value={3}>Март</option>
        <option value={4}>Апрель</option>
        <option value={5}>Май</option>
        <option value={6}>Июнь</option>
        <option value={7}>Июль</option>
      </select>

      <table style={{ borderCollapse: 'collapse', minWidth: 1410 + 'px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black' }} rowSpan={4}>
              ДАТА
            </th>
            <th style={{ border: '1px solid black' }} colSpan={16}>
              Колво часов
            </th>
            <th style={{ border: '1px solid black' }} rowSpan={5}>
              Дисциплина
            </th>
          </tr>
          <tr>
            {columnHeaders.map((header, index) => (
              <th
                key={index}
                style={{
                  border: '1px solid black',
                  writingMode: 'vertical-lr',
                  textOrientation: 'sideways-right',
                  transform: 'rotate(180deg)',
                  textAlign: 'left',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dates.map((date, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ border: '1px solid black' }}>
                <DatePicker
                  selected={date}
                  onChange={(date) => handleDateChange(rowIndex, date)}
                  dateFormat="yyyy/MM/dd"
                />
              </td>
              {editableColumns[rowIndex].map((value, columnIndex) => (
                <td key={columnIndex} style={{ border: '1px solid black' }}>
                  <input
                    type="text"
                    value={value || ''}
                    onChange={(e) =>
                      handleColumnChange(rowIndex, columnIndex, e.target.value)
                    }
                    style={{ width: '50px' }}
                  />
                </td>
              ))}
              <td style={{ border: '1px solid black' }}>
                <input
                  type="text"
                  value={disciplines[rowIndex]}
                  onChange={(e) =>
                    handleDisciplineChange(rowIndex, e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleSaveClick(loadIds[rowIndex])}>
                  Сохранить
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteClick(loadIds[rowIndex])}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td style={{ border: '1px solid black' }}>Итого</td>
            {totals.map((total, index) => (
              <td key={index} style={{ border: '1px solid black' }}>
                {total}
              </td>
            ))}
            <td style={{ border: '1px solid black', textAlign: 'left' }}>
              Всего: {totals.reduce((total, value) => total + value, 0)}
            </td>
          </tr>
          <tr>
            <td colSpan={19} style={{ textAlign: 'center' }}>
              <button onClick={handleCreateClick}>Создать</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});

export default LoadTab;
