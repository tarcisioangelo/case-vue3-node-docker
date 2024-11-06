<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useToast } from 'vue-toastification'

// Components
import IconButton from '@/components/Buttons/IconButton.vue'

// Services
import { apiDeleteTask } from '@/services'

// Types
import type { ITaskList } from '@/modules/tasks/types'

interface Props {
    task: ITaskList
    isEdit: boolean
}

const toast = useToast()
const { task } = defineProps<Props>()

const model = reactive<ITaskList>({
    id: task.id,
    description: task.description,
    stTask: task.stTask,
    date: task.date,
    time: task.time,
})

const isDone = computed(() => {
    return model.stTask === 'B'
})

const emit = defineEmits<{
    (e: 'taskDeleted'): void
    (e: 'taskUpdated', task: ITaskList): void
    (e: 'taskEdit', task: ITaskList): void
}>()

const toggleStatus = () => {
    model.stTask = model.stTask === 'A' ? 'B' : 'A'
    emit('taskUpdated', model)
}

const ableEdit = async () => {
    emit('taskEdit', model)
    // isEdit.value = true
}

const handleDelete = async () => {
    try {
        await apiDeleteTask(task.id!)
        toast.success('Tarefa deletada com sucesso!')
        emit('taskDeleted')
    } catch (error: any) {
        toast.error(error.message)
    }
}
</script>

<template>
    <div
        class="flex flex-wrap border border-input-line items-center p-3 rounded-[10px] gap-2 font-thin text-lg border-l-8 border-l-amber-300"
        :class="{ '!border-l-success': isDone }"
    >
        <div class="w-full md:flex-1 order-3 md:order-2 text-xl">
            <div class="w-full">
                {{ model.description }}
            </div>
            <div class="mr-[5rem] text-[14px] text-gray-300">
                <label>
                    {{ model.date }}
                </label>
                <label> às {{ model.time }} </label>
            </div>
        </div>

        <div class="flex gap-2 order-2 md:order-3 justify-end w-full md:w-auto">
            <IconButton v-if="!isDone" @click="toggleStatus" class="bg-success hover:bg-success" icon="check" />
            <IconButton v-if="!isDone" @click="ableEdit" class="bg-input" icon="edit" />
            <IconButton v-if="isDone" @click="toggleStatus" class="bg-input hover:bg-input" icon="close" />
            <IconButton @click="handleDelete" class="bg-red-700 hover:bg-red-500" icon="delete" />
        </div>
    </div>
</template>
