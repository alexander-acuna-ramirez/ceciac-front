
<script setup lang="ts">
const props = defineProps({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    type: {
        type: Number,
        default: 1
    }
})
</script>
<template>
    <div class="banner q-px-md">
        <div class="q-mx-md info">
            <div>

                <div class="text-white text-bold text-h4">{{ title }}</div>
                <div class="text-white text-light text-weight-light">{{ description }}</div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.banner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 150px;
    background-image: url('assets/img/banner/bacground.jpg');

    background-position: right;
    background-size: contain;
    background-attachment: fixed;
    overflow: hidden;
    border-radius: 5px;
    display: flex;
}

.banner::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    min-height: 100%;
    top: 0;
    left: 0;

    background: linear-gradient(90deg, rgba(102, 204, 153, 1) 31%, rgba(102, 204, 153, 0.604079131652661) 62%, rgba(102, 204, 153, 0.396796218487395) 100%);
    opacity: 100%;
}

.banner .info {
    display: flex;
    position: absolute;
}
</style>