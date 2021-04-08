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
            const status = remaining <= 0 ? "done" : "progress";
            statusCount[status] += 1;
            jobTotalHours += status === "progress" ? Number(job["daily-hours"]) : 0;

            // usando opção de espalhamento, ao invés de recriar todo o objeto...
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            };
        });

        // profile["free-hours"] = Number(profile["hours-per-day"] - jobTotalHours); //.toFixed(2);
        profile["free-hours"].value = Number(profile["hours-per-day"] - jobTotalHours); //.toFixed(2);

        // profile["free-hours-msg"] = (profile["free-hours"] <= 0) ? "Você não possui horas livres" : `Você tem ${Number(profile["free-hours"])} horas livres no seu dia`;
        // profile["free-hours"].message = (profile["free-hours"].value <= 0) ? "Você não possui horas livres" : `Você tem ${Number(profile["free-hours"].value)} horas livres no seu dia`;

        // return res.render("index", {jobs: updatedJobs, profile: Profile.data});
        // return res.render("index", {jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours});
        return res.render("index", {jobs: updatedJobs, profile: profile, statusCount: statusCount});
    }
};