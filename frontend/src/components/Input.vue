<template>
  <div class="input-container">
    <label class="form-label fw-semibold w-100" :for="id">
      <h2><slot></slot></h2>
      <input 
        :type 
        :placeholder 
        class="form-control" 
        :id 
        :required 
        autocomplete="off"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'DefaultInput',
  props: {
    type: String,
    placeholder: String,
    id: String,
    required: Boolean,
    modelValue: String,
  },
}
</script>

<style>

</style>
