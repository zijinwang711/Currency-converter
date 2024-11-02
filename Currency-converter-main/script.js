document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const form = document.getElementById('currency-form');
    const resultDisplay = document.getElementById('result');

    fetch('https://api.frankfurter.app/currencies')
        .then(response => response.json())
        .then(data => {
    
            for (const [key, value] of Object.entries(data)) {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = `${key} - ${value}`;
                fromCurrency.appendChild(option.cloneNode(true));
                toCurrency.appendChild(option);
            }
        });

    form.addEventListener('submit', event => {
        event.preventDefault();  

        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amount = document.getElementById('amount').value;

    
        if (from === to) {
            alert('You cannot convert to and from the same currency!');
            return;
        }


        fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to];
                resultDisplay.textContent = `${amount} ${from} is equal to ${rate} ${to}`;
            })
            .catch(error => {
                console.error('Error fetching conversion rate:', error);
            });
    });
});