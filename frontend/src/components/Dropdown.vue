<template>
    <div class="drop-container">
        <label :for="id">
            {{ label }}
        </label>
        <select 
            class="form-select" :id="id"
            @select="$emit('update:modelValue', $event.target.value)"
        >
            <option value="" selected disabled>{{ placeholder }}</option>
            <slot></slot>
        </select>
    </div>
</template>

<script>
    export default {
        name: "DropdownComponent",
        props: {
            id: {
                type: String,
                required: true,
            },
            label: {
                type: String,
                default: ""
            },
            placeholder: {
                type: String,
                default: "Selecione"
            }
        },
    }
</script>

<style scoped>
</style>