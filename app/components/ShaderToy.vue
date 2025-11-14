<template>
  <canvas ref="canvasRef" class="absolute inset-0 w-full h-full"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Props {
  shaderCode: string;
  hue?: number;
  saturation?: number;
  brightness?: number;
  speed?: number;
}

const props = withDefaults(defineProps<Props>(), {
  speed: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
let gl: WebGLRenderingContext | null = null;
let program: WebGLProgram | null = null;
let vertexBuffer: WebGLBuffer | null = null;
let iResolutionLoc: WebGLUniformLocation | null = null;
let iTimeLoc: WebGLUniformLocation | null = null;
let iMouseLoc: WebGLUniformLocation | null = null;
let startTime = 0;
let animationId = 0;
let mouseX = 0, mouseY = 0, mouseDown = false;

function compileShader(source: string, type: number): WebGLShader | null {
  if (!gl) return null;
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(fsSource: string): WebGLProgram | null {
  if (!gl) return null;
  const vsSource = `
    attribute vec2 aPos;
    void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
  `;

  const fragHeader = `
    precision mediump float;
    uniform vec3 iResolution;
    uniform float iTime;
    uniform vec4 iMouse;
    void mainImage(out vec4 fragColor, in vec2 fragCoord);
    void main(){ vec4 color; mainImage(color, gl_FragCoord.xy); gl_FragColor = color; }
  `;

  const vs = compileShader(vsSource, gl.VERTEX_SHADER);
  const fs = compileShader(fragHeader + "\n" + fsSource, gl.FRAGMENT_SHADER);
  if (!vs || !fs) return null;

  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

function setSize() {
  if (!canvasRef.value || !gl) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvasRef.value.getBoundingClientRect();
  canvasRef.value.width = Math.max(1, Math.floor(rect.width * dpr));
  canvasRef.value.height = Math.max(1, Math.floor(rect.height * dpr));
  gl.viewport(0, 0, canvasRef.value.width, canvasRef.value.height);
}

function render() {
  if (!gl || !program || !canvasRef.value) return;
  const now = (performance.now() - startTime) / 1000;
  gl.useProgram(program);
  gl.uniform3f(iResolutionLoc!, canvasRef.value.width, canvasRef.value.height, 1.0);
  gl.uniform1f(iTimeLoc!, now * props.speed);
  gl.uniform4f(iMouseLoc!, mouseX, mouseY, mouseDown ? 2.0 : 0.0, 0.0);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  animationId = requestAnimationFrame(render);
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  gl = canvas.getContext('webgl');
  if (!gl) return;

  program = createProgram(props.shaderCode);
  if (!program) return;

  const aPosLoc = gl.getAttribLocation(program, 'aPos');
  vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  const vertices = new Float32Array([
    -1, -1,  1, -1,  -1, 1,  1, 1,
  ]);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosLoc);

  iResolutionLoc = gl.getUniformLocation(program, 'iResolution');
  iTimeLoc = gl.getUniformLocation(program, 'iTime');
  iMouseLoc = gl.getUniformLocation(program, 'iMouse');

  startTime = performance.now();
  setSize();
  window.addEventListener('resize', setSize);

  // Mouse handling
  const onMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    mouseX = (e.clientX - rect.left) * dpr;
    mouseY = (canvas.height - (e.clientY - rect.top) * dpr);
  };
  const onDown = () => { mouseDown = true; };
  const onUp = () => { mouseDown = false; };
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mousedown', onDown);
  window.addEventListener('mouseup', onUp);

  render();

  onUnmounted(() => {
    window.removeEventListener('resize', setSize);
    canvas.removeEventListener('mousemove', onMove);
    canvas.removeEventListener('mousedown', onDown);
    window.removeEventListener('mouseup', onUp);
    cancelAnimationFrame(animationId);
    if (gl) {
      if (program) gl.deleteProgram(program);
      if (vertexBuffer) gl.deleteBuffer(vertexBuffer);
    }
  });
});
</script>