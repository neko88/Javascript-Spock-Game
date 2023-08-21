const arr =[
    {image: "lizard.png",
    name: "Lizard",
    },
    {image: "paper.png",
    name: "Paper",
    },
    {image: "rock.png",
    name: "Rock"
    },
    {image: "scissor.png",
    name: "Scissor"
    },
    {image: "spock.png",
    name: "Spock"
    },
];

const rule = {
    Lizard: ["Spock", "Paper"],
    Paper: ["Rock", "Spock"],
    Rock: ["Lizard","Scissor"],
    Scissor:["Paper","Lizard"],
    Spock:["Scissor","Rock"],
};

const imagePath = "assets";

/* get all of the elements of class or id: */
const player1Options = document.querySelectorAll(
   "#player1 .available-option .option"
);
const player2Options = document.querySelectorAll(
"#player2 .available-option .option"
);

const player1Selected = document.querySelector(
    "#player1 .selected-option .option"
);
const player2Selected = document.querySelector(
    "#player2 .selected-option .option"
);

const player1Score = document.querySelector(
    "#player1-score"
);
const player2Score = document.querySelector(
    "#player2-score"
);
const roundMessage = document.querySelector("#round-message");

/*For each option, take element 'e' as function, add
* event listener with type "click" and handle event as play(e)*/
player1Options.forEach( (e)=> {
    e.addEventListener("click", ()=> {
        play(e);
    })
} );

const play = function(e){
    /* Gets the index of the option selected by player. */
    const player1 = e.getAttribute("data-index");
    /* Number of options */
    const length = arr.length;
    /* Generate random number for player 2 selection. */
    const player2 = Math.floor(Math.random() * length);

    showPlayerOption(player1, player1Selected);
    highlightSelectedOption(player1, player1Options);

    calculateScore (player1,player2);
};

/* Generate an image element */
const generateImgElement = (index) => {
    const { image, name } = arr[index];
    const imgElement = document.createElement("img");
    imgElement.src = `${imagePath}/${image}`;
    imgElement.alt = name;
    imgElement.title = name;
    return imgElement;
};

/* Show playerOption */
const showPlayerOption = (index, showArea ) => {
    const imgElement = generateImgElement(index);
    showArea.innerHTML = "";
    showArea.append(imgElement);
};

const highlightSelectedOption = (index, options) => {
    /* Removes active class from all options */
    options.forEach( (e) => {
        e.classList.remove("active");
    });
    /* Adds active class to the selected option  */
    options[index].classList.add("active");
};

const addScore = (playerScore)=> {
    const { innerHTML } = playerScore;
    playerScore.innerHTML = Number(innerHTML) + 1;
}

const showMessage = (msg) => {
    roundMessage.innerHTML = "";
    roundMessage.innerHTML = msg;
}

const calculateScore = (player1, player2) =>{
    const player1Selected = arr[player1].name;
    const player2Selected = arr[player2].name;
    const player1Strength = rule[player1Selected];

    if (player1Selected === player2Selected ){
        showMessage("draw");
    }
    else if (player1Strength.includes(player2Selected)){
        addScore(player1Score);
        showMessage("Player 1 Wins!");
    }else{
        addScore(player2Score);
        showMessage("Player 2 Wins!");
    }
};

const reset = ()=> {
    player1Selected.innerHTML = "";
    player2Selected.innerHTML = "";
    roundMessage.innerHTML = "Choose your option";
    player1Score.innerHTML = "0";
    player2Score.innerHTML = "0";
    player1Options.forEach( (e)=> {
        e.classList.remove("active");
    });
    player2Options.forEach( (e)=> {
        e.classList.remove("active");
    });
};

document.querySelector(".reset").addEventListener(("click"),reset);