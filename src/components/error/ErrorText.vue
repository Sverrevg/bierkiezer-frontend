<template>
    <div class="card text-white bg-danger mb-3">
        <div class="card-body">
            <p class="card-text m-auto">
                {{ text }}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "error-text",
        props: {
            text: String
        }
    }
</script>

<style scoped>

</style>
