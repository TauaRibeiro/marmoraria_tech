<template>
  <div class="button-container">
    <button type="submit" class="btn btn-dark w-100 fw-bold" :disabled><slot></slot></button>
  </div>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    disabled: Boolean,
  },
}
</script>

<style></style>
