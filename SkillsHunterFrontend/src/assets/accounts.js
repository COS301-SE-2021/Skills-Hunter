const http = require('http')

var accounts = [{
	                name: "Joseph",
                    surname: "Makgopa",
                    phone: "0825958654",
                    email: "Joseph@gmail.com",
                    password: "Joseph",
                    role: 3,
                    startDate: "2022-02-17",
                    openForWork: true
                },{
	                name: "James",
                    surname: "May",
                    phone: "0825958639",
                    email: "James@gmail.com",
                    password: "James",
                    role: 0,
                    startDate: "2022-02-17",
                    openForWork: true
                },
                {
	                name: "Herma",
                    surname: "Beck",
                    phone: "0834159112",
                    email: "Herma@gmail.com",
                    password: "Herma",
                    role: 0,
                    startDate: "2021-12-28",
                    openForWork: false
                },
                {
	                name: "Messy",
                    surname: "Adams",
                    phone: "0835292088",
                    email: "Messy@gmail.com",
                    password: "Messy",
                    role: 1,
                    startDate: "2021-12-10",
                    openForWork: false
                },
                {
	                name: "John",
                    surname: "Richards",
                    phone: "0844702024",
                    email: "John@gmail.com",
                    password: "John",
                    role: 0,
                    startDate: "2021-03-24",
                    openForWork: true
                },
                {
	                name: "Peter",
                    surname: "Meggik",
                    phone: "0827425528",
                    email: "Peter@gmail.com",
                    password: "Peter",
                    role: 0,
                    startDate: "2021-04-08",
                    openForWork: true
                },
                {
	                name: "Edward",
                    surname: "Snow",
                    phone: "0836999663",
                    email: "Edward@gmail.com",
                    password: "Edward",
                    role: 0,
                    startDate: "2021-09-25",
                    openForWork: false
                },
                {
	                name: "Jane",
                    surname: "Doe",
                    phone: "0859773250",
                    email: "Jane@gmail.com",
                    password: "Jane",
                    role: 0,
                    startDate: "2021-03-20",
                    openForWork: false
                },
                {
	                name: "Hunter",
                    surname: "Tom",
                    phone: "0839701586",
                    email: "Hunter@gmail.com",
                    password: "Hunter",
                    role: 1,
                    startDate: "2021-11-30",
                    openForWork: false
                },
                {
	                name: "David",
                    surname: "Greymax",
                    phone: "0825897038",
                    email: "David@gmail.com",
                    password: "David",
                    role: 1,
                    startDate: "2021-11-09",
                    openForWork: false
                },
                {
	                name: "Stella",
                    surname: "Johnson",
                    phone: "0858528787 ",
                    email: "Stella@gmail.com",
                    password: "Stella",
                    role: 1,
                    startDate: "2021-05-11",
                    openForWork: false
                },
                {
	                name: "Marina",
                    surname: "Michel",
                    phone: "0855794009",
                    email: "Marina@gmail.com",
                    password: "Marina",
                    role: 1,
                    startDate: "2021-12-10",
                    openForWork: false
                },
                {
	                name: "Jack",
                    surname: "Menqu",
                    phone: "0833079912",
                    email: "Jack@gmail.com",
                    password: "Jack",
                    role: 1,
                    startDate: "2021-07-18",
                    openForWork: false
                },
                {
	                name: "Anna",
                    surname: "Mount",
                    phone: "0844577503 ",
                    email: "Anna@gmail.com",
                    password: "Anna",
                    role: 1,
                    startDate: "2021-05-18",
                    openForWork: false
                },
                {
	                name: "Henry",
                    surname: "Sharp",
                    phone: "0854977880",
                    email: "Henry@gmail.com",
                    password: "Henry",
                    role: 1,
                    startDate: "2022-01-23",
                    openForWork: false
                },
                {
	                name: "Anthony",
                    surname: "Leads",
                    phone: "0848946143 ",
                    email: "Anthony@gmail.com",
                    password: "Anthony",
                    role: 0,
                    startDate: "2021-05-30",
                    openForWork: true
                },
                {
	                name: "Quinton",
                    surname: "Shamrock",
                    phone: "0822947427 ",
                    email: "Quinton@gmail.com",
                    password: "Quinton",
                    role: 0,
                    startDate: "2021-10-03",
                    openForWork: true
                },
                {
	                name: "Lydia",
                    surname: "Johnson",
                    phone: "0859147071 ",
                    email: "Lydia@gmail.com",
                    password: "Lydia",
                    role: 3,
                    startDate: "2022-01-04",
                    openForWork: false
                },
                {
	                name: "Princeton",
                    surname: "Software",
                    phone: "0838729669",
                    email: "Princeton@gmail.com",
                    password: "Princeton",
                    role: 2,
                    startDate: "2021-06-26",
                    openForWork: false
                }
];

for(let count = 0; count < accounts.length; count++){
    create(accounts[count]);
}

function create(user){
    const data = JSON.stringify(user)

    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/User/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }

    const req = http.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', d => {
        process.stdout.write(d)
      })
    })

    req.on('error', error => {
      console.error(error)
    })

    req.write(data)
    req.end()    
}



function authenticate(user){
    const data = JSON.stringify({
        email: user.email,
        password: user.password    
    })

    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/User/authenticate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }

    const req = http.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', d => {
        process.stdout.write(d)
      })
    })

    req.on('error', error => {
      console.error(error)
    })

    req.write(data)
    req.end()  
}

