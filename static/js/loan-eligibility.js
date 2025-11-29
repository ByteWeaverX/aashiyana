/* ========================================
   LOAN ELIGIBILITY CALCULATOR - JAVASCRIPT
   ======================================== */

class LoanEligibilityCalculator {
    constructor() {
        this.age = 35;
        this.annualIncome = 1000000;
        this.existingEMI = 0;
        this.creditScore = 750;
        this.workExp = 10;
        this.empType = 'salaried';
        
        this.initializeEventListeners();
        this.updateEligibility();
    }

    initializeEventListeners() {
        document.getElementById('age').addEventListener('change', () => this.updateEligibility());
        
        document.getElementById('annualIncome').addEventListener('input', (e) => {
            this.annualIncome = parseFloat(e.target.value);
            document.getElementById('annualIncomeInput').value = this.annualIncome;
            this.updateEligibility();
        });

        document.getElementById('annualIncomeInput').addEventListener('change', (e) => {
            this.annualIncome = parseFloat(e.target.value) || this.annualIncome;
            document.getElementById('annualIncome').value = this.annualIncome;
            this.updateEligibility();
        });

        document.getElementById('existingLoan').addEventListener('change', () => this.updateEligibility());
        
        document.getElementById('creditScore').addEventListener('input', (e) => {
            this.creditScore = parseFloat(e.target.value);
            document.getElementById('creditScoreInput').value = this.creditScore;
            this.updateEligibility();
        });

        document.getElementById('creditScoreInput').addEventListener('change', (e) => {
            this.creditScore = parseFloat(e.target.value) || this.creditScore;
            document.getElementById('creditScore').value = this.creditScore;
            this.updateEligibility();
        });

        document.getElementById('workExp').addEventListener('change', () => this.updateEligibility());
        document.getElementById('empType').addEventListener('change', () => this.updateEligibility());
    }

    updateEligibility() {
        this.age = parseFloat(document.getElementById('age').value);
        this.annualIncome = parseFloat(document.getElementById('annualIncomeInput').value);
        this.existingEMI = parseFloat(document.getElementById('existingLoan').value) || 0;
        this.creditScore = parseFloat(document.getElementById('creditScoreInput').value);
        this.workExp = parseFloat(document.getElementById('workExp').value);
        this.empType = document.getElementById('empType').value;

        const monthlyIncome = this.annualIncome / 12;
        const availableForEMI = monthlyIncome - this.existingEMI;
        const maxMonthlyEMI = availableForEMI * 0.5; // 50% of available income
        
        // Calculate max loan amount based on EMI
        const monthlyRate = 0.085 / 12; // 8.5% annual rate
        const maxLoanDuration = 20 * 12; // 20 years
        
        const maxLoanFromEMI = this.calculatePrincipal(maxMonthlyEMI, monthlyRate, maxLoanDuration);
        
        // Income-based eligibility multiplier
        const incomeMultiplier = Math.min(this.annualIncome / 300000, 4);
        
        // Credit score factor
        const creditFactor = this.creditScore >= 750 ? 1.0 : 
                           this.creditScore >= 700 ? 0.9 : 
                           this.creditScore >= 650 ? 0.8 : 0.7;
        
        // Experience factor
        const expFactor = this.workExp >= 5 ? 1.0 :
                        this.workExp >= 3 ? 0.9 : 0.8;
        
        // Age factor
        const ageFactor = (this.age >= 25 && this.age <= 55) ? 1.0 : 0.85;
        
        // Calculate max eligible loan
        let maxEligible = maxLoanFromEMI * creditFactor * expFactor * ageFactor;
        
        // Cap based on income (max 5x annual income)
        maxEligible = Math.min(maxEligible, this.annualIncome * 5);
        
        // Update display
        document.getElementById('maxLoanEligible').textContent = this.formatCurrency(maxEligible);
        document.getElementById('monthlyIncome').textContent = this.formatCurrency(monthlyIncome);
        document.getElementById('availableMonthly').textContent = this.formatCurrency(Math.max(0, availableForEMI));
        document.getElementById('maxEMI').textContent = this.formatCurrency(maxMonthlyEMI);
        document.getElementById('emiRatio').textContent = ((this.existingEMI / monthlyIncome) * 100).toFixed(1) + '%';
        
        // Update eligibility checklist
        this.updateChecklist(monthlyIncome, maxMonthlyEMI);
        
        // Update comparison table
        this.updateComparisonTable(monthlyIncome);
    }

