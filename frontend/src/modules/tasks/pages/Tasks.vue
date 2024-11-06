<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'

// Components
import DefaultButton from '@/components/Buttons/DefaultButton.vue'
import DefaultInputText from '@/components/Form/DefaultInputText.vue'
import MaskedInput from '@/components/Form/MaskedInput.vue'

import TitlePage from '@/components/Navigation/TitlePage.vue'
import TaskRow from '@/modules/tasks/components/TaskRow.vue'

// Types
import type { ITaskEdit, ITaskList, ITaskSave, ITaskStatus } from '@/modules/tasks/types'

// Services
import { apiGetCsrfToken, apiListTasks, apiSaveTask } from '@/services'

import dayjs from 'dayjs'

const tasks = ref<ITaskList[]>([])

const toast = useToast()

const newTask = reactive<ITaskEdit>({
    description: '',
    time: '',
    date: '',
    stTask: 'A',
})

const isLoading = ref<boolean>(false)

const isDisabled = computed(() => newTask.description.length === 0)

const getAll = async () => {
    try {
        isLoading.value = true
        const result = await apiListTasks()

        tasks.value = result.data
    } catch (error: any) {
        toast.error(error.message)
    } finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    await getAll()
})

const donesTask = computed(() => {
    return tasks.value.filter((task) => task.stTask === 'B')
})

const toStartTask = computed(() => {
    return tasks.value.filter((task) => task.stTask === 'A')
})

const handleEdit = (data: ITaskList) => {
    newTask.id = data.id
    newTask.description = data.description
    newTask.date = data.date
    newTask.time = data.time
}

const clearNewTask = () => {
    newTask.id = undefined
    newTask.description = ''
    newTask.date = ''
    newTask.time = ''
    newTask.stTask = 'A'
}

const handleAdd = async () => {
    try {
        isLoading.value = true

        await saveHandler(newTask)

        toast.success('Tarefa salva com sucesso!')

        await getAll()
    } catch (error: any) {
        toast.error(error.message)
    } finally {
        isLoading.value = false
    }
}

const handleUpdate = async (data: ITaskList) => {
    let stFaill: ITaskStatus = data.stTask === 'A' ? 'B' : 'A'

    const up = tasks.value.find((task) => task.id === data.id)

    try {
        if (up) up.stTask = data.stTask

        await saveHandler(data)
    } catch (error: any) {
        toast.error(error.message)

        if (up) up.stTask = stFaill
    }
}

const saveHandler = async (data: ITaskEdit) => {
    const result = await apiGetCsrfToken()

    const payloadTask: ITaskSave = {
        ...data,
        dateTask: dayjs(`${data.date} ${data.time}`, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
        'x-csrf-token': result.data,
    }

    await apiSaveTask(payloadTask)

    clearNewTask()
}

const descriptionPage = computed(() => {
    return `${tasks.value.length} tarefas cadastradas`
})
</script>

<template>
    <TitlePage title="Tarefas" :description="descriptionPage" icon="checklist" />

    <div class="flex flex-col gap-y-3 mt-4">
        <form class="" @submit.prevent="() => handleAdd()">
            <div
                class="flex flex-col md:flex-row md:flex-nowrap gap-3 p-3 shadow-sm shadow-gray-900 bg-component rounded-md"
            >
                <div class="w-full md:flex-1">
                    <DefaultInputText
                        v-model="newTask.description"
                        custom-class="!mb-0"
                        id="newTask"
                        name="newTask"
                        placeholder="Nova tarefa..."
                    />
                </div>

                <div class="w-full md:w-auto flex flex-nowrap">
                    <MaskedInput
                        v-model="newTask.date"
                        mask="##/##/####"
                        type="datetime"
                        custom-class="!mb-0 mr-1 md:mr-2"
                        id="dateTask"
                        name="dateTask"
                        placeholder="Data"
                    />
                    <MaskedInput
                        v-model="newTask.time"
                        mask="##:##"
                        custom-class="!mb-0 ml-1"
                        id="timeTask"
                        name="newTask"
                        placeholder="Hora"
                    />
                </div>

                <DefaultButton
                    :text="newTask.id ? 'Atualizar' : 'Adicionar tarefa'"
                    customClass="md:ml-4 h-[41px] md:h-[51px] !min-w-auto md:max-w-[300px] "
                    :is-disabled="isDisabled || isLoading"
                />
            </div>
        </form>

        <p class="text-lg border-b border-input-line pb-1 text-white/75">Abertas:</p>
        <div v-if="isLoading" class="feedback-text">
            <p>Atualizando lista...</p>
        </div>
        <div v-else-if="toStartTask.length > 0" class="flex flex-col gap-3 mt-4 min-h-48">
            <TaskRow
                v-for="task in toStartTask"
                :key="task.id"
                :task="task"
                :isEdit="!!newTask.id"
                @taskDeleted="getAll"
                @taskUpdated="handleUpdate"
                @taskEdit="handleEdit"
            />
        </div>

        <div v-else class="feedback-text">
            <p>Nenhuma tarefa aberta</p>
        </div>

        <p class="text-lg border-b border-input-line pb-1 text-white/75 mt-1">Concluídas:</p>

        <div v-if="isLoading" class="feedback-text">
            <p>Atualizando lista...</p>
        </div>
        <div v-else-if="donesTask.length > 0" class="flex flex-col gap-3 mt-4 min-h-48">
            <TaskRow
                v-for="task in donesTask"
                :key="task.id"
                :task="task"
                :isEdit="!!newTask.id"
                @taskDeleted="getAll"
                @taskUpdated="handleUpdate"
                @taskEdit="handleEdit"
            />
        </div>

        <div v-else class="feedback-text">
            <p>Nenhuma tarefa finalizada</p>
        </div>
    </div>
</template>

<style scoped>
.feedback-text {
    @apply flex items-center justify-center min-h-48;
}
</style>
