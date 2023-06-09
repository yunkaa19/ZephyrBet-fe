<script>
    import { register } from '../APIConsumers/api.js';

    let userID = 0;
    let email = '';
    let password = '';
    let type = 0;
    let name = '';
    let surname = '';
    let birthday = '';

    async function handleSubmit() {
        // Make sure user is at least 18 years old
        const userBirthday = new Date(birthday);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - userBirthday.getFullYear();
        const m = currentDate.getMonth() - userBirthday.getMonth();
        if (m < 0 || (m === 0 && currentDate.getDate() < userBirthday.getDate())) {
            age--;
        }

        if (age < 18) {
            alert('You must be at least 18 years old to register.');
            return;
        }

        const response = await register(userID, email, password, type, name, surname, birthday);

        if (response.status === 'success') {
            // Redirect to login page or home page
        } else {
            alert('Registration failed.');
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required>

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required>


    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={name} required>

    <label for="surname">Surname:</label>
    <input type="text" id="surname" bind:value={surname} required>

    <label for="birthday">Birthday:</label>
    <input type="date" id="birthday" bind:value={birthday} required>

    <button type="submit">Register</button>
</form>