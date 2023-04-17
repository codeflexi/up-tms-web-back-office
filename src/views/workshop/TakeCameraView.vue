<template>
    <div>
      <video ref="camera" width="450" height="337.5"></video>
      <canvas ref="canvas" style="display:none" width="450" height="337.5"></canvas>
      <button @click="toggleCamera">{{ isCameraOpen ? 'Stop Camera' : 'Start Camera' }}</button>
      <button @click="takePhoto" :disabled="!isCameraOpen">{{ isPhotoTaken ? 'Retake' : 'Take Photo' }}</button>
      <a href="#" id="downloadPhoto" @click.prevent="downloadImage" :disabled="!isPhotoTaken">Download</a>
      <img v-if="link" :src="link" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isCameraOpen = ref(false);
  const isPhotoTaken = ref(false);
  const isShotPhoto = ref(false);
  const isLoading = ref(false);
  const link = ref('');
  
  function toggleCamera() {
    if (isCameraOpen.value) {
      isCameraOpen.value = false;
      isPhotoTaken.value = false;
      isShotPhoto.value = false;
      stopCameraStream();
    } else {
      isCameraOpen.value = true;
      createCameraElement();
    }
  }
  
  function createCameraElement() {
    isLoading.value = true;
  
    const constraints = (window.constraints = {
      audio: false,
      video: true,
    });
  
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        isLoading.value = false;
        const camera = document.querySelector('video');
        camera.srcObject = stream;
      })
      .catch((error) => {
        isLoading.value = false;
        alert("May the browser didn't support or there is some errors.");
      });
  }
  
  function stopCameraStream() {
    const tracks = document.querySelector('video').srcObject.getTracks();
  
    tracks.forEach((track) => {
      track.stop();
    });
  }
  
  function takePhoto() {
    if (!isPhotoTaken.value) {
      isShotPhoto.value = true;
  
      const FLASH_TIMEOUT = 50;
  
      setTimeout(() => {
        isShotPhoto.value = false;
      }, FLASH_TIMEOUT);
    }
  
    isPhotoTaken.value = !isPhotoTaken.value;
  
    const context = document.querySelector('canvas').getContext('2d');
    context.drawImage(document.querySelector('video'), 0, 0, 450, 337.5);
    link.value = document.querySelector('canvas').toDataURL();
  }
  
  function downloadImage() {
    const download = document.getElementById('downloadPhoto');
    const canvas = document.getElementById('photoTaken').toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
    download.setAttribute('href', canvas);
  }
  </script>
  