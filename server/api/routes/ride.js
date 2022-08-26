const express = require('express');
const router = express.Router();
const axios = require('axios');
const fare = require('../modules/fare');

router.post('/:city/:vehicle_type/:origins/:destinations', (req, res) => {
    const city_name = req.params.city;
    const vehicle_type = req.params.vehicle_type;
    const origins = req.params.origins;
    const destinations = req.params.destinations;
    console.log(origins);
    console.log(destinations);
    let price = 0;
    let distance = 0;
    let duration = 0;

    const getData = async () => {
        const response = await axios.get(`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${process.env.API_TOKEN}`);
        const status = await response.data.status;
        console.log(status)
        if (status == 'OK') {
            if (response.data.rows[0].elements[0].status == 'ZERO_RESULTS') {
                res.status(500).json({
                    error: 'No Route between the given locations'
                });
            } else {
                distance = response.data.rows[0].elements[0].distance.value/1000;
                duration = response.data.rows[0].elements[0].duration.value/3600;
                // price = fare(city_name, vehicle_type, distance, duration)
                await fare(city_name, vehicle_type, distance, duration).then(result => {
                    price = result;
                });
            }
        } else {
            res.status(500).json({
                error: 'No Results Found'
            });
        }
    }
    getData().then((result) => {
        console.log(result);
        console.log("price at bottom",price);
            if (distance > 30) {
                res.status(200).json({
                    message: true,
                })
            } else if (price < 50) {
                res.status(200).json({
                    message: true,
                })
            } else if (distance >= 1000) {
                res.status(200).json({
                    message: true,
                    reason : 'Too far to offer ride'
                })
            } else {
                res.status(200).json({
                    message: false,
                })
            }
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })

})

module.exports = router;