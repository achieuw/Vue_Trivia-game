<script setup>
defineProps({
    category: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <option> {{ category.name }} </option>
</template>