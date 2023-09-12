//importing express
const express = require("express");
const cors = require('cors')

//creating our server by calling express
const app = express();

// Above 1024 as everything below that is reserved
const port = 3000;

//importing datanased
const fruits = require('./fruits.json')


//middleware is code  functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next
//AUTHENTIFICATION MIDDLEWARE

//app.use(starting part, middleware.code)
//next is the way to move on to the next middleware code in the stack

//cors() middle war
app.use(cors())
//express.json
app.use(express.json())

// Create a route - GET route
// [server].[method]('<path>',callback)
//req (request)/ res(response)
app.get('/',(req, res) => {
    res.send('Hello, Fruity!')
})
//route to get all the fruits
app.get('/fruits', (req, res) => {
    res.send(fruits)
})

//route to get aas specific fruit and its info
app.get('/fruits/:name', (req, res) => {
    //use that name to then send the fruit back to the clinet
    //toLowerCase()
    const name = req.params.name.toLowerCase()

    //find()
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name)

    if (fruit == undefined) {
        //send error
        res.status(404).send("Fruit not found")
    } else {
        res.send(fruit)
    }

})


//add a new piece of fruit to the data
const ids = fruits.map(fruit => fruit.id);
console.log(ids);
//spread operator
maxId = Math.max(...ids);

//add a new piece of fruit to the data
//an api testing tool is required to simulate requests
app.post('/fruits', (req, res) => {
    // const fruit = req.body
    
    const fruitBody = req.body
    //find
    const fruitName = fruits.find((fruit) => fruit.name.toLowerCase() == fruitBody.name.toLowerCase())


    //express.json() - used for post and patch route when trying to access req.body

    console.log(fruitName)

    if(fruitName != undefined) {
        res.status(409).send('Already Exists')
    } else {
        //add fruit
        maxId += 1
        req.body.id = maxId
        fruits.push(fruitBody)
        res.status(201).send('New fruit created')
    }

})

// Bind the server to a port
// app.listen(<port>, () = >())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});