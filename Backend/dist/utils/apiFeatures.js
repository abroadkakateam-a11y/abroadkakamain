"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var appError_1 = require("./appError");
var APIFeatures = /** @class */ (function () {
    function APIFeatures(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    APIFeatures.prototype.filter = function () {
        var queryObj = __assign({}, this.queryString);
        var excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(function (el) { return delete queryObj[el]; });
        // Advanced filtering
        var queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, function (match) { return "$".concat(match); });
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    };
    APIFeatures.prototype.sort = function () {
        if (this.queryString.sort) {
            var sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort('-createdAt'); // Default sorting
        }
        return this;
    };
    APIFeatures.prototype.limitFields = function () {
        if (this.queryString.fields) {
            var fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select('-__v'); // Exclude version field by default
        }
        return this;
    };
    APIFeatures.prototype.paginate = function () {
        var page = parseInt(this.queryString.page, 10) || 1;
        var limit = parseInt(this.queryString.limit, 10) || 100;
        var skip = (page - 1) * limit;
        // Validate pagination parameters
        if (page < 1) {
            throw appError_1.AppError.badRequest('Page number must be greater than 0');
        }
        if (limit < 1) {
            throw appError_1.AppError.badRequest('Limit must be greater than 0');
        }
        if (limit > 1000) {
            throw appError_1.AppError.badRequest('Limit cannot exceed 1000');
        }
        this.query = this.query.skip(skip).limit(limit);
        return this;
    };
    // Advanced features
    APIFeatures.prototype.search = function (fields) {
        if (this.queryString.search) {
            var searchTerm_1 = this.queryString.search;
            var searchQuery = {
                $or: fields.map(function (field) {
                    var _a;
                    return (_a = {},
                        _a[field] = { $regex: searchTerm_1, $options: 'i' },
                        _a);
                })
            };
            this.query = this.query.find(searchQuery);
        }
        return this;
    };
    APIFeatures.prototype.populate = function (options) {
        this.query = this.query.populate(options);
        return this;
    };
    return APIFeatures;
}());
exports.default = APIFeatures;
