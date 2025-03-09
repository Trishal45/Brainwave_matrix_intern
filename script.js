let expenses = [];

function addExpense() {
    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const category = document.getElementById("expense-category").value;
    const date = document.getElementById("expense-date").value;

    if (!name || isNaN(amount) || !date) {
        alert("Please fill all fields correctly!");
        return;
    }

    const expense = { name, amount, category, date };
    expenses.push(expense);
    updateUI();
    clearInputs();
}

function updateUI() {
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");

    expenseList.innerHTML = "";
    let total = 0;
    let categoryTotals = {};

    expenses.forEach((expense, index) => {
        total += expense.amount;

        if (categoryTotals[expense.category]) {
            categoryTotals[expense.category] += expense.amount;
        } else {
            categoryTotals[expense.category] = expense.amount;
        }

        const li = document.createElement("li");
        li.innerHTML = `
            ${expense.name} - ₹${expense.amount} [${expense.category}] (${expense.date})
            <button onclick="deleteExpense(${index})">❌</button>
        `;
        expenseList.appendChild(li);
    });

    totalAmount.textContent = total;
    updateChart(categoryTotals);
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateUI();
}

function clearInputs() {
    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";
    document.getElementById("expense-date").value = "";
}

// Chart.js Graph
let expenseChart;

function updateChart(categoryTotals) {
    const ctx = document.getElementById("expenseChart").getContext("2d");

    if (expenseChart) {
        expenseChart.destroy();
    }

    expenseChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                label: "Expenses",
                data: Object.values(categoryTotals),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            }]
        },
        options: {
            responsive: false, /* Fixed size */
            maintainAspectRatio: false, /* Prevent auto-resizing */
        }
    });
}

