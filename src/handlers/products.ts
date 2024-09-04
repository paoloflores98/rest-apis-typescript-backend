import { Request, Response } from "express";
import Product from "../models/Product.model";

// Instalar la dependencia:
// https://www.npmjs.com/package/express-validator

export const getProducts = async (request: Request, response: Response) => {
  // const auth = true;
  // const datos = [
  //   {id: 1, nombre: 'Paolo'},
  //   {id: 2, nombre: 'Martin'},
  // ];

  // response.send('Hola mundo en Express');
  // response.send(auth);
  // response.send(datos);
  // response.json(datos);

  const products = await Product.findAll({
    order: [
      ['id', 'ASC'] // Por defecto ordena ascendentemente
    ],
    attributes: {exclude: ['createdAt', 'updatedAt']} // Excluye algunas columnas
  });
  response.json({data: products});
}

export const getProductsById = async (request: Request, response: Response) => {
  const { productId } = request.params;
  const product = await Product.findByPk(productId);
  
  if(!product) {
    return response.status(404).json({
      error: 'Producto no encontrado'
    })
  }
  
  response.json({data: product});
}

export const createProduct = async (request: Request, response: Response) => {
  // Validación
  // Check: Se aplica para las funciones asíncronas
  // await check('name')
  //   .notEmpty().withMessage('El nombre del producto no puede ir vacío')
  //   .run(request);
  // await check('price')
  //   .isNumeric().withMessage('Valor no válido')
  //   .notEmpty().withMessage('El precio del producto no puede ir vacío')
  //   .custom(value => value > 0).withMessage('El precio del producto debe ser mayor a cero')
  //   .run(request);

  // Almacenar en la base de datos. Se deben agregar las líneas "target": "ESNext", "moduleResolution": "NodeNext", "module": "NodeNext" en el archivo tsconfig.json
  const product = await Product.create(request.body);
  response.status(201).json({data: product});
}

export const updateProduct = async (request: Request, response: Response) => {
  const { productId } = request.params;
  const product = await Product.findByPk(productId);
  
  if(!product) {
    return response.status(404).json({
      error: 'Producto no encontrado'
    })
  }

  // Actualizar
  await product.update(request.body);
  await product.save();

  response.json({data: product});
}

export const updateAvailability = async (request: Request, response: Response) => {
  const { productId } = request.params;
  const product = await Product.findByPk(productId);
  
  if(!product) {
    return response.status(404).json({
      error: 'Producto no encontrado'
    })
  }

  // Actualizar la disponibilidad
  // product.availability = request.body.availability;

  // Otra forma de actualizar la disponibilidad sin escribir en el body
  product.availability = !product.dataValues.availability;
  await product.save();

  response.json({data: product});
}

export const deleteProduct = async (request: Request, response: Response) => {
  const { productId } = request.params;
  const product = await Product.findByPk(productId);
  
  if(!product) {
    return response.status(404).json({
      error: 'Producto no encontrado'
    })
  }
  
  // Eliminar
  await product.destroy();

  response.json({data: 'El producto ha sido eliminado'});
}
