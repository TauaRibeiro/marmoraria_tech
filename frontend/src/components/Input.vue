<template>
  <div class="input-container">
    <spam>
      <label class="form-label" :for="id">
        <slot></slot>
        <input :type :placeholder :class="form-control" :id :required/>
      </label>
    </spam>
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: {
    type: String,
    placeholder: String,
    id: String,
    required: Boolean
  },
}
</script>

<style></style>
