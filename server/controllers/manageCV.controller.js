var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');



// var mongo = require('mongoskin');
// var db = mongo.db("mongodb://localhost:27017/mycvapp", {
//     native_parser: true
// });
var db = require('./db').db;

db.bind('cvData');

var commpaylistArray = [];

router.post('/getCv', function(req, res) {
    commpaylistArray = []; //remove elemet in the list for every request
    db.collection('cvData').find({
        cvpath: "UCSC_IEEEXtreme_Proposal-1475732266667.pdf"
    }, function(err, result) {
        result.each(function(err, data) {
            if (data !== null) {
                commpaylistArray.push(data);
                console.log(data);
            } else {
                // end of the loop when null encounter
                console.log(commpaylistArray);
                return res.json(commpaylistArray);
            }
        });
    });
});



router.post('/updateCv', function(req, res) {
    db.collection('cvData').update({
        _id: mongo.helper.toObjectID("57f5e32ab179a053648f640b")
    }, {
        $set: {
            username: 'haha update',
            updated_at: new Date()
        }
    }, function(err, result) {
        if (err) {
            return console.log('update error', err);
        }
        return res.json("Update Complete");
    });
});

module.exports = router;
