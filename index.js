const express = require("express");


const mongoose = require("mongoose");

const article =require("./models/article");

mongoose.connect("mongodb+srv://taharm:taharami22014@cluster0.lvt3z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected succesfully"); 
})
.catch((error)=>{
    console.log("Error connecting");
})
const app = express();

app.use(express.json());


app.get('/hello',(req,res) => {
    res.send("hello");
});

app.get('/hi',(req,res) => {
    res.send("welcom world");
});

app.put('/test',(req,res) => {
    res.send("you visited test");
});

app.post('/add',(req,res) => {
    res.send("post request on add");
});
app.delete('/delete',(req,res) => {
    res.send("delete request");
});
app.get('/numbers', (req, res) => {
   let numbers = "";
    for (let i = 0; i <=  100; i++) {
        numbers += i + "-";
    } 
    
    //res.sendFile(__dirname + "/views/numbers.html");
    res.render("numbers.ejs",{
        name: "Taha",
        numbers : numbers,
    });
});

app.get('/FindSummation/:number1/:number2',(req,res) => {
    let num1 = req.params.number1;
    let num2 = req.params.number2;
    let total = Number(num1) + Number(num2);
    res.send(`number1: ${num1} / number2 :${num2} / Summation of ${num1} and ${num2} is ${total}`);

});

app.get('/sayHello',(req,res) => {
    //console.log(req.query); 
    //res.send(`Hello ${req.body.name}, age is ${req.query.age}`);
    res.json({
        name: req.body.name,
        age : req.query.age,
    });
});

//=======Article endpoints==========

app.post('/Article',async (req,res) => {
    const newArticle = new article();
    const artTitle = req.body.articleTitle;
    const artBody = req.body.articleBody;

    newArticle.title = artTitle;
    newArticle.body=artBody;
    newArticle.numberOfLikes = 15;
    await newArticle.save();
    res.json(newArticle);
});

app.get('/Article',async (req,res) => {
    const articles = await article.find();
    res.json(articles);
});

app.get('/article/:articleId',async (req,res) => {
    const Id = req.params.articleId;
    try{
        const Article = await article.findById(Id);
        res.json(Article);
        return;
    }catch(error){
            console.log("error while reading id");
            return res.send("error");
    }
});

app.delete('/article/:articleId',async (req,res) => {
    const Id = req.params.articleId;
    try{
        const Article = await article.findByIdAndDelete(Id);
        res.json(Article);
        return;
    }catch(error){
            console.log("error while reading id");
            return res.send("error");
    }
});

app.get('/ShowArticle',async (req,res) => {
    const articles = await article.find();
    res.render("article.ejs" , {
        allArticles : articles,
    });
});
app.listen(9000 , () =>{
    console.log("listening in port 9000");
});