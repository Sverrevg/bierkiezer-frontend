<template>
    <div class="custom-bg min-vh-100">
        <div class="container bg-white p-0 text-center">
            <div aria-label="breadcrumb">
                <ol class="breadcrumb border-square mb-0">
                    <li class="breadcrumb-item">
                        <router-link class="font-weight-light" to="/home" v-on:click="navigate()">Home</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link class="font-weight-light" to="/bieren" v-on:click="navigate()">Bieren</router-link>
                    </li>
                    <li class="breadcrumb-item active font-weight-light" aria-current="page">Advies</li>
                </ol>
            </div>
            <div class="bg-secondary py-5 px-3">
                <h1 class="fancy-text text-white">Moeite met kiezen? Wij helpen je graag!</h1>
            </div>
            <div class="text-center py-5 px-3">
                <h2>In twee stappen een gericht advies.</h2>
                <hr class="bg-warning w-75"/>
                <br/>
                <h4>Stap 1: Invullen</h4>
                <div class="card mx-auto my-3" style="max-width:30rem">
                    <ion-item>
                        <ion-label>Wat is het seizoen?</ion-label>
                        <ion-select v-model="season" placeholder="Seizoen..." cancel-text="Annuleren"
                                    ok-text="Bevestigen">
                            <ion-select-option value="0">Winter</ion-select-option>
                            <ion-select-option value="1">Lente</ion-select-option>
                            <ion-select-option value="2">Zomer</ion-select-option>
                            <ion-select-option value="3">Herfst</ion-select-option>
                        </ion-select>
                    </ion-item>

                    <ion-item>
                        <ion-label>Waar heb je zin in?</ion-label>
                        <ion-select v-model="alcohol" placeholder="Alcohol..." cancel-text="Annuleren"
                                    ok-text="Bevestigen">
                            <ion-select-option value="0">Licht bier</ion-select-option>
                            <ion-select-option value="1">Normaal bier</ion-select-option>
                            <ion-select-option value="2">Zwaar bier</ion-select-option>
                        </ion-select>
                    </ion-item>
                </div>
                <br/>
                <h4>Stap 2: Bevestigen</h4>
                <ion-button @click="getBeer">Advies tonen</ion-button>
            </div>
            <beer v-if="!hidden" v-bind="beer"/>
        </div>
    </div>
</template>

<script>
    import Beer from "./Beer";
    import BeerRepository from "@/service/repositories/BeerRepository";

    export default {
        name: "BeerFinder",
        components: {
            Beer
        },
        data() {
            return {
                beer: Object,
                hidden: true,
                season: Number,
                alcohol: Number
            }
        },
        methods: {
            getBeer: async function () {
                const response = BeerRepository.getAdvice(this.season, this.alcohol);

                if (response.status === 200) {
                    this.beer = response.data;
                    this.hidden = false;
                }
            }
        }
    };
</script>

<style scoped>
</style>