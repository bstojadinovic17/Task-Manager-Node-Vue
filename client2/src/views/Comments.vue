<template>
    <p>Comments for {{$route.params.id}}</p>
</template>

<script>
    import { mapState} from 'vuex'

    export default {
        name: "Comments",
        computed: {
            ...mapState(['tasks', 'comments'])
        },

    }
</script>

<style scoped>

</style>