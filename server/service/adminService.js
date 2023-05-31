const { User, Department, Profile, Faculty } = require('../models/Models');
const ApiError = require('../middleware/apiError');
const bcrypt = require('bcrypt');

class AdminService {
    async getUserList() {
        try {
            const userList = await User.findAll({ include: Profile });
            if (!userList) {
                throw new ApiError(404, 'Список пользователей не найден');
            }

            return userList;
        } catch (error) {
            throw new ApiError(500, 'Не удалось получить список пользователей', error);
        }
    }
    async deleteUser(userId) {
        try {
            const deletedUser = await User.destroy({ where: { id: userId } });
            if (deletedUser === 0) {
                throw new ApiError(404, 'Пользователь не найден');
            }

            return { success: true };
        } catch (error) {
            throw new ApiError(500, `Не удалось удалить пользователя: ${error.message}`);
        }
    }
    async createDepartmentHead(login, password, firstName, lastName, middleName, facultyId, departmentId) {
        try {
            const hashedPassword = await bcrypt.hash(password, 3);
            const user = await User.create({ login, password: hashedPassword, role: 'DEPARTMENT_HEAD' });
            const profile = await Profile.create({ firstName, lastName, middleName });
            await profile.setUser(user);
            const faculty = await Faculty.findByPk(facultyId);
            if (!faculty) {
                throw new ApiError('Факультет не найден', 404);
            }
            const department = await Department.findByPk(departmentId);
            if (!department) {
                throw new ApiError('Кафедра не найдена', 404);
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
            throw new ApiError('Ошибка при создании главы кафедры', 500);
        }
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
    async updateDepartmentHeadPassword(id, newPassword) {
        try {
            const departmentHead = await User.findByPk(id);
            if (!departmentHead) {
                throw new ApiError('Глава кафедры не найден', 404);
            }
            const hashedPassword = await bcrypt.hash(newPassword, 3);
            departmentHead.password = hashedPassword;
            await departmentHead.save();
        } catch (error) {
            throw new ApiError('Ошибка при обновлении пароля главы кафедры', 500);
        }
    }
    async createDepartment(name, facultyId) {
        try {
            const faculty = await Faculty.findByPk(facultyId);
            if (!faculty) {
                throw new ApiError('Факультет не найден', 404);
            }
            const department = await Department.create({ name, facultyId });

            return department;
        } catch (error) {
            throw new ApiError('Ошибка при создании кафедры', 500);
        }
    }
    async getByFaculty(id){
        try {
            const deps = await Department.findAll({where:{facultyId:id}})
            return deps
        } catch (error) {
            throw new ApiError('Ошибка при получении списка кафедр', 500);
        }
    }
    async getDepartments() {
        try {
            const departments = await Department.findAll();

            return departments;
        } catch (error) {
            throw new ApiError('Ошибка при получении списка кафедр', 500);
        }
    }
    async getDepartment(id) {
        try {
            const department = await Department.findByPk(id);
            if (!department) {
                throw new ApiError('Кафедра не найдена', 404);
            }

            return department;
        } catch (error) {
            throw new ApiError('Ошибка при получении кафедры', 500);
        }
    }
    async updateDepartment(id, name, facultyId) {
        try {
            const department = await Department.findByPk(id);
            if (!department) {
                throw new ApiError('Кафедра не найдена', 404);
            }
            const faculty = await Faculty.findByPk(facultyId);
            if (!faculty) {
                throw new ApiError('Факультет не найден', 404);
            }

            department.name = name;
            department.facultyId = facultyId;

            await department.save();
        } catch (error) {
            throw new ApiError('Ошибка при обновлении кафедры', 500);
        }
    }
    async deleteDepartment(id) {
        try {
            const department = await Department.findByPk(id);
            if (!department) {
                throw new ApiError('Кафедра не найдена', 404);
            }
            await department.destroy();
        } catch (error) {
            throw new ApiError('Ошибка при удалении кафедры', 500);
        }
    }
    async createFaculty(name) {
        try {
            const faculty = await Faculty.create({ name });
            return faculty;
        } catch (error) {
            throw new ApiError('Ошибка при создании факультета', 500);
        }
    }
    async getFaculties() {
        try {
            const faculties = await Faculty.findAll();
            return faculties;
        } catch (error) {
            throw new ApiError('Ошибка при получении факультетов', 500);
        }
    }
    async getFaculty(id) {
        try {
            const faculty = await Faculty.findByPk(id);
            if (!faculty) {
                throw new ApiError('Факультет не найден', 404);
            }
            return faculty;
        } catch (error) {
            throw new ApiError('Ошибка при получении факультета', 500);
        }
    }
    async updateFaculty(id, name) {
        try {
            const faculty = await Faculty.findByPk(id);
            if (!faculty) {
                throw new ApiError('Факультет не найден', 404);
            }
            faculty.name = name;
            await faculty.save();
        } catch (error) {
            throw new ApiError('Ошибка при обновлении факультета', 500);
        }
    }
    async deleteFaculty(id) {
        try {
            const faculty = await Faculty.findByPk(id);
            if (!faculty) {
                throw new ApiError('Факультет не найден', 404);
            }
            await faculty.destroy();
        } catch (error) {
            throw new ApiError('Ошибка при удалении факультета', 500);
        }
    }
}

module.exports = new AdminService();