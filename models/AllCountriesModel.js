const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const AllCountriesModel = mongoose.model('AllCountriesModel', countrySchema);

module.exports = AllCountriesModel;
