<template>
    <div>
        <p>click {{$store.state.count}} times count is {{evenOrOdd2}}</p>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <button @click="incrementIfOdd">increment if odd</button>
        <button @click="incrementAsync">increment async</button>
    </div>
</template>

<script>
    /* 
        mapGetters() 返回值对象
    */
    import {mapState, mapGetters, mapActions} from 'vuex';

    export default {
        computed : {
            // mapState返回值对象:{count(){return this.$store.state.count}}
            ...mapState(['count']),
            // mapGetters() 返回值对象:{eventOrOdd(){return this.$store.getters.evenOrOdd}}
            ...mapGetters({evenOrOdd2:'evenOrOdd'}),
        },
        data(){
            return {
            }
        },
        methods:{
            ...mapActions(['increment','decrement', 'incrementIfOdd', 'incrementAsync'])
        }
        /* methods:{
            increment () {
                // 通知vuex更新
                // 触发store中对应的action调用
                this.$store.dispatch('increment')
            },
            decrement() {
                // 触发store中对应的action调用
                this.$store.dispatch('decrement')
            },
            incrementIfOdd(){
                // 触发store中对应的action调用
                this.$store.dispatch('incrementIfOdd')
            },
            incrementAsync(){
                // 触发store中对应的action调用
                this.$store.dispatch('incrementAsync')
            }
        }, */
        
    }
</script>

<style>

</style>