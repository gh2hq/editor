<script setup>
import MonacoEditor from '@guolao/vue-monaco-editor';

const { modelValue } = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const editorOptions = {
  fontSize: 16,
  minimap: { enabled: false },
  lineNumbers: "on",
  scrollBeyondLastLine: false,
  automaticLayout: true,
}

const handleChange = (newValue) => {
  emit('update:modelValue', newValue);
};

</script>


<template>
  <MonacoEditor :value="modelValue" language="python" theme="vs-dark" height="100%" :options="editorOptions"
    @change="handleChange" />
</template>