const Job = require("../model/job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
    async index(req, res) {

        const jobs = await Job.get();
        const profile = await Profile.get();
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }
        let jobTotalHours = 0;

        const updatedJobs = jobs.map((job) => {
            
            const remaining = JobUtils.remainingDays(job);
            const status = job.finished ? "done" : "progress";
            let statusMessage;

            statusCount[status] += 1;
            jobTotalHours += status === "progress" ? Number(job["daily-hours"]) : 0;
/*
                  <% if(job.status === "progress") { %> 
                    <%= job.remaining %>   dias para a entrega
                  <% } else { %>
                    Prazo encerrado
                  <% } %> 
                  */
            if (status == "done") {
                statusMessage = "Entregue";
            }
            else if (remaining < 0) {
                statusMessage = `Atrasado há ${remaining * -1} dias`;
            }
            else if (remaining > 0) {
                statusMessage = `${remaining} dias para a entrega`;
            }
            else {
                statusMessage = "Prazo esgotado";
            }

            return {
                ...job,
                remaining,
                status,
                statusMessage,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            };
        });

        profile["free-hours"].value = Number(profile["hours-per-day"] - jobTotalHours);

        return res.render("index", {jobs: updatedJobs, profile: profile, statusCount: statusCount});
    }
};