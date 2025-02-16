<script setup>
import MonacoEditor from '@guolao/vue-monaco-editor';

const { code } = defineProps(['code']);

const editorOptions = {
  fontSize: 16,
  minimap: { enabled: false },
  lineNumbers: "on",
  scrollBeyondLastLine: false,
  automaticLayout: true
}

</script>


<template>
  <MonacoEditor :value="code" language="python" theme="vs-dark" height="300px" :options="editorOptions" />
</template>