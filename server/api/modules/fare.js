const City = require('../model/city');

const fare = async(city, vehicle_type, distance, duration) => {
        return await City.findOne({ city: city, vehicle_type: vehicle_type }).then(result => {
            let amount_airport_fees = result.vehicle_fare.amount_airport_fees;
            let amount_per_hour = result.vehicle_fare.amount_per_hour;
            let amount_per_kms = result.vehicle_fare.amount_per_kms;
            let base_amount = result.vehicle_fare.base_amount;
            let base_kms = result.vehicle_fare.base_kms;
            let amount = 0;
            if (distance > base_kms) {
                amount = amount_airport_fees + base_amount + (amount_per_kms * (distance - base_kms)) + (amount_per_hour * duration);
                return amount;
            } else {
                amount = amount_airport_fees + base_amount;
                return amount;
            }
        }).then(result => {
            console.log("outside" ,result);
            return result;
        })
};

module.exports = fare;