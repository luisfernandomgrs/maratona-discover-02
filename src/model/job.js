const Database = require("../db/config");

module.exports = {
    async get() {
        const db = await Database();

        // all diferente de get...
        const jobs = await db.all("SELECT * FROM jobs")

        await db.close();

        // return data;
        return jobs.map(job => {
            return {
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                created_at: job.created_at
            }            
        });
    },

    async update(newJob, jobId) {
        // data = newJob;
        const db = await Database();

        await db.run(`UPDATE jobs SET 
            name = "${newJob.name}",
            daily_hours = ${newJob["daily-hours"]},
            total_hours = ${newJob["total-hours"]} 
            WHERE (ID=${jobId});
        `);

        await db.close();
    },

    async delete(id) {
        const db = await Database();

        await db.run(`DELETE FROM jobs WHERE (ID=${id})`);

        await db.close();
    },
    
    async create(newJob) {
        const db = await Database();

        await db.run(`INSERT INTO jobs (name,daily_hours,total_hours,created_at) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            CURRENT_TIMESTAMP
        )`);

        await db.close();
    }
}