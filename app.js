const express = require("express")
const collection = require("./mongo")
const cors = require('cors');
const app = express()


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.get("/", cors(), async (req, res) => {
  try {
    const allUser = await collection.find({}).exec();
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});   // to fetch the data from server and show in webpage
app.post("/",async(req,res)=>{
    const { type, total_money, form,fname,email,job } = req.body;

    const data = {
      type: type,
      total_money: total_money,
      form: form,
      fname:fname,
      email :email,
      job:job
    };
  

    try {
        await collection.insertMany([data]);
        res.status(200).send('Data saved successfully');
      } catch (error) {
        console.error(error);
        res.status(500).send('Error saving data');
      }
})



app.post("/login", async (req, res) => {
  const { email} = req.body;
  try {
    const user = await collection.findOne({email});
    if (user) {
      await collection.updateOne(
        { email },
       
      );
      
      res.json({ success: true, user: { email: user.email, fname: user.fname,form:user.form,job:user.job,total_money:user.total_money
      } });
    
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ success: false });
  }
});



app.listen(8000,()=>{
    console.log("port connected")
})
