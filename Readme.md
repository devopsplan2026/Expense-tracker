Open Terminal and run:
mkdir expense-tracker
cd expense-tracker


📁 Step 2: Create Files
Run this:
touch index.html summary.html style.css script.js
Now your folder should look like:
expense-tracker/
├── index.html
├── summary.html
├── style.css
└── script.js

✍️ Step 3: Add Code
👉 Open each file in the editor:

<!-- ================== index.html ================== -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Expense Tracker</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Expense Tracker</h1>

    <input type="text" id="name" placeholder="Expense Name">
    <input type="number" id="amount" placeholder="Amount">
    <input type="date" id="date">

    <button onclick="addExpense()">Add Expense</button>
    <button onclick="goToSummary()">Total Expense</button>

    <ul id="expenseList"></ul>
  </div>

  <script src="script.js"></script>
</body>
</html>


<!-- ================== summary.html ================== -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Expense Summary</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Total Expenses</h1>
    <ul id="summaryList"></ul>
    <h2 id="total"></h2>
    <button onclick="goBack()">Back</button>
  </div>

  <script src="script.js"></script>
</body>
</html>



<!-- ================== style.css ================== -->

body {
  font-family: Arial, sans-serif;
  background: #f4f4f4;
}

.container {
  width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}

button {
  width: 48%;
  padding: 10px;
  margin: 5px 1%;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  background: #eee;
  margin: 5px 0;
  border-radius: 5px;
}


<!-- ================== script.js ================== -->

function getExpenses() {
  return JSON.parse(localStorage.getItem('expenses')) || [];
}

function saveExpenses(expenses) {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function addExpense() {
  const name = document.getElementById('name').value;
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;

  if (!name || !amount || !date) {
    alert('Please fill all fields');
    return;
  }

  const expenses = getExpenses();
  expenses.push({ name, amount: parseFloat(amount), date });
  saveExpenses(expenses);

  displayExpenses();
}

function displayExpenses() {
  const list = document.getElementById('expenseList');
  if (!list) return;

  list.innerHTML = '';
  const expenses = getExpenses();

  expenses.forEach(exp => {
    const li = document.createElement('li');
    li.textContent = `${exp.name} - ₹${exp.amount} - ${exp.date}`;
    list.appendChild(li);
  });
}

function goToSummary() {
  window.location.href = 'summary.html';
}

function goBack() {
  window.location.href = 'index.html';
}

function displaySummary() {
  const list = document.getElementById('summaryList');
  const totalEl = document.getElementById('total');

  if (!list) return;

  const expenses = getExpenses();
  let total = 0;

  expenses.forEach(exp => {
    const li = document.createElement('li');
    li.textContent = `${exp.name} - ₹${exp.amount} - ${exp.date}`;
    list.appendChild(li);
    total += exp.amount;
  });

  totalEl.textContent = 'Total: ₹' + total;
}

// Auto load
window.onload = function () {
  displayExpenses();
  displaySummary();
};


▶️ Step 4: Run Project
Just open in browser:
xdg-open index.html


🐳 Step 5: Run with Docker
Build the image from the project directory:
docker build -t expense-tracker .

Start the container:
docker run --rm -p 7001:80 expense-tracker

Open the app at:
http://localhost:7001



