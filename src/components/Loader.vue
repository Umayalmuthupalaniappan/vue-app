<template>
    <div class="overlay">
        <div class="center-spinner">
            <div class="overlay-content"><span class="spinner"></span></div>
        </div>
    </div>
</template>

<script>
    export default {
    }
    </script>

<style>
.overlay {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    /* background: rgba(242, 239, 239, 0.5); */
    background: rgb(244, 237, 237);
    opacity:0.5;
}

.center-spinner {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
}

.overlay-content {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}

.spinner {
    display: inline-block;
    border: 5px solid #cfd2d4;
    border-top: 5px solid hsla(160, 100%, 37%, 1);
    width: 100px;
    height: 100px;
    animation: spin 1s infinite linear;
    border-radius: 100%;
    border-style: solid;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>