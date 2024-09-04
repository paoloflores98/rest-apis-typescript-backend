import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";

// Instalar la dependencias:
// https://www.npmjs.com/package/colors
// https://www.npmjs.com/package/cors
// https://www.npmjs.com/package/morgan

// Conectar a la base de datos
export async function connectDB() {
  try {
    // authenticate: Autenticar a la base de datos
    await db.authenticate();

    // Actualiza cada vez que se crean nuevos modelos o columnas
    db.sync();

    // console.log(colors.blue('Conexión exitosa')); // Comentado para realizar las pruebas
  }catch(error) {
    console.log(colors.red.bold('Hubo un error al conectar a la base de datos'));
  }
}

connectDB();

// Instancia de Express
const server = express();

// Permitir conexiones
const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
server.use(cors(corsOptions));

// use: Ejecuta todas las solicitudes HTTP. Facilita nombrar las URL's
// Habilitar la lectura del JSON
server.use(express.json()); 

// Mostrar los detalles de las peticiones en consola: dev, combined, common o tiny
server.use(morgan('dev'));

// Ruta para los productos
server.use('/api/products', router);

// Ruta para la documentación
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;
