<template>

    <div class="vertical__container">
        <div class="top__sidebar">
            <v-layout row wrap>
              <v-flex xs12 sm12 class="py-2 split__btn__container">
                <div>Выбор режима</div>
                <v-btn-toggle dark class="split__btn" v-model="mode">
                  <v-btn flat value="set">
                    Загрузить изображение
                  </v-btn>
                  <v-btn flat value="find">
                    Распознать по изображению
                  </v-btn>
                </v-btn-toggle>
              </v-flex>
            </v-layout>

            <!-- <div v-if="mode === 'set'">
                Режим загрузки изображения
            </div>

            <div v-if="mode === 'find'">
                Режим распознавания изображения
            </div> --> 

            <div class="msg">
                
                <div v-if="waiting == false">{{ msg }}</div>

                <v-progress-circular
                  v-if="waiting == true"
                  indeterminate
                  color="primary"
                ></v-progress-circular>

            </div>

        </div>

        <div class="wrapper">       
            <v-flex xs6 md6 class="text-xs-center text-sm-center text-md-center text-lg-center">
                        <img :src="imageUrl" height="150" v-if="imageUrl"/>
                        <v-text-field label="Выберите изображение" @click='pickFile' v-model='imageName' prepend-icon='mdi-file'></v-text-field>
                        <input
                            name="myImage"
                            type="file"
                            style="display: none"
                            ref="image"
                            accept="image/*"
                            @change="onFilePicked"
                        >                    
            </v-flex>
            <v-flex v-if="mode === 'set'" xs3 md3>
                <div>
                    <v-autocomplete
                      v-model="select"
                      :loading="loading"
                      :items="items"
                      :search-input.sync="search"
                      cache-items
                      class="mx-1"
                      flat
                      hide-no-data
                      hide-details
                      label="Выберите кто это..."
                      solo-inverted
                    ></v-autocomplete>
                </div>
            </v-flex>
            <v-flex xs3 md3>
                <div>
                    <button v-if="mode === 'set'" @click="onUpload">Записать</button>
                    <button v-if="mode === 'find'" @click="onIdentification">Распознать</button>
                </div>
            </v-flex>

            <!-- </form> -->
	    	<v-dialog v-model="dialog" max-width="290">
	    		<v-card>
	    			<v-card-title class="headline">Hello World!</v-card-title>
	    			<v-card-text>Image Upload Script in VUE JS
	    				<hr>Yubaraj Shrestha
	    				<br>http://yubarajshrestha.com.np/</v-card-text>
	    			<v-card-actions>
	    				<v-spacer></v-spacer>
	    				<v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
	    			</v-card-actions>
	    		</v-card>
	    	</v-dialog>	
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    data: () => ({
        title: "Image Upload",
        dialog: false,
		imageName: '',
		imageUrl: '',
        imageFile: '',

        loading: false,
        items: [],
        search: null,
        select: null,
        // students: []

        mode: "find",
        msg: "",
        waiting: false
    }),
    watch: {
        search (val) {
             val && val !== this.select && this.querySelections(val)
        }
    },
    computed: {
        ...mapGetters("students", ["students"])
    },
    methods: {
        pickFile () {
            this.$refs.image.click ()
        },		
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
        },
        onUpload() {
            let file = new FormData();
            let id = this.select.match(/\d+/)[0];
            console.log(this.select);
            // console.log(this.select.match(/\d+/));
            file.append('myImage', this.imageFile, this.imageName);
            // file.append('studentId', this.select.match(/\d+/)[0]);
            // let data = {
            //     imagePath: this.imagePath,
            //     productSpect: this.productSpect
            // }
            // file.append('myImage', this.imageUrl);
            let res = axios.post("http://192.168.99.100:3000/recognize/" + id, file)
            .then((res) => {
                console.log(res.data);
                return res.data;
            })
            .catch((err) => {
                console.log(err.response.data.error)
            })

            // console.log("1: " + res.resolve((data) => { return data; }));
        },
        onIdentification () {

            this.waiting = true;

            let file = new FormData();
            file.append('myImage', this.imageFile, this.imageName);
            
            let res = axios.post("http://192.168.99.100:3000/recognize/identification/", file)
            .then(res => {
                console.log(res.data);

                let msg = "";

                if (res.data.res == false) {
                    msg = "В базе данных нет совпадений"
                } else {
                    let stud = res.data.payload.Student;
                    msg = `Это ${stud.firstName} ${stud.lastName}`;
                }

                this.msg = msg;

                // return res.data;
                // return res;
            })
            .catch((err) => {
                console.log(err.response.data.error)
            })
            .finally(() => (this.waiting = false));

            console.log(res);

            // res.resolve((msg) => setMsg(msg));
        },
        setMsg (msg) {
            this.msg = msg;
        },
        querySelections (v) {
            this.loading = true
            // console.log("querySelections:");
            // console.log(this.getStaticStudents());
            
            this.items = this.students.filter(e => { 
                return (e.lastName || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
            });            

            // console.log(JSON.stringify(this.items));
            this.items = this.items.map(x => `${x.id}: ${x.lastName} ${x.firstName}`)
            // console.log(JSON.stringify(this.items));

            this.loading = false
        },
        ...mapActions("students", [
          "getStudents",
        //   "getStaticStudents",
        ]),
    },
    mounted() {
        // this.getStaticStudents();
        this.getStudents();
    }
}
</script>

<style lang='scss'>

.msg {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 50px;
}

.vertical__container {

    display: flex;
    flex-direction: column;
}

.top__sidebar {

    align-items: center;
    justify-content: center;
}

.split__btn {

    max-width: fit-content;
    margin: auto;
    margin-top: 20px;
}

.split__btn > button {

    min-width: 150px;
    min-height: 30px;
}

.split__btn__container {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.wrapper {
    height: 100vh;
    // width: 100vw;
    padding: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>