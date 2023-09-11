const MethodistService = require('../service/methodistService');
const fs = require('fs')

class MethodistController {
  async getTeachers(req, res, next) {
    try {
      const teachers = await MethodistService.getTeachers();
      res.json(teachers);
    } catch (error) {
      next(error);
    }
  }
  async printContract(req, res, next) {
    try {
      const { id, contractId } = req.params;
      const outputPath = await MethodistService.printContract(id, contractId);
  
      res.download(outputPath, 'contract.docx', (err) => {
        if (err) {
          throw new Error('Error while downloading the file');
        }
  
        // Удаление файла после отправки клиенту
        fs.unlinkSync(outputPath);
      });
    } catch (error) {
      next(error);
    }
  }
  async printAddendum(req, res, next) {
    try {
      const { id} = req.params;
      const outputPath = await MethodistService.printAddendum(id);
  
      res.download(outputPath, 'addendum.docx', (err) => {
        if (err) {
          throw new Error('Error while downloading the file');
        }
  
        // Удаление файла после отправки клиенту
        fs.unlinkSync(outputPath);
      });
    } catch (error) {
      next(error);
    }
  }
  
  async getStatistics(req, res, next) {
    try {
      const statistics = await MethodistService.getStatistics();

      res.json(statistics);
    } catch (error) {
      next(error)
    }
  }


  async getContracts(req, res, next) {
    try {
      const { teacherId } = req.params;
      const contracts = await MethodistService.getContracts(teacherId);
      res.json(contracts);
    } catch (error) {
      next(error);
    }
  }

  async createContract(req, res, next) {
    try {
      const { teacherId } = req.params;
      const contract = await MethodistService.createContract(teacherId);
      res.json(contract);
    } catch (error) {
      next(error);
    }
  }

  async deleteContract(req, res, next) {
    try {
      const { contractId } = req.params;
      await MethodistService.deleteContract(contractId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async updateContract(req, res, next) {
    try {
      const { contractId } = req.params;
      const contractData = req.body;
      const updatedContract = await MethodistService.updateContract(contractId, contractData);
      res.json(updatedContract);
    } catch (error) {
      next(error);
    }
  }

  async getAddendum(req, res, next) {
    try {
      const { contractId } = req.params;
      const addendum = await MethodistService.getAddendum(contractId);
      res.json(addendum);
    } catch (error) {
      next(error);
    }
  }

  async createAddendum(req, res, next) {
    try {
      const { contractId } = req.params;
      const addendum = await MethodistService.createAddendum(contractId);
      res.json(addendum);
    } catch (error) {
      next(error);
    }
  }

  async deleteAddendum(req, res, next) {
    try {
      const { addendumId } = req.params;
      await MethodistService.deleteAddendum(addendumId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async updateAddendum(req, res, next) {
    try {
      const { addendumId } = req.params;
      const addendumData = req.body;
      const updatedAddendum = await MethodistService.updateAddendum(addendumId, addendumData);
      res.json(updatedAddendum);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MethodistController();
