// setTimeout, rodar uma função depois de X milisegundos...

const timeout = 3000;
const finished = () => console.log("done!");

setTimeout(finished, timeout);
console.log("Show Finish Message, after 3sec... > ");