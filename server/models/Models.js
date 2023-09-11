const { sq, types } = require('./index');

const User = sq.define('user', {
  login: {
    type: types.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: types.STRING,
    allowNull: false
  },
  role: {
    type: types.ENUM('ADMIN', 'DEPARTMENT_HEAD', 'METHODIST', 'TEACHER'),
    defaultValue: "TEACHER",
    allowNull: false
  },
  refreshToken: {
    type: types.STRING
  }
});

const Profile = sq.define('profile', {
  firstName: {
    type: types.STRING,
    allowNull: false
  },
  lastName: {
    type: types.STRING,
    allowNull: false
  },
  middleName: {
    type: types.STRING,
    allowNull: false
  },
  academicDegree: {
    type: types.STRING,
    allowNull: true
  },
  academicTitle: {
    type: types.STRING,
    allowNull: true
  }
});

const Contract = sq.define('contract', {
  contractNumber: {
    type: types.STRING,
    allowNull: true
  },
  contractDate: {
    type: types.DATEONLY,
    allowNull: true
  },
  contractVolume: {
    type: types.STRING,
    allowNull: true
  },
  contractPeriodStart: {
    type: types.DATEONLY,
    allowNull: true
  },
  contractPeriodEnd: {
    type: types.DATEONLY,
    allowNull: true
  },
  contractPayment: {
    type: types.STRING,
    allowNull: true
  },
  postcode: {
    type: types.STRING,
    allowNull: true
  },
  homeAddress: {
    type: types.STRING,
    allowNull: true
  },
  passportSeries: {
    type: types.STRING,
    allowNull: true
  },
  passportNumber: {
    type: types.STRING,
    allowNull: true
  },
  issueDate: {
    type: types.DATEONLY,
    allowNull: true
  },
  issuedBy: {
    type: types.STRING,
    allowNull: true
  },
  personalNumber: {
    type: types.STRING,
    allowNull: true
  },
  insuranceNumber: {
    type: types.STRING,
    allowNull: true
  },
  mainWorkplace: {
    type: types.STRING,
    allowNull: true
  },
  mainWorkplacePosition: {
    type: types.STRING,
    allowNull: true
  },
  homePhoneNumber: {
    type: types.STRING,
    allowNull: true
  },
  workPhoneNumber: {
    type: types.STRING,
    allowNull: true
  },
  mobilePhoneNumber: {
    type: types.STRING,
    allowNull: true
  }
});
const Addendum = sq.define('addendum', {
  addendumNumber: {
    type: types.STRING,
    allowNull: true
  },
  addendumDate: {
    type: types.DATEONLY,
    allowNull: true
  },
  addendumVolume: {
    type: types.STRING,
    allowNull: true
  },
});

const Faculty = sq.define('faculty',{
  name: {
    type: types.STRING,
    allowNull: false
  }
});

const Department = sq.define('department',{
  name: {
    type: types.STRING,
    allowNull: false
  }
});

const Load = sq.define('load', {
  date: {
    type: types.DATEONLY,
    allowNull:false
  },
  discipline: {
    type: types.STRING,
    allowNull: false
  }
});

const Activity = sq.define('activity', {
  lectures: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  practicalLessons: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  labWorks: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  courseProjects: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  RGR: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  controlWorks: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  credits: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  consultations: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  exams: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  practiceGuidance: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  diplomaGuidance: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  diplomaConsultation: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  diplomaReview: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  GEC: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  magistracyGuidance: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  postgraduateGuidance: {
    type: types.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
});

Contract.hasOne(Addendum, { onDelete: 'CASCADE' });
Addendum.belongsTo(Contract);

Addendum.belongsTo(Activity);
Activity.hasOne(Addendum);

Load.belongsTo(Activity);
Activity.hasOne(Load);

User.hasOne(Contract, { onDelete: 'CASCADE' });
Contract.belongsTo(User);

Contract.belongsTo(Activity);
Activity.hasOne(Contract);


Profile.belongsTo(Department);
Profile.belongsTo(Faculty);

User.hasOne(Profile, { onDelete: 'CASCADE' });
Profile.belongsTo(User);


Faculty.hasMany(Department, { onDelete: 'CASCADE' });
Department.belongsTo(Faculty);

User.hasMany(Load, { onDelete: 'CASCADE' });
Load.belongsTo(User);

module.exports = { User, Profile, Load, Faculty, Department, Activity, Addendum, Contract };

