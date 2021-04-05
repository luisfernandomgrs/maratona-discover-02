
let myTextbox = document.getElementById("daily-hours");
let nValueAfter = 0;

window.onkeyup = function (event) {
    if (event.keyCode == 27) {
        window.history.go(-1);
    }
};

myTextbox.addEventListener("keydown", () => {
    nValueAfter = myTextbox.value;
})

myTextbox.addEventListener("keyup", (evt) => {

    if (Number(myTextbox.value) > myTextbox.max) {
        myTextbox.value = nValueAfter;
        displayWarning("Não há horas disponíveis...");
    }
})

let warningTimeout;
let warningBox = document.createElement("label");
warningBox.className = "warning";

function displayWarning(msg) {
    let hideMessageDefault = document.getElementById("profile-free-hours-msg");

    warningBox.innerHTML = msg;
    warningBox.style.color = "var(--color-delete)";
    warningBox.style.overflow = "hidden";

    if (document.body.contains(warningBox)) {
        window.clearTimeout(warningTimeout);        
    } else {
        // insert warningBox after myTextbox
        myTextbox.parentNode.insertBefore(warningBox, myTextbox.nextSibling);
        hideMessageDefault.style.visibility = "hidden";
    }

    warningTimeout = window.setTimeout(function() {
        warningBox.parentNode.removeChild(warningBox);
        hideMessageDefault.style.visibility = "visible";
        warningTimeout = -1;
    }, 2000);
}