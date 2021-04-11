export default function Theme() {

    // get value into checkbox element...
    // const ThemeDarkMode = document.querySelector(".button-dark-mode");
    // console.log(ThemeDarkMode.checked);

    function ChangeDarkTheme() {
        let element = document.body;
        // const label = document.querySelector("label-check-dark-mode");

        element.classList.toggle("dark-mode");
        // label
        if (element.classList.contains("dark-mode")) {
            document.getElementById("label-check-dark-mode").style.marginLeft = "35px";
        } else {
            document.getElementById("label-check-dark-mode").style.marginLeft = "0px";
        }
    }

    return {
        ChangeDarkTheme
    }
};