    calculatePrincipal(monthlyEMI, monthlyRate, months) {
        if (monthlyRate === 0) {
            return monthlyEMI * months;
        }
        
        const denominator = (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        return monthlyEMI / denominator;
    }

    formatCurrency(value) {
        return '₹' + Math.round(value).toLocaleString('en-IN');
    }

    updateChecklist(monthlyIncome, maxMonthlyEMI) {
        // Age check
        const ageOk = this.age >= 21 && this.age <= 70;
        // Income check
        const incomeOk = this.annualIncome >= 300000;
        // Credit score check
        const creditOk = this.creditScore >= 650;
        // EMI ratio check
        const emiRatioOk = (this.existingEMI / monthlyIncome) <= 0.5;
        // Experience check
        const expOk = this.workExp >= 2;

        const checks = [
            { id: 0, ok: ageOk, text: `Age: ${ageOk ? 'Meets' : 'Does not meet'} requirement (21-70 years)` },
            { id: 1, ok: incomeOk, text: `Income: ${this.formatCurrency(this.annualIncome)} (${incomeOk ? 'Excellent' : 'Below minimum'})` },
            { id: 2, ok: creditOk, text: `Credit Score: ${this.creditScore} (${creditOk ? 'Good' : 'Needs improvement'})` },
            { id: 3, ok: emiRatioOk, text: `Debt Ratio: ${((this.existingEMI / monthlyIncome) * 100).toFixed(1)}% (${emiRatioOk ? 'Healthy' : 'High'})` },
            { id: 4, ok: expOk, text: `Experience: ${this.workExp}+ years (${expOk ? 'Stable' : 'Needs more'})` }
        ];

        const checklistItems = document.querySelectorAll('.checklist-item');
        checks.forEach((check, index) => {
            if (index < checklistItems.length) {
                const item = checklistItems[index];
                const icon = item.querySelector('.icon');
                const text = item.querySelector('.text');
                
                if (check.ok) {
                    icon.innerHTML = '<i class="fas fa-check"></i>';
                    icon.style.color = '#27AE60';
                } else {
                    icon.innerHTML = '<i class="fas fa-times"></i>';
                    icon.style.color = '#E74C3C';
                }
                
                text.textContent = check.text;
            }
        });
    }

    updateComparisonTable(monthlyIncome) {
        document.getElementById('ageStatus').textContent = `✓ ${this.age} years`;
        document.getElementById('incomeStatus').textContent = `✓ ${this.formatCurrency(this.annualIncome)}/year`;
        document.getElementById('expStatus').textContent = `✓ ${this.workExp} years`;
        document.getElementById('creditStatus').textContent = `${this.creditScore >= 650 ? '✓' : '✗'} ${this.creditScore}`;
        document.getElementById('debtStatus').textContent = `✓ ${((this.existingEMI / monthlyIncome) * 100).toFixed(1)}%`;
    }
}

function resetLoanForm() {
    document.getElementById('age').value = 35;
    document.getElementById('annualIncome').value = 1000000;
    document.getElementById('annualIncomeInput').value = 1000000;
    document.getElementById('existingLoan').value = 0;
    document.getElementById('creditScore').value = 750;
    document.getElementById('creditScoreInput').value = 750;
    document.getElementById('workExp').value = 10;
    document.getElementById('empType').value = 'salaried';
    
    calculator.updateEligibility();
}

function updateEligibility() {
    if (calculator) {
        calculator.updateEligibility();
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '/logout';
    }
}

let calculator;
document.addEventListener('DOMContentLoaded', () => {
    calculator = new LoanEligibilityCalculator();
});
