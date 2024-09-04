// describe: Recibe 2 arg.: el nombre y un callback
// describe('Nuestro primer test', () => {
  // Pueder usar it o test, son lo mismo
//   it('Debe revisar que 1 + 1 sea 2', () => {
//     // expect: Lo que esperas
//     // toBe: El resultado esperado
//     expect(1 + 1).toBe(2)
//   })

//   it('Debe revisar que 1 + 1 no sea 3', () => {
//     expect(1 + 1).not.toBe(3)
//   })  
// })
import { connectDB } from "../server";
import db from "../config/db";

// Crear un mock e importar la config y la instancia de Sequelize
jest.mock('../config/db');

describe('connectDB', () => {
  it('Should handle database connection error', async () => {

    // Espía el método authenticate de db y simula que rechaza la promesa con un error.
    jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Hubo un error al conectar a la base de datos'));

    // Espía el método log de console
    const consoleSpy = jest.spyOn(console, 'log');

    await connectDB();
    
    // Verifica que se haya llamado a console.log con un mensaje que contiene el texto del error.
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Hubo un error al conectar a la base de datos')
    )
  })
})
