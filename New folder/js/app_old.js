/*jshint esversion: 6 */
var scripts = document.getElementsByTagName('script');
var lastScript = scripts[scripts.length - 1];
var scriptName = lastScript.src;
console.log("loading: " + scriptName.substring(scriptName.lastIndexOf('/') + 1));

/* Show Notes when Document is Loaded */
document.addEventListener("DOMContentLoaded", shownotes);

// If User adds a Note - Add to Local Storage
let addBtn = document.getElementById("addBtn").addEventListener("click", addNote);

// Searching Nots
let searchTxt = document.getElementById("searchTxt").addEventListener("input", searchNote);

function addNote(e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (!notes) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    ob1 = {};
    ob1.notetext = addTxt.value;
    ob1.fav = "like-btn";
    notesobj.push(ob1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    addTxt.value = "";
    console.log(notes);
    shownotes();
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
        let cardTxt = element.getElementsByTagName("pre")[0].innerText;
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

    let notes = localStorage.getItem("notes");
    if (!notes) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    // Adding Note on the Page 
    notesobj.forEach(function (element, index) {
        html +=
            `<div id = "${'noteCard' + String(index + 1)}" class="noteCard my-2 mx-2 card" style="width: 18rem; resize: both; overflow: auto;">
                <div class="card-body">
                    <div  id = "${'Heart' + String(index + 1)}" onclick = "favNote(${index}, this.id);" class="${element.fav}"></div>
                    <h5 class="card-title" style="margin-left: 1.5em;">Note: ${String(index + 1)}</h5>
                    <p class="card-text" ><pre>${element.notetext}</pre></p>
                    <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary" >Delete Note</button>
                </div>
            </div>
            `;
    });

    let notesElm = document.getElementById("notes");
    if (notesobj.length != 0) {
        notesElm.innerHTML = html;
        // for (i = 1; i <= notesobj.length; i++) {
        //     someEl = document.getElementById('noteCard' + i);
        //     myObserver.observe(someEl, i);
        // }
    }
    else {
        notesElm.innerHTML = "<b>No Notes here</b>";
        localStorage.removeItem("notes");
    }
}

/* TODO: Observer to Observe Div Resize */
// const myObserver = new ResizeObserver(entries => {
//     entries.forEach((entry, index) => {
//         console.log(entry.target);
//         console.log('width', entry.contentRect.width);
//         console.log('height', entry.contentRect.height);

//         let notes = localStorage.getItem("notes");
//         if (!notes) {
//             notesobj = [];
//         }
//         else {
//             notesobj = JSON.parse(notes);
//         }
//         notesobj[index].w = String(entry.contentRect.width) + "px";
//         notesobj[index].h = String(entry.contentRect.height) + "px";
//         localStorage.setItem('notes', JSON.stringify(notesobj));
//     });
// });



