import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/Issue';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://dharanz:Dharan123@ds133632.mlab.com:33632/samplemeanapp', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connected succussfully!');
});

// Get all the data
router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err) {
            console.log(err);
        } else {
            res.json(issues);
        }
    });
});

// Get single the data
router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err) {
            console.log(err);
        } else {
            res.json(issue);
        }
    });
});

// Create the records
router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({ 'issue': 'Value Added Successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to Create New Record');
        });
});

// Updating Records
router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could Not Load Document!'));
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severty = req.body.severty;
            issue.status = req.body.status;

            issue.save()
                .then(issue => {
                    res.json({ 'issue': 'Value Updated Successfully' });
                })
                .catch(err => {
                    res.status(400).send('Failed to Update a Record');
                });
        }
    });

});

// Delete the Records
router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({ _id: req.params.id }, (err, issue) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Removed Succussfully!');
        }
    });
});

app.use('/', router);
app.listen(4000, () => console.log('Express server is running on port 4000'));