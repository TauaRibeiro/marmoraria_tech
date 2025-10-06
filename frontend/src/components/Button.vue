<template>
  <div class="button-container">
    <button type :v-on="action" :classd="cls" disabled><slot></slot></button>
  </div>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    type: String,
    disabled: Boolean,
    action: String,
    cls: String,
  },
}
</script>

<style></style>
