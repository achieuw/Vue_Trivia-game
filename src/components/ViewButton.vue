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
<button  
@click="onClick">
  {{ buttonText }}
</button>
</template>