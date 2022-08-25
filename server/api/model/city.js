const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    city : { type : String, required : true },
    vehicle_type: { type : String, required : true },
    vehicle_fare:{
        amount_airport_fees : { type : Number, reqired : true, default: 0 },
        amount_per_hour: { type : Number, reqired : true, default: 0 },
        amount_per_kms: { type : Number, reqired : true, default: 0 },
        base_amount: { type : Number, reqired : true, default: 0 },
        base_kms: { type : Number, reqired : true, default: 0 },
    }
});

module.exports = mongoose.model('City', citySchema);