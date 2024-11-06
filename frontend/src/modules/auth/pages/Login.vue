<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed, reactive } from 'vue'

// validation
import useVuelidate from '@vuelidate/core'
import { helpers, email, required } from '@vuelidate/validators'
import { useToast } from 'vue-toastification'
import { useStore } from 'vuex'

// Components
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import FormContainer from '@/components/Form/FormContainer.vue'
import DefaultButton from '@/components/Buttons/DefaultButton.vue'

// Types
import type { IAuthUser } from '../types'

// Services
import ServiceStorage from '@/globals/storage'
import { apiLogin } from '@/services'

const store = useStore()
const router = useRouter()
const toast = useToast()
const userAuth: IAuthUser = reactive({
    email: '',
    password: '',
})

const rules = computed(() => ({
    email: {
        required: helpers.withMessage('Campo obrigatório', required),
        email: helpers.withMessage('Email inválido', email),
    },
    password: {
        required: helpers.withMessage('Campo obrigatório', required),
    },
}))

const v$ = useVuelidate(rules, userAuth)

const handleLogin = async () => {
    const isValid = await v$.value.$validate()

    if (isValid) {
        await handleAuth(userAuth)
    } else {
        console.log('Formulário inválido')
    }
}
const handleAuth = async (data: IAuthUser) => {
    try {
        const response = await apiLogin(data)

        ServiceStorage.setToken(response.token)

        store.dispatch('user/login', response.user)
        toast.success('Autenticado com sucesso!')

        router.push('/tasks')
    } catch (error: any) {
        toast.error(error.message)
    }
}
</script>

<template>
    <div class="w-full">
        <form @submit.prevent="handleLogin" autocomplete="off">
            <p class="text-[36px] mt-3 md:mt-0 mb-3 md:mb-8">Login</p>

            <p class="text-lg text-center leading-none mt-8 mb-4">Faça login e mantenha suas tarefas atualizadas!</p>

            <FormContainer>
                <div class="col-span-12">
                    <DefaultInputText
                        required
                        v-model="userAuth.email"
                        id="email"
                        name="email"
                        label="Email"
                        placeholder="teste@gmail.com"
                        :v$="v$"
                    />
                </div>
                <div class="col-span-12">
                    <DefaultInputText
                        required
                        v-model="userAuth.password"
                        id="password"
                        name="password"
                        type="password"
                        label="Senha"
                        placeholder="Digite sua senha"
                        :v$="v$"
                    />
                </div>
            </FormContainer>

            <div class="w-full m-auto text-center pt-4">
                <DefaultButton text="Entrar na Usertasks" />
            </div>
            <p class="text-center text-sm mt-[4rem] mb-6">
                Não possui conta? <router-link class="link" to="/register">Cadastre-se</router-link>
            </p>
        </form>
    </div>
</template>
