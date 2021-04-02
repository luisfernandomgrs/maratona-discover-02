const Job = require("../model/job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {

    create (req, res) {
        return res.render("job")
    },

    save (req, res) {

        //{  name: 'Central de Serviços',  'daily-hours': '4',  'total-hours': '37' }
        // const job = req.body;
        // Job.created_at = Date.now();
    
        // const jobId = jobs[jobs.length !== 0 ? jobs.length-1 : 0];
        // no final do comando, o contador inicia em Zero (0)...
        // Dá-se o nome de Optional Chaining Operator ao uso de: "?."
        // ...que em caso do default ser nulo, retorne outro valor. Neste caso zero (0)
        // Dá-se o nome de Logical OR Operator ao uso de "||"

        const jobs = Job.get();
        const lastId = jobs[jobs.length - 1]?.id || 0;
    
        jobs.push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        })
    
        return res.redirect("/");
    },

    show (req, res) {
        const jobId = req.params.id;
        const jobs = Job.get();
        const profile = Profile.get();

        // ... rode uma função, passando como parâmetro (Job.data), e retorne a estrutura onde job.id seja igual jobId
        const job = jobs.find(job => Number(job.id) === Number(jobId));

        if (!job) {
            return res.send("job not found")
        };

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job });
    },

    update (req, res) {
        const jobId = req.params.id;
        const jobs = Job.get();

        // ... rode uma função, passando como parâmetro (Job.data), e retorne a estrutura onde job.id seja igual jobId
        const job = jobs.find(job => Number(job.id) === Number(jobId));

        if (!job) {
            return res.send("job not found")
        };

        // primeiro se faz um espalhamento do objeto "Job",
        // depois sobre-escreve os valores informando cada propriedade
        // com o novo conteúdo...
        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        const newJobs = jobs.map(job => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob;
            }

            return job;
        });

        Job.update(newJobs);

        res.redirect("/job/" + jobId);
    },

    delete (req, res) {
        const jobId = req.params.id;

        Job.delete(jobId);

        return res.redirect("/");
    }
};