<script>
    import { addStripeCustomer, addStripePayment } from "../APIConsumers/api.js";
    

    let paymentData = {
        customerId: '',
        receiptEmail: '',
        description: '',
        currency: '',
        amount: 0
    };

    let token = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
    let customerData = {
        email: token.email || '',
        name: token.name || '',
        creditCardName: '',
        cardNumber: '',
        expirationYear: '',
        expirationMonth: '',
        cvc: ''
    };

    async function handleAddCustomer() {
        try {
            const customer = await addStripeCustomer(
                customerData.email,
                customerData.name,
                customerData.creditCardName,
                customerData.cardNumber,
                customerData.expirationYear,
                customerData.expirationMonth,
                customerData.cvc
            );
            alert(`Stripe customer added successfully, customer ID: ${customer.id}`);
        } catch (error) {
            alert(error.message);
        }
    }

    async function handleAddPayment() {
        try {
            const payment = await addStripePayment(
                paymentData.customerId,
                paymentData.receiptEmail,
                paymentData.description,
                paymentData.currency,
                paymentData.amount
            );
            alert(`Stripe payment added successfully, payment ID: ${payment.id}`);
        } catch (error) {
            alert(error.message);
        }
    }
</script>

<form on:submit|preventDefault={handleAddCustomer}>
    <input type="hidden" id="email" bind:value={customerData.email} />
    <input type="hidden" id="name" bind:value={customerData.name} />

    <label for="creditCardName">Credit Card Name:</label>
    <input type="text" id="creditCardName" bind:value={customerData.creditCardName} required />

    <label for="cardNumber">Card Number:</label>
    <input type="text" id="cardNumber" bind:value={customerData.cardNumber} required />

    <label for="expirationYear">Expiration Year:</label>
    <input type="text" id="expirationYear" bind:value={customerData.expirationYear} required />

    <label for="expirationMonth">Expiration Month:</label>
    <input type="text" id="expirationMonth" bind:value={customerData.expirationMonth} required />

    <label for="cvc">CVC:</label>
    <input type="text" id="cvc" bind:value={customerData.cvc} required />

    <button type="submit">Add Customer</button>
</form>