<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <div class="student__header">
      <v-flex>
        <material-card style="min-width:500px" class="v-card-profile d-block">
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="130" 
          >
            <img
              :src="`${getStudent(id).url}`"
            >
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">{{getGroup(getStudent(id).group_id).name}}</h6>
            <h4 class="card-title font-weight-light">{{getStudent(id).firstName}} {{getStudent(id).lastName}}</h4>
            <!-- <p class="card-description font-weight-light">Don't be scareut the back is...</p> -->
            <!-- <v-btn
              color="success"
              round
              class="font-weight-light"
            >Follow</v-btn> -->
          </v-card-text>
        </material-card>
      </v-flex>
      </div>

      <div class="student__info"> 
        <div class="student__info--item">
          <v-data-table
            :headers="headers"
            :items="desserts"
          >
            <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.calories }}</td>


            </template>
          </v-data-table>
        </div>
        <div class="student__info--item">
          <!-- <v-card
            class="mx-auto text-xs-center"
            color="green"
            dark
            max-width="600"
          >

            <v-card-text>
              <div class="display-1 font-weight-thin">Статистика посещаемости</div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text>
              <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline
                  :labels="studentChart.labels"
                  :value="studentChart.series"
                  color="rgba(255, 255, 255, .7)"
                  height="100"
                  padding="24"
                  stroke-linecap="round"
                >
                  <template v-slot:label="item">
                    {{ item.value }}
                  </template>
                </v-sparkline>
              </v-sheet>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="justify-center">
              <v-btn block flat>Обновить статистику</v-btn>
            </v-card-actions>
          </v-card> -->

          <material-chart-card
            :data="studentChart.data"
            :options="studentChart.options"
            color="info"
            type="Line"
          >
            <h4 class="title font-weight-light">Статистика посещаемости</h4>
          </material-chart-card>

        </div>
      </div>

    </v-layout>    
  </v-container>
</template>

<script> 
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data () {
    return {
      // studentChart: {
      //   labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      //   series: [12, 17, 7, 17, 23, 18, 38]  
      // },
      studentChart: {
        data: {
          labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
          series: [[3, 2, 2, 3, 1, 2, 0]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 5,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      headers: [
        {
          text: 'Параметр',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        
      ],
      desserts: [
        {
          name: 'Дата рождения',
          calories: '16.04.1997'          
        },
        {
          name: 'Город',
          calories: 'Новосибирск',
          
        },
        {
          name: 'Посещаемость',
          calories: '92%',
          
        },
        
        
        
       
      ]
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    ...mapGetters("students", [
      "getStudent",
      ]),  
        ...mapGetters("groups", [
      "getGroup",
      ]), 
  },
  methods: {
    ...mapActions("students", [
      "getStaticStudents",
    ]),
      ...mapActions("groups", [
      "getStaticGroups",
    ]),
  },
  mounted() {
    this.getStaticStudents();
    this.getStaticGroups();
    this.renderChart(this.chartdata, this.options)
  },
}
</script>
<style lang="scss">
img {
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.student__header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.student__info {

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .student__info--item {
    flex: 1;
    padding: 1rem;
  }
}

</style>