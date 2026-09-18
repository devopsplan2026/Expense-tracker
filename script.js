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
