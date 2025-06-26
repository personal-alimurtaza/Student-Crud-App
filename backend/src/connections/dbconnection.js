import ENV from "#env";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(ENV.DB.name, ENV.DB.user, ENV.DB.password, {
  host: ENV.DB.host,
  dialect: ENV.DB.dialect,
  logging: false,
});

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch(console.error);

export default sequelize;
