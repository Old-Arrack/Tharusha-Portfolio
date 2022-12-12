function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// Message Status

var mail_state = document.getElementById("MailState");
if (mail_state.value) {
    window.scrollTo(0, 2200);
}

// HOME DESCRIPTION

var greet_cursor = document.querySelector(".greet-cursor");
var greet_text = "Hi, I'm Tharusha";
var greet_elem = document.querySelector(".greet");

var intro_cursor = document.querySelector(".intro-cursor");
var intro_text = "Code is clearly redeployed!";
var intro_elem = document.querySelector(".intro");

var remaining_elem = [".navbar", ".button-box", "#Contact"];
var page_load = true;

greet_cursor.addEventListener('animationend', async () => {
    if (page_load) {
        greet_cursor.classList.toggle("blink-cursor");

        for (i=0; i<greet_text.length; i++) {
            greet_elem.innerHTML += greet_text[i];
            await sleep(100);
        }

        greet_cursor.classList.toggle("blink-cursor");
        page_load = false;
    }

    else {
        greet_cursor.classList.toggle("hide-elem");
        intro_cursor.classList.toggle("hide-elem");

        for (i=0; i<intro_text.length; i++) {
            intro_elem.innerHTML += intro_text[i];
            await sleep(100);
        }

        intro_cursor.classList.toggle("blink-cursor");
    }
});

// HOME PAGE OTHER ELEMENTS

intro_cursor.addEventListener('animationend', () => {
    intro_cursor.classList.toggle("hide-elem");

    for (i=0; i<remaining_elem.length; i++) {
    current_elem = document.querySelector(remaining_elem[i]);
    current_elem.classList.toggle("hide-elem");
}
})

function GoToProjects() {
    document.getElementById("Projects").scrollIntoView();
}

// HOMEPAGE --->  CONTACT_INFO

function CopyText(id) {
    var text = document.getElementById(id);
    navigator.clipboard.writeText(text.textContent);
    text.style.backgroundColor = "#87CEEB";
    text.style.color = "black";
}

function ClearColor(id) {
    var text = document.getElementById(id);
    text.style.backgroundColor = null;
    text.style.color = "white";
}


// Scroll Appear

var about_section = document.getElementById("About");
var load_about = true;
var work_section = document.getElementById("Projects");
var load_work = true;
var message_section = document.getElementById("Message");
var load_messaging = true;

document.addEventListener('scroll', () => {
    if ((window.scrollY > 150) && (load_about)) {
        about_section.classList.toggle("hide-elem");
        load_about = false;
    }
    else if ((window.scrollY > 800) && (load_work)) {
        work_section.classList.toggle("hide-elem");
        load_work = false;
    }
    else if ((window.scrollY > 1700) && (load_messaging)) {
        message_section.classList.toggle("hide-elem");
        load_messaging = false;
    }
})

// My Projects ---> Carousal

var count_cache;
var count = 0;
var slide_list = ["Edomain", "MCT", "Interact"]

function GoToRight() {
    count_cache = count;
    if (count < 0) {
        count += 2;
    }
    else {
        count++
    }
    ChangeSlide();
}

function GoToLeft() {
    count_cache = count;
    if (count <= 0) {
        console.log("Works");
        count -= 2;
    }
    else {
        count--;
    }
    ChangeSlide();
}

function ChangeSlide() {
    active_slide = slide_list[Math.abs(count_cache) % 3];
    next_slide = slide_list[Math.abs(count) % 3];

    document.getElementById(active_slide).classList.toggle("no-display");
    document.getElementById(next_slide).classList.toggle("no-display");
}

// Input Response

const button = document.getElementById("SendBtn");
const email = document.getElementById("EmailEntry");
const name = document.getElementById("NameEntry");
const msg = document.getElementById("MessageEntry");
const entry_list = [name, email, msg];

entry_is_valid = {
    "NameEntry": true,
    "EmailEntry": true,
    "MessageEntry": true
}
const warning = document.querySelectorAll(".warning");
var valid_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function ActiveEntry(entry) {
    if (entry_is_valid[entry.id]) {
        entry.style.borderColor = "rgba(255, 255, 255, 1)";
    }
}

function InactiveEntry(entry) {
    if (entry_is_valid[entry.id]) {
        entry.style.borderColor = "rgba(255, 255, 255, .5)";
    }
}


email.addEventListener('input', () => {
    if (email.value.match(valid_email)) {
        entry_is_valid[email.id] = true;
        ActiveEntry(email);
        warning[1].innerHTML = "";
    }
    else {
        entry_is_valid[email.id] = false;
        email.style.borderColor = "red";
        warning[1].innerHTML = "*Invalid email address";
    }
})

button.addEventListener('click', () => {
    for (i=0; i<3; i++) {
        if (entry_list[i].value == "") {
            entry_is_valid[entry_list[i].id] = false;
            entry_list[i].style.borderColor = "red";
            warning[i].innerHTML = "*Required";
        }
        else {
            pass++;
        }
    }

    var pass = 0;
    entry_list.forEach((entry) => {
        if (entry_is_valid[entry.id]) {
            pass++;
        }
    })
    if (pass == 3) {
        document.querySelector("button.no-display").click();
    }
})

entry_list.forEach((entry) => {
    entry.addEventListener('input', () => {
        current_warning = warning[entry_list.indexOf(entry)];
        if (current_warning.textContent == "*Required") {
            entry_is_valid[entry.id] = true;
            ActiveEntry(entry);
            current_warning.innerHTML = "";
        }
    })
})