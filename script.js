document.addEventListener("DOMContentLoaded", (e) => {
    const inputname = document.getElementById("name");
    const inputemail = document.getElementById("email");
    const inputmsg = document.getElementById("msg");
    const errorname = document.getElementById("error-name");
    const erroremail = document.getElementById("error-email");
    const errormsg = document.getElementById("error-msg");
    const infomsg = document.getElementById("info-message");
    const maxlength = 100;
    const form = document.getElementById("formforcontact");
    let form_errors = [];

    const gallery = document.getElementById("gallery");
    const loadlocal = document.getElementById("load-local");
    const loadremote = document.getElementById("load-remote");
    const jsonurl = "https://api.jsonbin.io/v3/b/67d5f8058a456b7966768730";

    function projectCard(proj) {
        const projectcard = document.createElement("project-card");
        projectcard.setAttribute("year", proj.year);
        projectcard.setAttribute("project", proj.project);
        projectcard.setAttribute("image-url", proj.image_url);
        projectcard.setAttribute("project-url", proj.project_url);
        projectcard.setAttribute("description", proj.description);
        gallery.appendChild(projectcard);
    }

    function blankGallery() {
        gallery.innerHTML = "";
    }

    function loadLocalData() {
        blankGallery();
        const localData = localStorage.getItem("projects");
        if (localData) {
            const projects = JSON.parse(localData);
            projects.forEach(projectCard);
        }

        else {
            console.log("no local data found, try remote first");
        }
    }

    async function loadRemoteData() {
        blankGallery();
        try {
            const response = await fetch(jsonurl);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const jsonData = await response.json();
            const projects = jsonData.record.record;
            localStorage.setItem("projects", JSON.stringify(projects));
            projects.forEach(projectCard);
        }
        catch (error) {
            console.error("error fetching remote data: ", error);
        }
    }
    loadlocal.addEventListener("click", loadLocalData);
    loadremote.addEventListener("click", loadRemoteData);

    inputname.addEventListener("input", (e) => {

        if (inputname.value.length == 0) {
            errormsg.textContent = "";
            inputname.style.border = "1px solid #1e459c";
        }

        if (inputname.validity.valid == true) {
            errorname.textContent = "";
            inputname.style.border = "3px solid rgb(100, 253, 100)";
        }
        
        else if (inputname.validity.patternMismatch == true) {
            errorname.textContent = "Sorry, That Character Isn't Allowed";
            //inputname.value = inputname.value.slice(0, -1);
            errorname.style.color = "red";
            inputname.style.border = "10px solid red";
            setTimeout(() => {
                errorname.textContent = "";
                inputname.style.border = "1px solid #1e459c";
            }, 2000);
            form_errors.push({field: "name", message: "Invalid Name Format"});
        }
    });

    inputmsg.addEventListener("input", (e) => {

        let validPattern = /^[a-zA-Z0-9\s.,!?']+$/;

        if (validPattern.test(inputmsg.value)) {
            errormsg.textContent = "";
            inputmsg.style.border = "3px solid rgb(100, 253, 100)";
        }
        
        else {
            /*if (inputmsg.value.length == 0) {
                errormsg.textContent = ""; //prevent error message popup w/ backspace when there's 0 chars in input & someone backspaces
            }*/

            /*else {*/
            errormsg.textContent = "Sorry, That Character Isn't Allowed";
            //inputmsg.value = inputmsg.value.slice(0, -1);
            errormsg.style.color = "red";
            inputmsg.style.border = "10px solid red";
            setTimeout(() => {
                errormsg.textContent = "";
                inputmsg.style.border = "1px solid #1e459c";
            }, 2000);
            form_errors.push({field: "msg", message: "Invalid Chars in message"});
            /*}*/
        }
    });

    inputmsg.addEventListener("input", (e) => {

        let remainingchars = maxlength - inputmsg.value.length;
        infomsg.textContent = `${remainingchars} chars remaining`;

        if (remainingchars <= 100 && remainingchars > 66) {
            infomsg.style.color = "green";
        }

        if (remainingchars <= 66 && remainingchars > 33) {
            infomsg.style.color = "orange";
        }

        if (remainingchars <= 33 && remainingchars >= 0) {
            infomsg.style.color = "red";
        }

        if (inputmsg.value.length < inputmsg.minlength) {
            form_errors.push({field: "msg", message: "Message must be at least 10 chars"});
        }

    });

    form.addEventListener("submit", (e) => {

        if (form_errors.length > 0) {
            const errorinput = document.createElement("input");
            errorinput.type = "hidden";
            errorinput.name = "form-errors";
            errorinput.value = JSON.stringify(form_errors);
            form.appendChild(errorinput);
        }
    });

    const themeToggle = document.createElement("button");
    themeToggle.classList.add("theme-toggle");
    document.body.appendChild(themeToggle);


    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    themeToggle.innerHTML = currentTheme === "dark" ? "🌙" : "☀️";


    document.body.setAttribute("data-theme", currentTheme);

    themeToggle.addEventListener("click", () => {
        const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        themeToggle.innerHTML = newTheme === "dark" ? "🌙" : "☀️";

        document.body.setAttribute("data-theme", newTheme);
    });

});