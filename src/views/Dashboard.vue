<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex md12 sm12 lg4>
        <material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="info"
          type="Line"
        >
          <h4 class="title font-weight-light">Родишев Денис</h4>
          <p class="category d-inline-flex font-weight-light">
            <v-icon color="green" small>mdi-arrow-up</v-icon>
            <span class="green--text">55%</span>&nbsp;
            <!-- increase in today's sales -->
          </p>

          <template slot="actions">
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex md12 sm12 lg4>
        <material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="red"
          type="Bar"
        >
          <h4 class="title font-weight-light">БПИ-411</h4>
          <p class="category d-inline-flex font-weight-light">Выбрать группу</p>

          <template slot="actions">
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex md12 sm12 lg4>
        <material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          color="green"
          type="Bar"
        >
          <h3 class="title font-weight-light">БИСТ-411</h3>
          <p class="category d-inline-flex font-weight-light"></p>

          <template slot="actions">
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
          </template>
        </material-chart-card>
      </v-flex>
      <template>
        <v-layout>
          <v-flex>
            <v-sheet height="500">
              <v-calendar :now="today" :value="today" color="primary">
                <template v-slot:day="{ date }">
                  <template v-for="event in eventsMap[date]">
                    <v-menu :key="event.title" v-model="event.open" full-width offset-x>
                      <template v-slot:activator="{ on }">
                        <div
                          v-if="!event.time"
                          v-ripple
                          class="my-event"
                          v-on="on"
                          v-html="event.title"
                        ></div>
                      </template>
                      <v-card color="grey lighten-4" min-width="350px" flat>
                        <v-toolbar color="primary" dark>
                          <v-btn icon>
                            <v-icon >mdi-calendar</v-icon>
                          </v-btn>
                          <v-toolbar-title v-html="event.title"></v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-btn icon>
                            <v-icon>mdi-favorite</v-icon>
                          </v-btn>
                          <v-btn icon>
                            <v-icon>mdi-more_vert</v-icon>
                          </v-btn>
                        </v-toolbar>
                        <v-card-title primary-title>
                          <span v-html="event.details"></span>
                        </v-card-title>
                        <v-card-actions>
                          <v-btn flat color="secondary">Cancel</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                  </template>
                </template>
              </v-calendar>
            </v-sheet>
          </v-flex>
        </v-layout>
      </template>
    </v-layout>
  </v-container>
</template>
      <!-- <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="green"
          icon="mdi-store"
          title="Revenue"
          value="$34,245"
          sub-icon="mdi-calendar"
          sub-text="Last 24 Hours"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="orange"
          icon="mdi-content-copy"
          title="Used Space"
          value="49/50"
          small-value="GB"
          sub-icon="mdi-alert"
          sub-icon-color="error"
          sub-text="Get More Space..."
          sub-text-color="text-primary"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="red"
          icon="mdi-information-outline"
          title="Fixed Issues"
          value="75"
          sub-icon="mdi-tag"
          sub-text="Tracked from Github"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="info"
          icon="mdi-twitter"
          title="Followers"
          value="+245"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>-->

      <!-- <v-flex md12 lg6>
        <material-card
          color="orange"
          title="Employee Stats"
          text="New employees on 15th September, 2016"
        >
          <v-data-table :headers="headers" :items="items" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
  <span class="font-weight-light text-warning text--darken-3" v-text="header.text"/>
      </template>-->
      
      <!-- <template slot="items" slot-scope="{ index, item }">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td class="text-xs-right">{{ item.salary }}</td>
        <td class="text-xs-right">{{ item.country }}</td>
        <td class="text-xs-right">{{ item.city }}</td>
      </template>
    </v-layout>
  </v-container>
