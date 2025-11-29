/* ========================================
   BUDGET CALCULATOR - JAVASCRIPT
   ======================================== */

class BudgetCalculator {
    constructor() {
        this.monthlyIncome = 100000;
        this.savingsAmount = 500000;
        this.downPaymentPercent = 30;
        this.existingEMI = 10000;
        this.expectedRate = 8.5;
        this.loanTenure = 20;
        
        this.initializeEventListeners();
        this.updateBudget();
    }

    initializeEventListeners() {
        document.getElementById('monthlyIncome').addEventListener('change', () => this.updateBudget());
        document.getElementById('savingsAmount').addEventListener('change', () => this.updateBudget());
        
        document.getElementById('downPaymentPercent').addEventListener('input', (e) => {
            this.downPaymentPercent = parseFloat(e.target.value);
            document.getElementById('downPaymentPercentInput').value = this.downPaymentPercent;
            this.updateBudget();
        });

        document.getElementById('downPaymentPercentInput').addEventListener('change', (e) => {
            this.downPaymentPercent = parseFloat(e.target.value) || this.downPaymentPercent;
            document.getElementById('downPaymentPercent').value = this.downPaymentPercent;
            this.updateBudget();
        });

        document.getElementById('existingEMI').addEventListener('change', () => this.updateBudget());
        
        document.getElementById('expectedRate').addEventListener('input', (e) => {
            this.expectedRate = parseFloat(e.target.value);
            document.getElementById('expectedRateInput').value = this.expectedRate;
            this.updateBudget();
        });

        document.getElementById('expectedRateInput').addEventListener('change', (e) => {
            this.expectedRate = parseFloat(e.target.value) || this.expectedRate;
            document.getElementById('expectedRate').value = this.expectedRate;
            this.updateBudget();
        });

        document.getElementById('loanTenureYears').addEventListener('input', (e) => {
            this.loanTenure = parseFloat(e.target.value);
            document.getElementById('loanTenureYearsInput').value = this.loanTenure;
            this.updateBudget();
        });

        document.getElementById('loanTenureYearsInput').addEventListener('change', (e) => {
            this.loanTenure = parseFloat(e.target.value) || this.loanTenure;
            document.getElementById('loanTenureYears').value = this.loanTenure;
            this.updateBudget();
        });
    }

    formatCurrency(value) {
        return '₹' + Math.round(value).toLocaleString('en-IN');
    }

    calculateEMI(principal, monthlyRate, months) {
        if (monthlyRate === 0) {
            return principal / months;
        }
        
        const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
        const denominator = Math.pow(1 + monthlyRate, months) - 1;
        return numerator / denominator;
    }

    calculateMaxLoan(availableForEMI, monthlyRate, months) {
        if (monthlyRate === 0) {
            return availableForEMI * months;
        }
        
        const denominator = (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        return availableForEMI / denominator;
    }

    updateBudget() {
        this.monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);
        this.savingsAmount = parseFloat(document.getElementById('savingsAmount').value);
        this.existingEMI = parseFloat(document.getElementById('existingEMI').value) || 0;
        
        // Available for new EMI (50% of available income)
        const availableForEMI = (this.monthlyIncome - this.existingEMI) * 0.5;
        
        // Calculate max loan based on EMI capacity
        const monthlyRate = this.expectedRate / 100 / 12;
        const totalMonths = this.loanTenure * 12;
        
        const maxLoanFromEMI = this.calculateMaxLoan(availableForEMI, monthlyRate, totalMonths);
        
        // Calculate down payment from savings
        let downPaymentAmount = (this.savingsAmount * this.downPaymentPercent) / 100;
        downPaymentAmount = Math.min(downPaymentAmount, this.savingsAmount);
        
        // Total budget
        const totalBudget = downPaymentAmount + maxLoanFromEMI;
        
        // EMI for this budget
        const emiForThisBudget = this.calculateEMI(maxLoanFromEMI, monthlyRate, totalMonths);
        
        // Update display
        document.getElementById('downPaymentAmount').textContent = this.formatCurrency(downPaymentAmount);
        document.getElementById('maxLoanAmount').textContent = this.formatCurrency(maxLoanFromEMI);
        document.getElementById('totalBudget').textContent = this.formatCurrency(totalBudget);
        document.getElementById('budgetAmount').textContent = this.formatCurrency(totalBudget);
        document.getElementById('monthlyEmiAmount').textContent = this.formatCurrency(emiForThisBudget);
        document.getElementById('availableForEmi').textContent = this.formatCurrency(availableForEMI);
        
        // Budget recommendations
        const conservativeBudget = (this.monthlyIncome * 20) / (monthlyRate * 12);
        const moderateBudget = (this.monthlyIncome * 30) / (monthlyRate * 12);
        const aggressiveBudget = totalBudget;
        
        document.getElementById('conservativeBudget').textContent = this.formatCurrency(conservativeBudget);
        document.getElementById('moderateBudget').textContent = this.formatCurrency(moderateBudget);
        document.getElementById('aggressiveBudget').textContent = this.formatCurrency(aggressiveBudget);
    }
}

function resetBudgetCalculator() {
    document.getElementById('monthlyIncome').value = 100000;
    document.getElementById('savingsAmount').value = 500000;
    document.getElementById('downPaymentPercent').value = 30;
    document.getElementById('downPaymentPercentInput').value = 30;
    document.getElementById('existingEMI').value = 10000;
    document.getElementById('expectedRate').value = 8.5;
    document.getElementById('expectedRateInput').value = 8.5;
    document.getElementById('loanTenureYears').value = 20;
    document.getElementById('loanTenureYearsInput').value = 20;
    
    calculator.updateBudget();
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '/logout';
    }
}

let calculator;
document.addEventListener('DOMContentLoaded', () => {
    calculator = new BudgetCalculator();
});
