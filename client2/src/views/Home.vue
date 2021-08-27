<template>

    <div class="home">
        <Header/>
                  <b-table
                hover v-if="tasks.length"
                sticky-header="800px"
                :items="tasks"
                :fields="fields"
                head-variant="light"
                @row-clicked="">
            <template v-slot:cell(task_actions)="row">
                <b-button variant="outline-primary" @click="editTask(row.item.id)">Edit</b-button>
                <b-button variant="danger" @click="delete_task(row.item.id)">Delete</b-button>
            </template>

                       <template v-slot:cell(comments_actions)="row">
                          <b-button variant="success" @click="viewComments(row.item.id)">View All</b-button>
                      </template>
        </b-table>
        <b-table v-else
                 sticky-header="800px"
                 :fields="fields"
                 head-variant="light"
                 @row-clicked="">
            <template v-slot:cell(task_actions)="row">
                <b-button variant="outline-primary" @click="editTask">Edit</b-button>
                <b-button variant="danger" @click="delete_task(row.item.id)">Delete</b-button>
            </template>

            <template v-slot:cell(comments_actions)="row">
                <b-button variant="success" @click="viewComments">View All</b-button>
            </template>
        </b-table>
              
        
    </div>
</template>

<script>
import Header from "@/components/Header";

import { mapState, mapActions} from 'vuex'
export default {
    name: "Home",
    components: {
        Header
    },
    computed: {
        ...mapState(['users', 'tasks', 'comments']),
    },
    data() {
            return {
                fields: [
                    { key: 'user_id' },
                    { key: 'taskname' },
                    { key: 'description' },
                    { key: 'category' },
                    { key: 'task_actions'},
                    { key: 'comments_actions'}
                ],
                items: [

                ]

            }
        },
    methods: {
        ...mapActions(['delete_task']),

        editTask: function(id){
            this.$router.push({ path: "/edit/"+ id });
        },
        viewComments: function (id) {
            this.$router.push({ path: "/comments/"+ id });
        }

    }
    
    
    
    
}
</script>
