<script setup>

// props passed down from parent
const props = defineProps({
    question: { 
        type: Object,
        required: true
    },
    index: Number
})

// decodes text with html codes
const decode = (str) => {
    let textArea = document.createElement('textarea')
    textArea.innerHTML = str;
    return textArea.value;
}
</script>

<template>
    <div
    class="flex flex-col gap-2 bg-[#FCAA67f9] h-56 w-[36rem] p-8 shadow-xl text-center">

    <!-- cascading squares styling -->
    <div class="absolute inherit-dim bg-[#9123f8] -z-40 shadow-xl">
    </div>
    <div class="absolute inherit-dim bg-[#a195a3] -z-30 -m-2 shadow-md">
    </div>
    <div class="absolute inherit-dim bg-[#cdbccf] -z-20 -m-4 shadow-md">
    </div>
    <div class="absolute inherit-dim bg-[#E9D6EC] -z-10 -m-6 shadow-md">
    </div>
        <h2 class="font-semibold"> {{ decode(question.question) }} </h2>
        <div class="flex justify-evenly m-2 items-center">
            <!-- user answer -->
            <div class="bg-[#9123f8] p-2 rounded text-white text-center">
                <p>You answered</p>
                <p>{{ decode(question.answer) }}</p>
            </div>
    
            <!-- correct answer -->
            <div class="bg-[#9123f8] p-2 rounded text-white text-center">
                <p>Correct answer</p>
                <p>{{ decode(question.correct_answer) }}</p>
            </div>
        </div>

        <!-- displays a checkmark if answer is correct, -->
        <div v-if="question.answer === question.correct_answer">
            <span> ✔ </span>
        </div>
        <!-- otherwise it displays an x-mark -->
        <div v-else>
            <span> ❌ </span>
        </div>

    </div>
</template>

<style scoped>
.inherit-dim{
  width: inherit;
  height: inherit;
}
</style>