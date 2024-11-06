<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

// validation
import useVuelidate from '@vuelidate/core'
import { helpers, required, email, sameAs } from '@vuelidate/validators'

// components
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import FormContainer from '@/components/Form/FormContainer.vue'
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import type { IUserPayload } from '../types'
import { useToast } from 'vue-toastification'

// Services
import { apiRegister } from '@/services'

const router = useRouter()

const toast = useToast()

const newUser = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
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
    password: {
        required: helpers.withMessage('Campo obrigatório', required),
    },
    passwordConfirm: {
        required: helpers.withMessage('Campo obrigatório', required),
        sameAsPassword: helpers.withMessage('As senhas devem ser iguais', sameAs(computed(() => newUser.password))),
    },
}))

const v$ = useVuelidate(rules, newUser)

const handleSubmit = async () => {
    const isValid = await v$.value.$validate()
    if (isValid) {
        await handleRegister(newUser)
    } else {
        console.log('Formulário inválido')
    }
}

const handleRegister = async (data: IUserPayload) => {
    try {
        await apiRegister(data)

        toast.success('Cadastro realizado com sucesso!')

        router.push('/login')
    } catch (error: any) {
        toast.error(error.message)
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit" autocomplete="off">
        <p class="text-[36px] mb-8">Cadastro:</p>

        <p class="text-lg text-center">Crie sua conta e use todas as funcionalidades sem custo!</p>
        <p class="text-center text-sm">já possui conta? <router-link class="link" to="/login">Login</router-link></p>

        <FormContainer class="mt-4">
            <div class="col-span-12 md:col-span-6">
                <DefaultInputText
                    required
                    v-model="newUser.firstName"
                    id="firstName"
                    name="firstName"
                    label="Nome"
                    placeholder="Digite seu nome"
                    :v$="v$"
                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <DefaultInputText
                    required
                    v-model="newUser.lastName"
                    id="lastName"
                    name="lastName"
                    label="Sobrenome"
                    placeholder="Digite seu sobrenome"
                    :v$="v$"
                />
            </div>
            <div class="col-span-12">
                <DefaultInputText
                    required
                    v-model="newUser.email"
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="teste@gmail.com"
                    :v$="v$"
                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <DefaultInputText
                    required
                    v-model="newUser.password"
                    id="password"
                    name="password"
                    type="password"
                    label="Senha"
                    placeholder="Digite uma senha"
                    :v$="v$"
                />
            </div>
            <div class="col-span-12 md:col-span-6">
                <DefaultInputText
                    required
                    v-model="newUser.passwordConfirm"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    label="Confirmação de Senha"
                    placeholder="Confirme a senha"
                    :v$="v$"
                />
            </div>
        </FormContainer>
        <div class="w-64 m-auto text-center pt-4">
            <DefaultButton text="Criar sua conta na Usertasks" />
        </div>
    </form>
</template>
