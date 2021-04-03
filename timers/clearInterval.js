// clearInterval irá cancelar um processo definido por setInterval
// depois de X milisegundos

const timeOut = 1000;
const checking = () => console.log("checking...");

let interval = setInterval(checking, timeOut);

// clearInterval(interval);
setTimeout(() => clearInterval(interval), timeOut * 5.2);