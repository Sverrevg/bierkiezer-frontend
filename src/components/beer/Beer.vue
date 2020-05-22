<template>
    <div class="card">
        <div class="card-header fancy-text text-large text-left text-warning">
            {{name}}
        </div>
        <div class="card-body d-flex responsive-flex">
            <div class="col">
                <img class="img-cover max-width img-large my-3" :src="picture" alt="Geen foto beschikbaar">
                <div v-if="this.$store.getters.isLoggedIn">
                    <div v-if="checkedIn" class="d-flex">
                        <ion-button class="font-weight-light" color="success">
                            <ion-icon name="checkmark" class="text-white pr-2"/>
                            Ingecheckt!
                        </ion-button>
                        <div v-if="checkedIn" class="d-flex align-self-center justify-content-center ml-3">
                            <ion-icon v-if="this.rating > 5" name="happy" color="warning" size="large"/>
                            <ion-icon v-if="this.rating < 6" name="sad" color="warning" size="large"/>
                            <p class="my-1 ml-2">{{rating}}/10</p>
                        </div>
                    </div>
                    <div v-else>
                        <p class="text-black-50">Nog niet ingecheckt</p>
                    </div>
                </div>
            </div>
            <div class="col">
                <h1 class="fancy-text text-left">{{brewery}}</h1>
                <p class="text-left">Gebrouwen in {{city}}, {{country}}</p>
                <hr class="bg-warning"/>
                <ion-list>
                    <ion-item class="font-weight-light-medium" no-padding>
                        {{alcohol}}% ABV
                    </ion-item>
                    <ion-item class="font-weight-light-medium" no-padding>
                        {{category}}
                    </ion-item>
                    <br/>
                    <p class="font-weight-light-medium text-left" v-if="checkedIn">
                        Jouw beschrijving: {{review}}
                    </p>
                </ion-list>
                <br/>
                <div class="text-center" v-if="this.$store.getters.isLoggedIn">
                    <ion-button class="font-weight-light" @click="createModal" v-if="checkedIn">
                        Checkin bekijken
                    </ion-button>
                    <ion-button class="font-weight-light" @click="createModal" v-else>Inchecken</ion-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CheckIn from "../shared/CheckIn";
    import UserBeerRepository from "../../service/repositories/UserBeerRepository";

    export default {
        name: "beer",
        props: {
            id: {
                type: Number
            },
            name: {
                type: String
            },
            brewery: {
                type: String
            },
            alcohol: {
                type: Number
            },
            beerStyle: {
                type: String
            },
            category: {
                type: String
            },
            city: {
                type: String
            },
            country: {
                type: String
            },
            picture: {
                default: "http://media.buzzle.com/media/images-en/photos/drinks/beer/900-21524271-tulip-glass.jpg",
                type: String
            }
        },
        data() {
            return {
                title: "Hello there",
                beerId: this.id,
                checkedIn: false,
                rating: 7,
                review: ""
            }
        },
        methods: {
            getStatus() {
                let username = this.$store.getters.username;
                let token = this.$store.getters.token;
                UserBeerRepository.isPresent(username, this.id, token).then((response) => {
                    if (response.status === 200) {
                        this.checkedIn = response.data.isPresent;
                    }
                });

                if (this.checkedIn) {
                    UserBeerRepository.getByBeerId(username, this.id, token).then((response) => {
                        this.rating = response.data.rating;
                        this.review = response.data.review;
                    });
                }
            },
            async createModal() {
                let modal = await this.$ionic.modalController.create({
                    component: CheckIn,
                    componentProps: {
                        propsData: {
                            title: "Inchecken",
                            beerId: this.id,
                            checkedIn: this.checkedIn
                        }
                    }
                });

                modal.onDidDismiss().then((update) => {
                    this.checkedIn = update;
                });

                return await modal.present();
            }
        },
        updated() {
            this.getStatus();
        }
    }
</script>

<style scoped>
    .card-img-top {
        max-height: 25rem;
        object-fit: contain;
    }
</style>
