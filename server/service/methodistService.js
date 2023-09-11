const ApiError = require('../middleware/apiError')
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const { User, Profile, Contract, Addendum, Activity } = require('../models/Models');

class MethodistService {
    async printContract(id, contractId) {
        try {
            const contract = await Contract.findByPk(contractId, { include: [Activity] });

            if (!contract) {
                throw new Error('Contract not found');
            }
            const user = await User.findByPk(id, {
                include: [Profile],
            });
            if (!user) {
                throw new Error('user not found');
            }
            const activity = contract.activity
            const profile = user.profile
            const data = {
                contractNumber: contract?.contractNumber,
                contractDate: contract?.contractDate,
                contractVolume: contract?.contractVolume,
                contractPeriodStart: contract?.contractPeriodStart,
                contractPeriodEnd: contract?.contractPeriodEnd,
                contractPayment: contract?.contractPayment,
                postcode: contract?.postcode,
                homeAddress: contract?.homeAddress,
                passportSeries: contract?.passportSeries,
                passportNumber: contract?.passportNumber,
                issueDate: contract?.issueDate,
                issuedBy: contract?.issuedBy,
                personalNumber: contract?.personalNumber,
                insuranceNumber: contract?.insuranceNumber,
                mainWorkplace: contract?.mainWorkplace,
                mainWorkplacePosition: contract?.mainWorkplacePosition,
                homePhoneNumber: contract?.homePhoneNumber,
                workPhoneNumber: contract?.workPhoneNumber,
                mobilePhoneNumber: contract?.mobilePhoneNumber,

                firstName: profile?.firstName,
                lastName: profile?.lastName,
                middleName: profile?.middleName,

                lectures: activity?.lectures,
                practicalLessons: activity?.practicalLessons,
                labWorks: activity?.labWorks,
                courseProjects: activity?.courseProjects,
                RGR: activity?.RGR,
                controlWorks: activity?.controlWorks,
                credits: activity?.credits,
                consultations: activity?.consultations,
                exams: activity?.exams,
                practiceGuidance: activity?.practiceGuidance,
                diplomaGuidance: activity?.diplomaGuidance,
                diplomaConsultation: activity?.diplomaConsultation,
                diplomaReview: activity?.diplomaReview,
                GEC: activity?.GEC,
                magistracyGuidance: activity?.magistracyGuidance,
                postgraduateGuidance: activity?.postgraduateGuidance,
            };


            const templatePath = path.resolve(__dirname, '..', 'static', 'template.docx');

            const templateContent = fs.readFileSync(templatePath, 'binary');

            // Инициализация Docxtemplater с использованием шаблона
            const zip = new PizZip(templateContent);
            const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

            // Рендеринг документа с использованием данных контракта и активности
            doc.setData(data);
            doc.render();

            // Генерация буфера с документом
            const generatedBuffer = doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' });
            const filename = `${contract.contractNumber}_${Date.now()}.docx`;

            // Путь для сохранения файла
            const outputPath = path.resolve(__dirname, 'output', filename);

            // Сохранение документа на сервере
            fs.writeFileSync(outputPath, generatedBuffer);

            return outputPath;
        } catch (error) {
            throw error;
        }
    }
    async printAddendum(id) {
        try {
            const user = await User.findByPk(id, {
                include: [Profile],
            });
            if (!user) {
                throw new Error('User not found');
            }

            const contract = await Contract.findOne({ where: { userId: user.id } });
            if (!contract) {
                throw new Error('Contract not found');
            }

            const addendum = await Addendum.findOne({
                where: { contractId: contract.id },
                include: [Activity],
            });
            if (!addendum) {
                throw new Error('Addendum not found');
            }

            const activity = addendum.activity;
            const profile = user.profile;

            const data = {
                addendumNumber: addendum.addendumNumber,
                addendumDate: addendum.addendumDate,
                addendumVolume: addendum.addendumVolume,
                contractNumber: contract.contractNumber,
                contractDate: contract.contractDate,
                firstName: profile.firstName,
                lastName: profile.lastName,
                middleName: profile.middleName,
                lectures: activity?.lectures,
                practicalLessons: activity?.practicalLessons,
                labWorks: activity?.labWorks,
                courseProjects: activity?.courseProjects,
                RGR: activity?.RGR,
                controlWorks: activity?.controlWorks,
                credits: activity?.credits,
                consultations: activity?.consultations,
                exams: activity?.exams,
                practiceGuidance: activity?.practiceGuidance,
                diplomaGuidance: activity?.diplomaGuidance,
                diplomaConsultation: activity?.diplomaConsultation,
                diplomaReview: activity?.diplomaReview,
                GEC: activity?.GEC,
                magistracyGuidance: activity?.magistracyGuidance,
                postgraduateGuidance: activity?.postgraduateGuidance,
            };


            const templatePath = path.resolve(__dirname, '..', 'static', 'template2.docx');

            const templateContent = fs.readFileSync(templatePath, 'binary');

            // Инициализация Docxtemplater с использованием шаблона
            const zip = new PizZip(templateContent);
            const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

            // Рендеринг документа с использованием данных контракта и активности
            doc.setData(data);
            doc.render();

            // Генерация буфера с документом
            const generatedBuffer = doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' });
            const filename = `${addendum.addendumNumber}_${Date.now()}.docx`;

            // Путь для сохранения файла
            const outputPath = path.resolve(__dirname, 'output', filename);

            // Сохранение документа на сервере
            fs.writeFileSync(outputPath, generatedBuffer);

            return outputPath;
        } catch (error) {
            throw error;
        }
    }
    async getTeachers() {
        try {
            const teachers = await User.findAll({
                where: { role: 'TEACHER' },
                include: Profile,
            });
            return teachers;
        } catch (error) {
            throw new ApiError('Ошибка при получении списка кафедр', 500);
        }
    }

