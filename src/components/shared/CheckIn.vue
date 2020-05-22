<template>
    <div>
        <ion-header>
            <ion-toolbar color="light">
                <div class="d-flex">
                    <ion-title>{{ title }}</ion-title>
                    <button class="bg-transparent link-text" @click="dismissModal">Annuleren</button>
                </div>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item>
                <ion-label>Score</ion-label>
                <IonRangeVue v-model="rating"
                             ref="range"
                             min="1"
                             max="10"
                             value="7"
                             step="1"
                             snaps="true"
                             pin="true"
                             ticks="true"/>
                <ion-label>{{rating}}</ion-label>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Beschrijving (optioneel)</ion-label>
                <IonInputVue v-model="review"/>
            </ion-item>
            <br/>
            <ion-button @click="confirm" v-if="!checkedIn" jest="submit">Bevestig</ion-button>
            <div v-else>
                <ion-button @click="updateCheckin">Aanpassen</ion-button>
                <ion-button @click="deleteCheckIn" color="danger">Verwijderen</ion-button>
            </div>
        </ion-content>
    </div>
</template>

<script>
    import UserBeerRepository from "../../service/repositories/UserBeerRepository";

    export default {
        name: "check-in",
        props: {
            title: {
                type: String
            },
            beerId: {
                type: Number
            },
            checkedIn: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                rating: 7,
                review: null,
                checkInId: Number
            }
        },
        methods: {
            dismissModal() {
                this.$ionic.modalController.getTop().then((modal) => {
                    if (modal) {
                        modal.dismiss();
                    }
                });

            },
            confirm() {
                this.$ionic.modalController.getTop().then((modal) => {
                    return this.$ionic.loadingController
                        .create({
                            message: 'Toevoegen...',
                            duration: this.timeout,
                        })
                        .then(loading => {
                            loading.present();

                            let userBeer = {
                                username: this.$store.getters.username,
                                beerId: this.beerId,
                                rating: this.rating,
                                review: this.review
                            };

                            UserBeerRepository.post(userBeer, this.$store.getters.token).then((response) => {
                                loading.dismiss();
                                if (response.status === 200) {
                                    this.checkedIn = true;
                                    modal.dismiss(this.checkedIn);
                                }
                                // else handle errors
                            });
                        });
                });
            },
            updateCheckin() {
                this.$ionic.modalController.getTop().then((modal) => {
                    return this.$ionic.loadingController
                        .create({
                            message: 'Aanpassen...',
                            duration: this.timeout,
                        })
                        .then(loading => {
                            loading.present();

                            let userBeer = {
                                username: this.$store.getters.username,
                                beerId: this.beerId,
                                rating: this.rating,
                                review: this.review
                            };

                            UserBeerRepository.update(this.$store.getters.username, this.checkInId, userBeer, this.$store.getters.token).then((response) => {
                                loading.dismiss();
                                if (response.status === 200) {
                                    this.checkedIn = true;
                                    modal.dismiss(this.checkedIn);
                                }
                                // else handle errors
                            });
                        });
                });
            },

            deleteCheckIn() {
                this.$ionic.modalController.getTop().then((modal) => {
                    UserBeerRepository.delete(this.$store.getters.username, this.checkInId, this.$store.getters.token).then((response) => {
                        if (response.status === 200) {
                            if (modal) {
                                this.checkedIn = false;
                                modal.dismiss(this.checkedIn);
                            }
                        }
                        // else handle errors
                    });
                });
            }
        },
        async created() {
            if (this.checkedIn) {
                UserBeerRepository.getByBeerId(this.$store.getters.username, this.beerId, this.$store.getters.token).then((response) => {
                    this.rating = response.data.rating;
                    this.review = response.data.review;
                    this.checkInId = response.data.id;
                });
            }
        }
    }
</script>

<style scoped>

</style>
