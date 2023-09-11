import $axi from "../http";



class TeacherService {
  static async getTeacherProfile(id) {
    return $axi.get(`/api/teacher/profile/${id}`);
  }

  static async updateTeacherProfile(id, profileData) {
    return $axi.put(`/api/teacher/profile/${id}`, profileData);
  }

  static async createLoad(id, loadData) {
    return $axi.post(`/api/teacher/load/${id}`, loadData);
  }

  static async updateLoad(id, loadData) {
    return $axi.put(`/api/teacher/load/${id}`, loadData);
  }

  static async deleteLoad(loadId) {
    return $axi.delete(`/api/teacher/load/${loadId}`);
  }

  static async getLoads(id,month) {
    return $axi.get(`/api/teacher/load/${id}/${month}`);
  }
  static async getSemestrLoad(id,sem) {
    return $axi.get(`/api/teacher/semestr/${id}/${sem}`);
  }
  static async getYearLoad(id) {
    return $axi.get(`/api/teacher/year/${id}`);
  }

  static async getDepartments() {
    return $axi.get(`/api/teacher/departments`);
  }

  static async getFaculties() {
    return $axi.get(`/api/teacher/faculties`);
  }
}

export default TeacherService;
