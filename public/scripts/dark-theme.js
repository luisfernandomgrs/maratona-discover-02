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
            // document.getElementById("label-check-dark-mode").style.left = "0px";
            document.getElementById("label-check-dark-mode").style.transition = "all ease .5s"
            document.getElementById("label-check-dark-mode").style.transform = "translateX(35px)"
        } else {
            // document.getElementById("label-check-dark-mode").style.left = "35px";
            document.getElementById("label-check-dark-mode").style.transition = "all ease .5s"
            document.getElementById("label-check-dark-mode").style.transform = "translateX(0px)"
        }
    }

    return {
        ChangeDarkTheme
    }
};