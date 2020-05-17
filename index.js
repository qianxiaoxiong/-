/**tools */
;(function () {

    var Tools = {
        getRandom: function (Max, Min) {
            return Math.floor((Math.random()* (Max - Min+1)))+Min;
        }
    };
    window.Tools =Tools;

})()

/**蛇的食物 */
;(function () {
    var elements =[];
    function Food(options) {
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.color = options.color || 'green';
        this.position = options.position || 'absolute';


    }

    Food.prototype.render = function (map) {

        //删除食物
        remove();
        //render

        var randomX = Tools.getRandom(0,map.offsetWidth/this.width-1)* this.width;
        var randomY = window.Tools.getRandom(0,map.offsetHeight/this.height-1)*this.height;
        this.x = randomX;
        this.y =randomY;
        var div = document.createElement("div");
        map.appendChild(div);
        elements.push(div);

       
        div.style.position = this.position;
        div.style.left = randomX   + 'px';
        div.style.top =  randomY   + 'px';
        div.style.width = this.width   + 'px';
        div.style.height = this.height   + 'px';
        div.style.backgroundColor = this.color;

    };
    function remove(){
      
        for(var i = elements.length-1; i>=0; i--){
              //删除div
            elements[i].parentNode.removeChild(elements[i]);
            //删除数组div
            elements.splice(i,1);
        }

    } 
    window.Food = Food;
})()

// var map = document.getElementById('map');
// var food = new Food();
// food.render(map);

/**snake.js */
;(function(){
    var elements =[];
    function Snake(options){
        options =options ||{};
        //蛇节
        this.width = options.width ||20;
        this.height = options.height || 20;
        this.position = options.position || 'absolute';
        this.color = options.color || 'green';
        this.direction=options.direction || 'right';
        this.body = [
            {x:3, y:2, color:'red'},
            {x:2, y:2, color:'green'},
            {x:1, y:2, color:'green'}
        ]
        
    }
    Snake.prototype.render = function(map){
        //删除蛇
        remove();
        //渲染
        for(var i= this.body.length-1; i>=0; i--){
             var div =  document.createElement('div');
                    map.appendChild(div);
                    //存进去
                    elements.push(div);

                    div.style.position = this.position;
                    div.style.width = this.width +'px';
                    div.style.height= this.height +'px';
                    div.style.top = this.body[i].y * this.height +'px';
                    div.style.left = this.body[i].x * this.width+'px';
                    div.style.backgroundColor = this.body[i].color;
        };
        
       


    };
    Snake.prototype.move = function(food, map){
        console.log(food)
        //蛇身移动
         for(var i =this.body.length-1;  i>0; i--){
             this.body[i].x = this.body[i-1].x;
             this.body[i].y = this.body[i-1].y;
         }
        
         //头部移动
         var head = this.body[0];
         switch(this.direction){
            case 'left':
                head.x -=1;
                break;
            case 'right':
                head.x +=1;
                break;
            case 'top':
                head.y -=1;
                break;
            case 'bottom':
                head.y +=1;
                break;
         }

         //蛇吃食物
         var headX = head.x * this.width;
         var headY = head.y * this.height;
         if(headX  === food.x && headY === food.y){
                console.log(666);
                food.render(map);
         }


     }

     function remove(){
            for(var i = elements.length-1; i>=0; i--){
                //删除div
                elements[i].parentNode.removeChild(elements[i]);
                //删除数组中的div
                elements.splice(i,1);
            }
     }

    window.Snake = Snake;
})()

// // 测试
//     var map = document.getElementById('map');
//     var snake = new Snake();
//         snake.move();
//       snake.render(map);

/**游戏主场景 */
;(function(){
    var that;
    function Game(map){
        this.map = map;
        this.snake = new Snake();
        this.food =  new Food();
        console.log(this.food)
        that =this;
    }
    Game.prototype.start = function(){
        this.food.render(this.map);

        //运行蛇
        runSnake();
      
        //控制游戏
        bindKey()
       
    };
    function runSnake(){
        var timeId = setInterval(function(){
           
            that.snake.move(that.food, that.map)
            that.snake.render(that.map); 
            
             //控制蛇头的移动范围
        var headX =that.map.offsetWidth;
        var headY =that.map.offsetHeight;
        if(that.snake.body[0].x  *that.snake.width < 0 || that.snake.body[0].x  *that.snake.width > headX-1){
            alert("Game Over");
            clearInterval(timeId);
        }
        if(that.snake.body[0].y * that.snake.height < 0 || that.snake.body[0].y * that.snake.height  > headY-1){
            alert("Game Over");
            clearInterval(timeId);
            
        }
        },150);
       
        
    }
    function bindKey(){
        document.addEventListener('keydown',function(e){
                // console.log(e.keyCode);
                switch(e.keyCode){
                    case 37:
                        that.snake.direction  = 'left';
                        break;
                    case 38:
                        that.snake.direction  = 'top';
                        break;
                    case 39:
                        that.snake.direction  = 'right';
                        break;
                    case 40:
                        that.snake.direction = 'bottom';
                        break;
                }
        },false);        
    }
    window.Game = Game;
})()
  var map = document.getElementById('map');
  var game = new Game(map);
     game.start()
