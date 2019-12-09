<template>
    <input class="number-input" type="number">
</template>

<script>
    export default {
        name: "numbers-inputs"
    }
</script>

<style scoped lang="scss">
.number-input:not(active){
    color: red;
}
</style>