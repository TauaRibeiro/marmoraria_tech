<template>
  <div class="input-container">
    <label class="form-label" :for="id">
      <h4><slot></slot></h4>
      <input :type :placeholder class="form-control" :id :required autocomplete="off"/>
    </label>
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
