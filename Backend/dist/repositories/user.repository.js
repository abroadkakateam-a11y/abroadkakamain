"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
var user_model_1 = require("../models/user.model");
exports.userRepository = {
    findByEmail: function (email) { return user_model_1.UserModel.findOne({ email: email }).exec(); },
    findById: function (id) { return user_model_1.UserModel.findById(id).exec(); },
    create: function (data) { return new user_model_1.UserModel(data).save(); },
};
