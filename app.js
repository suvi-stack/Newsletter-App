const express = require("express")
const bodyParser = require('body-parser')
const https = require("https")
const request = require("request")
const { response } = require("express")
const e = require("express")
const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended : true}))

app.get("/",function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){

    const firstName = req.body.fname
    const lastName  = req.body.lname
    const mail  = req.body.email
   
    const data = {
        members: [
            {
                email_address: mail,
                status: "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LANAME : lastName
                }
            }
        ]
    }
    
    const jsonData = JSON.stringify(data)

    const url ="https://us21.api.mailchimp.com/3.0/lists/6c92da480a"

    const options = {
        method: "POST",
        auth: "suv4:7368bb6b08783046a6437dec5d09e9c5-us21"
    }
    
    const request = https.request(url,options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname +"/success.html")
        } 
        else 
        {
            res.sendFile(__dirname + "/failure.html")
        }


        response.on("data", function(data){
            console.log(JSON.parse(data))
        })

        console.log(response.statusCode)
    })

    request.write(jsonData)
    request.end()

})


app.post("/failure", function(req, res){
    res.redirect("/")
})









app.listen(process.env.PORT || 3000, function(req, res){
    console.log("server is running on port 3000")
})

//api key mailchimp
//7368bb6b08783046a6437dec5d09e9c5-us21

//unique id
//6c92da480a