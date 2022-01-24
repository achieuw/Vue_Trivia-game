<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'
import CategoryListItem from './CategoryListItem.vue'

const store = useStore()
const categories = computed(() => store.state.questions.trivia_categories)

</script>

<template>
<label for="category-list">Categories: </label>
    <select>
        <CategoryListItem 
        id="category-list"
        v-for="category in categories" :key="category.id" :category="category"
        />
    </select>
</template>