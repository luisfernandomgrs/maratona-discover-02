// clearTimeout, cancelar um Timeout...

const timeout = 3000;
const finished = () => console.log("done!");

let timer = setTimeout(finished, timeout);

// Cancela o processo/thead definida no Event Loop do Node.JS
clearTimeout(timer);