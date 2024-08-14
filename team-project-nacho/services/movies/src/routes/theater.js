const express = require('express')
const router = express.Router()
const theater = require('../controllers/theater')
const {auth, roleCheck}  =  require('../services/middleware')

 /**
   * @openapi
   * /theaters:
   *    get:
   *      tags:
   *        - Theater
   *      description: get all theaters list
   *      responses:
   *        200:
   *           description: Success
   */
router.get('/',theater.get);
 /**
   * @openapi
   * /theaters/location/{location_id}:   
   *    get:
   *      parameters:
   *        - in: path
   *          name: location_id
   *          required: true
   *          type: integer
   *          description: Get all the theaters in the specific location with location_id. Location Id can be get from the locations endpoint.
   *      tags:
   *        - Theater
   *      description: get theaters with location id
   *      responses:
   *        200:
   *           description: Returned all theaters with location id
   */
router.get('/location/:location_id',theater.get_with_location);


 /**
   * @openapi
   * /theaters/movie/{movie_id}:   
   *    get:
   *      parameters:
   *        - in: path
   *          name: movie_id
   *          required: true
   *          type: integer
   *          description: Get all the theaters that have movie with movie_id
   *      tags:
   *        - Theater
   *      description: get theaters with movie id
   *      responses:
   *        200:
   *           description: Returned all theaters with movie id
   */
router.get('/movie/:movie_id',theater.get_theaters_with_movie);

 /**
   * @openapi
   * /theaters/show_time:
   *    get:
   *      tags:
   *        - Theater
   *      description: get show times for specfic movie and thater
   *      parameters:
   *        - in: query
   *          name: movie_id
   *          required: true
   *          type: integer
   *        - in: query
   *          name: theater_id
   *          required: true
   *          type: integer
 
   *      responses:
   *        200:
   *           description: Success
   */
router.get('/show_time',theater.get_show_time);
