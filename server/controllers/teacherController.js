const teacherService = require('../service/teacherService');

class TeacherController {
  async getTeacherProfile(req, res, next) {
    const { id } = req.params;
    try {
      const profile = await teacherService.getTeacherProfile(id);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  async updateTeacherProfile(req, res, next) {
    const { id } = req.params;
    const profileData = req.body;
    try {
      await teacherService.updateTeacherProfile(id, profileData);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async createLoad(req, res, next) {
    const { id } = req.params;
    const loadData = req.body;
    try {
      const newLoad = await teacherService.createLoad(loadData,id);
      res.json(newLoad);
    } catch (error) {
      next(error);
    }
  }

  async updateLoad(req, res, next) {
    const { id } = req.params;
    const loadData = req.body;
    try {
      await teacherService.updateLoad(id,loadData);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async deleteLoad(req, res, next) {
    const { id } = req.params;
    try {
      await teacherService.deleteLoad(id);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
  async getSemesterLoads(req,res){
    const { id, sem } = req.params;

  try {
    const semestrLoad = await teacherService.getSemestrLoad(id, sem);
    res.status(200).json(semestrLoad);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  }
  async getYearLoads(req,res){
    const {id} = req.params
    try {
      const yearLoads = await teacherService.getYearLoads(id);
      res.json(yearLoads);
    } catch (error) {
      res.json(error);
    }
  }
  async getLoads(req, res, next) {
    const { id, month } = req.params;
    try {
      const loads = await teacherService.getLoads(id, month);
      res.json(loads);
    } catch (error) {
      next(error);
    }
  }
  async getDepartments(req, res, next) {
    try {
      const departments = await teacherService.getDepartments();
      return res.json(departments);
    } catch (error) {
      next(error);
    }
  }
  async getFaculties(req, res, next) {
    try {
      const faculties = await teacherService.getFaculties();
      return res.json(faculties);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TeacherController();
