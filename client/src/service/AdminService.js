import $axi from "../http/index";

export default class AdminService{
    static async getUsers(){
        return $axi.get("/api/admin/users");
    }
    static async removeUser(id){
        return $axi.delete(`api/admin/users/${id}`)
    }
    static async updatePassword(id){
        return $axi.put(`api/admin/department-heads/reset-password/${id}`)
    }
    static async createDepartmentHead(userData){
        return $axi.post("api/admin/department-heads", userData)
        
    }
    static async getFaculties(){
        return $axi.get("/api/admin/faculties");
    }
    static async createFaculty(name){
        return $axi.post("/api/admin/faculties",name);
    }
    static async updateFaculty(id,name){
        return $axi.put(`/api/admin/faculties/${id}`, name);
    }
    static async deleteFaculty(id){
        return $axi.delete(`/api/admin/faculties/${id}`);
    }
    static async getDepartments(){
        return $axi.get("/api/admin/departments");
    }
    static async createDepartment(name, facultyId){
        return $axi.post("/api/admin/departments",{name, facultyId});
    }
    static async updateDepartment(id,name, facultyId){
        return $axi.put(`/api/admin/departments/${id}`, {name, facultyId});
    }
    static async deleteDepartment(id){
        return $axi.delete(`/api/admin/departments/${id}`);
    }
    static async getDepartmentsByFacultyId(id){
        return $axi.get(`/api/admin/departments-by-faculty/${id}`);
    }

}
