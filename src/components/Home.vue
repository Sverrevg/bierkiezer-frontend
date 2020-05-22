<template>
    <div class="min-vh-100">
        <div class="bg-dark-alpha home-container angle-cut"/>
        <div class="container text-center py-massive angle-cut">
            <beer v-bind="beer"/>
            <br/>
            <ion-button class="mb-2 font-weight-light" color="warning" v-on:click="getRandomBeer()">
                Klik hier voor een ander biertje
            </ion-button>
            <hr class="bg-light-grey mt-5"/>
            <br/>
            <p class="text-black-50 old-standard text-large mt-5">Welkom bij</p>
            <hr class="bg-warning mt-5"/>
            <br/>
            <h1 class="title fancy-text">De Bierkiezer</h1>
        </div>
        <div class="m-0 bg-secondary angle-cut-y">
            <div class="container text-center p-massive">
                <div class="d-flex responsive-flex align-content-center justify-content-between">
                    <div class="flex-column p-3 align-self-center responsive-flex-width">
                        <h2 class="text-white old-standard pt-5 text-large">De beste manier om bier te kiezen.</h2>
                        <br/>
                        <hr class="bg-white"/>
                        <br/>
                        <router-link to="/bieren/advies" v-on:click="navigate()">
                            <ion-button class="font-weight-light" color="warning">Welk biertje ga ik drinken?
                            </ion-button>
                        </router-link>
                    </div>
                    <div class="flex-column p-3 align-self-center responsive-flex-width">
                        <img class="img-cover img-rounded" src="../assets/images/square-beer.jpg">
                        <span hidden>Photo by George Cox on Unsplash</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="container text-center py-massive">
            <div v-if="this.$store.getters.isLoggedIn">
                <h2 class="text-black-50 old-standard pt-5 text-large">Welkom, {{username}}.</h2>
            </div>
            <div v-else>
                <h2 class="text-black-50 old-standard pt-5 text-large">Nog geen account?</h2>
                <br/>
                <hr class="bg-warning"/>
                <br/>
                <router-link to="/gebruikers/registeren" v-on:click="navigate()">
                    <ion-button class="font-weight-light" color="warning">
                        Registreer nu
                    </ion-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import BeerRepository from "../service/repositories/BeerRepository";
    import Beer from "./beer/Beer";

    export default {
        name: "Home",
        components: {
            Beer
        },
        data() {
            return {
                beer: {},
                username: String
            }
        },
        methods: {
            getRandomBeer() {
                BeerRepository.getRandom().then((response) => {
                    this.beer = response.data;
                    if (this.beer.picture === null) {
                        this.beer.picture = "http://media.buzzle.com/media/images-en/photos/drinks/beer/900-21524271-tulip-glass.jpg";
                    }
                })
            }
        },
        mounted() {
            this.getRandomBeer();
            this.username = this.$store.getters.username;
        }
    }
</script>

<style scoped>
    .home-container {
        height: 15rem;
        padding-top: 10%;
        text-align: center;
        background: url(../../src/assets/images/bg2-crop.jpg) no-repeat center/cover fixed;
    }
</style>
