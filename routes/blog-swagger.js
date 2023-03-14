/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - category
 *         - image
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         title:
 *           type: string
 *           description: The title of your blog
 *         category:
 *           type: string
 *           description: The blog category
 *         image:
 *           type: string
 *           description: image link of the blog
 *         content:
 *           type: string
 *           description: content of the blog
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the blog was created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the blog was updated
 *       example:
 *         id: 640f3a976f08e7d7eb0e23ce
 *         title: Standup
 *         category: Lifestyle
 *         image: https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
 *         content: Standup
 *         createdAt: 2023-03-13T15:35:35.582Z
 *         updatedAt: 2023-03-13T15:35:35.582Z
 * 
 */


/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: The Blogs Managing API
 */

/**
 * @swagger
 * /blog_data:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Succesfully created a new blog.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Blog Creation Error
 *
 */


/**
 * @swagger
 * /blog_data:
 *   get:
 *     summary: Get All Blogs from the database
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: Successfully Retrieved all blogs from the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Error in retrieving blog from the database
 *       404:
 *         description: Blog was Not Found
 *
 */

/**
 * @swagger
 * /blog_data/{id}:
 *   get:
 *     summary: Get one Blog by ID specified from the database
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Get Blog By Id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succesfully Retrieved the blog form the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Error in retrieving blog with ID from the database
 *       404:
 *         description: Blog was Not Found
 *
 */


/**
 *  @swagger
 * /blog_data/{id}:
 *   put:
 *     summary: Update the blog with the specified id
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: string
 *         required: true
 *         description: The ID of the blog you want to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: The Blog was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Blog Update Error
 *       404:
 *         description: Blog was Not Found
 */


/**
 *  @swagger
 * /blog_data/{id}:
 *   delete:
 *     summary: Delete the blog with the specified id
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog you want to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *        description: The Blog was deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Blog delete Error
 *       404:
 *         description: Blog was Not Found
 */