    async getContracts(teacherId) {
        try {
            const contracts = await Contract.findAll({
                where: { userId: teacherId },
                include: {
                    model: Activity,
                    attributes: ['lectures', 'practicalLessons', 'labWorks', 'courseProjects', 'RGR', 'controlWorks', 'credits', 'consultations', 'exams', 'practiceGuidance', 'diplomaGuidance', 'diplomaConsultation', 'diplomaReview', 'GEC', 'magistracyGuidance', 'postgraduateGuidance'],
                },
            });
            return contracts;
        } catch (error) {
            throw error;
        }
    }


    async createContract(teacherId) {
        try {
            const newActivity = await Activity.create({});
            const newContract = await Contract.create({
                activityId: newActivity.id,
                userId: teacherId
            });

            if (!newContract) {
                throw new ApiError(404, "Failed to create contract");
            }

            return newContract;
        } catch (error) {
            throw error;
        }
    }



    async deleteContract(contractId) {
        try {
            await Contract.destroy({ where: { id: contractId } });
        } catch (error) {
            throw error;
        }
    }

    async updateContract(contractId, contractData) {
        try {
            const {
                contractNumber,
                contractDate,
                contractVolume,
                contractPeriodStart,
                contractPeriodEnd,
                contractPayment,
                postcode,
                homeAddress,
                passportSeries,
                passportNumber,
                issueDate,
                issuedBy,
                personalNumber,
                insuranceNumber,
                mainWorkplace,
                mainWorkplacePosition,
                homePhoneNumber,
                workPhoneNumber,
                mobilePhoneNumber,
                activity,
            } = contractData;

            const [_, [updatedContract]] = await Contract.update(
                {
                    contractNumber,
                    contractDate,
                    contractVolume,
                    contractPeriodStart,
                    contractPeriodEnd,
                    contractPayment,
                    postcode,
                    homeAddress,
                    passportSeries,
                    passportNumber,
                    issueDate,
                    issuedBy,
                    personalNumber,
                    insuranceNumber,
                    mainWorkplace,
                    mainWorkplacePosition,
                    homePhoneNumber,
                    workPhoneNumber,
                    mobilePhoneNumber,
                },
                { where: { id: contractId }, returning: true }
            );

            const updatedActivity = await Activity.update(activity, {
                where: { id: updatedContract.activityId },
            });

            return { updatedContract, updatedActivity };
        } catch (error) {
            throw error;
        }
    }




