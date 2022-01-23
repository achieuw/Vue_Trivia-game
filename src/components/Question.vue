<script setup>

defineProps({
    questionNumber: {
        type: Number,
        required: true
    },
    question: Object
    
})

</script>

<template>
    <h1>Hello Question {{questionNumber}}</h1>
    <h2></h2>
</template>