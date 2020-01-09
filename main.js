let STORAGE_KEY = 'vue_todoapp';
let todoStorage = {
  pick: function() {
    let todo_list = JSON.parse(localStorage.STORAGE_KEY);
    return todo_list;
  },
  save: function(todo_list) {
    localStorage.STORAGE_KEY = JSON.stringify(todo_list);
  },
};

let app = new Vue({
  el: '#app',
  data: {
    todo: '',
    todo_list: todoStorage.pick(),
    pickup: '全て',
    tabs: ['全て', '未完', 'Done'],
  },
  watch: {
    todo_list: {
      handler: function(todo_list) {
        todoStorage.save(todo_list);
      },
      deep: true,
    },
  },
  computed: {
    todo_counts: function() {
      let count = 0;
      for (let todo of this.todo_list) {
        if (todo.status == '未完') {
          count += 1;
        }
      }
      return count;
    },
  },
  methods: {
    add_todo: function() {
      if (this.todo.length == 0) {
        return;
      }
      this.todo_list.push({ text: this.todo, status: '未完' });
      this.todo = '';
    },
    update_status: function(todo) {
      todo.status = todo.status == 'Done' ? '未完' : 'Done';
    },
    delete_todo: function(index) {
      this.todo_list.splice(index, 1);
    },
    validation: function(todo) {
      if (this.pickup == '全て') {
        return true;
      } else if (this.pickup == todo.status) {
        return true;
      }
    },
  },
});
