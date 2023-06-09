<script>
    import {login} from "../APIConsumers/api.js";
    let Email = '';
    let password = '';

    async function handleSubmit() {
        await login(Email, password);
    }


</script>


<form on:submit|preventDefault={handleSubmit}>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={Email} required />

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required />

    <button type="submit">Login</button>
</form>