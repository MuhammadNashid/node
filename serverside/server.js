const http=require("http")
const fs=require("fs")
const url=require("url")
const queryString=require("queryString")
const {MongoClient}=require("mongodb");
const { error } = require("console");
const client= new MongoClient("mongodb://127.0.0.1:27017/");
const PORT=3000;

const app=http.createServer((req,res)=>{
    //create database
    const db=client.db("DONOR2PM");
    //CREATE COLLECTION
    const collection=db.collection("bloodbank");

const path=url.parse(req.url);
console.log(path);

if(path.pathname=="/"){
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end(fs.readFileSync("../clientside/index.html"))
}
else if(path.pathname=="./clientside/css/style.css"){
    res.writeHead(200,{"Content-Type":"text/css"});
    res.end(fs.readFileSync("../clientside/css/style.css"))
}

else if(path.pathname=='/js/custom.js'){
    res.writeHead(200,{"Content-Type":"text/css"});
    res.end(fs.readFileSync('../clientside/js/custom.js'));
}
else if(path.pathname=='/pages/add'){
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end(fs.readFileSync('../clientside/pages/add.html'));
}

else if(path.pathname=='/css/style.css'){
    res.writeHead(200,{"Content-Type":"text/css"});
    res.end(fs.readFileSync('../clientside/css/style.css'));
}
// if(path.pathname=='/sumbit'&&req.method=='POST'){
//     console.log("hai");
//     let body="";
//     req.on("data",(chunks)=>{
//         console.log(chunks);

//         body+=chunks.toString();
//         console.log(body);
            
//     });res.writeHead(200,{"Content-Type":"text/html"});
//     res.end(fs.readFileSync("../clientside/index.html"))
// req.on("end",async()=>{
//     if(body!==null){
//         const formData=queryString.parse(body);
//         console.log(formData);
//         collection.insertOne(formData).then(()=>{
//             console.log("data added");
            
//         }).catch((error)=>{
//             console.log(error);
            
//         })

//         res.writeHead(200,{"Content-Type":"text/html"})
//         res.end(fs.readFileSync("../clientside/index.html"))
//     }
// })
    
// }

// // get donors

//         if(path.pathname=="/getdonors"&&req.method=="GET"){
//             const data=await collection.find().toArray();
//             const json_data=JSON.stringify(data)
//             console.log(json_data);


            

//         }

})
app.listen(PORT);
