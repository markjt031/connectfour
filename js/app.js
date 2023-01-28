class Game{
    constructor(){
        this.grid=[];
        this.gameWon=false;
        this.rows=6;
        this.columns=7
        this.board=document.getElementById("game-board")
    }
    populateGrid(){
        for (let i=0; i<this.rows; i++){
            let row=[]
            for(let j=0; j<this.columns; j++){
                let htmlTile=document.createElement("div");
                htmlTile.classList.add("tile");
                let tile=new GridTile(i, j, htmlTile);
                row.push(tile);
                this.board.appendChild(tile.htmlTile);
                console.log(htmlTile);
            }
            this.grid.push(row);
        }
    }
    addButtonListeners(playerColor){
        let buttons=document.getElementsByClassName(playerColor);
        for (let i=0; i<this.columns;i++){
            let columnNumber=buttons[i].id.toString();
            //this.changeButtonColor(buttons[i], playerColor);
            buttons[i].addEventListener("click", ()=>this.placePiece(playerColor,columnNumber))
        }
    }
   
    changeButtonColor(button, color){
        if (color==="red"){
            if (button.classList.contains(color)){
                return;
            }
            else{
                button.classList.replace("yellow", color);
            }
        }
        if (color==="yellow"){
            if (button.classList.contains(color)){
                return;
            }
            else{
                button.classList.replace("red", color)
            }
        }
    }
    playGame(){
        this.populateGrid();
        this.addButtonListeners("red");
        this.addButtonListeners("yellow")
        
        //this.placePiece("red", 0);
        //this.placePiece("yellow", 0);
       // this.placePiece("red", 6);
       //this.takeTurns("red");
       //this.takeTurns("yellow");
    }
    placePiece(color, columnNumber){
        console.log("I'm running")
        for (let i=this.rows-1; i>=0; i--){
            if (this.grid[i][columnNumber].isEmpty===true){
                this.grid[i][columnNumber].color=color;
                this.grid[i][columnNumber].isEmpty=false;
                this.grid[i][columnNumber].htmlTile.style.backgroundColor=color;
                break;
            }
        }
        if (color==="red"){
            this.swapButtons(color,"yellow");
        }
        if (color==="yellow"){
            this.swapButtons(color, "red")
        }
    }
    swapButtons(color1, color2){
        let buttonSetOriginal=document.querySelector(".game-buttons-"+color1);
        buttonSetOriginal.classList.add("hidden");
        let buttonSetNew=document.querySelector(".game-buttons-"+color2);
        buttonSetNew.classList.remove("hidden")

    }
    takeTurns(color){
        //this.addButtonListeners(color);

    }
}
class GridTile{
    constructor(rowPosition, columnPosition, htmlTile){
        this.isEmpty=true;
        this.color="";
        this.rowPosition=rowPosition;
        this.columnPosition=columnPosition;
        this.htmlTile=htmlTile;
    }
}

const game=new Game;
//game.populateGrid();
//console.log(game.grid)
game.playGame();
console.log(game.board)