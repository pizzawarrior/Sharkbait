const express = require('express');
const app = express();
const port = process.env.port || 4000;
const bodyParser = require('body-parser');
const fs = require ('fs');

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/SHARKS");

//Let mongoose do it's thing: A schema followed by a model
let Schema = mongoose.Schema;
let RecordedIncidentSchema = new Schema({
        "activity": String,
        "location": String,
        "sex": String,
        "year": String,
        "injury": String,
        "case_number":String,
        "href_formula": String,
        "original_order": String,
        "time": String,
        "case_number1": String,
        "name": String,
        "investigator_or_source": String,
        "age": String,
        "date": String,
        "type": String,
        "area": String,
        "country": String,
        "fatal_y_n": String,
        "href": String,
        "pdf": String,
        "case_number0": String
});

//Model:
let RecordedIncident = mongoose.model("RecordedIncident", RecordedIncidentSchema, "Recorded_Incidents");


//This is to get the data to nest into the 'fields' document properly. Only needs to run once
//Add to seed.js folder
// let sharks = JSON.parse(
//     fs.readFileSync(`/Users/ME/Desktop/global-shark-attack.json`, "utf-8")
//   );
//   console.log(sharks)
//   sharks = sharks.map(shark => 
//      shark.fields);
//   RecordedIncident.create(sharks, function (err, result){
//     console.log(result);
//     console.log("sharks");
//   }
//   )


//Middleware: Body Parser
app.use(bodyParser.json()
)


//INDEX route:
app.get('/RecordedIncident', function(req, res) {
    RecordedIncident.find({}, function(err, RecordedIncidents) {
       // console.log(RecordedIncidents);
       //is there a reason why this is not res.JSON?
        res.send(RecordedIncidents);
});
});


//Let's get some routes (uri = HTTP) going:
//SHOW route:
app.get('/RecordedIncident/:id', (req, res) => {
    const bait = (req.params.id)
        RecordedIncident.findById(bait, function (err, result) {
//console.log(bait)
// if error res.json 'error'
//else ...
res.json(result)
//console.log(result)
     });
    //console.log(result)
});


// CONSOLE LOG MORE !!!! (for troubleshooting)


//CREATE route:
app.post('/RecordedIncident', function(req, res) {
// Reinstate line below after demo::::
// let incident = new RecordedIncident(req.body);
// Hardcoding CA for demo purposes only!!!!
let incident = new RecordedIncident({...req.body, area: "California"});
//console.log(incident)
incident.save();
res.json(incident)
});

//Alternative CREATE route:
// //$tackOv3rfl0w:
// //This appears to do nothing, but doesn't error out
// app.post(function(req, res) {
//     var incident = new RecordedIncident(req.body);
//     console.log(req.body)

//     incident.save(function(err) {
//         if(err) {
//             console.log(err);
//             res.status(400);
//             res.send(err);
//         }
//         else {
//             res.status(200);
//             res.json({
//                 message: req.body + ' successfully registered!'
//             });
//         }
//     });
// });


//Probably don't need the DELETE route?


//Let's try R integration: It works, but do we need it?
// app.get('/reports/', function(req, res) {
// const R = require('r-integration');
// let result = R.executeRCommand("min(1,2,3)");
// console.log(result);
// res.send(result)
// //> [ '1' ]
// });


//INDEX route:
app.get('/MostRecent', function(req, res) {
// executes, passing results to callback
RecordedIncident.
    find({ 
        area: 'California'
    })
    //sort by most recent
    .sort({date: -1})
    //filter to 10 results
    .limit(10)
    .exec(
    function (err, result) {
    console.log(result)
    res.json(result)
    }
);
});


//Additional route: Top 10 locations with most frequent incidents, last 20 years::::
app.get('/TopLocations', function(req, res) {
RecordedIncident
.aggregate([{ "$match": { "area": "California" } },
    {
      $group: {
        _id: '$location',
        count: { $sum: 1 } // this means that the count will increment by 1
      }
    },
    {$sort: {count:-1}}, 
    {$limit:11}
  ])
//Group by location (aka aggregate)
//Find count > 1
//Sort past 20 years
//limit(10).
.exec(
function (err, result) {
console.log(result)
res.json(result)
}
);
});



app.listen(port);