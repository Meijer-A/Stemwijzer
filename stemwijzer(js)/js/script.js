const intro = document.getElementById("intro");
const question = document.getElementById("questions");
const questionTitle = document.getElementById("title");
const questionStatement = document.getElementById("statement");
const questionParties = document.getElementById("questions");
var counter = 0;
var awnserCounter = 0;

questions.style.display = "none";

function start() {
    intro.style.display = "none";
    questions.style.display = "block";
    statement(counter);
}

function awnser(value) {
    if (value === 3) {

    } else if (value === 2) {

    } else if (value === 1) {

    } else {
        
    }
    counter++;
    statement(counter);
} 

function statement(counter) {
    console.log(counter);
    questionTitle.innerHTML = counter + ". " + subjects[counter].title;
    questionStatement.innerHTML = subjects[counter].statement;
}