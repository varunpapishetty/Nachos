const db = require('../config/db')
async function get(req, res, next) {
  try {
    const result = await db.query('SELECT t.*, t.location_id, l.city, ARRAY_AGG(s.screen_name) AS screen_name FROM theater t JOIN locations l ON t.location_id = l.location_id LEFT JOIN seats s ON t.theater_id = s.theater_id GROUP BY t.theater_id, t.location_id, l.city;');
    res.json(result.rows);
  } catch (err) {
    console.error(`Errors`, err.message);
    next(err);
  }
}

async function get_with_location(req, res, next) {
  try {
    const locationId = req.params.location_id;

    const query = {
      text: 'SELECT * FROM theater WHERE location_id= $1',
      values: [locationId],
    };
    console.log(query)
    const result = await db.query(query);
    res.json(result.rows);

  }
  catch (err) {
    console.error(`Errors`, err.message);
    next(err);
  }

}

async function get_theaters_with_movie(req, res, next) {
  try {
    const movie_id = req.params.movie_id;

    const query = {
      text: 'SELECT * FROM theater WHERE $1=ANY(movies)',
      values: [movie_id],
    };
    console.log(query)
    const result = await db.query(query);
    res.json(result.rows);

  }
  catch (err) {
    console.error(`Errors`, err.message);
    next(err);
  }

}

async function get_show_time(req, res, next) {
  try {
    const movie_id = req.query.movie_id;
    const theater_id = req.query.theater_id;

    const query = {
      text: 'SELECT * FROM screen WHERE theater_id=$2 AND movie_id=$1',
      values: [movie_id,theater_id],
    };
    console.log(query)
    const result = await db.query(query);
    res.json(result.rows);

  }
  catch (err) {
    console.error(`Errors`, err.message);
    next(err);
  }

}
