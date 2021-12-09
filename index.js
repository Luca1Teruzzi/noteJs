const { resposnse }=require("express");
var express=require("express");
var apiServer=express();
console.log("funziona");
var fs=require("fs");
var a=5;
var b="3";
console.log(a+b);
var port=3000;
var host="localhost";
apiServer.listen(port, host,()=>{
    console.log("server running at http://%s:%d",
     host, port);
});
apiServer.get("/",(request,response)=>{
    console.log("sono in get /", request);
    response.send("<h1>Ciao client sei in home</h1>");
});
var nome="Teruzzi";
apiServer.get("/nome",(request,response)=>{
    console.log("sono in get /nome", request);
    response.send("Ciao, il mio nome è: "+nome);
});

apiServer.get("/mioNome",(request,response)=>{
    console.log("richiesta get su mio nome", request);
    response.send("Ciao, il mio nome è: "+request.query.nome);
});

apiServer.get("/somma",(request,response)=>{
    console.log("richiesta get su somma", request);
    response.send("La somma è: "+(parseInt(request.query.a)+parseInt(request.query.b)));
});

// https://localhost:3000/student?id=1
// https://localhost:3000/student?id=2
apiServer.get("/student",(request,response)=>{
    console.log("student id:", request.query.id);
    // leggo il file, utilizzo fs.readfile(nomeFile, (err,data)=>funzione)
    fs.readFile("student.json", (err, data) =>{
        if(err){
            console.log("error: "+err);
        }else{
            var students= JSON.parse(data);
            //prelevo l'oggetto con l' id
            //mio metodo
            //response.send("student: "+students[parseInt(request.query.id-1)].name+" "+students[parseInt(request.query.id-1)].surname);
            //metodo prof
            response.send(
                students.find(x => x.id===request.query.id)
            );
        }
        
    });
    
    //stampo
});

apiServer.get("/newStudent",(request,response)=>{
    const fs = require('fs');
 
    // json data
    var jsonData = '{"persons":[{"surname":"Agostinelli","name":"Luca", "id":"1"},{"surname":"Alampi","name":"Adrian", "id":"2"},{"surname":"Bezzini","name":"Federico", "id":"3"}]}';
    
    // parse json
    var jsonObj = JSON.parse(jsonData);
    console.log(jsonObj);
    
    // stringify JSON Object
    var jsonContent = JSON.stringify(jsonObj);
    console.log(jsonContent);
    
    fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    
        console.log("JSON file has been saved.");
    });
});