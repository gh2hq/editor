<script setup>
import { ref, onMounted } from 'vue';

const { code } = defineProps(['code']);
const divRef = ref(null);

// Dynamic import
// @xterm/xterm is not ESM, so we need to use dynamic import
let Terminal;
let pyodide;

async function loadPyodide() {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js";
  document.body.appendChild(script);
  return new Promise(async (resolve) => {
    script.onload = async () => {
      const pyodide = await window.loadPyodide();
      await pyodide.loadPackage("micropip");
      const micropip = pyodide.pyimport("micropip");
      await micropip.install("gh2");
      resolve(pyodide);
    };
  });
}

function redirectPrint(code) {
  return `
import sys
from io import StringIO

# Save the original stdout
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()

${code}

# Get the output
output = mystdout.getvalue()
sys.stdout = old_stdout
output 
`
}

// Render terminal
onMounted(async () => {
  if (!Terminal) Terminal = (await import("@xterm/xterm")).Terminal;
  if (!pyodide) pyodide = await loadPyodide();

  const redirectedCode = redirectPrint(code);
  await pyodide.loadPackagesFromImports(redirectedCode);
  const output = pyodide.runPython(redirectedCode);
  const fixedOutput = output.replace(/\n/g, "\r\n");
  const trimEnd = fixedOutput.split("\r\n").slice(0, -1).join("\r\n");
  const rows = trimEnd.split("\r\n").length;
  const cols = Math.max(...trimEnd.split("\r\n").map(line => line.length));
  console.log(trimEnd);

  const container = divRef.value;
  const term = new Terminal({
    cols,
    // rows
  });
  term.open(container);
  term.write(trimEnd);
  term.write("\x1B[?25l"); // Hide cursor
  return () => term.dispose();
});

</script>

<template>
  <div class="container" ref="containerRef">
    <div class="terminal">
      <div ref="divRef"></div>
    </div>
  </div>
</template>


<style scoped>
.container {
  overflow: auto;
}

.terminal {
  padding: 10px 20px;
  border-radius: 4px;
  background-color: black;
  /* width: fit-content; */
}
</style>