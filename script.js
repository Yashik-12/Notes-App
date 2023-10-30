const addBtn = document.querySelector('.addNoteBtn'),
  notes = document.querySelector('.wrapper');

//Function of add note button
addBtn.addEventListener('click', () => {
  addNoteFunc();
});

//Function to add the notes
const addNoteFunc = (text = '') => {
  let noteContainer = document.createElement('div');
  noteContainer.classList.add('noteContainer');
  noteContainer.style.margin = '0 1% 10px';
  noteContainer.innerHTML =
    ` 
        <div class="note-container">
        <div class="functionality-header">
          <span class="edit-icon">edit-icon</span>
          <span class="delete-icon" value='edit'>delete-icon</span>
        </div>
        <textarea >${text}</textarea>
      </div>
            
        `;

  let deleteNote = noteContainer.querySelector('.delete-icon'),
    editBtn = noteContainer.querySelector('.edit-icon'),
    textarea = noteContainer.querySelector('textarea');

  // Function to delete the notes
  deleteNote.addEventListener('click', () => {
    noteContainer.remove();
    saveNotesData();
  });

  // Function to edit the notes 
  editBtn.addEventListener('click', () => {
    textarea.disabled = !textarea.disabled;
    textarea.focus()
  });

  //Function to save the notes when the cursor is out of the note card
  let saveNote = noteContainer.querySelector('textarea');
  saveNote.addEventListener('focusout', () => {
    saveNotesData();
  })
  notes.append(noteContainer);
  saveNotesData();
}

// Function to save the notes 
const saveNotesData = () => {
  let notes = document.querySelectorAll('.noteContainer textarea'),
    data = [];
  notes.forEach(noteContainer => { data.push(noteContainer.value) });
  if (data.length == 0) {
    localStorage.removeItem('notes')
  } else {
    localStorage.setItem('notes', JSON.stringify(data));
  }
}

// Function to load the notes initially
window.addEventListener('load', () => {
  let localStorageNotes = JSON.parse(localStorage.getItem('notes'));
  console.log(localStorageNotes)
  if (localStorageNotes == null) {
    addNoteFunc()
  } else {
    localStorageNotes.forEach(localStorageNotes => {
      addNoteFunc(localStorageNotes);
    })
  }
});


