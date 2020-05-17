/**tools */
(function () {

    var Tools = {
        getRandom: function (Max, Min) {
            return Math.floor((Math.random()* (Max - Min+1)))+Min;
        }
    };
    window.Tools =Tools;

})()