class Game{
    constructor(){
        this.grid=[];
        this.gameWon=false;
        this.rows=6;
        this.columns=7
        this.board=document.getElementById("game-board")
        this.playerColorChoice=""
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
    addButtonListeners(){
        document.querySelector(".start-game").addEventListener("click", ()=>this.startButtonHandler())
        document.querySelector(".rules").addEventListener("click", ()=>this.rulesButtonHandler())
        let redButtons=document.getElementsByClassName("red");
        let yellowButtons=document.getElementsByClassName("yellow")
        for (let i=0; i<this.columns;i++){
            let columnNumber=redButtons[i].id.toString();
            redButtons[i].addEventListener("click", ()=>this.placePiece("red",columnNumber))
            yellowButtons[i].addEventListener("click", ()=>this.placePiece("yellow", columnNumber))
        }
        document.querySelector(".choose-red").addEventListener("click", (e)=>this.chooseColor(e))
        document.querySelector(".choose-yellow").addEventListener("click", (e)=>this.chooseColor(e))

    }
    rulesButtonHandler(){
        let rulesSection=document.querySelector(".rules-section")
        if (rulesSection.classList.contains("hidden")){
            rulesSection.classList.remove("hidden");
        }
        else {
            rulesSection.classList.add("hidden");
        }
    }
    playGame(){
        this.addButtonListeners()
    }
    startButtonHandler(){
        //Reveals color selection menu
        document.querySelector("#select-color").classList.remove("hidden")
        document.querySelector("#start-game").classList.add("hidden");
        
    }
    chooseColor(e){
        let redButton=document.querySelector(".game-buttons-red")
        let yellowButton=document.querySelector(".game-buttons-yellow")
        if (e.target.classList.contains("choose-red")){
            redButton.classList.remove("hidden")
            this.playerColorChoice="red"
        }
        if (e.target.classList.contains("choose-yellow")){
            yellowButton.classList.remove("hidden")
            this.playerColorChoice="yellow"
        }
        document.querySelector("#game-board").classList.remove("hidden")
        document.querySelector("#select-color").classList.add("hidden");
        this.populateGrid();
        document.querySelector("#game-message").innerText=`${this.playerColorChoice} Player: Place your piece!`
        if (this.playerColorChoice==="red"){
            document.querySelector("#game-message").style.color="#FF8B8B"
        }
        if (this.playerColorChoice==="yellow"){
            document.querySelector("#game-message").style.color="yellow"
        }

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
        this.winMessage(color);
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
        document.querySelector("#game-message").innerText=`${color2} Player: Place your piece!`
        if (color2==="red"){
            document.querySelector("#game-message").style.color="#FF8B8B"
        }
        if (color2==="yellow"){
            document.querySelector("#game-message").style.color="yellow"
        }

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
                            this.gameWon=true;
                            break;
                        }
                        //Diagonal(top left-bottom right)
                        if(i-3>=0){
                            if (this.grid[i-1][j-1].color===color && this.grid[i-2][j-2].color===color && this.grid[i-3][j-3].color===color){
                                this.gameWon=true;
                                break;
                            }
                        }
                    }

                    if (i-3>=0){
                        //Vertical
                        if (this.grid[i-1][j].color===color && this.grid[i-2][j].color===color && this.grid[i-3][j].color===color){
                            this.gameWon=true;
                            break;
                        }
                        //Opposite Diagonal
                        if (j+3<=6){
                            if (this.grid[i-1][j+1].color===color&& this.grid[i-2][j+2].color===color &&this.grid[i-3][j+3].color===color){
                                this.gameWon=true;
                                break;
                            }
                        }
                    }
                }
            }

        }
        
    }
    winMessage(color){
        if (this.gameWon===true){
            document.querySelector("#game-message").innerText=`${color} wins!`
        }
    }
    endGame(){
        if (this.gameWon===true){
            let buttons=document.getElementsByClassName("game-buttons")
            for(let i=0; i<buttons.length; i++){
                if (buttons[i].classList.contains("hidden")===false){
                    buttons[i].classList.add("hidden");
                }
            }
        }
    }
    resetBoard(){
        this.grid=[]
        this.gameWon=false
        document.querySelector("#game-board").classList.add("hidden")
        document.querySelector()
        //this.populateGrid();
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
game.playGame()
