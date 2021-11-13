var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload(){

  //dogImg = loadImage("images/dogImg.png")
  
  sadDog=loadImage("Dog.png");

  happyDogImg=loadImage("happydog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  database = firebase.database();
  
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  if(keyWentDown(UP_ARROW)){

    writeStock(foodS);
    dog.addImage(happyDogImg)
  }
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);

  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
  
   
  drawSprites();
  //food.display();

  fill("red");
  textSize(20);
  text("Press UP_ARROW key to feed",100,50);
  text("Food: "+foodS,100,100)
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){

  if(x<=0){

    x = 0
  }{
  
  x = x-1;
  }
  database.ref('/').update({

    Food:x

  })
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDogImg);
  
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
      foodObj.updateFoodStock(food_stock_val *0);
  }else{
      foodObj.updateFoodStock(food_stock_val -1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  
  //Uncomment correct code block to update food quantity and fed timing
  /*database.ref('/').OnUpdate({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })*/
  
  /*database.ref('/').Update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })*/
    
  /*database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })*/
   
  /*database.ref('/').update({
    Food:foodObj.getFoodStock,
    FeedTime:hour()
  })*/
  
}

//function to add food stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}