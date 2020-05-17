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