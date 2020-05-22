<template>
    <ion-menu side="start" content-id="content">
        <ion-header>
            <ion-toolbar color="warning">
                <ion-title class="font-roboto font-weight-light text-large">
                    Menu
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content padding>
            <ion-list>
                <ion-searchbar mode="ios" slot="end" placeholder="Zoeken"/>
                <ion-item>
                    <router-link class="link-text" to="/home" v-on:click="navigate()">Home</router-link>
                </ion-item>
                <ion-item>
                    <router-link class="link-text" to="/contact" v-on:click="navigate()">Contact</router-link>
                </ion-item>
                <ion-item>
                    <router-link class="link-text" to="/over" v-on:click="navigate()">Over</router-link>
                </ion-item>

                <br/>
                <ion-item>
                    <ion-icon name="beer"/>
                </ion-item>
                <ion-item>
                    <router-link class="link-text" to="/bieren" v-on:click="navigate()">Bieren
                    </router-link>
                </ion-item>
                <ion-item>
                    <router-link class="link-text" to="/bieren/willekeurig" v-on:click="navigate()">Willekeurig
                    </router-link>
                </ion-item>
                <ion-item>
                    <router-link class="link-text" to="/bieren/advies" v-on:click="navigate()">Advies</router-link>
                </ion-item>

                <br/>
                <div v-if="this.$store.getters.isLoggedIn">
                    <ion-item>
                        <ion-icon name="person"/>
                        <p class="m-0 pl-1 font-weight-light-medium">{{username}}</p>
                    </ion-item>
                    <ion-item>
                        <router-link class="link-text" to="/gebruikers/account" v-on:click="navigate()">Account
                        </router-link>
                    </ion-item>
                    <ion-item>
                        <router-link class="link-text" to="/gebruikers/uitloggen" v-on:click="navigate()">Uitloggen
                        </router-link>
                    </ion-item>
                </div>
                <div v-else>
                    <ion-item>
                        <ion-icon name="person"/>
                    </ion-item>
                    <ion-item>
                        <router-link class="link-text" to="/gebruikers/inloggen" v-on:click="navigate()">Inloggen
                        </router-link>
                    </ion-item>
                    <ion-item>
                        <router-link class="link-text" to="/gebruikers/registeren" v-on:click="navigate()">Registreren
                        </router-link>
                    </ion-item>
                </div>
            </ion-list>
        </ion-content>
    </ion-menu>
</template>

<script>
    export default {
        name: "MenuLeft",
        data() {
            return {
                username: null
            }
        },
        created() {
            if (this.username === null && this.$store.getters.isLoggedIn) {
                this.$store.dispatch("logout").then(() => {
                    this.$router.push("/home");
                });
            }
        },
        updated() {
            this.username = this.$store.getters.username;
        }
    }
</script>
