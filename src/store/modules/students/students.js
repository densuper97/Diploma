import api from '../../../utils/api'

export default {
    state: {
        groupId: -1,
        students: [],
       
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false
      
    },
    getters: {
        students: state => {
            return state.students
        },
        getStudent: state => id => {
            return state.students.find(x => x.id == id)
        },
        getSelectedGroup: state => {
            return state.groupId
        },
        studentsFiltered: state => {

            if (state.groupId == -1) {
                return state.students;
            }

            return state.students.filter(student => {
                return student.group_id == state.groupId;
            })
        },
        date: state =>{
            return state.date
        },
        menu: state =>{
            return state.menu
        },
        menu2: state =>{
            return state.menu2
        },
        modal: state =>{
            return state.modal
        }
    },
    actions: {
        ChangeToogleState: function ({
            commit
        }) {
            commit('ChangeToogleState')
        },
        getStudents: function ({
            commit
        }) {
            commit('setStudents')
        },
        setGroup: function ({
            commit
        }, groupId) {
            commit('getStudentsByGroup', {
                groupId
            })
        },
        getStaticStudents: function ({
            commit
        }) {
            commit('getStaticStudents')
        },
        date: function({
            commit
        },date) {
            commit('date')
        
        },
        menu: function({
            commit
        },menu) {
            commit('menu')
        
        },
        menu2: function({
            commit
        },menu2) {
            commit('menu2')
        
        },
        modal: function({
            commit
        },modal) {
            commit('modal')
        
        },

    },
    mutations: {
        ChangeToogleState: (state) => {
            state.students[0].check_student = true
        },
        setStudents: async (state) => {
            let students = await api.getStudents();
            console.log(students);
            state.students = students;
        },
        getStudentsByGroup: (state, {
            groupId
        }) => {
            state.groupId = groupId
            // state.students = state.students.filter(student => {
            //     return student.group_id == groupId;
            // })
            // state.students = api.getStudentsByGroup(groupId)
        },
        getStaticStudents: (state) => {
            state.students = api.getStaticStudents()
        },
        date: (state,{date})=>{
            state.date=date
        },
        menu: (state,{menu})=>{
            state.menu=menu
        },
        menu2: (state,{menu2})=>{
            state.menu2=menu2
        },
        modal: (state,{modal})=>{
            state.modal=modal
        }
    }
}