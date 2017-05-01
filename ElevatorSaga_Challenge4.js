/*************
 * Elevator Saga
 * Challenge #4
 * 
 * 
 * Created by: g3muse
**************/

{
    init: function(elevators, floors) {
        
        //elevators
        elevators.forEach(function(elevator, index){
            
            //elevator is idle
            elevator.on("idle", function() {
                  elevator.goToFloor(0);
            });
            
            //elevator floor button pressed
            elevator.on("floor_button_pressed", function(floorNum) {
                elevator.goToFloor(floorNum);
            });
            
            //when an elevator passes a floor
            elevator.on("passing_floor", function(floorNum, direction) {
                
                //if elevator is going up and there is room for a passenger that wants to go up
                if (floors[floorNum].goingUp && direction == "up" && elevator.loadFactor() < 0.85) {
                    elevator.goToFloor(floorNum, true);
                    floors[floorNum].goingUp = false;
                }
                
                //if elevator is going down and there is room for a passenger that wants to go down
                if (floors[floorNum].goingDown && direction == "down" && elevator.loadFactor() < 0.85) {
                    elevator.goToFloor(floorNum, true);
                    floors[floorNum].goingDown = false;
                }
            });
        });
        
        //floors
        floors.forEach(function(floor, index) {
            
            floor.goingUp = false;
            floor.goingDown = false;
            
            //up button is pressed on a floor
            floor.on("up_button_pressed", function() {
                floor.goingUp = true;
            });
            
            //down button is pressed on a floor
            floor.on("down_button_pressed", function() {
                floor.goingDown = true;
            });
        });
    },
        update: function(dt, elevators, floors) {
           // We normally don't need to do anything here
        }
}