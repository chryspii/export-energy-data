var express = require('express');
var router = express.Router();

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const request = require("request")
const date = require('date-and-time')
const fetch = require('node-fetch')
const csv = require('csv-express')
const dateNow = new Date()
const ObjectID = mongodb.ObjectID

const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');

// insert mongodb uri
const dbUrl = 'mongodb://'
let db

MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, client) => {
	if (err) console.log('Unable to connect to the Server', err)
	db = client.db('sc')
})

function dateToString(dates) {
	var dates = new Date(dates)
	var dates = date.format(dates, 'YYYY-MM-DD HH:mm:ss')
	return dates
}

/* GET home page. */
router.get('/', function(req, res, next) {
	db.collection('cpm').distinct("MAC_Address", {}, (function(err, result) {
		// list of MAC Address
		a = [
			''
		]
		a.forEach( async function(element, index) {
			var b = await db.collection('cpm').find({
				'MAC_Address': element,
				Timestamp: {
					$gte: new Date('2019-01-01 08:00:00'),
					$lte: new Date('2019-10-01 07:59:59')
				}
			}).project({_id: 0, Timestamp: 1, MAC_Address: 1, pf_avg: 1, p_sum: 1, i_avg: 1}).toArray( function(err, result) {
				if (err) res.send(err);
				let name = element.replace(/:/g, "_");

				data = []
				for(i = 0; i < result.length; i++) {
					data.push({
						Timestamp 		: dateToString(new Date(result[i].Timestamp)),
						MAC_Address 	: result[i].MAC_Address,
						pf_avg 			: result[i].pf_avg,
						p_sum 			: result[i].p_sum,
						i_avg 			: result[i].i_avg,
					});
				}

				let fields = ['Timestamp', 'MAC_Address', 'pf_avg', 'p_sum', 'i_avg'];

				const json2csvParser = new Json2csvParser({ fields });
				const csv = json2csvParser.parse(result);

				fs.writeFile('csv/'+name+'.csv', csv, 'utf8', function (err) {
					if (err) {
						console.log('Some error occured - file either not saved or corrupted file saved.');
					} else {
						console.log('ok '+element)
					}
				})
			});
		});
		res.send('ok')
	}));
});

module.exports = router;
