<script setup>
import { ref } from 'vue';
import Editor from './Editor.vue';
import Terminal from './Terminal.vue';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

const defaultCode = `import gh2 as gh

poem = gh.poem()

poem.margin(top=3, bottom=3)

for j in range(10):
    for i in range(20):
        if (i + j) % 2 == 1:
            poem.point(i, j, "0")

poem.print()`;

const getCodeFromURL = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#code=')) {
    const encodedCode = hash.slice(6); // Remove '#code='
    return decodeURIComponent(encodedCode);
  }
  return defaultCode;
};

const code = ref(getCodeFromURL());

</script>

<template>
  <Splitter style="height: var(--main-height)">
    <SplitterPanel class="flex items-center justify-center">
      <Editor v-model="code" />
    </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center">
      <Terminal :code="code" />
    </SplitterPanel>
  </Splitter>
</template>
