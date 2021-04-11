const Database = require("../db/config");

const FreeHours = {
    value: 3,
    Message() {
        let sMessage;

        if (FreeHours.value <= 0) { sMessage = "Você não possui disponilidade para novos trabalhos!"; }
        else if (FreeHours.value == 1) { sMessage = "Você possui apenas uma hora livre no seu dia."}
        else if (FreeHours.value > 1) { sMessage = `Você tem ${Number(FreeHours.value)} horas livres no seu dia` }

        return sMessage;
    }
};

module.exports = {
    async get() {
        const db = await Database();

        // get... Retorna apenas um registro; 
        // run... Retorna toda a lista...

        const data = await db.get("SELECT * FROM profile");
        const ActiveDarkMode = data.dark_mode == 1 ? true : false;
        db.close();

        return {
            "name": data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour,
            "free-hours" : FreeHours,
            "dark-mode": ActiveDarkMode
        };
    },

    async update(newData) {

        const db = await Database();
        const ActiveDarkMode = newData["dark-mode"] == "on" ? 1 : 0;

        db.run(`UPDATE profile SET 
            name = "${newData.name}",
            avatar = "${newData.avatar}",
            monthly_budget = ${newData["monthly-budget"]},
            days_per_week = ${newData["days-per-week"]},
            hours_per_day = ${newData["hours-per-day"]},
            vacation_per_year = ${newData["vacation-per-year"]},
            value_hour = ${newData["value-hour"]},
            dark_mode =  ${ActiveDarkMode}
        `);

        await db.close();
    }
};