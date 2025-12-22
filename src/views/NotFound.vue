<template>
    <div class="not-found-container">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <router-link to="/">Go to Home</router-link>
    </div>
</template>

<style scoped>
.not-found-container {
    text-align: center;
    padding: 50px;
}

h1 {
    color: #e44d26;
    /* Example color */
}
</style>
