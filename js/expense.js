let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('expenseCategory');
const expenseAmount = document.getElementById('expenseAmount');
const expenseDate = document.getElementById('expenseDate');
const expenseAdd = document.getElementById('expenseAdd');
const expenseTableBody = document.getElementById('expenseTableBody');
const totalAmountCell = document.getElementById('expenseTotalAmount');

// Load expenses from local storage
document.addEventListener('DOMContentLoaded', loadExpensesFromLocalStorage);

expenseAdd.addEventListener('click', function() {
    const addCategory = categorySelect.value;
    const addAmount = Number(expenseAmount.value);
    const addDate = expenseDate.value;

    if (addCategory === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(addAmount) || addAmount < 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (addDate === '') {
        alert('Please select a date');
        return;
    }

    const expense = { addCategory, addAmount, addDate };
    expenses.push(expense);

    totalAmount += addAmount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expenseTableBody.insertRow();

    const expenseCategoryCell = newRow.insertCell();
    const expenseAmountCell = newRow.insertCell();
    const expenseDateCell = newRow.insertCell();
    const expenseEditCell = newRow.insertCell();
    const expenseDeleteCell = newRow.insertCell();

    const expenseEditBtn = document.createElement('button');
    expenseEditBtn.textContent = 'Edit';
    expenseEditBtn.classList.add('edit-btn');

    expenseEditBtn.addEventListener('click', function() {
        const newCategory = prompt('Edit category:', addCategory);
        const newAmount = prompt('Edit amount:', addAmount);
        const newDate = prompt('Edit date:', addDate);

        if (newCategory !== null && newAmount !== null && newDate !== null) {
            expenseCategoryCell.textContent = newCategory;
            expenseAmountCell.textContent = newAmount;
            expenseDateCell.textContent = newDate;

            expense.addCategory = newCategory;
            expense.addAmount = Number(newAmount);
            expense.addDate = newDate;

            totalAmount = expenses.reduce((sum, exp) => sum + exp.addAmount, 0);
            totalAmountCell.textContent = totalAmount;

            saveExpensesToLocalStorage();
        }
    });

    const expenseDeleteBtn = document.createElement('button');
    expenseDeleteBtn.textContent = 'Delete';
    expenseDeleteBtn.classList.add('delete-btn');

    expenseDeleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= addAmount;
        totalAmountCell.textContent = totalAmount;

        expenseTableBody.removeChild(newRow);

        saveExpensesToLocalStorage();
    });

    expenseCategoryCell.textContent = expense.addCategory;
    expenseAmountCell.textContent = expense.addAmount;
    expenseDateCell.textContent = expense.addDate;
    expenseEditCell.appendChild(expenseEditBtn);
    expenseDeleteCell.appendChild(expenseDeleteBtn);

    saveExpensesToLocalStorage();
});

function saveExpensesToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('totalAmount', totalAmount);
}

function loadExpensesFromLocalStorage() {
    const storedExpenses = localStorage.getItem('expenses');
    const storedTotalAmount = localStorage.getItem('totalAmount');

    if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
        totalAmount = Number(storedTotalAmount);
        totalAmountCell.textContent = totalAmount;

        expenses.forEach(expense => {
            const newRow = expenseTableBody.insertRow();

            const expenseCategoryCell = newRow.insertCell();
            const expenseAmountCell = newRow.insertCell();
            const expenseDateCell = newRow.insertCell();
            const expenseEditCell = newRow.insertCell();
            const expenseDeleteCell = newRow.insertCell();

            const expenseEditBtn = document.createElement('button');
            expenseEditBtn.textContent = 'Edit';
            expenseEditBtn.classList.add('edit-btn');

            expenseEditBtn.addEventListener('click', function() {
                const newCategory = prompt('Edit category:', expense.addCategory);
                const newAmount = prompt('Edit amount:', expense.addAmount);
                const newDate = prompt('Edit date:', expense.addDate);

                if (newCategory !== null && newAmount !== null && newDate !== null) {
                    expenseCategoryCell.textContent = newCategory;
                    expenseAmountCell.textContent = newAmount;
                    expenseDateCell.textContent = newDate;

                    expense.addCategory = newCategory;
                    expense.addAmount = Number(newAmount);
                    expense.addDate = newDate;

                    totalAmount = expenses.reduce((sum, exp) => sum + exp.addAmount, 0);
                    totalAmountCell.textContent = totalAmount;

                    saveExpensesToLocalStorage();
                }
            });

            const expenseDeleteBtn = document.createElement('button');
            expenseDeleteBtn.textContent = 'Delete';
            expenseDeleteBtn.classList.add('delete-btn');

            expenseDeleteBtn.addEventListener('click', function() {
                expenses.splice(expenses.indexOf(expense), 1);

                totalAmount -= expense.addAmount;
                totalAmountCell.textContent = totalAmount;

                expenseTableBody.removeChild(newRow);

                saveExpensesToLocalStorage();
            });

            expenseCategoryCell.textContent = expense.addCategory;
            expenseAmountCell.textContent = expense.addAmount;
            expenseDateCell.textContent = expense.addDate;
            expenseEditCell.appendChild(expenseEditBtn);
            expenseDeleteCell.appendChild(expenseDeleteBtn);
        });
    }
}