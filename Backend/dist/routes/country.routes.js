"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var country_controller_1 = require("../controllers/country.controller");
var auth_middleware_1 = require("../middleware/auth.middleware");
var router = express_1.default.Router();
// Public routes
router.get('/', country_controller_1.getAllCountries);
router.get('/:id', country_controller_1.getCountry);
// Protected routes (require authentication)
router.post('/', (0, auth_middleware_1.authenticate)(['admin']), // Only admin can create countries
country_controller_1.uploadCountryFlag, country_controller_1.createCountry);
router.patch('/:id', (0, auth_middleware_1.authenticate)(['admin']), // Only admin can update countries
country_controller_1.uploadCountryFlag, country_controller_1.updateCountry);
router.delete('/:id', (0, auth_middleware_1.authenticate)(['admin']), // Only admin can delete countries
country_controller_1.deleteCountry);
exports.default = router;
