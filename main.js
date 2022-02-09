// Define UI variables
const form = document.querySelector('#addBug');
const input = document.querySelector('#bugInput');
const submit = document.querySelector('#submitBtn');
const list = document.querySelector('#bugList');

// Create event listeners
function loadEventHandlers() {
  submit.addEventListener('click', createBug);
  list.addEventListener('click', deleteBug);
}

// Handle creation of new bugs
function createBug(e) {
  e.preventDefault();

  if (!input.value) return console.log('add a task');

  const li = createLi(input.value);
  list.appendChild(li);

  // Push item to localStorage
  store({ title: input.value });

  // Reset input
  input.value = '';
}

// Create list item
function createLi(value) {
  const li = document.createElement('li');
  li.className =
    'flex justify-between items-center border border-gray-300 p-4 mt-4 rounded';
  li.innerText = value;

  // Create delete button
  const delBtn = document.createElement('button');
  delBtn.className = 'delete-bug';
  delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  li.appendChild(delBtn);
  return li;
}

// Handle deletion of bugs
function deleteBug(e) {
  if (e.target.parentElement.classList.contains('delete-bug')) {
    const li = e.target.parentElement.parentElement;
    deleteFromLocalStorage(li.innerText);
    li.remove();
  }
}

// Store data in localStorage
function store(data) {
  const currentBugs = getDataFromLocalStorage();

  let bugs;
  if (currentBugs) {
    bugs = JSON.parse(currentBugs);
    bugs.push(data);
  } else {
    bugs = Array(data);
  }

  localStorage.setItem('bugs', JSON.stringify(bugs));
}

// Get current data
function getDataFromLocalStorage() {
  return localStorage.getItem('bugs');
}

// Remove bug from localStorage
function deleteFromLocalStorage(title) {
  const currentBugs = getDataFromLocalStorage();

  if (currentBugs) {
    const parsedList = JSON.parse(currentBugs);
    const filtered = parsedList.filter((bug) => bug.title !== title);
    localStorage.setItem('bugs', JSON.stringify(filtered));
  }
}

// Start
function main() {
  loadEventHandlers();

  // Populate list from local storage on startup
  const data = getDataFromLocalStorage();

  if (data) {
    const parsed = JSON.parse(data);
    parsed.map((bug) => {
      const li = createLi(bug.title);
      list.appendChild(li);
    });
  }
}

main();
