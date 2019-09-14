<template>
    <v-layout>
        <v-flex class="text-center">
            <div class="text-center">
                <logo />
                <vuetify-logo />
            </div>
            <blockquote class="blockquote">
                &#8220;Hello Vue Nuxt&#8221;
                <footer>
                    <small>
                        <em>&mdash;John Johnson</em>
                    </small>
                </footer>
            </blockquote>
            <div>
                <!-- ログイン中に表示される画面 -->
                <div v-if="isAuthenticated">
                    {{ user.email }}でログイン中です<br />
                    <button @click="logout">ログアウト</button><br />
                    <a href="/inspire">メンバーページへ</a>
                </div>
                <!-- ログインしていない時に表示される画面 -->
                <div v-else>
                    メール<br />
                    <input v-model="email" type="text" /><br />
                    パスワード<br />
                    <input v-model="password" type="password" /><br />
                    <button @click="login">ログイン</button>
                </div>
            </div>
            <div class="btn" @click="login">選ぶ</div>
            <v-list>
                <v-list-item v-for="user in userList" :key="user">
                    <v-list-item-icon>
                        <v-icon v-if="true" color="pink">mdi-star</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title
                            v-text="user.name"
                        ></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-avatar>
                        <v-img :src="user.userIcon"></v-img>
                    </v-list-item-avatar>
                </v-list-item>
            </v-list>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'
import db from '~/plugins/firebase-db'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
    components: {
        Logo,
        VuetifyLogo
    },
    data() {
        return {
            count: 0,
            email: '',
            password: '',
            userList: ['test'],
            error: ''
        }
    },
    computed: {
        ...mapState(['user']),
        ...mapGetters(['isAuthenticated'])
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setUser(user)
        })
        db.collection('UserList')
            .get()
            .then((querySnapshot) => {
                const array = []
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    array.push(doc.data())
                })
                this.userList = array
                console.log(this.userList)
            })
            .catch(function(error) {
                console.log(`firebase get users error : ${error}`)
            })
    },
    methods: {
        ...mapActions(['setUser']),
        login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    // ログインしたら飛ぶページを指定
                    // this.$router.push("/member-page")
                })
                .catch((error) => {
                    alert(error)
                })
        },
        logout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.setUser(null)
                })
                .catch((error) => {
                    alert(error)
                })
        },
        get_users() {}
    }
}
</script>
