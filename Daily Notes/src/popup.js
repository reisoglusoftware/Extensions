// popup.js
function saveNote() {
  var note = document.getElementById("noteInput").value;
  if (note.trim() !== "") {
    chrome.storage.local.get(["notes"], function (result) {
      var notes = result.notes || [];
      notes.push(note);
      chrome.storage.local.set({ notes: notes }, function () {
        renderNotes(notes);
      });
    });
  }
}

function renderNotes(notes) {
  var notesDiv = document.getElementById("savedNotes");
  notesDiv.innerHTML = "";
  if (notes.length === 0) {
    notesDiv.textContent = "Henüz hiç not eklenmedi.";
  } else {
    notes.forEach(function (note, index) {
      var noteElem = document.createElement("div");
      noteElem.textContent = note;
      notesDiv.appendChild(noteElem);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(["notes"], function (result) {
    var notes = result.notes || [];
    renderNotes(notes);
  });
});
