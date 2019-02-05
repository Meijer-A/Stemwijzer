const intro = document.getElementById("intro");

const statements = document.getElementById("statements");
const statementTitle = document.getElementById("title");
const statementStatement = document.getElementById("statement");

const opinionAgree = document.getElementById("opinionAgree");
const opinionAmbivalent = document.getElementById("opinionAmbivalent");
const opinionContra = document.getElementById("opinionContra");

const result = document.getElementById("result"); 

var counter = 0;
var awnserCounter = 0;

document.getElementById("statementsAmount").innerHTML = subjects.length;
console.log(subjects.length);

function start() {
    intro.style.display = "none";
    statements.style.display = "block";
    getStatement(counter);
}

function awnser(value) {
    if (value === 3) {

    } else if (value === 2) {

    } else if (value === 1) {

    } else {
        
    }
    counter++;
    getStatement(counter);
} 

function getStatement(counter) {
    console.log(counter);
    statementTitle.innerHTML = counter + 1 + ". " + subjects[counter].title;
    statementStatement.innerHTML = subjects[counter].statement;
}