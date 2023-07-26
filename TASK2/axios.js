
const express=require("express");
const axios=require("axios");
const bodyparser = require('body-parser')
const app=express();
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.json())

app.get("/numbers",async(req,res)=>{
    console.log(req.query);
    const q=req.query.url;
    var result=[];
  const ax = q.map(async (i) => {
    try {
      await axios.get(i).then((response)=>{
          result=result.concat(response.data.numbers);
      }).catch((err)=>{
        console.log("Not Found")
      });
    } catch (err) {
      console.log("Not Found");
    }
  });

  await Promise.all(ax);
  const sortedResponse = new Set([...result].sort((a, b) => a - b));
res.json({"numbers":[...sortedResponse]});
})


app.listen(3000);
