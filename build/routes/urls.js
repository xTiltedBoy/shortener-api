"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const urlServices = __importStar(require("../services/url"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(urlServices.getEntries());
});
router.get('/id/:id', (req, res) => {
    const url = urlServices.findById(Number(req.params.id));
    return (url != null) ? res.send(url) : res.sendStatus(404);
});
router.get('/shortenUrl/:shortenUrl', (req, res) => {
    const url = urlServices.findByShortenUrl(req.params.shortenUrl);
    return (url != null) ? res.send(url) : res.sendStatus(404);
});
router.post('/', (req, res) => {
    const { shortenUrl, sourceUrl } = req.body;
    const newUrlEntry = urlServices.addEntry({
        shortenUrl,
        sourceUrl
    });
    res.json(newUrlEntry);
});
exports.default = router;
