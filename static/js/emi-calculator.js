/* ========================================
   AASHIYANA EMI CALCULATOR - JAVASCRIPT
   ======================================== */

class EMICalculator {
    constructor() {
        this.loanAmount = 3000000;
        this.interestRate = 8.5;
        this.loanTenure = 20;
        this.downPayment = 0;
        this.processingFee = 0.5;
        
        this.initializeEventListeners();
        this.updateCalculations();
        this.initializeCharts();
    }

    initializeEventListeners() {
        // Loan Amount
        document.getElementById('loanAmount').addEventListener('input', (e) => {
            this.loanAmount = parseFloat(e.target.value);
            document.getElementById('loanAmountInput').value = this.loanAmount;
            this.updateCalculations();
        });

        document.getElementById('loanAmountInput').addEventListener('change', (e) => {
            this.loanAmount = parseFloat(e.target.value) || this.loanAmount;
            document.getElementById('loanAmount').value = this.loanAmount;
            this.updateCalculations();
        });

        // Interest Rate
        document.getElementById('interestRate').addEventListener('input', (e) => {
            this.interestRate = parseFloat(e.target.value);
            document.getElementById('interestRateInput').value = this.interestRate;
            this.updateCalculations();
        });

        document.getElementById('interestRateInput').addEventListener('change', (e) => {
            this.interestRate = parseFloat(e.target.value) || this.interestRate;
            document.getElementById('interestRate').value = this.interestRate;
            this.updateCalculations();
        });

        // Loan Tenure
        document.getElementById('loanTenure').addEventListener('input', (e) => {
            this.loanTenure = parseFloat(e.target.value);
            document.getElementById('loanTenureInput').value = this.loanTenure;
            this.updateCalculations();
        });

        document.getElementById('loanTenureInput').addEventListener('change', (e) => {
            this.loanTenure = parseFloat(e.target.value) || this.loanTenure;
            document.getElementById('loanTenure').value = this.loanTenure;
            this.updateCalculations();
        });

        // Down Payment
        document.getElementById('downPayment').addEventListener('change', (e) => {
            this.downPayment = parseFloat(e.target.value) || 0;
            this.updateCalculations();
        });

        // Processing Fee
        document.getElementById('processingFee').addEventListener('input', (e) => {
            this.processingFee = parseFloat(e.target.value);
            document.getElementById('processingFeeInput').value = this.processingFee;
            this.updateCalculations();
        });

        document.getElementById('processingFeeInput').addEventListener('change', (e) => {
            this.processingFee = parseFloat(e.target.value) || this.processingFee;
            document.getElementById('processingFee').value = this.processingFee;
            this.updateCalculations();
        });
    }

    calculateEMI(principal, monthlyRate, months) {
        if (monthlyRate === 0) {
            return principal / months;
        }
        
        const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
        const denominator = Math.pow(1 + monthlyRate, months) - 1;
        return numerator / denominator;
    }

    formatCurrency(value) {
        return '₹' + Math.round(value).toLocaleString('en-IN');
    }

    updateCalculations() {
        // Adjust loan amount by down payment
        const actualLoanAmount = this.loanAmount - this.downPayment;
        
        // Calculate monthly interest rate
        const monthlyRate = this.interestRate / 100 / 12;
        const numberOfMonths = this.loanTenure * 12;
        
        // Calculate EMI
        const monthlyEMI = this.calculateEMI(actualLoanAmount, monthlyRate, numberOfMonths);
        
        // Calculate total amount payable
        const totalPayable = monthlyEMI * numberOfMonths;
        
        // Calculate total interest paid
        const totalInterest = totalPayable - actualLoanAmount;
        
        // Calculate processing fee
        const processingFeeAmount = (this.loanAmount * this.processingFee) / 100;
        
        // Total cost including fee
        const totalCost = totalPayable + processingFeeAmount;
        
        // Update DOM
        document.getElementById('monthlyEMI').textContent = this.formatCurrency(monthlyEMI);
        document.getElementById('totalPayable').textContent = this.formatCurrency(totalCost);
        
        // Breakdown
        document.getElementById('breakdownLoan').textContent = this.formatCurrency(actualLoanAmount);
        document.getElementById('breakdownInterest').textContent = this.formatCurrency(totalInterest);
        document.getElementById('breakdownFee').textContent = this.formatCurrency(processingFeeAmount);
        document.getElementById('breakdownTotal').textContent = this.formatCurrency(totalCost);
        
        // Payment Schedule
        document.getElementById('totalMonths').textContent = numberOfMonths.toLocaleString('en-IN');
        document.getElementById('firstYearInterest').textContent = this.formatCurrency(this.calculateYearlyInterest(actualLoanAmount, monthlyRate, numberOfMonths, 1));
        document.getElementById('lastYearInterest').textContent = this.formatCurrency(this.calculateYearlyInterest(actualLoanAmount, monthlyRate, numberOfMonths, this.loanTenure));
        
        // Comparison Table
        this.updateComparisonTable(actualLoanAmount, monthlyRate);
        
        // Update Charts
        this.updateCharts(actualLoanAmount, totalInterest, processingFeeAmount, monthlyRate, numberOfMonths);
    }

