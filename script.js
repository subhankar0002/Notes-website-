const creatNoteBtn = document.getElementById('creat-note');
const noteContainer = document.getElementById('main');


creatNoteBtn.addEventListener('click', () => {
    const inputbox = document.createElement('p');
    inputbox.className='input';
    inputbox.setAttribute('contenteditable','true');
    noteContainer.appendChild(inputbox);

    const tools = document.createElement('div');
    tools.className='function';
    // noteContainer.appendChild(tools)

    const saveBtn = document.createElement('button');
    saveBtn.className='save';
    saveBtn.textContent='Save';
    saveBtn.addEventListener('click', () => saveitem()); //note,noteContainer
    //noteContainer.appendChild(tools).appendChild(saveBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteitem(inputbox,tools));
    //noteContainer.appendChild(tools).appendChild(deleteBtn);

    tools.appendChild(saveBtn);
    tools.appendChild(deleteBtn);
    noteContainer.appendChild(tools);

});


function saveitem(){
    localStorage.setItem('note', noteContainer.innerHTML);
}

function deleteitem(inputbox,tools){
    inputbox.remove();
    tools.remove();
    saveitem();
}

document.addEventListener('keydown',(event)=>{
    if(event.key === "Enter"){
        document.execCommand('insertLineBreak');
        event.preventDefault();
    }
});

// connfution
function showNotes() {
    noteContainer.innerHTML = localStorage.getItem('note') || '';
    attachEventListeners();
}

function attachEventListeners() {
    const savedNotes = document.querySelectorAll('.function');
    savedNotes.forEach((tools) => {
        const inputbox = tools.previousElementSibling;
        const saveBtn = tools.querySelector('.save');
        const deleteBtn = tools.querySelector('.delete');

        saveBtn.addEventListener('click', () => saveitem());
        deleteBtn.addEventListener('click', () => deleteitem(inputbox, tools));
    });
}

showNotes();