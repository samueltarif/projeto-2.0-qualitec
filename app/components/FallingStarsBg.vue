<template> 
   <canvas ref="canvas" class="absolute left-0 top-0 z-[0] h-full w-full"></canvas> 
 </template> 
  
<script setup lang="ts"> 
import { ref, onMounted, onUnmounted, watch } from "vue"; 
import { useTheme } from "~/composables/useTheme";
  
 const props = defineProps({ 
   speed: { 
     type: Number, 
     default: 5, 
   }, 
   numStars: { 
     type: Number, 
     default: 500, 
   }, 
   color: { 
     type: String, 
     required: false, 
   }, 
 }); 
  
 const canvas = ref<HTMLCanvasElement | null>(null); 
let stars: any[] = []; 
let canvasWidth: number, canvasHeight: number; 
let speed: number; 
let animationFrameId: number; 
let overlayColor: string = 'rgba(0,0,0,1)';
let starColor: string = '#555';

const resolveThemeColors = () => {
  try {
    const isDark = document.documentElement.classList.contains('dark');
    // Force solid backgrounds for immediate visual change
    overlayColor = isDark ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)';
    // star color: fluorescent green on dark, blue on light
    starColor = props.color ?? (isDark ? '#39FF14' : '#0000FF');
  } catch {
    overlayColor = 'rgba(0,0,0,1)';
    starColor = props.color ?? '#0000FF';
  }
};
  
 const setup = () => { 
   if (!canvas.value) return; 
   const parent = canvas.value.parentElement; 
   if (!parent) return; 
  
   canvasWidth = parent.offsetWidth; 
   canvasHeight = parent.offsetHeight; 
   canvas.value.width = canvasWidth; 
   canvas.value.height = canvasHeight; 
   speed = props.speed; 
  
   stars = []; 
   for (let i = 0; i < props.numStars; i++) { 
     stars.push({ 
       x: (Math.random() - 0.5) * canvasWidth, 
       y: (Math.random() - 0.5) * canvasHeight, 
       z: Math.random() * canvasWidth, 
       x_prev: 0, 
       y_prev: 0, 
     }); 
   } 
 }; 
  
 const animate = () => { 
   if (!canvas.value) return; 
   const ctx = canvas.value.getContext("2d"); 
  if (!ctx) return; 
  
  ctx.fillStyle = overlayColor; 
  ctx.fillRect(0, 0, canvasWidth, canvasHeight); 
  ctx.save(); 
  ctx.translate(canvasWidth / 2, canvasHeight / 2); 
  
   for (const star of stars) { 
     star.z -= speed; 
  
     if (star.z <= 0) { 
       star.x = (Math.random() - 0.5) * canvasWidth; 
       star.y = (Math.random() - 0.5) * canvasHeight; 
       star.z = canvasWidth; 
     } 
  
     const k = 128.0 / star.z; 
     const px = star.x * k; 
     const py = star.y * k; 
  
     if (star.x_prev !== 0) { 
       ctx.lineWidth = k * 1.5; 
      ctx.strokeStyle = starColor; 
      ctx.beginPath(); 
      ctx.moveTo(star.x_prev, star.y_prev); 
      ctx.lineTo(px, py); 
      ctx.stroke(); 
    } 
  
     star.x_prev = px; 
     star.y_prev = py; 
   } 
  
   ctx.restore(); 
   animationFrameId = requestAnimationFrame(animate); 
 }; 
  
const { currentTheme } = useTheme();
watch(currentTheme, () => {
  resolveThemeColors();
  // Clear canvas to avoid lingering trails in theme change
  if (canvas.value) {
    const ctx = canvas.value.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvasWidth || canvas.value.width, canvasHeight || canvas.value.height);
    }
  }
}, { immediate: true });

onMounted(() => { 
  // resolveThemeColors will be triggered by the watcher as well
  setup(); 
  animate(); 
  window.addEventListener("resize", setup); 
}); 
  
 onUnmounted(() => { 
   window.removeEventListener("resize", setup); 
   cancelAnimationFrame(animationFrameId); 
 }); 
 </script>