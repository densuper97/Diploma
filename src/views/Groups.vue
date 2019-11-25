<template>
  <div>
    <v-tabs dark  style="color:#009688" show-arrows>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab @click="hello"  v-for="i in ['БПИ', 'БИСТ', 'МЛ']" :key="i" :href="'#tab-' + i">{{ i }}</v-tab>

      <v-tabs-items>
        <v-tab-item v-for="i in ['БПИ', 'БИСТ', 'МЛ']" :key="i" :value="'tab-' + i" >
          <v-card flat>
            <v-container fill-height fluid grid-list-xl>
              <v-layout layout row justify-center wrap>
                <v-flex
                  xs5
                  md2
                  v-for="group in groups.filter(x => x.name.split('-')[0] == i)"
                  :key="group.id"
                  @click="setGroup(group.id) + getStaticStudents() "
                >
                  <v-hover>
                    <v-card
                      slot-scope="{ hover }"
                      :class="`elevation-${hover ? 12 : 2}`"
                      class="mx-auto"
                      v-if="`${group.id}`"
                    >
                      <!-- <v-img :aspect-ratio="16/9" :src="group.image"></v-img> -->
                      <div style="text-align:center;" class="NumberGroup">
                      <label>{{group.name.split('-')[1]}}</label>
                      </div>
                      
                      <v-card-title>
                        <div>
                          <span class="headline">{{ group.name }}</span>
                          <div class="d-flex">
                            <v-rating color="amber" dense half-increments readonly size="14"></v-rating>
                            <div class="ml-2 grey--text text--darken-2">
                              <!-- <span>{{ group.name }}</span> -->
                              <span>({{ group.studentsAmount }})</span>
                            </div>
                          </div>
                        </div>
                        <v-spacer></v-spacer>
                        <span>Перейти</span>
                        <v-btn
                          dark
                          icon
                          class="mr-0"
                          @click="setGroup(group.id) + getStaticStudents()"
                        >
                          <v-icon large color="blue-grey darken-2">mdi-chevron-right</v-icon>
                        </v-btn>
                      </v-card-title>
                    </v-card>
                  </v-hover>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
    <!-- <div>Groups</div> -->
    <!-- <div>{{ groups }}</div> -->
    <!-- <button v-on:click="getGroups">GET Groups</button>
    <hr>
    <button v-on:click="getStaticGroups">GET static Groups</button>-->

    <!-- <v-container fill-height fluid grid-list-xl>
      <v-layout layout row justify-center wrap>
        <v-flex
          xs5
          md2
          v-for="group in groups"
          :key="group.id"
          @click="setGroup(group.id) + getStaticStudents()"
        >
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
              <v-img :aspect-ratio="16/9" :src="group.image"></v-img>
              <v-card-title>
                <div>
                  <span class="headline">{{ group.name }}</span>
                  <div class="d-flex">
                    <v-rating color="amber" dense half-increments readonly size="14"></v-rating>
                    <div class="ml-2 grey--text text--darken-2">
    <span>{{ group.name }}</span>
    <span>({{ group.studentsAmount }})</span>
                    </div>
                  </div>
                </div>
                <v-spacer></v-spacer>
                <span>Перейти</span>
                <v-btn dark icon class="mr-0" @click="setGroup(group.id) + getStaticStudents() ">
                  <v-icon large color="blue-grey darken-2">mdi-chevron-right</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>-->
  </div>
</template>

<script>
// В полной сборке функция доступна через Vuex.mapState
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Groups",
  created: function() {
    // this.$store.dispatch("getGroups");
  },
  computed: {
    ...mapGetters("groups", ["groups"]),
    ...mapGetters("students", ["students"])
  },
  methods: {
    ...mapActions("groups", ["getGroups", "getStaticGroups"]),
    ...mapActions("students", [
      "setGroup",
      "getStudents",
      "getStaticStudents",
      "ChangeToogleState"
    ]),
    hello: function() {
      alert((group.name))
      // var a = this.groups[0].name;
      // alert(a.charAt(6));
      // var b;
      // for (var i = 0; i < this.groups.length; i++) {
      //   b = this.groups[i].name;
      //   b.charAt(6);
      // }
      // var x = document.getElementsByTagName("p")[0];
      // alert(x);
    }
  },
  mounted() {
    this.getStaticGroups();
  }
};
</script>

<style scoped>
html,
body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 16px;
  margin-bottom: 16px;
}

div#app {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
div#app .search-wrapper {
  position: relative;
}
div#app .search-wrapper label {
  position: absolute;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  top: 8px;
  left: 12px;
  z-index: -1;
  transition: 0.15s all ease-in-out;
}
div#app .search-wrapper input {
  padding: 4px 12px;
  color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.12);
  transition: 0.15s all ease-in-out;
  background: white;
}
div#app .search-wrapper input:focus {
  outline: none;
  transform: scale(1.05);
}
div#app .search-wrapper input:focus + label {
  font-size: 10px;
  transform: translateY(-24px) translateX(-12px);
}
div#app .search-wrapper input::-webkit-input-placeholder {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 100;
}
div#app .wrapper {
  display: flex;
  max-width: 444px;
  flex-wrap: wrap;
  padding-top: 12px;
}
div#app .card {
  box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px,
    rgba(0, 0, 0, 0.117647) 0px 1px 4px;
  max-width: 124px;
  margin: 12px;
  transition: 0.15s all ease-in-out;
}
div#app .card:hover {
  transform: scale(1.1);
}
div#app .card a {
  text-decoration: none;
  padding: 12px;
  color: #03a9f4;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
div#app .card a img {
  height: 100px;
}
div#app .card a small {
  font-size: 10px;
  padding: 4px;
}
div#app .hotpink {
  background: hotpink;
}
div#app .green {
  background: green;
}
div#app .box {
  width: 100px;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
@import url('https://fonts.googleapis.com/css?family=Slabo+27px&display=swap');
.NumberGroup{
  background-color: #e1e1e199;
font-family: 'Slabo 27px', serif;
font-size: 100px;
}
</style>