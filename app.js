(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyCrl = this;

    toBuyCrl.items = ShoppingListCheckOffService.getToBuyItems();

    toBuyCrl.buy = function(index) {
      ShoppingListCheckOffService.buyItem(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function AlreadyBoughtController( ShoppingListCheckOffService) {
    var boughtCrl = this;

    boughtCrl.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
    boughtCrl.cancel = function(item) {
      ShoppingListCheckOffService.cancelItem(item);
    }
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [{name:"Apple",quantity:10},
                      {name:"Grape",quantity:10},
                    {name:"Milk",quantity:10},
                  {name:"Pineapple",quantity:10},
                {name:"Juice",quantity:10},
              {name:"Water",quantity:10}];
    var alreadyBoughtItems = [];

    var allToBuyItems = ["Apple:10", "Grape:10", "Milk:10", "Pineapple:10", "Juice:10", "Water:1"];
    allToBuyItems.forEach(init);

    // var allToBuyItems = ["Apple:10", "Grape:10", "Milk:10", "Pineapple:10", "Juice:10", "Water:1"];
    // allToBuyItems.forEach(init);
    //
    // function init(value, index, array) {
    //   var temp = value.split(":");
    //   toBuyItems.push({
    //     name: temp[0],
    //     quantity: temp[1]
    //   });
    // }
    // console.log("toBuyItems has ", toBuyItems.toString());

    service.buyItem = function(itemIndex) {
      alreadyBoughtItems.push(toBuyItems[itemIndex]);
      toBuyItems.splice(itemIndex, 1);
    }

    service.cancelItem = function(item) {
      if (alreadyBoughtItems.length > 0) {
        var index = alreadyBoughtItems.indexOf(item);
        console.log("alreadyBoughtItems index is ",index);
        toBuyItems.push(item);
        alreadyBoughtItems.splice(index, 1);
      }
    }

    service.getToBuyItems = function() {
      console.log("toBuyItems=", toBuyItems);
      return toBuyItems;
    }

    service.getAlreadyBoughtItems = function() {
      console.log("alreadyBoughtItems=", alreadyBoughtItems);
      return alreadyBoughtItems;
    };
  }

})();
