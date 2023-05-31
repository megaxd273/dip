const { validationResult } = require('express-validator');
const adminService = require('../service/adminService');

class AdminController {
  async getUserList(req, res, next) {
    try {
      const userList = await adminService.getUserList();
      return res.json(userList);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await adminService.deleteUser(id);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async createDepartmentHead(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { login, password, firstName, lastName, middleName, facultyId, departmentId } = req.body;
  
      const departmentHead = await adminService.createDepartmentHead(login, password, firstName, lastName, middleName, facultyId, departmentId);
      return res.status(201).json(departmentHead);
    } catch (error) {
      next(error);
    }
  }

  async updateDepartmentHeadPassword(req, res, next) {
    try {
      const { id } = req.params;
  
      const newPassword = await adminService.generateRandomPassword();
      const data = await adminService.updateDepartmentHeadPassword(id, newPassword);
  
      return res.status(200).json({ newPassword });
    } catch (error) {
      next(error);
    }
  }

  async createDepartment(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, facultyId } = req.body;

      const department = await adminService.createDepartment(name, facultyId);
      return res.status(201).json(department);
    } catch (error) {
      next(error);
    }
  }

  async getDepartments(req, res, next) {
    try {
      const departments = await adminService.getDepartments();
      return res.json(departments);
    } catch (error) {
      next(error);
    }
  }

  async getDepartment(req, res, next) {
    try {
      const { id } = req.params;
      const department = await adminService.getDepartment(id);
      return res.json(department);
    } catch (error) {
      next(error);
    }
  }

  async updateDepartment(req, res, next) {
    try {
      const { id } = req.params;
      const { name, facultyId } = req.body;

      await adminService.updateDepartment(id, name, facultyId);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async deleteDepartment(req, res, next) {
    try {
      const { id } = req.params;
      await adminService.deleteDepartment(id);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
  async getByFaculty(req,res,next){
    try {
      const { id } = req.params;
      const deps = await adminService.getByFaculty(id)
      return res.json(deps)
    } catch (error) {
      next(error)
    }
  }

  async createFaculty(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name } = req.body;

      const faculty = await adminService.createFaculty(name);
      return res.status(201).json(faculty);
    } catch (error) {
      next(error);
    }
  }

  async getFaculties(req, res, next) {
    try {
      const faculties = await adminService.getFaculties();
      return res.json(faculties);
    } catch (error) {
      next(error);
    }
  }

  async getFaculty(req, res, next) {
    try {
      const { id } = req.params;
      const faculty = await adminService.getFaculty(id);
      return res.json(faculty);
    } catch (error) {
      next(error);
    }
  }

  async updateFaculty(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await adminService.updateFaculty(id, name);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async deleteFaculty(req, res, next) {
    try {
      const { id } = req.params;
      await adminService.deleteFaculty(id);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
