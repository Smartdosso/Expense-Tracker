document.addEventListener('DOMContentLoaded', (event) => {
    const budgets = JSON.parse(localStorage.getItem('budgets')) || [];
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    console.log('Budgets:', budgets);
    console.log('Expenses:', expenses);

    // Combine budgets and expenses
    const data = budgets.map((budget, index) => {
        const week = budget.addDate; 
        const month = budget.month;
        const budgetAmount = budget.addAmount;
        const expenseAmount = expenses[index]?.addAmount || 0;
        return { week, month, budget: budgetAmount, expense: expenseAmount };
    });

    console.log('Combined Data:', data);

    // Calculate total budget and total expense

    const totalBudget = data.reduce((acc, entry) => acc + entry.budget, 0);
    const totalExpense = data.reduce((acc, entry) => acc + entry.expense, 0);

    const ctxWeekly = document.getElementById('weeklyChart').getContext('2d');

    new Chart(ctxWeekly, {
        type: 'doughnut',
        data: {
            labels: ['Budget', 'Expense'],
            datasets: [{
                label: 'Budget vs Expense',
                data: [totalBudget, totalExpense],
                backgroundColor: [
                    'rgba(46, 204, 113, 0.2)', 
                    'rgba(192, 57, 43, 0.2)' 
                ],
                borderColor: [
                    'green', 
                    'rgba(192, 57, 43, 1)' 
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            cutout: '70%', 
            plugins: {
                legend: {
                    position: 'bottom' 
                }
            }
        }
    });
});
