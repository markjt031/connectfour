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
        let buttons=document.getElementsByClassName("place-piece-button");
        for (let i=0; i<this.columns;i++){
            let columnNumber=buttons[i].id.toString();
            buttons[i].addEventListener("click", ()=>this.placePiece(playerColor,columnNumber))
        }
    }
    playGame(){
        this.populateGrid();
        //this.placePiece("red", 0);
        //this.placePiece("yellow", 0);
       // this.placePiece("red", 6);
       this.addButtonListeners("red");
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