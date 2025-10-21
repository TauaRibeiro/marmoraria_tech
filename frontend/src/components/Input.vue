<template>
  <div class="input-container">
      <input 
        :type 
        :placeholder 
        :class="'form-control '+ 'cls'" 
        :id 
        :required 
        autocomplete="off"
        @input="$emit('update:modelValue', $event.target.value)"
      />
  </div>
</template>

<script>
export default {
  name: 'DefaultInput',
  props: {
    type: String,
    placeholder: { 
      type: String, 
      default: ''
    },
    id: String,
    required: Boolean,
    modelValue: String,
    cls: {
      type: String,
      default: ''
    }
  },
}
</script>

<style scoped>
  input {
    border: 1px solid rgb(77, 76, 76);
  }
</style>
