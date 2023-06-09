<script>
    async function addStripeCustomer(email, name, creditCardName, cardNumber, expirationYear, expirationMonth, cvc) {
        const response = await fetch('https://your-api-url.com/Payment/customer/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                name: name,
                creditCard: {
                    name: creditCardName,
                    cardNumber: cardNumber,
                    expirationYear: expirationYear,
                    expirationMonth: expirationMonth,
                    cvc: cvc
                }
            })
        });

        if (!response.ok) {
            const message = await response.text();
            alert(`Adding Stripe customer failed: ${message}`);
            return;
        }

        const customer = await response.json();
        alert(`Stripe customer added successfully, customer ID: ${customer.id}`);
    }

    async function addStripePayment(customerId, receiptEmail, description, currency, amount) {
        const response = await fetch('https://your-api-url.com/Payment/payment/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customerId: customerId,
                receiptEmail: receiptEmail,
                description: description,
                currency: currency,
                amount: amount
            })
        });

        if (!response.ok) {
            const message = await response.text();
            alert(`Adding Stripe payment failed: ${message}`);
            return;
        }

        const payment = await response.json();
        alert(`Stripe payment added successfully, payment ID: ${payment.id}`);
    }
    
</script>

<button on:click={() => addStripeCustomer('test@example.com', 'Test Customer', 'Test Customer', '4242424242424242', '2024', '12', '123')}>
    Add Stripe Customer
</button>

<button on:click={() => addStripePayment('cus_Jz1Z52YlKbq6Rq', 'test@example.com', 'Test Payment', 'usd', 1000)}>
    Add Stripe Payment
</button>
