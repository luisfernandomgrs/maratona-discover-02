module.exports = {
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
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
};