// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Optional: Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Close menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });


    const calculateButton = document.getElementById('calculateButton');
    const resetButton = document.getElementById('resetButton');

    if (calculateButton) {
        calculateButton.addEventListener('click', function (e) {
            e.preventDefault();
            try {
                const goalAmount = parseFloat(document.getElementById('goalAmount').value);
                const currentSavings = parseFloat(document.getElementById('currentSavings').value);
                const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
                const annualInterestRate = parseFloat(document.getElementById('interestRate').value) / 100;
                const resultsText = document.getElementById('resultsText');

                if (isNaN(goalAmount) || isNaN(currentSavings) || isNaN(monthlyContribution) || isNaN(annualInterestRate)) {
                    resultsText.textContent = "Please enter valid numbers for all fields.";
                    return;
                }

                const monthlyInterestRate = annualInterestRate / 12;
                let months = 0;
                let savings = currentSavings;

                while (savings < goalAmount) {
                    savings += monthlyContribution;
                    savings += savings * monthlyInterestRate;
                    months++;

                    if (months > 1200) {
                        resultsText.textContent = "It will take a very long time to reach your goal. Consider increasing your monthly contributions or interest rate.";
                        return;
                    }
                }

                const years = Math.floor(months / 12);
                const remainingMonths = months % 12;

                resultsText.textContent = `It will take approximately ${years} years and ${remainingMonths} months to reach your savings goal.`;
            } catch (error) {
                console.error("An error occurred:", error);
                resultsText.textContent = "An error occurred while calculating. Please try again.";
            }
        });
    }

    // Reset Button Functionality
    if (resetButton) {
        resetButton.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('goalAmount').value = '';
            document.getElementById('currentSavings').value = '';
            document.getElementById('monthlyContribution').value = '';
            document.getElementById('interestRate').value = '';
            document.getElementById('resultsText').textContent = "Press  Calculate to see how long it will take to reach your savings goal.";
        });
    }
});

// Budget Template Download

const downloadBudgetButton = document.getElementById('download-budget');

if (downloadBudgetButton) {
    downloadBudgetButton.addEventListener('click', function () {
        const form = document.getElementById('budget-form');
        const formData = new FormData(form);

        // Function to safely get and parse form data
        function getNumericValue(key) {
            const value = formData.get(key);
            return value ? parseFloat(value) : 0;
        }

        // Calculate total income
        const incomeSalary = getNumericValue('income-salary');
        const incomeOther = getNumericValue('income-other');
        const totalIncome = incomeSalary + incomeOther;

        // Calculate total expenses
        const expensesRent = getNumericValue('expenses-rent');
        const expensesElectricity = getNumericValue('expenses-electricity');
        const expensesGas = getNumericValue('expenses-gas');
        const expensesFood = getNumericValue('expenses-food');
        const expensesEatingOut = getNumericValue('expenses-eating out');
        const expensesClothes = getNumericValue('expenses-clothes');
        const expensesCars = getNumericValue('expenses-cars');
        const expensesInsurance = getNumericValue('expenses-insurance');
        const expensesLoanPayments = getNumericValue('expenses-loan payments');
        const expensesEntertainment = getNumericValue('expenses-entertainment');
        const expensesMiscellaneous = getNumericValue('expenses-miscellaneous');
        const totalExpenses = expensesRent + expensesElectricity + expensesGas + expensesFood + expensesEatingOut + expensesClothes + expensesCars + expensesInsurance + expensesLoanPayments + expensesEntertainment + expensesMiscellaneous;

        // Calculate remaining savings
        const savingsRemaining = totalIncome - totalExpenses;

        // Create CSV header
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Category,Item,Amount\r\n"; // Add header row

        // Add income data
        csvContent += "Income,Salary," + incomeSalary + "\r\n";
        csvContent += "Income,Other," + incomeOther + "\r\n";

        // Add expenses data
        csvContent += "Expenses,Rent," + expensesRent + "\r\n";
        csvContent += "Expenses,Electricity," + expensesElectricity + "\r\n";
        csvContent += "Expenses,Gas," + expensesGas + "\r\n";
        csvContent += "Expenses,Food," + expensesFood + "\r\n";
        csvContent += "Expenses,Eating Out," + expensesEatingOut + "\r\n";
        csvContent += "Expenses,Clothes," + expensesClothes + "\r\n";
        csvContent += "Expenses,Cars," + expensesCars + "\r\n";
        csvContent += "Expenses,Insurance," + expensesInsurance + "\r\n";
        csvContent += "Expenses,Loan Payments," + expensesLoanPayments + "\r\n";
        csvContent += "Expenses,Entertainment," + expensesEntertainment + "\r\n";
        csvContent += "Expenses,Miscellaneous," + expensesMiscellaneous + "\r\n";

        // Add totals
        csvContent += "Income,Total," + totalIncome + "\r\n";
        csvContent += "Expenses,Total," + totalExpenses + "\r\n";
        csvContent += "Savings,Remaining," + savingsRemaining + "\r\n";

        csvContent += "Date," + new Date().toLocaleDateString() + "\r\n"; // Add date

        // Create a download link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "family_budget.csv");
        document.body.appendChild(link); // Required for Firefox

        link.click(); // Trigger download

        document.body.removeChild(link); // Clean up
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.program-card, .blog-post');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll();

