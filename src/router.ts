import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "./handlers/products";
import { handleInputErrors } from "./middleware";

// Instalar la dependencia:
// https://www.npmjs.com/package/express-validator

const router = Router();
/**
 * @swagger
 * components: 
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The product ID
 *          example: 1
 *        name:
 *          type: string
 *          description: The product name
 *          example: Monitor curvo de 49 pulgadas
 *        price:
 *          type: number
 *          description: The product price
 *          example: 300
 *        availability:
 *          type: boolean
 *          description: The product availability
 *          example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products 
 *    tags:
 *      - Products 
 *    description: Return a list of products
 *    responses:
 *      200:
 *        description: Successfull response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags:
 *      - Products
 *    description: Return a product based on its unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalid ID
 *      404:
 *        description: Not found
 */
router.get('/:productId',
  // Validación
  // param: Se aplica para los parámetros
  param('productId').isInt().withMessage('ID no válido'),
  handleInputErrors, // Desde el middleware
  getProductsById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Creates a new product
 *    tags:
 *      - Products
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Monitor curvo de 49 pulgadas
 *              price:
 *                type: number
 *                example: 399
 *    responses:
 *      201:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalid input data
 */
router.post('/',
  // Validación
  // body: Se aplica en las funciones síncronas
  body('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacío'),
  body('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio del producto no puede ir vacío')
    .custom(value => value > 0).withMessage('El precio del producto debe ser mayor a cero'),
  handleInputErrors, // Desde el middleware
  createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Updates a product with user input
 *    tags:
 *      - Products
 *    description: Returns the updated product
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Monitor curvo de 49 pulgadas
 *              price:
 *                type: number
 *                example: 399
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalid ID or Invalid input data
 *      404:
 *        description: Product not found
 */
// El navegador no soporta las siguientes solicitudes HTTP. Una alternativa es usar Postman
router.put('/:productId',
  param('productId')
    .isInt().withMessage('ID no válido'),
  body('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacío'),
  body('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio del producto no puede ir vacío')
    .custom(value => value > 0).withMessage('El precio del producto debe ser mayor a cero'),
  body('availability')
    .isBoolean().withMessage('El valor debe ser un booleano'),
  handleInputErrors, // Desde el middleware
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update product availability
 *    tags:
 *      - Products
 *    description: Returns the updated availability
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalid ID
 *      404:
 *        description: Product not found
 */
router.patch('/:productId',
  param('productId').isInt().withMessage('ID no válido'),
  handleInputErrors, // Desde el middleware
  updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Deletes a product by a given ID
 *    tags:
 *      - Products
 *    description: Returns a confirmation message
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to delete
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              value: Producto eliminado
 *      400:
 *        description: Bad request - Invalid ID
 *      404:
 *        description: Product not found
 */
router.delete('/:productId',
  param('productId').isInt().withMessage('ID no válido'),
  handleInputErrors, // Desde el middleware
  deleteProduct
);

export default router;
