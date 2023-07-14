"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEntry = exports.findByShortenUrl = exports.findById = exports.getEntries = void 0;
const fs_1 = __importDefault(require("fs"));
const urls = JSON.parse(fs_1.default.readFileSync(process.cwd() + '/urls.json', 'utf-8'));
const getEntries = () => urls;
exports.getEntries = getEntries;
const findById = (id) => {
    const entry = urls.find(u => u.id === id);
    return entry;
};
exports.findById = findById;
const findByShortenUrl = (shortenUrl) => {
    const entry = urls.find(u => u.shortenUrl === shortenUrl);
    return entry;
};
exports.findByShortenUrl = findByShortenUrl;
const addEntry = (newUrlEntry) => {
    const currentDate = new Date().toLocaleDateString();
    const newUrl = Object.assign({ id: Math.max(0, ...urls.map(u => u.id)) + 1, date: currentDate }, newUrlEntry);
    urls.push(newUrl);
    const parsedUrls = JSON.stringify(urls);
    fs_1.default.writeFile(process.cwd() + '/urls.json', parsedUrls, (error) => {
        if (error)
            throw error;
    });
    return newUrl;
};
exports.addEntry = addEntry;
