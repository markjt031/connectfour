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
                let htmlTile=document.createElement("div")
                htmlTile.classList.add("tile")
                let tile=new GridTile(i, j, htmlTile)
                row.push(tile)
                this.board.appendChild(tile.htmlTile);
                console.log(htmlTile)
            }
            this.grid.push(row)
        }
    }
}
class GridTile{
    constructor(rowPosition, columnPosition, htmlTile){
        this.isEmpty=true;
        this.color=""
        this.rowPosition=rowPosition
        this.columnPosition=columnPosition
        this.htmlTile=htmlTile;
    }
}

const game=new Game;
game.populateGrid();
//console.log(game.grid)
console.log(game.board)