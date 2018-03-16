$(document).ready(function() {
    // div id: timeRemaining
    // div id: questionBlock
    // div id: answerBlock
    // button id: start
    // button id: reset

    //global variables
var options = [
{  
    question: "Who tells Rick she also has talked to a deceased loved one?", 
    choice: ["Beth", "Andrea", "Carol", "Michonne"],
    answer: 3,
    photo: "assets/images/Michonne.jpg"
    
},
{  
    question: "What word does Morgan write over and over in season 3?", 
    choice: ["Kill", "Safe", "Clear", "No"],
    answer: 2,
    photo: "assets/images/morganwalkingdead.jpg"
    
},
{   
    question: "Who claims he's worked on the Human Genome Project?", 
    choice: ["Eugene", "Abraham", "Gareth", "Rosita"],
    answer: 0,
    photo: "assets/images/Eugene.jpeg"
    
},
{
    question: "What does Michonne stab the Governor's eye with?", 
    choice: ["her katana", "a shard of glass", "the governor's knife", "a piece of wood"],
    answer: 1,
    photo: "assets/images/Governor.jpg"
    
},
{
        question: "According to Edwin Jenner, doctors in what country came close to finding a cure?", 
        choice: ["France", "Japan", "Australia", "Canada"],
        answer: 0,
        photo: "assets/images/Edwin.png"
        
},
{       question: "Who performs a C-section on Lori?", 
        choice: ["Carol", "Maggie", "Hershel", "Beth"],
        answer: 1,
        photo: "assets/images/Maggie.jpg"
    },
    {   
        question: "Who does Carl name his baby sister after?", 
        choice: ["a childhood friend", "a former member of the group", "a family member", "a former teacher"],
        answer: 3,
        photo: "assets/images/Carl.jpeg"
    },
    {   
        question: "Who does Rick hallucinate during the attack on Woodbury?", 
        choice: ["Shane", "Dale", "Sophia", "Carl"],
        answer: 0,
        photo: "assets/images/Shane.png"
    },
    {   
        question: "Who gives Carol a cherokee rose?", 
        choice: ["Daryl", "Dale", "Sophia", "Andrea"],
        answer: 0,
        photo: "assets/images/Daryl.jpg"
    },

    {   question: "Who lets all the walkers out of the Greene's barn?", 
        choice: ["Hershel", "Carol", "Rick", "Shane"],
        answer: 3,
        photo: "assets/images/Shane.jpg"

        }];
    var correctCount = 0;
    var wrongCount = 0;
    var unansweredCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index; 
    var newArray = [];
    var holder = [];
  
$("#reset").hide();
 //Functions
 
 //Click start button to start game
 $("#start").on("click", function() {
     $("#start").hide();
     displayQuestion();
     runTimer();
     for(var i=0; i< options.length; i++ ){
        holder.push(options[i]);
}
    });    

//timer start
function runTimer () {
    if (!running) {
        intervalId = setInterval(decrement, 1000);
        running = true;
        }
}
//timer countdown
function decrement() {
    $("#timeRemaining").html("<h3>Time remaining: " + timer + "</h3");
    timer --;

    //stop timer if reach 0
    if (timer ==0) {
        unansweredCount ++;
        stop();
        $("#answerblock").html("<p>Time is up! The correct answer: " + pick.choice[pick.answer]+"</p>");
        hidepicture();
    }
}

//timer stop
function stop() {
    running = false;
    clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop through and display possible answers
function displayQuestion() {
    //generate random index in array
    index = Math.floor(Math.random()*options.length);
    pick = options[index];

    //iterate through answer array and display
    $("#questionblock").html("<h2>" + pick.question + "</h2>");
    for(var i = 0; i < pick.choice.length; i++) {
        var userChoice = $("<button>");
        userChoice.addClass("answerselect");
        userChoice.html(pick.choice[i]);
        //assign array position to it so can check answer
        userChoice.attr("data-guessvalue", i);
        $("#answerblock").append(userChoice);
    }

}
//click function to select answer and outcomes
$(document).on("click", ".answerselect", function() {
    //grab array position from userGuess
    userGuess = parseInt($(this).attr("data-guessvalue"));
  
    //correct guess or wrong guess outcomes
    if (userGuess === pick.answer) {
        stop();
        correctCount ++;
        userGuess = "";
        $("#answerblock").html("<p>Correct!</p>");
        hidepicture();
    } else {
        stop();
        wrongCount ++;
        userGuess = "";
        $("#answerblock").html("<p>Wrong ! The correct answer is: " + pick.choice[pick.answer] + "</p>");
        hidepicture();
    }
});
function hidepicture () {
    $("#answerblock").append("<img src=" + pick.photo + ">");
    newArray.push(pick);
    options.splice(index, 1);

    var hidpic = setTimeout(function() {
        $("#answerblock").empty();
        timer = 20;
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unansweredCount) === qCount) {
        $("#questionblock").empty();
        $("#questionblock").html("<h3>Game Over! Here's how you did: ");
        $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unansweredCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unansweredCount = 0;
        
    } else {
        runTimer();
        displayQuestion();
    }

    }, 3000);
}
$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
    displayQuestion();

});

});




