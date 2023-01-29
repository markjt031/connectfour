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
        //Immediately after placing piece, check for win.
        this.checkWin(color);
        this.winMessage();
        this.endGame();
        if (this.gameWon===false){
            //Swap colors after piece is placed
            if (color==="red"){
                this.swapButtons(color,"yellow");
            }
            if (color==="yellow"){
                this.swapButtons(color, "red")
            }
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
    checkWin(color){
        console.log("Let's check our win")
        console.log(color)
        for (let i=this.rows-1; i>=0; i--){
            //console.log("I'm in the loop")
            for (let j=this.columns-1; j>=0; j--){
                //console.log("I'm in the second loop")
                //console.log(this.grid[i][j].color);
                if (this.grid[i][j].color===color){
                    if (j-3>=0){
                        //Horizontal
                        if (this.grid[i][j-1].color===color && this.grid[i][j-2].color===color && this.grid[i][j-3].color===color){
                            console.log("horizontal win")
                            this.gameWon=true;
                        }
                        //Diagonal(top left-bottom right)
                        if(i-3>=0){
                            if (this.grid[i-1][j-1].color===color && this.grid[i-2][j-2].color===color && this.grid[i-3][j-3].color===color){
                                this.gameWon=true;
                                console.log("diagonalWin")
                            }
                        }
                    }

                    if (i-3>=0){
                        //Vertical
                        if (this.grid[i-1][j].color===color && this.grid[i-2][j].color===color && this.grid[i-3][j].color===color){
                            this.gameWon=true;
                            console.log("vertical win")
                        }
                        //Opposite Diagonal
                        if (j+3<=6){
                            if (this.grid[i-1][j+1].color===color&& this.grid[i-2][j+2].color===color &&this.grid[i-3][j+3].color===color){
                                this.gameWon=true;
                                console.log("opposite diagonal win")
                            }
                        }
                    }
                }
            }

        }
        
    }
    winMessage(){
        console.log("Call me! I'll arrive, you can call me any any time.")
        console.log(this.gameWon)
        if (this.gameWon===true){
            console.log("Winner winner chicken dinner");
        }
    }
    endGame(){
        if (this.gameWon===true){
            document.querySelector(".game-buttons").classList.add("hidden");
        }
    }
    resetBoard(){
        this.grid=[]
        this.gameWon=false
        this.populateGrid();
    }
//     checkAdjacent(gridTile){
//         let row=gridTile.rowPosition;
//         let column=gridTile.columnPosition;
//         let color=gridTile.color;
//         let count=0;
//         if (this.color===""){
//             return count;
//         }
//         //If piece is bottom right corner, check left, top, and left-top diagonal
//         if (row===this.rows-1 && column==this.columns-1){
//             //check top
//             if (this.grid[row-1][column].color===color){
//                 count++;
//                 this.checkAdjacent(this.grid[row-1][column])
//             }
//             //check left
//             if (this.grid[row][column-1].color===color){
//                 count++;
//                 this.checkAdjacent(this.grid[row][column-1])
//             }
//             //check top left
//             if (this.grid[row-1][column-1].color===color){
//                 count++;
//                 this.checkAdjacent(this.grid[row-1][column-1])
//             }
//             //check top right
//             if (column+1<=this.columns-1 && this.grid[row][column+1]===)
//         }
//         //If piece is on the right edge of grid, but not in a corner
//         if (column===this.columns-1 && row!==0){
//             if (this.grid[row-1][column].color===color){
//                 count++;
//                 this.checkAdjacent(this.grid[row-1][column])
//             }
//             //check left
//             if (this.grid[row][column-1].color===color){
//                 count++;
//                 this.checkNeighbots(this.grid[row][column-1])
//             }
//             //check top left
//             if (this.grid[row-1][column-1].color===color){
//                 count++;
//                 this.checkNeighbors(this.grid[row-1][column-1])
//             }
//         }
//     }
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