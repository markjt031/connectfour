class Game{
    constructor(){
        this.grid=[];
        this.gameWon=false;
        this.rows=6;
        this.columns=7
        this.board=document.getElementById("game-board")
        this.playerColorChoice=""
        this.singlePlayer=false;
        this.difficulty="easy"
        this.placedPieces=[]
    }
    populateGrid(){
        for (let i=0; i<this.rows; i++){
            let row=[]
            for(let j=0; j<this.columns; j++){
                let htmlTile=document.createElement("div");
                htmlTile.classList.add("tile");
                let tile=new GridTile(i, j, htmlTile);
                tile.setNeighbors();
                row.push(tile);
                this.board.appendChild(tile.htmlTile);
            }
            this.grid.push(row);
        }
    }
    clearGrid(){
        //I feel like this way of clearing out the board leaves a lot of garbage behind.
        while (this.board.hasChildNodes()){
            this.board.removeChild(this.board.firstChild);
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
        document.querySelector(".reset").addEventListener("click", ()=>this.resetBoard())
        let modeButtons=document.getElementsByClassName("mode");
        let difficultyButtons=document.getElementsByClassName("difficulty-button")
        for (let i=0; i<modeButtons.length; i++){
            modeButtons[i].addEventListener("click", (e)=>this.modeButtonHandler(e))
        }
        for (let i=0; i<difficultyButtons.length; i++){
            difficultyButtons[i].addEventListener("click", (e)=>this.difficultyButtonHandler(e))
        }
    }
    rulesButtonHandler(){
        let rulesSection=document.querySelector(".rules-section");
        if (rulesSection.classList.contains("hidden")){
            rulesSection.classList.remove("hidden");
        }
        else {
            rulesSection.classList.add("hidden");
        }
    }
    startButtonHandler(){
        //Reveals color selection menu
        document.querySelector("#select-mode").classList.remove("hidden");
        document.querySelector("#start-game").classList.add("hidden");
        
    }
    modeButtonHandler(e){
        if (e.target.id==="single-player"){
            this.singlePlayer=true;
            document.querySelector("#select-difficulty").classList.remove("hidden");
            
        }
        if (e.target.id==="multiplayer"){
            this.singlePlayer===false;
            document.querySelector("#select-color").classList.remove("hidden")
        }
        document.querySelector("#select-mode").classList.add("hidden");
       
    }
    difficultyButtonHandler(e){
        if (e.target.id==="easy"){
            this.difficulty="easy";
        }
        if (e.target.id==="medium"){
            this.difficulty="medium";
        }
        //Hard button sets it to medium because I haven't created hard mode yet
        if (e.target.id==="hard"){
            this.difficulty="medium";
        }
        document.querySelector("#select-difficulty").classList.add("hidden");
        document.querySelector("#select-color").classList.remove("hidden")
    }
    chooseColor(e){
        let redButton=document.querySelector(".game-buttons-red");
        let yellowButton=document.querySelector(".game-buttons-yellow");
        if (e.target.classList.contains("choose-red")){
            redButton.classList.remove("hidden");
            this.playerColorChoice="red";
        }
        if (e.target.classList.contains("choose-yellow")){
            yellowButton.classList.remove("hidden");
            this.playerColorChoice="yellow";
        }
        document.querySelector("#game-board").classList.remove("hidden");
        document.querySelector("#select-color").classList.add("hidden");
        this.populateGrid();
        this.displayTurnMessage(this.playerColorChoice);
        document.querySelector("header").style.margin="0 auto";
        document.querySelector(".reset").classList.remove("hidden");

    }
    displayTurnMessage(color){
        let message=document.querySelector("#game-message")
        message.innerText=`${color} Player: Place your piece`
        if (color==="red"){
            message.style.color="#FF8B8B"
        }
        if (color==="yellow"){
            message.style.color="yellow"
        }
    }
    placePiece(color, columnNumber){
        //Don't place a piece if the top slot is full
        if (this.grid[0][columnNumber].isEmpty===false){
            return;
        }
        
        for (let i=this.rows-1; i>=0; i--){
            if (this.grid[i][columnNumber].isEmpty===true){
                this.grid[i][columnNumber].color=color;
                this.grid[i][columnNumber].isEmpty=false;
                this.grid[i][columnNumber].htmlTile.style.backgroundColor=color;
                this.placedPieces.push([this.grid[i][columnNumber]])
                break;
            }
        }
        
        //Immediately after placing piece, check for win.
        this.checkWin(color);
        this.winMessage(color);
        this.endGame();
        if (this.gameWon===false){
            //Swap colors after piece is placed
            this.takeTurns(color);
        }
    }
    playGame(){
        this.addButtonListeners()
    }
    takeTurns(color){
        if (this.singlePlayer===true){
            if (this.playerColorChoice==="red" && color==="red"){
                //this.swapButtons(color, "yellow")
                this.computerTurn("yellow");
                //this.swapButtons("yellow", color)
            }
            if (this.playerColorChoice==="red" && color==="yellow"){
                this.swapButtons("yellow", color)
            }
            if (this.playerColorChoice==="yellow" && color==="yellow"){
                this.computerTurn("red")
            }
            if (this.playerColorChoice==="red" && color==="red"){
                this.swapButtons("red", color)
            }
        }
        else{
            if (color==="red"){
                this.swapButtons(color,"yellow");
            }
            if (color==="yellow"){
                this.swapButtons(color, "red")
            }
        }
        
    }   
    

   
    computerTurn(color){
        if (this.difficulty==="easy"){
            console.log("place a piece")
            this.placePiece(color, Math.floor(Math.random()*this.columns));
        }
        
        if (this.difficulty==="medium"){
            let available=[]
            let threats=[]
            let wins=[]
            let place=0;
            if (color==="red"){
                threats=this.threeInARow("yellow")
                wins=this.threeInARow(color)
            }
            if (color==="yellow"){
                threats=this.threeInARow("red");
                wins=this.threeInARow(color)
            }
            console.log(wins)
            console.log(threats)
            if (wins.length>0){
                console.log("Going for the win")
                place=wins[Math.floor(Math.random()*wins.length)]
                this.placePiece(color, place);

            }
            
            else if (threats.length>0){
                console.log("kill the player")
                place=threats[Math.floor(Math.random()*threats.length)]
                this.placePiece(color, place)
            }
            else if (this.placedPieces.length>0) {
                for (let i=0; i<this.placedPieces.length; i++){
                    //Place pieces next to other yellow
                    if (this.placedPieces[i].color==="yellow"){
                        available=this.checkAvailable(placedPieces[i])
                        if (available.length>0){
                            this.placePiece(color, available[Math.floor(Math.random()*available.length)])
                            break;
                        }
                        else{
                            this.placePiece(color, Math.floor(Math.random()*this.columns))
                            break;
                        }
                    }
                    else {
                        this.placePiece(color, Math.floor(Math.random()*this.columns));
                        break;
                    }
                    
                }
            }
        }
   }
   checkAvailable(piece){
        let available=[]
        for (let i=0; i<piece.neighbors; i++){
            //If neighbor is empty
            if (this.grid[piece.neighbors[i][0]][piece.neighbors[i][1]].isEmpty){
                //If spot below is filled or the neighbor is at the bottom
                if ((piece.neighbors[i][0]+1)<=5 && (this.grid[piece.neighbors[i][0]+1][piece.neighbors[0][1]].isEmpty===false)|| piece.neighbors[i][0]+1===6){
                    //push the column number
                    available.push(piece.neighbors[i][1])
                }
            }
        return available;
        }
   }
    swapButtons(color1, color2){
        let buttonSetOriginal=document.querySelector(".game-buttons-"+color1);
        let buttonSetNew=document.querySelector(".game-buttons-"+color2);
        if (this.singlePlayer===true){
            if (color2===this.playerColorChoice){
                if (buttonSetNew.classList.contains("hidden")!=-1){
                    buttonSetNew.classList.remove("hidden");
                }
            }
        }
        else{
            buttonSetOriginal.classList.add("hidden");
            buttonSetNew.classList.remove("hidden")
            this.displayTurnMessage(color2);
        }
    }

    checkWin(color){
        console.log("Let's check our win")
        console.log(color)
        for (let i=this.rows-1; i>=0; i--){
            for (let j=this.columns-1; j>=0; j--){
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
    threeInARow(color){
        let places=[]
        for (let i=this.rows-1; i>=0; i--){
            for (let j=this.columns-1; j>=0; j--){
                if (this.grid[i][j].color===color){
                    if (j-2>=0){
                        //Horizontal
                        if (this.grid[i][j-1].color===color && this.grid[i][j-2].color===color){
                            //Return possible winning locations
                            if (j+1<this.columns){
                                if (this.grid[i][j+1].isEmpty===true){
                                    places.push(j+1)
                                }
                            }
                            if (j-3>=0){
                                if (this.grid[i][j-3].isEmpty===true){}
                                    places.push(j-3);
                                }
                            }

                        //Diagonal(top left-bottom right)
                        if(i-3>=0){
                            if (this.grid[i-1][j-1].color===color && this.grid[i-2][j-2].color===color){
                                if (i+1<this.rows && j+1<this.columns && this.grid[i+1][j+1].isEmpty){
                                    if (i+1===this.rows-1){
                                        places.push(j+1)
                                    }
                                    if (this.grid[i][j+1].isEmpty===false){
                                        places.push(j+1) 
                                    }
                                }
                                if (j-3>=0){
                                    if (this.grid[i-2][j-3].isEmpty===false){
                                        places.push(j-3)
                                    }
                                }
                            }
                        }
                    }
                    if (i-3>=0){
                        //Vertical
                        if (this.grid[i-1][j].color===color && this.grid[i-2][j].color===color && this.grid[i-3][j].isEmpty===true){
                            places.push(j)
                        }
                        //Opposite Diagonal
                        if (j+3<=6){
                            if (this.grid[i-1][j+1].color===color&& this.grid[i-2][j+2].color===color){
                                if(i+1<this.rows && this.grid[i+1][j-1].isEmpty){
                                    if(i+1===this.rows-1){
                                        places.push(j-1);
                                    }
                                    if (this.grid[i][j-1].isEmpty===false){
                                        places.push(j-1);
                                    }
                                }
                                if (this.grid[i-2][j+3].isEmpty===false){
                                    places.push(j+3)
                                }
                            }
                        }
                    }
                
                } 
                
            }
        }
        return places;
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
        this.placedPieces=[]
        this.clearGrid();
        this.singlePlayer=false;
        this.gameWon=false;
        this.difficulty="easy"
        this.playerColorChoice=""
        document.querySelector("#game-board").classList.add("hidden")
        document.querySelector("#start-game").classList.remove("hidden")
        document.querySelector(".reset").classList.add("hidden")
        document.querySelector("#game-message").innerHTML=""
    }

}
class GridTile{
    constructor(rowPosition, columnPosition, htmlTile){
        this.isEmpty=true;
        this.color="";
        this.rowPosition=rowPosition;
        this.columnPosition=columnPosition;
        this.htmlTile=htmlTile;
        this.neighbors=[]
    }
    setNeighbors(){
        let i=this.rowPosition
        let j=this.columnPosition
        if (i===0){
            //top left corner
            if (j===0){
                this.neighbors.push([i+1, j+1], [i+1, j], [i, j+1]);
            }
            //top right corner
            else if (j===6){
                this.neighbors.push([i+1, j], [i+1, j-1],[i-1, j-1] )
            }
            //top side
            else{
                this.neighbors.push([i+1,j], [i+1,j+1], [i+1, j-1], [i, j+1], [i,j-1])
            }
        }
        //bottom left corner
        if (i===5){
            if (j===0){
                this.neighbors.push([i-1, j],[i+1,j+1], [i, j+1])
            }
            //bottom right corner
            if (j===6){
                this.neighbors.push([i-1, j],[i-1, j-1],[i, j+1])
            }
            //bottom side
            else {
                this.neighbors.push([i, j-1], [i-1, j-1], [i-1,j],[i-1,j+1],[i, j+1] )
            }
        }  
        //left 
       if (j===0 && (i!==0&&i!==5)){
        this.neighbors.push([i-1,j], [i-1,j+1], [i, j+1], [i+1,j+1], [i+1,j]);
       }
       //right
       if (j===6 && (i!==0 && i!==5)){
        this.neighbors.push([i-1,j], [i-1, j-1], [i, j-1], [i+1, j+1], [i+1, j])
       }
       //middle
       else{
        this.neighbors.push([i-1,j], [i-1,j+1], [i, j+1], [i+1,j+1], [i+1,j], [i+1, j-1], [i, j-1], [i-1,j-1])
       }
    }
}

const game=new Game;
game.playGame()
