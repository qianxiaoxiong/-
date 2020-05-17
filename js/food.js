/**蛇的食物 */
(function () {
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
