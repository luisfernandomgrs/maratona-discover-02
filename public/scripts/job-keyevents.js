let fieldDailyHours = document.getElementById("daily-hours");
let oldValueDailyHours = 0;

fieldDailyHours.addEventListener("keydown", () => {
    oldValueDailyHours = fieldDailyHours.value;
})

fieldDailyHours.addEventListener("keyup", (evt) => {

    if (Number(fieldDailyHours.value) > fieldDailyHours.max) {
        fieldDailyHours.value = oldValueDailyHours;
        displayWarning("Não há horas disponíveis...");
    }
})

let warningTimeout;
let warningBox = document.createElement("label");
warningBox.className = "flex";

function displayWarning(msg) {
    let hideMessageDefault = document.getElementById("profile-free-hours-msg");

    warningBox.innerHTML = msg;
    warningBox.style.color = "var(--color-delete)";
    warningBox.style.position = "absolute";
    warningBox.style.top = hideMessageDefault.style.top;
    warningBox.style.left = hideMessageDefault.style.left;

    if (document.body.contains(warningBox)) {
        window.clearTimeout(warningTimeout);        
    } else {
        // insert warningBox after fieldDailyHours
        fieldDailyHours.parentNode.insertBefore(warningBox, fieldDailyHours.nextSibling);
        hideMessageDefault.style.visibility = "hidden";
    }

    warningTimeout = window.setTimeout(function() {
        warningBox.parentNode.removeChild(warningBox);
        hideMessageDefault.style.visibility = "visible";
        warningTimeout = -1;
    }, 2000);
}