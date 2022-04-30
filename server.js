var express=require('express');
var mongoClient=require('mongodb').MongoClient
var app=express()
app.use(express.json())
mongoClient.connect("mongodb://localhost:27017",(err,client)=>{
    if(err){
        console.log("error in connection")
    }
    else{
        db=client.db('stddb');
    }
})
app.get('/stds',(req,res)=>{
    db.collection('std').find().toArray((err,items)=>{
        // console.log(items);
        res.json(items)
    })
})
app.post('/addstd',(req,res)=>{
    db.collection('std').insertOne(req.body)
    res.end("inserted");
})
app.put('/updatestd/:id',(req,res)=>{
    var id=parseInt(req.params.id);
    db.collection('std').update({"_id":id},{$set:{"name":req.body.name}})
    console.log(req.body.name)
    res.end("updated");
})
app.delete('/deletestd/:id',(req,res)=>{
    var id=parseInt(req.params.id);
    db.collection('std').remove({"_id":id})
    res.end("Deleted");
})
app.get('/getstd/:id',(req,res)=>{
    var id=parseInt(req.params.id);
    db.collection('std').find({"_id":id}).toArray((err,items)=>{
        // console.log(items);
        res.json(items)
    })
   
})
app.listen(3000,()=>{
    console.log("Server Started....");
})