    calculateYearlyInterest(principal, monthlyRate, totalMonths, year) {
        let interestPaid = 0;
        let remainingPrincipal = principal;
        const monthlyEMI = this.calculateEMI(principal, monthlyRate, totalMonths);
        
        const startMonth = (year - 1) * 12;
        const endMonth = Math.min(year * 12, totalMonths);
        
        for (let month = 0; month < totalMonths; month++) {
            if (month >= startMonth && month < endMonth) {
                const interestForMonth = remainingPrincipal * monthlyRate;
                interestPaid += interestForMonth;
            }
            
            const principalForMonth = monthlyEMI - (remainingPrincipal * monthlyRate);
            remainingPrincipal -= principalForMonth;
        }
        
        return interestPaid;
    }

    updateComparisonTable(principal, monthlyRate) {
        const tenures = [10, 15, 20, 25, 30];
        
        tenures.forEach(tenure => {
            const months = tenure * 12;
            const emi = this.calculateEMI(principal, monthlyRate, months);
            const totalAmount = emi * months;
            const totalInterest = totalAmount - principal;
            
            document.getElementById(`emi${tenure}`).textContent = this.formatCurrency(emi);
            document.getElementById(`interest${tenure}`).textContent = this.formatCurrency(totalInterest);
            document.getElementById(`total${tenure}`).textContent = this.formatCurrency(totalAmount);
        });
    }

    // Charts
    compositionChart = null;
    interestChart = null;

    initializeCharts() {
        const ctx1 = document.getElementById('compositionChart');
        const ctx2 = document.getElementById('interestChart');
        
        if (ctx1) {
            this.compositionChart = new Chart(ctx1, {
                type: 'doughnut',
                data: {
                    labels: ['Principal', 'Interest', 'Processing Fee'],
                    datasets: [{
                        data: [3000000, 684960, 15000],
                        backgroundColor: ['#C9A961', '#8FA489', '#2A5BA8'],
                        borderColor: '#FFFFFF',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: { family: "'Poppins', sans-serif" },
                                padding: 20
                            }
                        }
                    }
                }
            });
        }
        
        if (ctx2) {
            this.interestChart = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: Array.from({length: 21}, (_, i) => i),
                    datasets: [{
                        label: 'Cumulative Interest',
                        data: this.generateInterestData(),
                        borderColor: '#C9A961',
                        backgroundColor: 'rgba(201, 169, 97, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#A67C52',
                        pointBorderColor: '#FFFFFF',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: { font: { family: "'Poppins', sans-serif" } }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: function(value) {
                                    return '₹' + (value / 100000).toFixed(0) + 'L';
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    generateInterestData() {
        const data = [];
        const principal = 3000000;
        const monthlyRate = 0.085 / 12;
        const totalMonths = 20 * 12;
        const monthlyEMI = this.calculateEMI(principal, monthlyRate, totalMonths);
        
        let cumulativeInterest = 0;
        let remainingPrincipal = principal;
        
        for (let year = 0; year <= 20; year++) {
            if (year === 0) {
                data.push(0);
                continue;
            }
            
            for (let month = 0; month < 12; month++) {
                const interestForMonth = remainingPrincipal * monthlyRate;
                cumulativeInterest += interestForMonth;
                const principalForMonth = monthlyEMI - interestForMonth;
                remainingPrincipal -= principalForMonth;
                
                if (remainingPrincipal < 0) remainingPrincipal = 0;
            }
            data.push(cumulativeInterest);
        }
        
        return data;
    }

    updateCharts(principal, totalInterest, processingFee, monthlyRate, numberOfMonths) {
        if (this.compositionChart) {
            this.compositionChart.data.datasets[0].data = [principal, totalInterest, processingFee];
            this.compositionChart.update();
        }
        
        if (this.interestChart) {
            this.interestChart.data.datasets[0].data = this.generateInterestData();
            this.interestChart.update();
        }
    }
}

// Helper Functions
function resetCalculator() {
    document.getElementById('loanAmount').value = 3000000;
    document.getElementById('loanAmountInput').value = 3000000;
    document.getElementById('interestRate').value = 8.5;
    document.getElementById('interestRateInput').value = 8.5;
    document.getElementById('loanTenure').value = 20;
    document.getElementById('loanTenureInput').value = 20;
    document.getElementById('downPayment').value = 0;
    document.getElementById('processingFee').value = 0.5;
    document.getElementById('processingFeeInput').value = 0.5;
    
    calculator.loanAmount = 3000000;
    calculator.interestRate = 8.5;
    calculator.loanTenure = 20;
    calculator.downPayment = 0;
    calculator.processingFee = 0.5;
    
    calculator.updateCalculations();
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '/logout';
    }
}

// Initialize calculator when page loads
let calculator;
document.addEventListener('DOMContentLoaded', () => {
    calculator = new EMICalculator();
    
    // Set active nav item
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
        }
    });
});
