<template>
  <div>
    <Group/>
    <div>Students</div>
   
      
        <v-layout row  justify-space-around>
            <v-card> 
              <v-toolbar d-flex color="teal" dark style="min-width:50vw">
                  <v-toolbar-side-icon></v-toolbar-side-icon>

                  <!-- <v-flex xs12 lg12> -->
                <span v-if="getSelectedGroup > -1">Студенты группы {{ groups.find(x=>x.id==getSelectedGroup).name }} </span>
                
              <!-- </v-flex> -->
              <v-spacer></v-spacer>
                <!-- <v-flex xs12 lg12> -->
                  <v-menu
                    v-model="calendarMenu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="calendarDate"
                        label="Выберите дату"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="calendarDate" @input="calendarMenu2 = false" header-color="blue" color="blue" dark></v-date-picker>
                  </v-menu>
                <!-- </v-flex> -->

              </v-toolbar>
              <v-list subheader>
                <v-list-tile v-for="student in studentsFiltered" :key="student.id" avatar @click>
                  <v-container class="pa-1">
                    <v-layout row justify-space-around>
                      <v-flex xs2>
                        <div class="text-xs-left">
                          <v-chip 
                          v-on:click="greet(student)"
                          
                          >
                          <router-link :to="`/student/${student.id}`">
                            <v-avatar>
                              <img :src="student.url" alt="trevor">
                            </v-avatar>
                            </router-link>
                            <router-view></router-view>
                            {{ student.firstName }} {{ student.lastName }}
                          </v-chip>
                        </div>
                      </v-flex>
                      <v-flex xs2>
                        <v-switch
                          class="mt-1"
                          :label="`${student.check_student}`"
                          color="success"
                          :input-value="student.check_student"
                          hide-details
                        ></v-switch>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <!-- <div>{{ student.firstName }}</div> -->
                </v-list-tile>
              </v-list>
            </v-card>
         
        </v-layout>
  
 
    <!-- <span>Отмеченные имена: {{ checkedNames }}</span> -->
    <button v-on:click="getStaticStudents">GET Students</button>
    <!-- <button v-on:click="ChangeToogleState">123</button> -->
        <button v-on:click="greet">123</button> 

  </div>
</template>

<script>
// В полной сборке функция доступна через Vuex.mapState
import { mapState, mapGetters, mapActions } from "vuex";
import Group from "./Groups";

export default {
  name: "Students",
  data: () => ({
    calendarDate: new Date().toISOString().substr(0, 10),
    // calendarMenu: false,
    // calendarModal: false,
    calendarMenu2: false
  }),
  components: {
    Group
  },
  computed: {
    ...mapGetters("students", [
      "students", 
      "getSelectedGroup", 
      "studentsFiltered", 
      ]),  
    ...mapGetters("groups", ["groups"]),
  },
  methods: {
    ...mapActions("students", [
      "getStudents",
      "getStaticStudents",
      "ChangeToogleState", 
    ]),
    
    ...mapActions("groups", ["getGroups", "getStaticGroups"]),
    greet: function (student) {
      // `this` inside methods point to the Vue instance
      alert('Hello ' + student.id + '!')
      
      // `event` is the native DOM event
      // alert(event.target.tagName)
    }
  
  },
  
  
  mounted() {
    this.getStaticGroups();
  }
};

</script>

<style>

.v-btn.v-btn--flat.v-btn--floating {
  padding: 0 !important;
}

img{
    object-fit: cover;
    height: 100%;
    width: 100%;
}

</style>
