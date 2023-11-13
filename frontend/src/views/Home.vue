<template>
  <div class="home__container">    
    <div class="home__table-box">
      <v-data-table
        :headers="headers"
        :items="dataEvents"
        item-value="name"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.eventName }}</td>
            <td>{{ item.vendorName }}</td>
            <td>
              <v-menu transition="slide-x-transition">
                <template v-slot:activator="{ props }">
                  <v-btn
                    class="btn-dropdown"
                    size="small"
                    variant="flat"
                    v-bind="props"
                    append-icon="mdi-chevron-down"
                    :disabled="item.status !== 'pending'"
                  >
                    {{item.confirmedDate === undefined ? 'please select' : formatDate(item.confirmedDate)}}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item link @click="selectDate(item, item.optionsDate.firstDate)">
                    <v-list-item-title>
                      {{ formatDate(item.optionsDate.firstDate) }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="selectDate(item, item.optionsDate.secondDate)">
                    <v-list-item-title>
                      {{ formatDate(item.optionsDate.secondDate) }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="selectDate(item, item.optionsDate.lastDate)">
                    <v-list-item-title>
                      {{ formatDate(item.optionsDate.lastDate) }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
            <td>{{ item.status }}</td>
            <td>{{ formatDate(item.createdDate) }}</td>
            <td>
              <v-btn
                color="blue-darken-1"
                variant="text"   
                @click="dialog = true; selectedEvent = item;"             
              >
                View
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <div class="dialog__container">
        <div class="dialog__header">
          <h3>Detail event</h3>
          <v-icon
          size="small"
          class="me-2"
          @click="dialog=false; detailStat = 0;"
        >
          mdi-close
        </v-icon>
        </div>
        <v-row
          class="mb-6"
          no-gutters
          v-if="detailStat == 0"
        >
          <v-col
            sm="12"
            md="6"
            class="dialog__col"
          >
            <b>Event Name: </b>
            <p>{{selectedEvent.eventName}}</p>
          </v-col>
          <v-col
            sm="12"
            md="6"
            class="dialog__col"
          >
            <b>Vendor Name :</b>
            <p>{{selectedEvent.vendorName}}</p>
          </v-col>
          <v-col
            sm="12"
            md="6"
            class="dialog__col"
          >
            <b>Company :</b>
            <p>{{selectedEvent.company}}</p>
          </v-col>
          <v-col
            sm="12"
            md="6"
            class="dialog__col"
          >
            <b>Propose Loc :</b>
            <p>{{selectedEvent.proposeLoc}}</p>
          </v-col>
          <v-col
            sm="12"
            md="6"
            class="dialog__col"
          >
            <b>Confirmed Date :</b>
            <p>{{selectedEvent.confirmedDate ===undefined ? '-' : formatDate(selectedEvent.confirmedDate)}}</p>
          </v-col>
          <v-col
            sm="12"
            md="6"
            class="dialog__col"
          >
            <b>Created Date :</b>
            <p>{{formatDate(selectedEvent.createdDate)}}</p>
          </v-col>
          <v-col
            cols="12"            
            md="6"
            class="dialog__col"
          >
            <b>Status :</b>
            <p>{{selectedEvent.status}}</p>
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="dialog__col"
            v-if="selectedEvent.status === 'reject'"
          >
            <b>Reason :</b>
            <p>{{selectedEvent.reason}}</p>
          </v-col>
        </v-row>
        <div class="dialog__col mr-auto ml-auto" v-if="user.role == 'vendor' && detailStat == 0 && selectedEvent.status === 'pending'">
          <v-btn
            class="text-none"
            color="blue-darken-4"
            rounded="0"
            variant="outlined"
            @click="rejectEvent()"          
          >
            Reject
          </v-btn>
          <v-btn
            class="text-none ms-4 text-white"
            color="blue-darken-4"
            rounded="0"
            variant="flat"
            @click="acceptEvent()"
          >
            Accept
          </v-btn>
        </div>
        <div class="dialog__col flex-column mr-auto ml-auto" v-if="detailStat == 1">   
          <p>Confirmed Date :</p>
          <v-menu transition="slide-x-transition" class="mt-1">
            <template v-slot:activator="{ props }">
              <v-btn
                class="btn-dropdown"
                size="small"
                variant="flat"
                v-bind="props"
                append-icon="mdi-chevron-down"
              >
                {{ selectedEvent.confirmedDate === undefined ? 'please select' : formatDate(selectedEvent.confirmedDate)}}
              </v-btn>
            </template>
            <v-list>
              <v-list-item link @click="selectDate(selectedEvent,  selectedEvent.optionsDate.firstDate)">
                <v-list-item-title>
                  {{ formatDate( selectedEvent.optionsDate.firstDate) }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item link @click="selectDate(selectedEvent, selectedEvent.optionsDate.secondDate)">
                <v-list-item-title>
                  {{ formatDate( selectedEvent.optionsDate.secondDate) }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item link @click="selectDate(selectedEvent, selectedEvent.optionsDate.lastDate)">
                <v-list-item-title>
                  {{ formatDate(selectedEvent.optionsDate.lastDate) }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>       
          <v-btn
            class="text-none ms-4 mt-4 text-white"
            color="blue-darken-4"
            rounded="0"
            variant="flat"
            @click="dialog=false; detailStat = 0;fecthDataEvents();"
          >
            Save
          </v-btn>
        </div>
        <div class="dialog__col flex-column mr-auto ml-auto" v-if="detailStat == 2">   
          <v-textarea
            label="Reason"
            auto-grow
            variant="outlined"
            rows="3"
            row-height="25"
            shaped
            v-model="selectedEvent.reason"
          ></v-textarea>
          <v-btn
            class="text-none ms-4 mt-4 text-white"
            color="blue-darken-4"
            rounded="0"
            variant="flat"
            @click="dialog=false; detailStat = 0;updateEvent(selectedEvent._id, selectedEvent)"
          >
            Save
          </v-btn>
        </div>
      </div>      
    </v-dialog>
  </div>  
</template>

<script >
import { mapState } from 'pinia'
import { useAppStore } from '../store/app'
import axios from 'axios'

export default {
  name: 'DashboardHome',  
  computed: {
    ...mapState(useAppStore, ['user']),
  },
  data () {
      return {
        detailStat: 0, // 0: all event, 1: accept, 2: reject 
        dialog: false,
        selectedEvent: {},
        headers: [
          {
            title: 'Event Name',
            align: 'start',
            sortable: false,
            key: 'eventName',
          },
          { title: 'Vendor Name', key: 'vendorName' },
          { title: 'Confirmed Date', key: 'confirmedDate' },
          { title: 'Status', key: 'status' },
          { title: 'Date Created', key: 'createdDate' },
          { title: 'Actions', key: 'actions', sortable: false },
        ],        
      dataEvents: []
      }
    },
    methods:{
      async fecthDataEvents(){
        await axios.get('http://localhost:8000/events')
        .then(res => {
          this.dataEvents = res.data;   
          console.log('ini', res.data)       
        }, err => {
            console.log(err.response);
        })
      },
      async updateEvent(id, data){
        await axios.patch(`http://localhost:8000/events/${id}`, data)
          .then( res => {
            console.log(res.status);
          }, err => {
              console.log(err.response);
          })
      },
      async selectDate(item, date){
        for (var i in this.dataEvents) {
          if (this.dataEvents[i]._id === item._id) {
              this.dataEvents[i].confirmedDate = date;
              //save propose date
              await this.updateEvent(this.dataEvents[i]._id, this.dataEvents[i]);              
              break;
          }
        }
      },
      async acceptEvent(){
        this.selectedEvent.status = 'accept';
        await this.updateEvent(this.selectedEvent._id, this.selectedEvent);   
        this.detailStat = 1;
      },
      async rejectEvent(){
        this.selectedEvent.status = 'reject';
        await this.updateEvent(this.selectedEvent._id, this.selectedEvent);   
        this.detailStat = 2;
      },
      formatDate(date){
        return new Date(date).toLocaleDateString()
      }
    },  
    async mounted() {
      await this.fecthDataEvents();
    },
}

</script>

<style lang="scss" scoped>
.home__container{
  background: #F9F9F9 0% 0% no-repeat padding-box;
  min-height: 100vh;
  width: 100vw;
  padding-top: 140px;
  display: flex;  
}
.home__table-box{
  margin: 0 auto;
}
.btn-dropdown{
  font: normal normal 400 16px/22px Open Sans;
  text-transform: capitalize;
  padding: 0 5px;
  letter-spacing: 0;
}
.dialog__container{
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 500px;
  max-width: 700px;
  background: #F9F9F9;
  padding: 15px 20px;
  border-radius: 10px;
  @media only screen and (max-width: 767px) {    
    min-width: 100%;
  }
  .dialog__header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .dialog__col{
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
