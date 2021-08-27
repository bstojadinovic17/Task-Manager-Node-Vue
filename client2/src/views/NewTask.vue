<template>
  <div>
    <Header/>
    <b-container>
          <b-row>
              <b-col cm="6" >
                  <b-form @submit="onSubmit" @reset="onReset" v-if="show">


      <b-form-group id="input-group-2" label="Task Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.taskname"
          required
          placeholder="Task name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Description:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.description"
          required
          placeholder="Task description"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Category:" label-for="input-4">
        <b-form-select
          id="input-4"
          v-model="form.category"
          :options="categories"
          required
        ></b-form-select>
      </b-form-group>

      

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
              </b-col>
          </b-row>
      </b-container>
    
  </div>
</template>

<script>
import Header from "@/components/Header";
import { mapState, mapGetters, mapActions} from 'vuex'
  export default {
    name: 'NewTask',
    components: {
      Header
    },
    data() {
      return {
        form: {
          taskname: '',
          description: '',
          category: null,
          checked: []
        },
        categories: [{ text: 'Select One', value: null }, 'Bussiness', 'Entertainment', 'Pleasure', 'Other'],
        show: true
      }
    },
    methods: {
      ...mapActions(['new_task']),

      onSubmit(evt) {
        const task = JSON.stringify({user_id: localStorage.getItem("user_id"), taskname: this.form.taskname, description: this.form.description, category: this.form.category});

        if(!this.$route.params.id)
            this.new_task(task);
        
        evt.preventDefault()

        
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.taskname = ''
        this.form.description = ''
        this.form.category = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    
  }
</script>