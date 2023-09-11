const depHeadService = require('../service/depHeadService');

class DepHeadController {
  async getTeachers(req, res, next) {
    try {
      const {id} = req.params
      const teachers = await depHeadService.getTeachers(id);
      return res.json(teachers);
    } catch (error) {
      next(error);
    }
  }

  async createTeacher(req, res, next) {
    try {
      const teacherData = req.body;
      const teacher = await depHeadService.createTeacher(teacherData);
      return res.json(teacher);
    } catch (error) {
      next(error);
    }
  }

  async updateTeacherPassword(req, res, next) {
    try {
      const { id } = req.params;
      
      const newPassword = await depHeadService.generateRandomPassword()
      await depHeadService.updateTeacherPassword(id, newPassword);
      return res.status(200).json({ newPassword});
    } catch (error) {
      next(error);
    }
  }

  async deleteTeacher(req, res, next) {
    try {
      const { id } = req.params;
      await depHeadService.deleteTeacher(id);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async getMethodists(req, res, next) {
    try {
      const methodists = await depHeadService.getMethodists();
      return res.json(methodists);
    } catch (error) {
      next(error);
    }
  }

  async createMethodist(req, res, next) {
    try {
      const methodistData = req.body;
      const methodist = await depHeadService.createMethodist(methodistData);
      return res.json(methodist);
    } catch (error) {
      next(error);
    }
  }

  async updateMethodistPassword(req, res, next) {
    try {
      const { id } = req.params;
      
      const newPassword = await depHeadService.generateRandomPassword();
      await depHeadService.updateMethodistPassword(id, newPassword);
      return res.status(200).json({ newPassword });
    } catch (error) {
      next(error);
    }
  }

  async deleteMethodist(req, res, next) {
    try {
      const { id } = req.params;
      await depHeadService.deleteMethodist(id);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const { id } = req.params;
      const profile = await depHeadService.getProfile(id);
      return res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const { id } = req.params;
      const profileData = req.body;
      await depHeadService.updateProfile(id, profileData);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
  async getDepartments(req, res, next) {
    try {
      const departments = await depHeadService.getDepartments();
      return res.json(departments);
    } catch (error) {
      next(error);
    }
  }
  async getFaculties(req, res, next) {
    try {
      const faculties = await depHeadService.getFaculties();
      return res.json(faculties);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DepHeadController();
