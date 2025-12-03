<template>
  <div :class="`input-container ${containerClass}`">
    <label :for="id">
      <p class="mb-2">{{ label }}</p>
    </label>
    <input
      :type
      :placeholder
      :class="`form-control ${cls}`"
      :id
      :required
      autocomplete="off"
      v-model="internalValue"
      :min
      :max
      :value="modelValue || value"
      :step
      :disabled
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
      default: "",
    },
    containerClass: {
      type: String,
      default: ""
    },
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    },
    label: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number]
    },
    step: {
      type: Number

    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  computed: {
    internalValue: {
      get() { return this.modelValue },
      set(v) { this.$emit('update:modelValue', v) }
    }
  }
}
</script>

<style scoped>

</style>
