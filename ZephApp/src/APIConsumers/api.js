// Auth API consumer

const API_IP = 'localhost:8080';

export async function login(email, password) {
    const response = await fetch(`http://${API_IP}/Players/Auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Email: email,
            Password: password
        })
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('jwt', data.token);
    return data;
}

export async function register(userID, email, password, type, name, surname, birthday) {

    console.log(userID, email, password, type, name, surname, birthday);
    console.log(`API IP: ${API_IP}`);
    try {

        console.log('About to call fetch');
    const response = await fetch(`http://${API_IP}/Players/Auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            UserID: userID,
            Email: email,
            Password: password,
            Type: type,
            Name: name,
            Surname: surname,
            Birthday: birthday
        })
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }
    else{
    const data = await response.json();
    localStorage.setItem('jwt', data.token);
    return data;
    }
    } catch (error) {
        console.log(error);
    }
}


export async function checkAuth() {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://${API_IP}/Players/Auth`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const message = await response.text();
        alert(`Authentication failed: ${message}`);
        return;
    }

    return await response.json();
}

// End of Auth API consumer

// Start of Payments API consumer

export async function addStripeCustomer(email, name, creditCardName, cardNumber, expirationYear, expirationMonth, cvc) {
    const response = await fetch(`http://${API_IP}/Payment/customer/add`, {
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
        throw new Error(`Adding Stripe customer failed: ${message}`);
    }

    const customer = await response.json();
    return customer;
}

export async function addStripePayment(customerId, receiptEmail, description, currency, amount) {
    const response = await fetch(`http://${API_IP}/Payment/payment/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            customerId: customerId,
            receiptEmail: receiptEmail,
            description: description,
            currency: currency,
            amount: parseInt(amount)  // Ensure the amount is an integer
        })
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(`Adding Stripe payment failed: ${message}`);
    }

    const payment = await response.json();
    return payment;
}

//End of Payments API consumer

// Start of Players API consumer

export async function getAllPlayers() {
    const response = await fetch(`http://${API_IP}/Players`);
    const data = await response.json();
    return data;
}

export async function getPlayerById(id) {
    const response = await fetch(`http://${API_IP}/Players/${id}`);
    const data = await response.json();
    return data;
}

export async function addPlayer(player) {
    const response = await fetch(`http://${API_IP}/Players`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(player)
    });

    const data = await response.json();
    return data;
}

export async function updatePlayer(id, player) {
    const response = await fetch(`http://${API_IP}/Players/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(player)
    });

    const data = await response.json();
    return data;
}

export async function deletePlayer(id) {
    const response = await fetch(`http://${API_IP}/Players/${id}`, {
        method: 'DELETE'
    });

    const data = await response.json();
    return data;
}

// End of Players API consumer
