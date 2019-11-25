<template>
    <div>
        <div>Hello</div>
        <div>{{ count }}</div>
        <button v-on:click="add">Add</button>
    </div>
</template>

<script>
// В полной сборке функция доступна через Vuex.mapState
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: "Example",
  computed: {
      ...mapGetters('example', ['count']),
  },
  methods: {
      ...mapActions('example', ['add']),
  },          
};
</script>