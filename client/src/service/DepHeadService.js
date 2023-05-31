import $axi from "../http/index";

export default class DepHeadService {
    static async getTeachers() {
        return $axi.get("/api/dephead/teachers");
    }

    static async createTeacher(teacherData) {
        return $axi.post("/api/dephead/teachers", teacherData);
    }

    static async updateTeacherPassword(id, newPassword) {
        return $axi.put(`/api/dephead/teachers/${id}`, { newPassword });
    }

    static async deleteTeacher(id) {
        return $axi.delete(`/api/dephead/teachers/${id}`);
    }

    static async getMethodists() {
        return $axi.get("/api/dephead/methodists");
    }

    static async createMethodist(methodistData) {
        return $axi.post("/api/dephead/methodists", methodistData);
    }

    static async updateMethodistPassword(id, newPassword) {
        return $axi.put(`/api/dephead/methodists/${id}`, { newPassword });
    }

    static async deleteMethodist(id) {
        return $axi.delete(`/api/dephead/methodists/${id}`);
    }

    static async getProfile(id) {
        return $axi.get(`/api/dephead/profile/${id}`);
    }

    static async updateProfile(id, profileData) {
        return $axi.put(`/api/dephead/profile/${id}`, profileData);
    }
    static async getDepartments() {
        return $axi.get("/api/dephead/departments");
    }
    static async getFaculties() {
        return $axi.get("/api/dephead/faculties");
    }
}
