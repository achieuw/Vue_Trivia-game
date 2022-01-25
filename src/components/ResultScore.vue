<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';


const store = useStore()

const score = computed(() => store.state.score)
const highScore = computed(() => store.state.highScore)

</script>

<template>
    <div class="flex flex-col text-2xl">
        <h1> HighScore: {{ highScore }} </h1>
        <h1> Score: {{ score }} </h1>
    </div>
</template>