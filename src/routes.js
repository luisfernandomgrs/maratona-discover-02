const express = require("express");
const routes = express.Router();

const pathViews = __dirname + "/views/";

const profile = {
    name: "Luis Fernando Machado",
    avatar: "https://avatars.githubusercontent.com/u/72364037?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
};

// req, res
routes.get('/', (req, res) => {
    return res.render(pathViews + "index");
});
// expression short to command's
routes.get('/job', (req, res) => res.render(pathViews + "job"));
routes.get('/job/edit', (req, res) => res.render(pathViews + "job-edit"));
// "profile" in the next line command, has short version after next line commented...
// ... because property and value has same exactily the property and name value
// routes.get('/profile', (req, res) => res.render(pathViews + "profile", {profile: profile}));
routes.get('/profile', (req, res) => res.render(pathViews + "profile", {profile}));

module.exports = routes;