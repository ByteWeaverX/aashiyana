/* ========================================
   AREA CONVERTER - JAVASCRIPT
   ======================================== */

class AreaConverter {
    constructor() {
        // Conversion factors to square meters as base unit
        this.conversionFactors = {
            'sqft': 0.092903,
            'sqm': 1,
            'sqyard': 0.836127,
            'acre': 4046.86,
            'hectare': 10000,
            'bigha': 2508, // Approximate value
            'marla': 225,
            'kanal': 4500,
            'cent': 40.468,
            'gunta': 101.17
        };

        this.unitNames = {
            'sqft': 'Square Feet (sq.ft)',
            'sqm': 'Square Meter (sq.m)',
            'sqyard': 'Square Yard (sq.yard)',
            'acre': 'Acre',
            'hectare': 'Hectare',
            'bigha': 'Bigha',
            'marla': 'Marla',
            'kanal': 'Kanal',
            'cent': 'Cent',
            'gunta': 'Gunta'
        };

        this.initializeEventListeners();
        this.convertArea();
    }

    initializeEventListeners() {
        document.getElementById('inputValue').addEventListener('input', () => this.convertArea());
        document.getElementById('fromUnit').addEventListener('change', () => this.convertArea());
        document.getElementById('toUnit').addEventListener('change', () => this.convertArea());
    }

    convertArea() {
        const inputValue = parseFloat(document.getElementById('inputValue').value);
        const fromUnit = document.getElementById('fromUnit').value;
        const toUnit = document.getElementById('toUnit').value;

        if (isNaN(inputValue) || inputValue <= 0) {
            document.getElementById('resultValue').textContent = '0';
            document.getElementById('resultUnit').textContent = toUnit.toUpperCase();
            return;
        }

        // Convert to square meters first
        const valueInSqm = inputValue * this.conversionFactors[fromUnit];

        // Convert from square meters to target unit
        const result = valueInSqm / this.conversionFactors[toUnit];

        // Display result
        document.getElementById('resultValue').textContent = result.toFixed(2);
        document.getElementById('resultUnit').textContent = this.getUnitAbbr(toUnit);
    }

    getUnitAbbr(unit) {
        const abbr = {
            'sqft': 'sq.ft',
            'sqm': 'sq.m',
            'sqyard': 'sq.yard',
            'acre': 'acre',
            'hectare': 'hectare',
            'bigha': 'bigha',
            'marla': 'marla',
            'kanal': 'kanal',
            'cent': 'cent',
            'gunta': 'gunta'
        };
        return abbr[unit] || unit;
    }
}

function clearConverter() {
    document.getElementById('inputValue').value = '';
    document.getElementById('inputValue').focus();
    document.getElementById('resultValue').textContent = '0';
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '/logout';
    }
}

let converter;
document.addEventListener('DOMContentLoaded', () => {
    converter = new AreaConverter();
});
