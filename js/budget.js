let budgets = [];
let totalBudgetAmount = 0;

const categorySelect = document.getElementById('budgetCategory');
const budgetAmount = document.getElementById('budgetAmount');
const budgetAdd = document.getElementById('budgetAdd');
const budgetTableBody = document.getElementById('budgetTableBody');
const totalBudgetAmountCell = document.getElementById('budgetTotalAmount');

// Load budgets from local storage
document.addEventListener('DOMContentLoaded', loadBudgetsFromLocalStorage);

budgetAdd.addEventListener('click', function() {
    const addCategory = categorySelect.value;
    const addAmount = Number(budgetAmount.value);

    if (addCategory === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(addAmount) || addAmount < 0) {
        alert('Please enter a valid amount');
        return;
    }

    const budget = { addCategory, addAmount };
    budgets.push(budget);

    totalBudgetAmount += addAmount;
    totalBudgetAmountCell.textContent = totalBudgetAmount;

    const newRow = budgetTableBody.insertRow();

    const budgetCategoryCell = newRow.insertCell();
    const budgetAmountCell = newRow.insertCell();
    const budgetEditCell = newRow.insertCell();
    const budgetDeleteCell = newRow.insertCell();

    const budgetEditBtn = document.createElement('button');
    budgetEditBtn.textContent = 'Edit';
    budgetEditBtn.classList.add('edit-btn');

    budgetEditBtn.addEventListener('click', function() {
        const newCategory = alert('Edit category:', addCategory);
        const newAmount = alert('Edit amount:', addAmount);

        if (newCategory !== null && newAmount !== null) {
            budgetCategoryCell.textContent = newCategory;
            budgetAmountCell.textContent = newAmount;

            budget.addCategory = newCategory;
            budget.addAmount = Number(newAmount);

            totalBudgetAmount = budgets.reduce((sum, bud) => sum + bud.addAmount, 0);
            totalBudgetAmountCell.textContent = totalBudgetAmount;

            saveBudgetsToLocalStorage();
        }
    });

    const budgetDeleteBtn = document.createElement('button');
    budgetDeleteBtn.textContent = 'Delete';
    budgetDeleteBtn.classList.add('delete-btn');

    budgetDeleteBtn.addEventListener('click', function() {
        budgets.splice(budgets.indexOf(budget), 1);

        totalBudgetAmount -= addAmount;
        totalBudgetAmountCell.textContent = totalBudgetAmount;

        budgetTableBody.removeChild(newRow);

        saveBudgetsToLocalStorage();
    });

    budgetCategoryCell.textContent = budget.addCategory;
    budgetAmountCell.textContent = budget.addAmount;
    budgetEditCell.appendChild(budgetEditBtn);
    budgetDeleteCell.appendChild(budgetDeleteBtn);

    saveBudgetsToLocalStorage();
});

function saveBudgetsToLocalStorage() {
    localStorage.setItem('budgets', JSON.stringify(budgets));
    localStorage.setItem('totalBudgetAmount', totalBudgetAmount);
}

function loadBudgetsFromLocalStorage() {
    const storedBudgets = localStorage.getItem('budgets');
    const storedTotalBudgetAmount = localStorage.getItem('totalBudgetAmount');

    if (storedBudgets) {
        budgets = JSON.parse(storedBudgets);
        totalBudgetAmount = Number(storedTotalBudgetAmount);
        totalBudgetAmountCell.textContent = totalBudgetAmount;

        budgets.forEach(budget => {
            const newRow = budgetTableBody.insertRow();

            const budgetCategoryCell = newRow.insertCell();
            const budgetAmountCell = newRow.insertCell();
            const budgetEditCell = newRow.insertCell();
            const budgetDeleteCell = newRow.insertCell();

            const budgetEditBtn = document.createElement('button');
            budgetEditBtn.textContent = 'Edit';
            budgetEditBtn.classList.add('edit-btn');

            budgetEditBtn.addEventListener('click', function() {
                const newCategory = prompt('Edit category:', budget.addCategory);
                const newAmount = prompt('Edit amount:', budget.addAmount);

                if (newCategory !== null && newAmount !== null) {
                    budgetCategoryCell.textContent = newCategory;
                    budgetAmountCell.textContent = newAmount;

                    budget.addCategory = newCategory;
                    budget.addAmount = Number(newAmount);

                    totalBudgetAmount = budgets.reduce((sum, bud) => sum + bud.addAmount, 0);
                    totalBudgetAmountCell.textContent = totalBudgetAmount;

                    saveBudgetsToLocalStorage();
                }
            });

            const budgetDeleteBtn = document.createElement('button');
            budgetDeleteBtn.textContent = 'Delete';
            budgetDeleteBtn.classList.add('delete-btn');

            budgetDeleteBtn.addEventListener('click', function() {
                budgets.splice(budgets.indexOf(budget), 1);

                totalBudgetAmount -= budget.addAmount;
                totalBudgetAmountCell.textContent = totalBudgetAmount;

                budgetTableBody.removeChild(newRow);

                saveBudgetsToLocalStorage();
            });

            budgetCategoryCell.textContent = budget.addCategory;
            budgetAmountCell.textContent = budget.addAmount;
            budgetEditCell.appendChild(budgetEditBtn);
            budgetDeleteCell.appendChild(budgetDeleteBtn);
        });
    }
}

// Currency Converter Script
document.addEventListener('DOMContentLoaded', (event) => {
    // Get modal elements
    const modal = document.getElementById("currencyConverterModal");
    const btn = document.getElementById("currencyConverter");
    const span = document.getElementsByClassName("close")[0];
    const convertButton = document.getElementById("convertButton");
    const conversionResult = document.getElementById("conversionResult");

    // Open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Close modal if clicked outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Convert currency using ExchangeRate-API
    convertButton.onclick = async function() {
        const fromCurrency = document.getElementById("fromCurrency").value;
        const toCurrency = document.getElementById("toCurrency").value;
        const amount = document.getElementById("convertAmount").value;

        if (amount) {
            try {
                const response = await fetch(`https://v6.exchangerate-api.com/v6/614cb3fdfe8aaf14073a5e70/latest/${fromCurrency}`);
                const data = await response.json();

                if (data && data.conversion_rates && data.conversion_rates[toCurrency]) {
                    const conversionRate = data.conversion_rates[toCurrency];
                    const convertedAmount = amount * conversionRate;
                    conversionResult.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
                } else {
                    conversionResult.textContent = "Conversion rate not available";
                }
            } catch (error) {
                conversionResult.textContent = "Error fetching conversion rate";
                console.error("Error fetching conversion rate: ", error);
            }
        } else {
            conversionResult.textContent = "Please enter an amount";
        }
    }
});
