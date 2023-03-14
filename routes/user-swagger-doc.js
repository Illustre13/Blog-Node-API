/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         username:
 *           type: string
 *           description: The Username of your User
 *         email:
 *           type: string
 *           description: The User email
 *         password:
 *           type: string
 *           description: The User password
 *         role:
 *           type: string
 *           description: The Role of the User
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the User was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the User was updated
 *       example:
 *         id: 640f7e9b7684f001f20b6312
 *         username: Illustre
 *         email: illustre@gmail.com
 *         password: illustre123
 *         role: User
 *         createdAt: 2023-03-13T15:35:35.582Z
 *         updatedAt: 2023-03-13T15:35:35.582Z
 * 
 */


/**
 * @swagger
 * tags:
 *   name: User
 *   description: The Users API
 */

/**
 * @swagger
 * /user_data:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Succesfully created a new User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: User Creation Error
 *
 */


/**
 * @swagger
 * /user_data:
 *   get:
 *     summary: Get All Users from the database
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Succesfully Retrieved all users from the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error in retrieving user from the database
 *
 */

/**
 * @swagger
 * /user_data/{id}:
 *   get:
 *     summary: Get User by ID specified from the database
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Get User By Id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succesfully Retrieved the user form the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error in retrieving user with ID from the database
 *       404:
 *         description: User Not Found
 */


/**
 *  @swagger
 * /user_data/{id}:
 *  put:
 *    summary: Update the user with the specified id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the user you want to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The User was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: User Update Error
 *      404:
 *        description: User Not Available
 */


/**
 *  @swagger
 * /user_data/{id}:
 *  delete:
 *    summary: Delete the user with the specified id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the user you want to delete
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The User was deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: User delete Error
 *      404:
 *        description: User Not Available
 */