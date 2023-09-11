import $axi from "../http";

export default class MethodistService {
    static async print(id, contractId) {
        return $axi.get(`/api/methodist/contract-print/${id}/${contractId}`, { responseType: 'arraybuffer' });
    }
    static async printAddendum(id) {
        return $axi.get(`/api/methodist/addendum-print/${id}`, { responseType: 'arraybuffer' });
    }
    static async getContracts(id) {
        return $axi.get(`/api/methodist/contracts/${id}`);
    }
    static async getStatistics() {
        return $axi.get(`/api/methodist/statistics`);
    }
    static async getTeachers() {
        try {
            const response = await $axi.get('/api/methodist/teachers');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async createContract(teacherId) {
        try {
            const response = await $axi.post(`/api/methodist/contracts/${teacherId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteContract(contractId) {
        try {
            await $axi.delete(`/api/methodist/contracts/${contractId}`);
        } catch (error) {
            throw error;
        }
    }

    static async updateContract(contractId, contractData) {
        try {
            const response = await $axi.put(`/api/methodist/contracts/${contractId}`, contractData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async getAddendum(id){
        return $axi.get(`/api/methodist/addendums/${id}`);
    }
    static async createAddendum(id){
        return $axi.post(`/api/methodist/addendums/${id}`);
    }
    static async deleteAddendum(id){
        return $axi.delete(`/api/methodist/addendums/${id}`);
    }
    static async updateAddendum(id, addendumData){
        return $axi.put(`/api/methodist/addendums/${id}`,addendumData);
    }
}