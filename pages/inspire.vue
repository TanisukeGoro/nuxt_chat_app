<template>
    <v-layout>
        <v-flex class="text-center">
            <p>
                SenderID
                <v-text-field label="Regular"></v-text-field>
            </p>
            <p>
                ReceiverID
                <v-text-field label="Regular"></v-text-field>
            </p>
            <p>
                Chat Room Hash ID
                <v-text-field label="Regular"></v-text-field>
            </p>
            <p>
                <v-textarea
                    class="mt-0"
                    solo
                    label="Solo textarea"
                    auto-grow
                    rows="1"
                    value=""
                    placeholder="メッセージを入力してください. "
                ></v-textarea>
            </p>
            <p>
                <button id="debug006" class="btn btn-info">
                    デバッグチャットの開始
                </button>
            </p>
            <p>
                <button id="debug004" class="btn btn-info">
                    メッセージの送信
                </button>
            </p>
            <div class="messageLog"></div>
        </v-flex>
    </v-layout>
</template>
<script>
// import firebase from '~/plugins/firebase'
// import db from '~/plugins/firebase-db'
export default {
    data() {
        return {
            send_text: '',
            sender_id: '',
            receive_id: ''
        }
    }
}
</script>
