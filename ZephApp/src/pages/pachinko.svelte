<script>
    
    export let route;
    function getJWT() {
        return localStorage.getItem('jwt');
    }
</script>

<div>
    <iframe src="/Game/index.html" width="100%" height="930"></iframe>
</div>