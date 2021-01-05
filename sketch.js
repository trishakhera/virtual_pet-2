//Create variables here
var dog, dogImg, dogImg1, database, foods, foodStock;
var feed, addFood;
var feedTime, lastFeed;
var foodObj;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1");
  
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);
  
  foodObj = new Food();

  dog = createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.15; 

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


  

function draw() {  
  background("green");
 
   feedTime = database.ref("FeedTime");
   feedTime.on("value", function(data){
     lastFeed = data.val();
   })

   fill(255);
   textSize(20);
   if(lastFeed >= 12){
     text("Last Fed : " + lastFeed % 12 + "PM", 350, 30);
   }else if(lastFeed == 0){
     text("Last Fed : 12 AM ", 350, 30);
   }else{
     text("Last Fed : " + lastFeed + "AM", 350, 30);
   }

   foodObj.display();

    drawSprites();
  //add styles here
  }
  
  function readStock(data){
    foods = data.val();
    foodObj.updateFoodStock(foodS);
  }

  function feedDog(){
    dog.addImage(dogImg1);
    foodObj.updateFoodStock(foodObj.getFoodStock()- 1)
    database.ref('/').update({
      Food: foodObj.getFoodStock(),
      FeedTime: hour()
    })
  }

  function addFoods(){
    foodS ++;
    database/ref('/').update({
      Food: foodS
    })
  }




  





