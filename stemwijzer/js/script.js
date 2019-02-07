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
    console.log(value);
    if (value === "agree") {

    } else if (value === "none") {

    } else if (value === "disagree") {

    } else {
        
    }
    counter++;
    getStatement(counter);
} 

function getStatement(counter) {
    opinionAgree.innerHTML= null;
    opinionAmbivalent.innerHTML= null;
    opinionContra.innerHTML= null;

    statementTitle.innerHTML = counter + 1 + ". " + subjects[counter].title;
    statementStatement.innerHTML = subjects[counter].statement;

    subjects[counter].parties.forEach(function(x) {
        if (x.position == "pro") {
            var parent = opinionAgree;
            createParty(parent, x);
        } else if (x.position === "ambivalent") {
            var parent = opinionAmbivalent;
            createParty(parent, x);
        } else if (x.position === "contra") {
            var parent = opinionContra;
            createParty(parent, x);
        }
    });

    function createParty(parent, x) {
        var div = document.createElement("div");        // Create a <button> element
        div.innerHTML = "<details class=\"opinion__party\"><summary class=\"party__title\">" + x.name + "</summary><p class=\"party__description\">" + x.explanation + "</p></details>";
        parent.appendChild(div);
    }
}

