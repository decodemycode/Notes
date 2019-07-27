/*jshint esversion: 6 */
var scripts = document.getElementsByTagName('script');
var lastScript = scripts[scripts.length - 1];
var scriptName = lastScript.src;
console.log("loading: " + scriptName.substring(scriptName.lastIndexOf('/') + 1));

/* Show Notes when Document is Loaded */
document.addEventListener("DOMContentLoaded", shownotes);

// If User adds a Note - Add to Local Storage
let addTxt = document.getElementById("addTxt");
let addBtn = document.getElementById("addBtn").addEventListener("click", addNote);

// Searching Nots
let searchTxt = document.getElementById("searchTxt").addEventListener("input", searchNote);



// Execute a function when the user releases a key on the keyboard
addTxt.addEventListener("keyup", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("addBtn").click();
    }
});

// Adding Note on the Page 
// auto
// fit-content
// inherit
// initial
// unset
// max-content
// min-content
// -webkit-fill-available

function addNote(e) {
    let notes = localStorage.getItem("notes");
    if (!notes) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    ob1 = {};
    if (addTxt.value.trim() != '') {
        ob1.notetext = addTxt.value;
        ob1.fav = "like-btn";
        ob1.h = ob1.w = "fit-content";
        notesobj.push(ob1);
        localStorage.setItem('notes', JSON.stringify(notesobj));
        notes = localStorage.getItem("notes");
        shownotes();
    }
    addTxt.value = "";
}

// If User Deletes a Note - Deletes from Local Storage
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (!notes) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    shownotes();
}

/* Seraching Note */
function searchNote() {
    inputval = document.getElementById("searchTxt").value;
    notecards = document.querySelectorAll(".noteCard");
    Array.from(notecards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.toLowerCase().includes(inputval.toLowerCase())) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
}

// Mark a note as Favourite
function favNote(index, elm) {

    let heart = document.getElementById(elm);
    let clname;

    // If red-heart then chnage to Gray and vice-versa
    if (heart.classList.contains("like-btn-active") || heart.classList.contains("is-active")) {
        heart.className = "like-btn";
        clname = heart.className;
    } else {
        heart.className = "like-btn is-active";
        clname = "like-btn like-btn-active";
    }
    // Setting Note back to local storage
    let notes = localStorage.getItem("notes");
    if (!notes) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj[index].fav = clname;
    localStorage.setItem('notes', JSON.stringify(notesobj));
}

// Show Notes
function shownotes() {
    myObserver.disconnect();
    let notes = localStorage.getItem("notes");
    if (!notes) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let notesElm = document.getElementById("notes");
    let html = "";

    notesobj.forEach(function (element, index) {
        html +=
            `<div id = "${index}" class="noteCard my-2 mx-2 card" style= "border: 1px solid #ced4da; height:${element.h}; width:${element.w}; min-height:12rem; min-width:16rem; resize: both; overflow: auto;">
                <div class="card-body">
                    <div  id = "${'Heart' + String(index)}" onclick = "favNote(${index}, this.id);" class="${element.fav}"></div>
                    <h5 class="card-title" style="margin-left: 23px; display:inline">Note: ${String(index + 1)}</h5> 
                    <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary" style="margin-top: -5px; float:right;">Delete Note</button>
                    <br><br><hr>
                    <p class="card-text" style ="white-space: pre-wrap;">${(element.notetext)}</p>
                </div>
            </div>
            `;
    });

    document.getElementById("noteCount").innerHTML = notesobj.length;
    if (notesobj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = "<b>No Notes here</b>";
        localStorage.removeItem("notes");
    }
    if (notesobj.length != 0) {
        for (i = 0; i < notesobj.length; i++) {
            someEl = document.getElementById(i);
            myObserver.observe(someEl, i);
        }
    }
}

/* TODO: Observer to Observe Div Resize */
const myObserver = new ResizeObserver(entries => {
    entries.forEach((entry, index) => {

        let notes = localStorage.getItem("notes");

        notesobj = JSON.parse(notes);
        console.log(entry);
        notesobj[parseInt(entry.target.id)].w = String(entry.contentRect.width + 2) + "px";
        notesobj[parseInt(entry.target.id)].h = String(entry.contentRect.height + 2) + "px";
        localStorage.setItem('notes', JSON.stringify(notesobj));
    });
});



// Get the video
var video = document.getElementById("myVideo");

// Get the button
var btn = document.getElementById("myBtn");

// Pause and play the video, and change the button text
function myFunction() {
    if (video.paused) {
        video.play();
        btn.innerHTML = "Pause";


    } else {
        video.pause();
        btn.innerHTML = "Play";

    }
}