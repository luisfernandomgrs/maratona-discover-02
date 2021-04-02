let data = {
    name: "Luis Fernando",
    avatar: "https://avatars.githubusercontent.com/u/72364037?v=4",
    "monthly-budget": 3000,
    "days-per-week": 1,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
};

module.exports = {
    get() {
        return data;
    },
    update(newData) {
        data = newData;
    }
}