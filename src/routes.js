const express = require("express");
const routes = express.Router();

const pathViews = __dirname + "/views/";

const Profile = {
    data: {
        name: "Luis Fernando",
        avatar: "https://avatars.githubusercontent.com/u/72364037?v=4",
        "monthly-budget": 3000,
        "days-per-week": 1,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },

    controllers: {
        index(req, res) {
            return res.render(pathViews + "profile", { profile: Profile.data })
        },

        update(req, res) {
            // req.body para pegar os dados
            const data = req.body;

            // definir quantas semanas tem em 01 ano: 52
            const weeksPerYear = 52;

            // remover as semanas de férias, para obter quantas semanas uteis de trabalho há no mês...
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
            
            // total de horas trabalhadas na semana
            const weeksTotalHours = data["hours-per-day"] * data["days-per-week"];

            // horas trabalhadas no mês
            const monthlyTotalHours = weeksTotalHours * weeksPerMonth;

            // qual será o valor da minha hora ?
            const valueHour = data["monthly-budget"] / monthlyTotalHours;

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            };

            return res.redirect("/profile");
        }
    }
};

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 1,
            created_at: Date.now()
            /*
            ...
            budget: 4500,
            remaining: 3,
            status: "progress"
            */
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now()
        },
    ],

    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) => {
                
                const remaining = Job.services.remainingDays(job);
                const status = remaining <= 0 ? "done" : "progress";
        
                // usando opção de espalhamento, ao invés de recriar todo o objeto...
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Profile.data["value-hour"] * job["total-hours"]
                };
            });    

            return res.render(pathViews + "index", {jobs: updatedJobs});
        },

        create (req, res) {
            return res.render(pathViews + "job")
        },

        save(req, res) {

            //{  name: 'Central de Serviços',  'daily-hours': '4',  'total-hours': '37' }
            // const job = req.body;
            // Job.created_at = Date.now();
        
            // const jobId = jobs[jobs.length !== 0 ? jobs.length-1 : 0];
            const lastId = Job.data[Job.data.length - 1]?.id || 1;
        
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()
            })
        
            return res.redirect("/");
        }
    },

    services: {
        remainingDays(job) {
            // cálculo de tempo restante
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
        
            const createdDate = new Date(job.created_at);
            //getDay não é o dia da data, mas da semana...
            const dueDay = createdDate.getDate() + Number(remainingDays);
            const dueDateInMs = createdDate.setDate(dueDay);
        
            const timeDiffInMs = dueDateInMs - Date.now();
            // transform milli to Day's
            const dayInMs = 1000 * 60 * 60 * 24;
        
            // const dayDiff = (timeDiffInMs / dayInMs).toFixed()
            // Math.floor retorna um  número semelhante a toFixed, porém arrendondando para baixo...
            const dayDiff = Math.floor(timeDiffInMs / dayInMs);
        
            // restam x dias...
            return dayDiff;
        }
    }
};

// req, res
routes.get('/', Job.controllers.index);

// expression short to command's
routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);
routes.get('/job/edit', (req, res) => res.render(pathViews + "job-edit"));
// "profile" in the next line command, has short version after next line commented...
// ... because property and value has same exactily the property and name value
// routes.get('/profile', (req, res) => res.render(pathViews + "profile", {profile: profile}));
routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

module.exports = routes;