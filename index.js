
var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red","blue","green","yellow"];

var level  = 0;

$(document).on("keydown",function(e){
    if(level===0){
        nextSequence();
    }
});



function nextSequence(){
    level++;
    $("h1").html("level "+level);
    var randomNum = Math.random();
    randomNum*=4;
    randomNum = Math.floor(randomNum);
    var randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
$(".btn").on("click",function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAns(userClickedPattern.length-1);
});

function playSound(userChosenColor){
    var audio = new Audio("sounds/"+userChosenColor+".mp3");
    audio.play();
}

function animatePress(userChosenColor){
    $("#"+userChosenColor).addClass("pressed");
    setTimeout(function(){
        $("#"+userChosenColor).removeClass("pressed");
    },100);
}

function checkAns(current_level){
    if(userClickedPattern[current_level]===gamePattern[current_level]){

        if(userClickedPattern.length === gamePattern.length){
            userClickedPattern = [];
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        $("body").addClass("game-over");
        $("h1").html("Game Over, Press Any Key to Restart");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        startover();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },2000);
    }
}

function startover(){
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
}