<script lang="ts" setup>
import { useStore } from 'vuex'
import Avatar from './Avatar.vue'
import { computed } from 'vue'
import Mask from '@/utils/mask'

const store = useStore()

const user = computed(() => store.getters['user/user'])

const fullName = computed(() => `${user.value.firstName} ${user.value.lastName} `)
</script>

<template>
    <div class="flex relative gap-3 px-4 rounded-lg min-w-[10%] cursor-pointer">
        <Avatar :text="Mask.toInitials(fullName)" />
        <div class="flex flex-col leading-none">
            <label class="text-lg truncate">{{ fullName }}</label>
            <label class="font-light truncate">{{ user.email }}</label>
        </div>
    </div>
</template>
