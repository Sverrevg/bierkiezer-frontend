<template>
    <div class="bg-dark-image min-vh-100 text-center mb-negative">
        <div class="container py-5 responsive-width">
            <h1 class="text-white fancy-text">
                Uitloggen
            </h1>
            <p class="text-white p-4">
                Weet u zeker dat u wilt uitloggen?
            </p>
            <ion-button class="font-weight-light" color="warning" v-on:click="logout">Uitloggen</ion-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Logout",
        props: {
            timeout: {type: Number, default: 10000},
        },
        methods: {
            logout() {
                return this.$ionic.loadingController
                    .create({
                        message: 'Uitloggen...',
                        duration: this.timeout,
                    })
                    .then(loading => {
                        loading.present();
                        this.$store.dispatch("logout").then(() => {
                            this.$router.push("/home");
                            loading.dismiss();
                        });
                    });
            }
        }
    }
</script>

<style scoped>

</style>
