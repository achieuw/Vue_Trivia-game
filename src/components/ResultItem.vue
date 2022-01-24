<script setup>

defineProps({
    question: Object,
    index: Number
})

</script>

<template>
    <h2>ResultItem</h2>
    <p>{{ question.question }} - {{ index }}</p>
</template>