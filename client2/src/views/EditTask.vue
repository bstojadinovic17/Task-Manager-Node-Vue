<template>
    <b-container fluid>
        <b-form>
            <b-row class="mt-2">
                <b-col sm="2" offset="2">
                    <b-input v-model="newTaskname" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Taskname"></b-input>
                </b-col>
                <b-col sm="2" offset="2">
                    <b-input v-model="newDescription" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Description"></b-input>
                </b-col>
                <b-col sm="2" offset="2">
                    <b-input v-model="newCategory" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Category"></b-input>
                </b-col>
                <b-col sm="1">
                    <b-button variant="primary" size="lg" @click="addNew">Save</b-button>
                </b-col>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
    import Header from "@/components/Header";
    import { mapActions} from 'vuex'
    export default {
        name: 'EditTask',
        props: {
            taskname: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            },
            category: {
                type: String,
                default: ''
            }
        },
        components: {
            Header
        },
        data() {
            return {
                newTaskname: '',
                newDescription: '',
                newCategory: ''
            }
        },
        mounted: function() {
            this.newTaskname = this.taskname;
            this.newDescription = this.description;
            this.newCategory = this.category;
        },
        methods: {
            ...mapActions(['new_task', 'change_task']),

            addNew: function () {
                const tsk = JSON.stringify({taskname: this.newTaskname, description: this.newDescription, category: this.newCategory});

                if(!this.$route.params.id)
                    this.new_task(tsk);
                else{
                    this.change_task({id:this.$route.params.id, tsk: tsk})
                }

                this.newTaskname = '';
                this.newDescription = '';
                this.newCategory = '';
            }

        },

    }
</script>