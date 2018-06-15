var express = require('express');
var router = express.Router();
const request = require('request');
const creds = require('../creds/config');

const apiBaseUrl =`http://api.themoviedb.org/3`;
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${creds.api_key}`;
/* GET home page. */

const imageBaseUrl = `http://image.tmdb.org/t/p/w300`;
router.get('/', function(req, res, next) {
	request.get(nowPlayingUrl,(error,response,movieData)=>{
			const parseData = JSON.parse(movieData);
			console.log(parseData);
			res.render('index', { nowPlayingData: parseData.results,imageBaseUrl });
	})
  
});

router.get('/movie/:movieId',(req,res)=>{
	// res.json(req.params);
	const movieId = req.params.movieId;
	const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${creds.api_key}`;
	request.get(thisMovieUrl, (error,response,movieData)=>{
		const parseData = JSON.parse(movieData);
			// res.json(parseData);
			res.render('single-movie',{
				currentMovie :parseData,
				imageBaseUrl
			})
	})
})

module.exports = router;
