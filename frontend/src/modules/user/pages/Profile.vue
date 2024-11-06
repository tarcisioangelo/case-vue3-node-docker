<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

// validation
import useVuelidate from '@vuelidate/core'
import { helpers, required, email } from '@vuelidate/validators'
import { useToast } from 'vue-toastification'
import { useStore } from 'vuex'

// Components
import type { IUserPayload } from '@/modules/register/types'
import TitlePage from '@/components/Navigation/TitlePage.vue'
import FormPassword from '../components/FormPassword.vue'

// Services
import { apiRegister, apiGetCsrfToken } from '@/services'

const store = useStore()

const router = useRouter()

const toast = useToast()

const userRef = reactive({
    firstName: '',
    lastName: '',
    email: '',
})
const rules = computed(() => ({
    firstName: {
        required: helpers.withMessage('Campo obrigatório', required),
    },
    lastName: {
        required: helpers.withMessage('Campo obrigatório', required),
    },
    email: {
        required: helpers.withMessage('Campo obrigatório', required),
        email: helpers.withMessage('Email inválido', email),
    },
}))

const v$ = useVuelidate(rules, userRef)

const handleSubmit = async () => {
    const isValid = await v$.value.$validate()
    if (isValid) {
        await handleRegister(userRef)
    } else {
        console.log('Formulário inválido')
    }
}

const user = computed(() => store.getters['user/user'])

onMounted(() => {
    if (user) {
        userRef.email = user.value.email
        userRef.firstName = user.value.firstName
        userRef.lastName = user.value.lastName
    } else {
        router.push('/login')
    }
})

const handleRegister = async (data: IUserPayload) => {
    try {
        const result = await apiGetCsrfToken()

        const payloadSave = {
            ...data,
            'x-csrf-token': result.data,
        }

        await apiRegister(payloadSave)

        toast.success('Cadastro realizado com sucesso!')

        router.push('/login')
    } catch (error: any) {
        toast.error(error.message)
    }
}
</script>

<template>
    <TitlePage title="Perfil" icon="person" />

    <form @submit.prevent="handleSubmit" autocomplete="off">
        <p class="text-xl font-semibold mt-4">{{ userRef.firstName }} {{ userRef.lastName }}</p>
        <p class="text-xl font-semibold mt-4">{{ userRef.email }}</p>
    </form>

    <FormPassword />
</template>
