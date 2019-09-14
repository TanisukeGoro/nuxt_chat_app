<template>
    <v-layout>
        <v-flex class="text-center">
            <div>
                <!-- ログイン中に表示される画面 -->
                <div v-if="isAuthenticated">
                    {{ user.email }}でログイン中です<br />
                    <v-btn @click="logout">ログアウト</v-btn><br />
                    <a href="/inspire">メンバーページへ</a>
                </div>
                <!-- ログインしていない時に表示される画面 -->
                <div v-else>
                    メール<br />
                    <v-text-field type="email" label="メール"></v-text-field>
                    パスワード<br />
                    <v-text-field
                        label="パスワード"
                        type="password"
                    ></v-text-field>
                    <v-btn @click="login">ログイン</v-btn>
                </div>
            </div>
            <v-btn class="btn" @click="login">選ぶ</v-btn>
            <v-row no-gutters>
                <v-col cols="4"
                    ><v-flex class="text-center">
                        <v-list max-width="500px">
                            <v-list-item v-for="user in userList" :key="user">
                                <v-list-item-icon>
                                    <v-icon v-if="false" color="pink"
                                        >mdi-star</v-icon
                                    >
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title
                                        v-text="user.uid"
                                    ></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-content>
                                    <v-list-item-title
                                        v-text="user.name"
                                    ></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-avatar>
                                    <v-img :src="user.userIcon"></v-img>
                                </v-list-item-avatar>
                            </v-list-item>
                        </v-list> </v-flex
                ></v-col>
                <v-col cols="8">
                    <v-textarea
                        class="mt-0"
                        solo
                        label="Solo textarea"
                        auto-grow
                        rows="1"
                        value=""
                        placeholder="メッセージを入力してください. "
                    >
                    </v-textarea>
                </v-col>
            </v-row>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'
import db from '~/plugins/firebase-db'

export default {
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
            .orderBy('uid')
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
