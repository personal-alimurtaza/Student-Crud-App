import dotenv from "dotenv";
dotenv.config();

const env = process.env;

const ENV = {
  DB: {
    host: env.DB_HOST,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    name: env.DB_DATABASE,
    port: env.DB_PORT,
    dialect: env.DB_DAILCATE,
  },
  SMTP: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
  JWT: {
    secretKey: env.JWT_SECRET,
  },
  STRIPE_SECRECT_KEY: {
    secretKey: env.STRIPE_SECRECT_KEY,
  }
};

export default ENV;
