<template>
  <div class="nav flex bg-white">
    <div class="logo-container flex w-1/4  h-full">
      <img class="ml-5 my-3 ml-5"  src="https://www.foodics.com/wp-content/uploads/2019/11/foodics_logo_black.jpg" alt="Logo"/>
    </div>
    <div class="menu-items w-1/2 self-center h-full">
        <ul class="list">
            <li class="flex h-full item relative" :class="{'active': getRouteModule === 'customers'}"><router-link class="self-center" to="/customers-list">Customers</router-link></li>
            <li class="flex h-full item relative" :class="{'active': getRouteModule === 'catigories'}"><router-link class="self-center" to="/categories-list">Categories</router-link></li>
            <li class="flex h-full item relative" :class="{'active': getRouteModule === 'products'}"><router-link class="self-center" to="/products-list">Products</router-link></li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {

    data () {
        return {
            showProfile: false
        };
    },
    computed:{
        getRouteModule(){
            return this.$route.meta.module;
        }
    }

};
</script>
<style lang="scss" scoped>
.nav {
    height: 70px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.228038);
    .list {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-line-pack: center;
        align-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 100%;
        .item {
            transition: all 1.2s cubic-bezier(.24,.35,0,1.01);
            &:hover,
             &.active{
                color: #D7DF23;
                &::after{
                    width: 100%;
                    left: 0;
                }
            }
            &::after{
                position: absolute;
                content: "";
                bottom: 0;
                width: 0;
                left: 50%;
                height: 2px;
                background-color: #D7DF23;
                -webkit-transition: all .2s cubic-bezier(.24,.35,0,1.01);
                transition: all .2s cubic-bezier(.24,.35,0,1.01);
            }
        }

    }
    .profile-container{
        right: 21px;
        top: 56px;
        width: 280px;
        transition: .5s all ease-out;
        &.hide{
            top: -20%;
            opacity: 0;
        }
    }
}
</style>