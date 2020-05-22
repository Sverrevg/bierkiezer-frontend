<template>
    <div class="custom-bg text-center min-vh-100">
        <div class="container p-0 bg-white">
            <div aria-label="breadcrumb">
                <ol class="breadcrumb border-square mb-0">
                    <li class="breadcrumb-item">
                        <router-link class="font-weight-light" to="/home" v-on:click="navigate()">Home</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link class="font-weight-light" to="/bieren" v-on:click="navigate()">Bieren</router-link>
                    </li>
                    <li class="breadcrumb-item active font-weight-light" aria-current="page">Willekeurig</li>
                </ol>
            </div>
            <div class="container px-0 p-3 py-5">
                <beer v-bind="beer"/>
                <hr/>
                <br/>
                <h5>Niet wat je zoekt?</h5>
                <br/>
                <ion-button color="warning" v-on:click="getRandomBeer()">
                    Klik hier voor een ander biertje
                </ion-button>
            </div>
            <div class="bg-secondary angle-cut-top p-5">
                <h4 class="fancy-text text-white text-center">Wat doet deze pagina?</h4>
                <br/>
                <p class="text-white text-justify">
                    Deze pagina laat een willekeurig biertje zien uit onze database van ruim 400 bieren, afkomstig uit
                    landen over de hele wereld. Wil je een keer iets nieuws proberen?
                    Dan is deze pagina uitermate geschikt als inspiratiebron.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    // import {RepositoryFactory} from "@/service/factory/RepositoryFactory";
    import Beer from "./Beer";

    // const BeersRepository = RepositoryFactory.get('beers');

    export default {
        name: "RandomBeer",
        components: {
            Beer
        },
        data() {
            return {
                beer: {}
            }
        },
        methods: {
            // getRandomBeer: async function () {
            //     const response = await BeersRepository.getRandom();
            //     this.beer = response.data;
            // }
        },
        // Call method on page load so it starts with a random beer.
        beforeMount() {
            this.getRandomBeer();
        }
    }
</script>

<style scoped>

</style>
