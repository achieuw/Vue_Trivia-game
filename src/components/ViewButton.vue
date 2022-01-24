<script setup>
import { ref } from 'vue'

const emit = defineEmits(['onClick'])

defineProps ({
  buttonText: {
    type: String
  } 
})

const onClick = () => {
  emit('onClick')
}
</script>

<template>
<div>
  <button class="bg-emerald-400 w-30 rounded-md p-2 hover:bg-emerald-500"
  @click="onClick">
    {{ buttonText }}
  </button>
</div>
</template>