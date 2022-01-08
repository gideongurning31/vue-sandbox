const app = Vue.createApp({
  data() {
    return {
      enteredGoals: '',
      goals: []
    };
  },
  methods: {
    addGoal() {
      if (this.enteredGoals.length > 0) {
        this.goals.push(this.enteredGoals);
        this.enteredGoals = '';
      }
    },
    removeGoal(index) {
      this.goals.splice(index, 1);
    }
  }
});

app.mount('#user-goals');
