import axios from 'axios'
const https = require('https');

export default {

    getStudents: async function () {
        let students;
        await axios.get(`http://192.168.99.100:3000/students/`, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                // responseType: 'json',
                // httpsAgent: new https.Agent({
                //     rejectUnauthorized: false
                // })
            })
            .then((res) => {
                students = res.data;
                // return res.data;
            })
            .catch((err) => {
                console.log(err.response.data.error)
            })

        return students;
    },
    getStudent: function (id) {
        axios.get(`http://192.168.99.100/students/${id}`)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.log(err.response.data.error)
            })
    },

    getStudentsByGroup: function (groupId) {
        return [{
            id: groupId
        }];
    },
    getStaticStudents: function () {
        var json = '[{"id":1,"firstName":"Денис","lastName":"Родишев","thirdName":"dmitrievich","group_id":1,"url":"https://pp.userapi.com/c623420/v623420318/4b8a8/pgWik4kHUqI.jpg?ava=1","check_student":false,"createdAt":"2019-05-17T21:27:45.000Z","updatedAt":"2019-05-17T21:27:45.000Z"},{"id":2,"firstName":"Артем","lastName":"Хорошев","thirdName":"Vladimirovich","group_id":1,"url":"https://pp.userapi.com/c304606/u52527282/d_2472ce66.jpg?ava=1","check_student":true,"createdAt":"2019-05-20T19:59:16.000Z","updatedAt":"2019-05-20T19:59:16.000Z"},{"id":3,"firstName":"Екатерина","lastName":"Шибарева","thirdName":"Konstantinovna","group_id":1,"url":"https://pp.userapi.com/c604531/v604531756/8697/a5IXum9maTM.jpg?ava=1","check_student":false,"createdAt":"2019-05-20T20:00:05.000Z","updatedAt":"2019-05-20T20:00:05.000Z"},{"id":4,"firstName":"Павел","lastName":"Фефелов","thirdName":"Vladimirovich","group_id":1,"url":"https://pp.userapi.com/c837620/v837620755/5e88e/6H7bA3Kvulg.jpg?ava=1","check_student":true,"createdAt":"2019-05-20T20:00:58.000Z","updatedAt":"2019-05-20T20:00:58.000Z"},{"id":5,"firstName":"Роман","lastName":"Дюков","thirdName":"Vladimirovich","group_id":2,"url":"https://sun4-2.userapi.com/c850216/v850216943/ccb41/AumEZAPCkuE.jpg?ava=1","check_student":false,"createdAt":"2019-05-20T20:01:40.000Z","updatedAt":"2019-05-20T20:01:40.000Z"},{"id":6,"firstName":"Николай","lastName":"Федорченко","thirdName":"Vladimirovich","group_id":2,"url":"https://sun4-2.userapi.com/c850216/v850216943/ccb41/AumEZAPCkuE.jpg?ava=1","check_student":false,"createdAt":"2019-05-20T20:02:26.000Z","updatedAt":"2019-05-20T20:02:26.000Z"},{"id":7,"firstName":"Василий","lastName":"Зайцев","thirdName":"Vladimirovich","group_id":2,"url":"https://sun4-2.userapi.com/c850216/v850216943/ccb41/AumEZAPCkuE.jpg?ava=1","check_student":false,"createdAt":"2019-05-20T20:03:43.000Z","updatedAt":"2019-05-20T20:03:43.000Z"},{"id":8,"firstName":"Ольга","lastName":"Колпакова","thirdName":"Vladimirovna","group_id":2,"url":"https://pp.userapi.com/c846217/v846217712/1db8e5/VvEtiSMPovo.jpg?ava=1","check_student":true,"createdAt":"2019-05-20T20:04:21.000Z","updatedAt":"2019-05-20T20:04:21.000Z"}]'
        return JSON.parse(json);
    },
    getStaticGroups: function () {
        return [{
                id: 1,
                name: "БПИ-410",
                studentsAmount: 14,
                image: "https://pp.userapi.com/c855224/v855224193/5b026/kLj3pUwGP4M.jpg"
            },
            {
                id: 2,
                name: "БИСТ-410",
                studentsAmount: 24,
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/NY-211.svg/750px-NY-211.svg.png"
            },
            {
                id: 3,
                name: "БПИ-310",
                studentsAmount: 34,
                image: "https://www.teliance.com/wp-content/uploads/2016/07/212_number-300x240.png"
            },
            {
                id: 4,
                name: "БПИ-311",
                studentsAmount: 44,
                image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/OR_213.svg"
            },
            {
                id: 5,
                name: "БИСТ-210",
                studentsAmount: 54,
                image: "https://upload.wikimedia.org/wikipedia/commons/5/51/OR_214.svg"
            },

        ];
    },
    getGroups: function () {
        axios.get(`http://192.168.99.100/groups/`)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.log(err.response.data.error)
            })
    },
    getGroup: function (id) {
        axios.get(`http://192.168.99.100/groups/${id}`)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.log(err.response.data.error)
            })
    }
}