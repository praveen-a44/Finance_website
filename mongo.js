const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/tracker",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log('failed')
})

const newSchema = {
    type: {
      type: String,
      required: true
    },
    total_money: {
      type: Number,
      required: true
    },
    form: {
      type: String,
      required: true
    },
    fname: {
      type:String,
      required:true
    },
    email :{
      type:String,
      required:true
    },
    job:{
      type:String,
      required:true
    }
  };
  
const collection = mongoose.model("tracker",newSchema)
module.exports=collection
