<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex'

const emit = defineEmits(['onCategorySelect'])

const store = useStore()
const categories = computed(() => store.state.questions.trivia_categories)
const categoryID = ref(0)

const setCategoryID = () => {
    store.commit("setCategoryID", categoryID.value)
}
</script>

<template>
<label for="category-list">Categories: </label>
    <select id="category-list" v-model="categoryID" @change="setCategoryID">
        <option
        v-for="category in categories" :key="category.id" :value="category.id"> {{ category.name }} </option>
    </select>
</template>