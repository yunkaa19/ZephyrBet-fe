<script>
    import { url, isActive } from "@roxi/routify";
    const links = [
        ["./index", "Home"],
        ["./about", "About"],
        ["./pachinko", "Pachinko"],
        ["./login", "Login"],
        ["./register", "Register"],
        ["./profile", "Profile"],
        ["./logout", "Logout"]
    ]
    
    let isAuthenticated = false;

    // Run this code whenever your component is updated
    $: {
        isAuthenticated = localStorage.getItem('token') !== null;
    }
</script>

<style>
    nav {
        border-bottom: 1px solid rgba(255, 62, 0, 0.1);
        font-weight: 300;
        padding: 0 1em;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    /* clearfix */
    ul::after {
        content: "";
        display: block;
        clear: both;
    }

    li {
        display: block;
        float: left;
    }

    .selected {
        position: relative;
        display: inline-block;
    }

    .selected::after {
        position: absolute;
        content: "";
        width: calc(100% - 1em);
        height: 2px;
        background-color: rgb(255, 62, 0);
        display: block;
        bottom: -1px;
    }

    a {
        text-decoration: none;
        padding: 1em 0.5em;
        display: block;
    }
</style>


{#each links as [path, name] (path)}
    {#if isAuthenticated ? (name !== "Login" && name !== "Register") : (name === "Home" || name === "About" || name === "Login" || name === "Register")}
        <li><a href={$url(path)} class:selected={$isActive(path)}>{name} </a></li>
    {/if}
{/each}



