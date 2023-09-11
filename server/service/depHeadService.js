const { User, Profile, Load, Discipline, Faculty, Department } = require('../models/Models');
const ApiError = require('../middleware/apiError');
const bcrypt = require('bcrypt');

class DepHeadService {
    async getTeachers(id) {
        try {
            const teachers = await User.findAll({
                where: { role: 'TEACHER' },
                include: [{ model: Profile, where: { facultyId: id } }],
            });
            return teachers;
        } catch (error) {
            throw new ApiError(500, 'Ошибка при получении списка учителей', error);
        }
    }

    async createTeacher(teacherData) {
            const { login, password, firstName, lastName, middleName, facultyId, departmentId } = teacherData;
            const existingUser = await User.findOne({ where: { login } });
            if (existingUser) {
                throw ApiError.badRequestError("пользователь с таким логином уже существует");
            }
            const hashedPassword = await bcrypt.hash(password, 3);
            const user = await User.create({ login, password: hashedPassword, role: 'TEACHER' });
            const profile = await Profile.create({ firstName, lastName, middleName });
            await user.setProfile(profile);
            const faculty = await Faculty.findByPk(facultyId);
            if (!faculty) {
                throw new ApiError(404, 'Факультет не найден');
            }
            const department = await Department.findByPk(departmentId);
            if (!department) {
                throw new ApiError(404, 'Кафедра не найдена');
            }
            await profile.setFaculty(faculty);
            await profile.setDepartment(department);

            return {
                user,
                profile,
                faculty,
                department
            };
    }

    async generateRandomPassword() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters.charAt(randomIndex);
        }

        return password;
    }

    async updateTeacherPassword(id, newPassword) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new ApiError(404, 'Учитель не найден');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 3);
            user.password = hashedPassword;
            await user.save();
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(500, 'Ошибка при обновлении пароля учителя', error);
            }
        }
    }

    async deleteTeacher(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new ApiError(404, 'Учитель не найден');
            }

            await user.destroy();

            return user;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(500, 'Ошибка при удалении учителя', error);
            }
        }
    }

    async getMethodists() {
        try {
            const methodists = await User.findAll({
                where: { role: 'METHODIST' },
                include: [{ model: Profile }],
            });
            return methodists;
        } catch (error) {
            throw new ApiError(500, 'Ошибка при получении списка методистов', error);
        }
    }

    async createMethodist(methodistData) {
        try {
            const { login, password, firstName, lastName, middleName, facultyId, departmentId } = methodistData;
            const hashedPassword = await bcrypt.hash(password, 3);
            const user = await User.create({ login, password: hashedPassword, role: 'METHODIST' });
            const profile = await Profile.create({ firstName, lastName, middleName });
            await user.setProfile(profile);
            const faculty = await Faculty.findByPk(facultyId);
            if (!faculty) {
                throw new ApiError(404, 'Факультет не найден');
            }
            const department = await Department.findByPk(departmentId);
            if (!department) {
                throw new ApiError(404, 'Кафедра не найдена');
            }
            await profile.setFaculty(faculty);
            await profile.setDepartment(department);

            return {
                user,
                profile,
                faculty,
                department
            };
        } catch (error) {
            throw new ApiError(500, 'Ошибка при создании методиста', error);
        }
    }

    async updateMethodistPassword(id, newPassword) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new ApiError(404, 'Методист не найден');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 3);
            user.password = hashedPassword;
            await user.save();

            return user;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(500, 'Ошибка при обновлении пароля методиста', error);
            }
        }
    }

    async deleteMethodist(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new ApiError(404, 'Методист не найден');
            }

            await user.destroy();

            return user;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            } else {
                throw new ApiError(500, 'Ошибка при удалении методиста', error);
            }
        }
    }

    async getProfile(id) {
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

    async updateProfile(userId, profileData) {
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

module.exports = new DepHeadService();
