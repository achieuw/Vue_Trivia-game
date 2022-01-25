<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex'

const emit = defineEmits(['onCategorySelect'])

const store = useStore()
const categories = computed(() => store.state.categories.trivia_categories)
const categoryID = ref(0)

// Set categoryID in state
const setCategoryID = () => {
    store.commit("setCategoryID", categoryID.value)
    emit("onCategorySelect")
}
</script>

<template>

<label for="category-list">Categories: </label>
    <select class="grow-on-focus w-5/6 text-black bg-white" id="category-list" v-model="categoryID" @change="setCategoryID">
        <option :value="0" selected>Any</option> <!-- Default option -->
        <!-- Create option for every category -->
        <option 
        v-for="category in categories" :key="category.id" :value="category.id"> {{ category.name }} </option>
    </select>
</template>

<style scoped>
.grow-on-focus:focus {
  padding: 6px;
  width: 100%;
  transition: 0.3s;
}

</style>