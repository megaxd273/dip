const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sq } = require('./models/index');
const router = require('./routes');
const errorMiddleware = require('./middleware/errorMiddleware');
const path = require('path');
require('dotenv').config();
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/api', router);
app.use(errorMiddleware);

const User = require('./models/Models').User;

const createAdminUser = async () => {
  try {
    const adminUser = await User.findOne({ where: { login: 'admin' } });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin', 3);
      await User.create({
        login: 'admin',
        password: hashedPassword,
        role: 'ADMIN',
      });
      console.log('Admin user created.');
    }
  } catch (error) {
    console.log(error);
  }
};

const startApp = async () => {
  try {
    await sq.authenticate().then(() => console.log('ok')).catch(error => console.log(error));
    // await sq.sync({ force: true }).then(result => {
    //     console.log(result);
    //   })
    //   .catch(err => console.log(err));

    await createAdminUser();

    app.listen(PORT, () => console.log(`Started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startApp();
