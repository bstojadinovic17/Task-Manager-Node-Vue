<template>
    <div> 
         <p> Ulogovan korisnik: {{ currentUser }}</p>
         </div>
</template>

<script>

export default {
    
    name: 'logged',
    data(){
        return{
            currentUser: localStorage.getItem("user")
        }
    }

}
</script>