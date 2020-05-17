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
        this.food.render( this.map);

        //运行蛇df
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