    async getAddendum(userId) {
        try {
            const contract = await Contract.findOne({ where: { userId } });

            if (!contract) {
                throw new Error("Contract not found");
            }

            const { contractNumber, contractDate } = contract;

            const addendum = await Addendum.findOne({
                where: { contractId: contract.id },
                include: {
                    model: Activity,
                    attributes: ['lectures', 'practicalLessons', 'labWorks', 'courseProjects', 'RGR', 'controlWorks', 'credits', 'consultations', 'exams', 'practiceGuidance', 'diplomaGuidance', 'diplomaConsultation', 'diplomaReview', 'GEC', 'magistracyGuidance', 'postgraduateGuidance'],
                },
            });

            const { activity } = addendum;

            return {
                id: addendum.id,
                contractId: addendum.contractId,
                addendumNumber: addendum.addendumNumber,
                addendumDate: addendum.addendumDate,
                addendumVolume: addendum.addendumVolume,
                activityId: addendum.activityId,
                contractNumber,
                contractDate,
                activity,
            };
        } catch (error) {
            throw error;
        }
    }





    async createAddendum(userId) {
        try {
            const contract = await Contract.findOne({ where: { userId } });

            if (!contract) {
                throw new Error("Contract not found");
            }

            const newActivity = await Activity.create({});
            const newAddendum = await Addendum.create({
                contractId: contract.id,
                activityId: newActivity.id
            });

            return newAddendum;
        } catch (error) {
            throw error;
        }
    }



    async deleteAddendum(userId) {
        try {
            const contract = await Contract.findOne({ where: { userId } });

            if (!contract) {
                throw new Error("Contract not found");
            }

            const addendum = await Addendum.findOne({ where: { contractId: contract.id } });

            if (!addendum) {
                throw new Error("Addendum not found");
            }

            await addendum.destroy();

            return "Addendum deleted successfully";
        } catch (error) {
            throw error;
        }
    }


    async updateAddendum(userId, addendumData) {
        try {
            const contract = await Contract.findOne({ where: { userId } });

            if (!contract) {
                throw new Error("Contract not found");
            }

            const addendum = await Addendum.findOne({ where: { contractId: contract.id } });

            if (!addendum) {
                throw new Error("Addendum not found");
            }

            await addendum.update(addendumData);

            if (addendumData.activity) {
                const activity = await Activity.findOne({ where: { id: addendum.activityId } });

                if (!activity) {
                    throw new Error("Activity not found");
                }

                await activity.update(addendumData.activity);
            }

            return "Addendum updated successfully";
        } catch (error) {
            throw error;
        }
    }
    async getStatistics() {
        try {
          const teachers = await User.findAll({ 
            where: { role: 'TEACHER' }, 
            include: [
              { model: Profile },
              { 
                model: Contract, 
                include: [
                  { model: Addendum },
                  { 
                    model: Activity,
                    attributes: [
                      'lectures',
                      'practicalLessons',
                      'labWorks',
                      'courseProjects',
                      'RGR',
                      'controlWorks',
                      'credits',
                      'consultations',
                      'exams',
                      'practiceGuidance',
                      'diplomaGuidance',
                      'diplomaConsultation',
                      'diplomaReview',
                      'GEC',
                      'magistracyGuidance',
                      'postgraduateGuidance'
                    ]
                  }
                ]
              }
            ] 
          });
          const teacherData = teachers.map(teacher => {
            const profile = teacher.profile;
            const contract = teacher.contract;
            const addendum = contract?.addendum;
      
            const sum = addendum?.addendumVolume || contract?.contractVolume;
      
            return {
              firstName: profile?.firstName,
              lastName: profile?.lastName,
              middleName: profile?.middleName,
              contractNumber: contract?.contractNumber,
              contractDate: contract?.contractDate,
              contractVolume: contract?.contractVolume,
              contractPeriodStart: contract?.contractPeriodStart,
              contractPeriodEnd: contract?.contractPeriodEnd,
              addendumNumber: addendum?.addendumNumber || "",
              addendumDate: addendum?.addendumDate || "",
              addendumVolume: addendum?.addendumVolume || "",
              sum: sum || "",
              activity: addendum?.activity || contract?.activity
            };
          });
      
          return teacherData;
        } catch (error) {
          throw error;
        }
      }
      
      
      
      
      

}

module.exports = new MethodistService();
