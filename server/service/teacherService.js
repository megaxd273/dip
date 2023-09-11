const { User, Profile, Load, Activity, Faculty, Department } = require('../models/Models');
const ApiError = require('../middleware/apiError');
const { sq } = require('../models/index');
const { Op } = require('sequelize');


class TeacherService {
    async getTeacherProfile(id) {
        try {
            const profile = await Profile.findOne({ where: { userId: id } });
            if (!profile) {
                throw new ApiError(404, 'Пользователь не найден');
            }
            return profile;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(500, 'Ошибка при получении профиля', error);
            }
        }
    }
    async updateTeacherProfile(userId, profileData) {
        try {
            const profile = await Profile.findOne({ where: { userId } });
            if (!profile) {
                throw new ApiError(404, 'Пользователь не найден');
            }
            await profile.update(profileData);
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(500, 'Ошибка при обновлении профиля', error);
            }
        }
    }
    async createLoad(loadData, userId) {
        try {
            const {
                date,
                lectures,
                practicalLessons,
                labWorks,
                courseProjects,
                RGR,
                controlWorks,
                credits,
                consultations,
                exams,
                practiceGuidance,
                diplomaGuidance,
                diplomaConsultation,
                diplomaReview,
                GEC,
                magistracyGuidance,
                postgraduateGuidance,
                discipline
            } = loadData;

            const newActivity = await Activity.create({
                lectures,
                practicalLessons,
                labWorks,
                courseProjects,
                RGR,
                controlWorks,
                credits,
                consultations,
                exams,
                practiceGuidance,
                diplomaGuidance,
                diplomaConsultation,
                diplomaReview,
                GEC,
                magistracyGuidance,
                postgraduateGuidance
            });

            const newLoad = await Load.create({
                date,
                discipline,
                activityId: newActivity.id,
                userId: userId
            });
            if (!newLoad) {
                throw new ApiError(404, "EXEXEXEXEX")
            }
            return newLoad;
        } catch (error) {
            // throw new ApiError(500, 'Не удалось создать нагрузку', [error]);
            console.log(error)
        }
    }

    async updateLoad(id, loadData) {
        try {
            const load = await Load.findOne({ where: { id } });
            if (!load) {
                throw new ApiError(404, 'Нагрузка не найдена');
            }

            await load.update({
                date: loadData.date,
                discipline: loadData.discipline
            });

            if (load.activityId) {
                const activity = await Activity.findOne({ where: { id: load.activityId } });
                if (!activity) {
                    throw new ApiError(404, 'Связанная активность не найдена');
                }

                await activity.update({
                    lectures: loadData.lectures,
                    practicalLessons: loadData.practicalLessons,
                    labWorks: loadData.labWorks,
                    courseProjects: loadData.courseProjects,
                    RGR: loadData.RGR,
                    controlWorks: loadData.controlWorks,
                    credits: loadData.credits,
                    consultations: loadData.consultations,
                    exams: loadData.exams,
                    practiceGuidance: loadData.practiceGuidance,
                    diplomaGuidance: loadData.diplomaGuidance,
                    diplomaConsultation: loadData.diplomaConsultation,
                    diplomaReview: loadData.diplomaReview,
                    GEC: loadData.GEC,
                    magistracyGuidance: loadData.magistracyGuidance,
                    postgraduateGuidance: loadData.postgraduateGuidance
                });
            }

            return load;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(500, 'Ошибка при обновлении нагрузки', error);
            }
        }
    }

    async deleteLoad(id) {
        try {
            const load = await Load.findOne({ where: { id } });
            if (!load) {
                throw new ApiError(404, 'нагрузка не найдена');
            }
            if (load.activityId) {
                const activity = await Activity.findOne({ where: { id: load.activityId } });
                if (activity) {
                    await activity.destroy();
                }
            }
            await load.destroy();
        } catch (error) {
            throw ApiError.internalServerError(`Не удалось удалить нагрузку: ${error.message}`);
        }
    }
    async getLoads(userId, month) {
        try {
            const loads = await Load.findAll({
                where: {
                    userId: userId,
                    [Op.and]: [
                        // sq.where(sq.fn('EXTRACT','month', sq.col('date')), '02')
                        sq.literal(`EXTRACT(MONTH FROM "date") = ${month}`)
                    ]
                },
                include: {
                    model: Activity
                }
            });
            return loads;
        } catch (error) {
            throw new ApiError(500, 'Не удалось получить нагрузки учителя', [error]);
        }
    }
    async getSemestrLoad(userId, sem) {
        let startDate, endDate;
      
        if (sem === '1') {
          startDate = new Date(new Date().getFullYear() - 1, 8, 1); // Сентябрь предыдущего года
          endDate = new Date(new Date().getFullYear(), 0, 31); // Январь текущего года
        } else if (sem === '2') {
          startDate = new Date(new Date().getFullYear(), 1, 1); // Февраль текущего года
          endDate = new Date(new Date().getFullYear(), 6, 31); // Июль текущего года
        } else {
          throw new Error('Invalid semester.');
        }
      
        const semestrLoad = await Load.findAll({
          where: {
            userId: userId,
            date: {
              [Op.between]: [startDate, endDate],
            },
          },
          include: {
            model: Activity,
            attributes: {
              exclude: ['id'], // Исключаем поле 'id'
            },
          },
        });
      
        const semestrSummary = {};
      
        semestrLoad.forEach((load) => {
          const month = new Date(load.date).toLocaleString('ru-RU', { month: 'long' });
      
          if (!semestrSummary[month]) {
            semestrSummary[month] = {};
          }
      
          const activity = load.activity.toJSON();
      
          for (const field in activity) {
            if (field !== 'id') {
              semestrSummary[month][field] = (semestrSummary[month][field] || 0) + (activity[field] || 0);
            }
          }
        });
      
        const sortedSemestrSummary = Object.entries(semestrSummary).sort((a, b) => {
          const monthOrder = {
            'сентябрь': 1,
            'октябрь': 2,
            'ноябрь': 3,
            'декабрь': 4,
            'январь': 5,
            'февраль': 6,
            'март': 7,
            'апрель': 8,
            'май': 9,
            'июнь': 10,
            'июль': 11,
          };
      
          const monthA = a[0];
          const monthB = b[0];
      
          return monthOrder[monthA] - monthOrder[monthB];
        });
      
        const sortedSemestrSummaryObject = {};
      
        sortedSemestrSummary.forEach(([month, data]) => {
          sortedSemestrSummaryObject[month] = data;
        });
      
        return sortedSemestrSummaryObject;
      }
      
    async getYearLoads(userId) {
        const startYear = new Date().getFullYear() - 1; // Предыдущий год
        const startDate = new Date(startYear, 8, 1); // Сентябрь предыдущего года
        const endDate = new Date(new Date().getFullYear(), 6, 31);

        const yearLoads = await Load.findAll({
            where: {
                userId: userId,
                date: {
                    [Op.between]: [startDate, endDate],
                },
            },
            include: {
                model: Activity,
                attributes: {
                    exclude: ['id'], // Исключаем поле 'id'
                },
            },
        });
        const yearSummary = {
            lectures: 0,
            practicalLessons: 0,
            labWorks: 0,
            courseProjects: 0,
            RGR: 0,
            controlWorks: 0,
            credits: 0,
            consultations: 0,
            exams: 0,
            practiceGuidance: 0,
            diplomaGuidance: 0,
            diplomaConsultation: 0,
            diplomaReview: 0,
            GEC: 0,
            magistracyGuidance: 0,
            postgraduateGuidance: 0,
        };

        yearLoads.forEach((load) => {
            const activity = load.activity ? load.activity.get() : {};

            for (const field in activity) {
                if (field !== 'id' && field in yearSummary) {
                    yearSummary[field] += activity[field] || 0;
                }
            }
        });

        return yearSummary;
    }
    async getDepartments() {
        try {
            const departments = await Department.findAll();

            return departments;
        } catch (error) {
            throw new ApiError(500, 'Ошибка при получении списка кафедр');
        }
    }
    async getFaculties() {
        try {
            const faculties = await Faculty.findAll();

            return faculties;
        } catch (error) {
            throw new ApiError(500, 'Ошибка при получении списка факультетов');
        }
    }
}
module.exports = new TeacherService()