const http=require("http")
const fs=require("fs")
const url=require("url")

const queryString=require("querystring")
const{MongoClient, ObjectId}=require("mongodb")
// const {error}=require("console")
//connect mongodb
const client=new MongoClient("mongodb://127.0.0.1:27017/")
const PORT=3000;

const app=http.createServer(async(req,res)=>{

    //create database
const db=client.db("DONER");
//create collection
const collection=db.collection("bloodbank");


const path=url.parse(req.url)
console.log(path);

if(path.pathname=="/"){
    res.writeHead(200,{"content-type":"text/html"})
    res.end(fs.readFileSync("../clientside/pages/index.html"))
}

else if(path.pathname=='/css/index.css'){
    res.writeHead(200,{"content-type":"text/css"})
    res.end(fs.readFileSync("../clientside/css/index.css"))
}
else if(path.pathname=='/add'){
    res.writeHead(200,{"content-type":"text/html"})
    res.end(fs.readFileSync("../clientside/pages/add.html"))
}
else if(path.pathname=='/css/add.css'){
    res.writeHead(200,{"content-type":"text/css"})
    res.end(fs.readFileSync("../clientside/css/add.css"))
}
// else if(path.pathname=='/js/custome.js'){
//     res.writeHead(200,{"content-type":"text/js"})
//     res.end(fs.readFileSync("../clientside/js/custome.js"))
// }
else if(path.pathname=='/js/index.js'){
    res.writeHead(200,{"content-type":"text/js"})
    res.end(fs.readFileSync("../clientside/js/index.js"))
}
 else if(path.pathname=="/submit"&&req.method=="POST"){
    // console.log("hai");
    let body="";
    req.on("data",(chunks)=>{
        console.log(chunks);
        body+=chunks.toString();
        console.log(body);
    })

    req.on("end",async()=>{
        if(body!==null){
            const formData=queryString.parse(body);
            console.log(formData);
            collection.insertOne(formData).then(()=>{
                console.log("data added");   
            }).catch((error)=>{
                console.log(error); 
            })
            res.writeHead(200,{"content-type":"text/html"})
            res.end(fs.readFileSync("../clientside/pages/index.html")) 
        }
    })
}

//get doner
if(path.pathname=='/getdoner'&&req.method=='GET'){
    const data=await collection.find().toArray();
    const json_data=JSON.stringify(data)
    console.log(json_data);
    res.writeHead(200,{"content-type":"text/json"})
    res.end(json_data)  
}

else if(path.pathname=='/delete'&& req.method=='DELETE'){
    console.log("...............delete..............");
    let body=''
    req.on('data',(chunks)=>{
        body+=chunks.toString()
        console.log(body);
     })

req.on('end',async()=>{
    let_id=new ObjectId(body)
    console.log(_id);
    await collection.deleteOne({_id}).then(()=>{
        res.writeHead(200,{"content-type":"text/plain"})
        res.end("success")
    }).catch(()=>{
        res.writeHead(200,{"content-type":"text/plain"})
        res.end("failed")
    })  
})
}

else if(path.pathname=="/update"&& req.method=="PUT"){
let body=""
req.on('data',(chunks)=>{
    body+=chunks.toString()
})
req.on('end',async()=>{
    let data=JSON.parse(body)
    console.log(data);
    let _id=new ObjectId(data.id)
    console.log(_id);
    let updateData={name:data.name,email:data.email,phone:data.phone,blood:data.blood,gender:data.gender}
    await collection.updateOne({_id},{$set:updateData}).then(()=>{
        console.log("update successfully");
        res.writeHead(200,{"content-type":"text/plain"})
        res.end("success")
        
    }).catch((error)=>{
        console.log(error);
        res.writeHead(200,{"content-type":"text/plain"})
        res.end("failed")
    })
    
})
}

})
app.listen(PORT)
