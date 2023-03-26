/**
 * @swagger
 * components:
 *   schemas:
 *     Querries:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Querry
 *         firstname:
 *           type: string
 *           description: The First Name of the User who sent the querry
 *         lastname:
 *           type: string
 *           description: The Last Name of the User who sent the querry
 *         email:
 *           type: string
 *           description: The Email of the User who sent the querry
 *         message:
 *           type: string
 *           description: Message
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the Querry was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the Querry was updated
 *       example:
 *         id: 640f7e9b7684f001f20b6312
 *         firstname: Illustre
 *         lastname: Bertin
 *         email: illustre@gmail.com
 *         message: Can we have aa coffee together this weeked!!!!
 *         createdAt: 2023-03-13T15:35:35.582Z
 *         updatedAt: 2023-03-13T15:35:35.582Z
 * 
 */


/**
 * @swagger
 * tags:
 *   name: Querries
 *   description: Querries API
 */

/**
 * @swagger
 * /save_querries:
 *   post:
 *     summary: Create a new querry
 *     tags: [Querries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Querries'
 *     responses:
 *       200:
 *         description: Succesfully created a new Querry.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Querries'
 *       500:
 *         description: Querry Creation Error
 *
 */



/**
 * @swagger
 * /querries:
 *   get:
 *     summary: Get All Querries from the database
 *     tags: [Querries]
 *     responses:
 *       200:
 *         description: Succesfully Retrieved all querries from the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Querries'
 *       500:
 *         description: Error in retrieving Querries from the database
 *
 */

/**
 * @swagger
 * /querries/{id}:
 *   get:
 *     summary: Get Querries by ID specified from the database
 *     tags: [Querries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Get Querries By Id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succesfully Retrieved the Querries form the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Querries'
 *       500:
 *         description: Error in retrieving Querries with ID from the database
 *       404:
 *         description: Querries Not Found
 */

/**
 *  @swagger
 * /querries/{id}:
 *  delete:
 *    summary: Delete the querry with the specified id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the querries you want to delete
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Querries'
 *    responses:
 *      200:
 *        description: The Querries was deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Querries'
 *      500:
 *        description: Querries delete Error
 *      404:
 *        description: Querries Not Available
 */