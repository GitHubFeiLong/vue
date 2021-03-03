<template>
    <div> 
        <h2>Home</h2>
        <div>
            <ul class="nav nav-tabs">
                <li>
                    <router-link to="/home/news">News</router-link>
                    <router-link to="/home/message">Messages</router-link>
                </li>
            </ul>
            <div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>

</style>