</template> -->
          <!-- </v-data-table>
        </material-card>
      </v-flex>
      <v-flex md12 lg6>
        <material-card class="card-tabs" color="green">
          <v-flex slot="header">
            <v-tabs v-model="tabs" color="transparent" slider-color="white">
              <span class="subheading font-weight-light mr-3" style="align-self: center">Tasks:</span>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-bug</v-icon>Bugs
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-code-tags</v-icon>Website
              </v-tab>
              <v-tab>
                <v-icon class="mr-2">mdi-cloud</v-icon>Server
              </v-tab>
            </v-tabs>
          </v-flex>

          <v-tabs-items v-model="tabs">
            <v-tab-item v-for="n in 3" :key="n">
              <v-list three-line>
                <v-list-tile @click="complete(0)">
                  <v-list-tile-action>
                    <v-checkbox :value="list[0]" color="green"/>
                  </v-list-tile-action>
                  <v-list-tile-title>Sign contract for "What are conference organized afraid of?"</v-list-tile-title>
                  <div class="d-flex">
                    <v-tooltip top content-class="top">
                      <v-btn slot="activator" class="v-btn--simple" color="success" icon>
                        <v-icon color="primary">mdi-pencil</v-icon>
                      </v-btn>
                      <span>Edit</span>
                    </v-tooltip>
                    <v-tooltip top content-class="top">
                      <v-btn slot="activator" class="v-btn--simple" color="danger" icon>
                        <v-icon color="error">mdi-close</v-icon>
                      </v-btn>
                      <span>Close</span>
                    </v-tooltip>
                  </div>
                </v-list-tile>
                <v-divider/>
                <v-list-tile @click="complete(1)">
                  <v-list-tile-action>
                    <v-checkbox :value="list[1]" color="success"/>
                  </v-list-tile-action>
                  <v-list-tile-title>Lines From Great Russian Literature? Or E-mails From My Boss?</v-list-tile-title>
                  <div class="d-flex">
                    <v-tooltip top content-class="top">
                      <v-btn slot="activator" class="v-btn--simple" color="success" icon>
                        <v-icon color="primary">mdi-pencil</v-icon>
                      </v-btn>
                      <span>Edit</span>
                    </v-tooltip>

                    <v-tooltip top content-class="top">
                      <v-btn slot="activator" class="v-btn--simple" color="danger" icon>
                        <v-icon color="error">mdi-close</v-icon>
                      </v-btn>
                      <span>Close</span>
                    </v-tooltip>
                  </div>
                </v-list-tile>
                <v-divider/>
                <v-list-tile @click="complete(2)">
                  <v-list-tile-action>
                    <v-checkbox :value="list[2]" color="success"/>
                  </v-list-tile-action>
                  <v-list-tile-title>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit</v-list-tile-title>
                  <div class="d-flex">
                    <v-tooltip top content-class="top">
                      <v-btn slot="activator" class="v-btn--simple" color="success" icon>
                        <v-icon color="primary">mdi-pencil</v-icon>
                      </v-btn>
                      <span>Edit</span>
                    </v-tooltip>
                    <v-tooltip top content-class="top">
                      <v-btn slot="activator" class="v-btn--simple" color="danger" icon>
                        <v-icon color="error">mdi-close</v-icon>
                      </v-btn>
                      <span>Close</span>
                    </v-tooltip>
                  </div>
                </v-list-tile>
              </v-list>
            </v-tab-item>
          </v-tabs-items>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template> -->

<script>
export default {
  data() {
    return {
      today: "2019-06-20",
      events: [
        {
          title: "Защита практики",
          details: "Going to the beach!",
          date: "2019-06-01",
          open: false,
        },
         {
          title: "Проверить флюрографию",
          details: "Going to the beach!",
          date: "2019-06-01",
          open: false,
        },
        
        {
          title: "Сверка оценок",
          details: "Going to the beach!",
          date: "2019-06-05",
          open: false
        },
        {
          title: "Сдача диплома",
          details: "Going to the beach!",
          date: "2019-06-11",
          open: false
        },
        {
          title: "Защита ВКР",
          details: "Spending time on how we do not have enough time",
          date: "2019-06-21",
          open: false
        },

        {
          title: "Конференция",
          details:
            "Mute myself the whole time and wonder why I am on this call",
          date: "2019-06-29",
          open: false
        }
      ],
      dailySalesChart: {
        data: {
          labels: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
          series: [[3, 2, 2, 3, 1, 2]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 3 
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
      dataCompletedTasksChart: {
        data: {
          labels: [
            "Янв",
            "Фев",
            "Март",
            "Апр",
            "Май",
            "Июнь",
            "Июль",
            "Авг",
            "Сент",
            "Окт",
            "Ноябрь",
            "Дек"
          ],
          series: [[86, 452, 756, 810, 1200, 988, 54, 18, 1458, 1354, 1287, 1410]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1500, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Янв",
            "Фев",
            "Март",
            "Апр",
            "Май",
            "Июнь",
            "Июль",
            "Авг",
            "Сент",
            "Окт",
            "Ноябрь",
            "Дек"
          ],
         
        series: [[52, 343, 856, 780, 902, 453, 34, 15, 921, 759, 680, 910]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      },
      headers: [
        {
          sortable: false,
          text: "ID",
          value: "id"
        },
        {
          sortable: false,
          text: "Name",
          value: "name"
        },
        {
          sortable: false,
          text: "Salary",
          value: "salary",
          align: "right"
        },
        {
          sortable: false,
          text: "Country",
          value: "country",
          align: "right"
        },
        {
          sortable: false,
          text: "City",
          value: "city",
          align: "right"
        }
      ],
      items: [
        {
          name: "Dakota Rice",
          country: "Niger",
          city: "Oud-Tunrhout",
          salary: "$35,738"
        },
        {
          name: "Minerva Hooper",
          country: "Curaçao",
          city: "Sinaai-Waas",
          salary: "$23,738"
        },
        {
          name: "Sage Rodriguez",
          country: "Netherlands",
          city: "Overland Park",
          salary: "$56,142"
        },
        {
          name: "Philip Chanley",
          country: "Korea, South",
          city: "Gloucester",
          salary: "$38,735"
        },
        {
          name: "Doris Greene",
          country: "Malawi",
          city: "Feldkirchen in Kārnten",
          salary: "$63,542"
        }
      ],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    };
  },
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    }
  }
};
</script>
<style lang="stylus" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>