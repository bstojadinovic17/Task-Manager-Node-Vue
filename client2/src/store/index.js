import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//const baseUrl = 'http://localhost:3000/'
export default new Vuex.Store({
    state: {
        users: [],
        user: "",
        tasks: [],
        comments: [],
    },
    mutations:{

        set_tasks: function(state, tasks){
            state.tasks = tasks;
        },

        set_user: function(state, user){
            state.user=user;
        },
        add_task: function(state, task){
            state.tasks.push(task)
        },

        remove_task: function (state, id) {
            for (let m = 0; m < state.tasks.length; m++) {
              if (state.tasks[m].id === id) {
                state.tasks.splice(m, 1);
                break;
              }
            }
          },
         update_task: function(state, payload){
             for (let m = 0; m < state.tasks.length; m++) {
                 if (state.tasks[m].id === parseInt(payload.id)) {
                     state.tasks[m].taskname = payload.msg.taskname;
                     state.tasls[m].description = payload.msg.description;
                     state.tasks[m].category = payload.msg.category;
                     break;
                 }
             }
         },
          set_users: function (state, users) {
            state.users = users
          },
          add_user: function (state, user) {
            state.users.push(user)
          },

          set_comments: function (state, comments) {
            state.comments = comments
          },
          add_comment: function (state, comment) {
            state.comments.push(comment)
          },
          remove_comment: function (state, id) {
              for (let m = 0; m < state.comments.length; m++) {
                  if (state.comments[m].id === id) {
                      state.comments.splice(m, 1);
                      break;
                  }
              }
          }
    },

    actions: {
        load_tasks: function ({ commit }) {
            fetch(/*baseUrl + */'/api/tasks', { method: 'get' }).then((response) => {
              if (!response.ok)
                throw response;
      
              return response.json()
            }).then((jsonData) => {
              commit('set_tasks', jsonData)
            }).catch((error) => {
              if (typeof error.text === 'function')
                error.text().then((errorMessage) => {
                  alert(errorMessage);
                });
              else
                alert(error);
            });
          },
        load_users: function ({ commit }) {
            fetch(/*baseUrl + */'/api/users', { method: 'get' }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json()
            }).then((jsonData) => {
                commit('set_users', jsonData)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },

        load_comments: function ({ commit }) {
            fetch(/*baseUrl + */'/api/comments', { method: 'get' }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json()
            }).then((jsonData) => {
                commit('set_comments', jsonData)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },
          new_task: function({ commit }, task) {
            fetch(/* baseUrl*/  '/api/newTask', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: task
            }).then((response) => {
              if (!response.ok)
                throw response;
      
              return response.json();
            }).then((jsonData) => {
              commit('add_task', jsonData);
            }).catch((error) => {
              if (typeof error.text === 'function')
                error.text().then((errorMessage) => {
                  alert(errorMessage);
                });
              else
                alert(error);
            });
          },

          delete_task: function({ commit }, id) {
            fetch( /*baseUrl + */`/api/task/${id}`, { method: 'delete' }).then((response) => {
              if (!response.ok)
                throw response;
      
              return response.json()
            }).then((jsonData) => {
              commit('remove_task', jsonData.id)
            }).catch((error) => {
              if (typeof error.text === 'function')
                error.text().then((errorMessage) => {
                  alert(errorMessage);
                });
              else
                alert(error);
            });
          },
          change_task: function({commit} , payload){
            fetch('/api/task/${payload.id}', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: payload.tsk
            }).then((response) => {
                if(!response.ok)
                    throw response;

                return response.json();
            }).then((jsonData) => {
                commit('update_task', {id: payload.id, tsk:jsonData});
            }).catch((error) => {
                if(typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
          },
        new_comment: function({ commit }, comment) {
            fetch(/* baseUrl +*/ '/api/comments/new', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: comment
            }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json();
            }).then((jsonData) => {
                commit('add_task', jsonData);
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },
        delete_comment: function({ commit }, id) {
            fetch( /*baseUrl + */`/api/comment/${id}`, { method: 'delete' }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json()
            }).then((jsonData) => {
                commit('remove_comment', jsonData.id)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },

        log_user: function ({commit}, user){

            //alert(user)
            fetch( `/auth/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: user
            }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json();
            }).then((jsonData) => {
                //alert(jsonData.token)
                localStorage.setItem('auth', jsonData.token)
                localStorage.setItem('user', jsonData.username)
                localStorage.setItem('user_id', jsonData.id)
                commit('set_user', jsonData)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });


        },
    }
})
