<template>
    <div class="guest-content">
        <div class="first-child">
            <p class="text-[36px] order-2 md:order-1 font-semibold">USERTASKS 1.0.0</p>
            <img src="/login.svg" class="order-1 md:order-2 w-[5rem] h-[5rem] md:w-[20rem] md:h-[20rem]" />
            <p class="hidden md:block md:order-3 font-normal text-[24px] text-center">
                Faça login e mantenha suas tarefas atualizadas!
            </p>
        </div>
        <div class="second-child">
            <main>
                <RouterView />
            </main>
        </div>
    </div>
</template>

<style scoped>
.guest-content {
    @apply flex flex-col  md:flex-row h-[100vh]  bg-component;
}
.first-child {
    @apply flex md:flex-col  w-full md:w-1/2 min-h-[25%] md:max-h-full md:h-full bg-primary justify-around items-center md:rounded-r-[40px] text-white p-5;
}
.second-child {
    @apply w-full md:w-1/2 h-full bg-component md:rounded-tr-[15px] md:rounded-br-[15px] px-3 md:px-5 md:pt-14;
}
</style>
