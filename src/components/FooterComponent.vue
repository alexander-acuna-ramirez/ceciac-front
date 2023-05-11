<template>
    <footer class="bg-secondary text-white q-pa-xl">
        <div class="row">
            <div class="col-12 col-md-3">
                <div class="flex items-center">
                    <router-link to="/" class="col-logo-img">
                        <q-img src="~assets/img/ceciac-logo.png" class="logo-img" />
                    </router-link>
                    <div class="col-logo-text">
                        <div class="text-weight-bold">Red CECIAC</div>
                        <div>Plataforma de integración de la red CECIAC</div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-3">
                <div class="text-h6 text-weight-bold">Important Links</div>
                <ul class="link-list">
                    <li><router-link class="text-white" to="/about">About Us</router-link></li>
                    <li><router-link class="text-white" to="/contact">Contact Us</router-link></li>
                    <li><router-link class="text-white" to="/blog">Blog</router-link></li>
                </ul>
            </div>
            <div class="col-12 col-md-3">
                <div class=" text-h6 text-weight-bold">Community</div>
                <ul class="link-list">
                    <li><router-link class="text-white" to="/newsfeed">Newsfeed</router-link></li>
                    <li><router-link class="text-white" to="/groups">Groups</router-link></li>
                    <li><router-link class="text-white" to="/friends">Friends</router-link></li>
                    <li><router-link class="text-white" to="/forums">Forums</router-link></li>
                </ul>
            </div>

            <div class="col-12 col-md-3">
                <div class="text-h6 text-weight-bold">Community</div>
                <ul class="link-list">
                    <li><router-link class="text-white" to="/newsfeed">Newsfeed</router-link></li>
                    <li><router-link class="text-white" to="/groups">Groups</router-link></li>
                    <li><router-link class="text-white" to="/friends">Friends</router-link></li>
                    <li><router-link class="text-white" to="/forums">Forums</router-link></li>
                </ul>
            </div>
        </div>
    </footer>
</template>
<script>
export default {};
</script>

<style lang="scss">
.logo-img {
    height: 50px;
    width: 50px;
    height: auto;
    margin-right: 15px;
}

.link-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.link-list li {
    margin-bottom: 0.5rem;
}

.link-list li a {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
}
</style>
