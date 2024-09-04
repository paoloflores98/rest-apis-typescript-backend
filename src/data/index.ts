import { exit } from "node:process";
import db from "../config/db";

const clearDB = async () => {
  try {
    await db.sync({force: true});
    console.log('Datos eliminados correctamente');
    exit(0);
  }catch(error) {
    console.log(error);
    exit(1);
  }
}
// process.argv: Proviene de Node.js. El número 2 indica de la palabra que se ubica del comando a ejecutar de los scripts en el archivo package.json: "pretest": "ts-node ./src/data --clear" ("--clear" puede ser otra palabra)
// pretest: Se ejecuta primero antes de ejecutar otro script que contenga el package.json. También existe potest que se ejecuta después de otro scrpit
if(process.argv[2] === '--clear') {
  clearDB();
}
