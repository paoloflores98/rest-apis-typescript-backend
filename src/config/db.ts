import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

// process.env.<nombre>: Forma de acceder a las variables de entorno
// __dirname: Función que retorna la ubicación actual del archivo
const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + '/../models/**/*'],
  logging: false, // No mostrar los log de Sequelize
  dialectOptions: {
    ssl: {
      require: 'true' // Activar el protocolo SSL
    }
  }
});

export default db;
