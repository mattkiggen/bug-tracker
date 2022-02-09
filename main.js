// Define UI variables
const form = document.querySelector('#addBug');
const input = document.querySelector('#bugInput');
const submit = document.querySelector('#submitBtn');
const list = document.querySelector('#bugList');

// Create event listeners
function loadEventHandlers() {
  submit.addEventListener('click', createBug);
}

// Handle creation of new bugs
function createBug(e) {
  e.preventDefault();

  if (!input.value) return console.log('add a task');

  // Create list item
  const li = document.createElement('li');
  li.className = 'flex justify-between';
  li.innerText = input.value;

  // Create delete button
  const delBtn = document.createElement('button');
  delBtn.innerText = 'x';
  li.appendChild(delBtn);

  // Add item to list
  list.appendChild(li);

  // Reset input
  input.value = '';
}

// Start
function main() {
  loadEventHandlers();
}

main();
