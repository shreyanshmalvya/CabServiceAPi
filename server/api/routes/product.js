const express = require('express');
const City = require('../model/city');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/:city', (req, res) => {
    const city = req.params.city;
    City.find({ city: city })
    .then(result => {
        res.status(200).json({
            result : result
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:city/:vehicle_type', (req, res) => {
    const city_name = req.params.city;
    const vehicle_type = req.params.vehicle_type;
    City.findOne({ city: city_name, vehicle_type: vehicle_type }, (err, city) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        } else {
            res.status(200).json({
                message: 'City Fetched',
                city: city,
            });
        }
    });
});

router.post('/:city/:vehicle_type', (req, res) => {
    const city_name = req.params.city;
    const vehicle_type = req.params.vehicle_type;
    const amount_airport_fees = req.body.amount_airport_fees;
    const amount_per_hour = req.body.amount_per_hour;
    const amount_per_kms = req.body.amount_per_kms;
    const base_amount = req.body.base_amount;
    const base_kms = req.body.base_kms;

    City.find({city : city_name, vehicle_type : vehicle_type}, (err, city) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        } else {
            if (city.length == 0) {
                const city = new City({
                    _id: new mongoose.Types.ObjectId(),
                    city : city_name,
                    vehicle_type: vehicle_type,
                    vehicle_fare:{
                        amount_airport_fees : amount_airport_fees,
                        amount_per_hour: amount_per_hour,
                        amount_per_kms: amount_per_kms,
                        base_amount: base_amount,
                        base_kms: base_kms,
                    }
                });
            
                city.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'Data Stored',
                        createdData: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
            } else {
                res.status(409).json({
                    message: 'City already exists'
                });
            }
        }
    })
})

router.delete('/:city/:vehicle_type', (req, res) => {
    const city_name = req.params.city;
    const vehicle_type = req.params.vehicle_type;
    City.findOneAndDelete({city : city_name, vehicle_type : vehicle_type}).exec()
    .then(result => {
        res.status(200).json({
            message: 'City Deleted',
            deletedData: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;