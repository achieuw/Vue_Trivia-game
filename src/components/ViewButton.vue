<script setup>

defineProps ({
  buttonText: {
    type: String
  } 
})

const emit = defineEmits(['onClick'])

const onClick = () => {
  emit('onClick')
}
</script>

<template>
<div>
  <button class="btn-border bg-emerald-400 w-30 rounded-md py-2 shadow-md px-6 hover:bg-emerald-300"
  @click="onClick">
    {{ buttonText }}
  </button>
</div>
</template>
