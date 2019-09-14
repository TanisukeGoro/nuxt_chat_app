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
        </v-flex>
    </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
    components: {
        Logo,
        VuetifyLogo
    },
    data() {
        return {
            count: 0
        }
    }
}
</script>
