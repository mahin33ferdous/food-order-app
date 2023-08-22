const mongoose = require('mongoose');

const mongoURl='mongodb+srv://fooddelivery:fooddelivery91922@cluster0.2qayojn.mongodb.net/fooddeliverymern?retryWrites=true&w=majority';
//console.log("hi")

const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURl);
      console.log('Connected!');
      let fetched_data = mongoose.connection.db.collection("food_items");
      let data=await fetched_data.find({}).toArray() 

      let fetched_category = mongoose.connection.db.collection("foodCategory");
      let dataCategory=await fetched_category.find({}).toArray() 
     // console.log(data);
        global.food_items=data;
        global.foodCategory=dataCategory;
        //console.log(global.food_items)
    } catch (error) {
      console.log('err: ', error);
    }
  };



module.exports=mongoDB();
//export default mongoDB;

