const intro = document.getElementById("intro");

const statements = document.getElementById("statements");
const statementTitle = document.getElementById("title");
const statementStatement = document.getElementById("statement");

const agreeButton = document.getElementById("agree");
const noneButton = document.getElementById("none");
const disagreeButton = document.getElementById("disagree");
const skipButton = document.getElementById("");

const opinionAgree = document.getElementById("opinionAgree");
const opinionAmbivalent = document.getElementById("opinionAmbivalent");
const opinionContra = document.getElementById("opinionContra");

const extraWeight = document.getElementById("extraWeight");
const extraWeightOpinion = document.getElementById("extraWeightOpinion");
const filterBigParties = document.getElementById("filterBigParties");
const filterSecular = document.getElementById("filterSecular");

const result = document.getElementById("result"); 

const bestMatch = document.getElementById("bestMatch"); 

const resultOne = document.getElementById("resultOne"); 
const resultTwo = document.getElementById("resultTwo"); 
const resultThree = document.getElementById("resultThree"); 

const resultOneImg = document.getElementById("resultOneImg"); 
const resultTwoImg = document.getElementById("resultTwoImg"); 
const resultThreeImg = document.getElementById("resultThreeImg"); 

const resultOnePercentage = document.getElementById("resultOnePercentage"); 
const resultTwoPercentage = document.getElementById("resultTwoPercentage"); 
const resultThreePercentage = document.getElementById("resultThreePercentage"); 

var counter = 0;
var answers = [];

document.getElementById("statementsAmount").innerHTML = subjects.length;

function start() {
    intro.style.display = "none";
    statements.style.display = "block";
    getStatement(counter);
}

function goBack() {
    if (counter === 0 ) {
        statements.style.display = "none";
        intro.style.display = "block";
    } else {
        counter--;
        getStatement(counter);
    }
}

function anwser(value) {
    switch (value) {
        case "pro":
            answers[counter] = "pro";
        break;
        case "none":
            answers[counter] = "none";
        break;
        case "disagree":
            answers[counter] = "contra";
        break;
        case "skip":
            answers[counter] = null;
        break;
    }

    counter++;

    if (counter == subjects.length) {
        getHeavierstatements();
    } else {
        getStatement();
    }
} 

function getStatement() {
    opinionAgree.innerHTML= null;
    opinionAmbivalent.innerHTML= null;
    opinionContra.innerHTML= null;

    removeClass();
    
    switch (answers[counter]) {
        case "agree":
            agreeButton.classList.add("btn--active");
        break;
        case "none":
            noneButton.classList.add("btn--active");
        break;
        case "disagree":
            disagreeButton.classList.add("btn--active");
        break;
    }

    statementTitle.innerHTML = counter + 1 + ". " + subjects[counter].title;
    statementStatement.innerHTML = subjects[counter].statement;

    subjects[counter].parties.forEach(function(partie) {
        if (partie.position == "pro") {
            var parent = opinionAgree;
            createParty(parent, partie);
        } else if (partie.position === "ambivalent") {
            var parent = opinionAmbivalent;
            createParty(parent, partie);
        } else if (partie.position === "contra") {
            var parent = opinionContra;
            createParty(parent, partie);
        }
    });

    function createParty(parent, partie) {
        var div = document.createElement("div");        
        div.innerHTML = "<details class=\"opinion__party\"><summary class=\"party__title\">" + partie.name + "</summary><p class=\"party__description\">" + partie.opinion + "</p></details>";
        parent.appendChild(div);
    }
}

function getHeavierstatements() {
    statements.style.display = "none";
    extraWeight.style.display = "block";
    
    subjects.forEach(function(subject, index) {
            createopinion(subject, index);
    });

    function createopinion(subject, index) {
        var li = document.createElement("li");     
        li.className = "opinions__item"
        li.innerHTML = '<input type="checkbox" id="theme_' + index + '" onclick="setHeavystatement(this)"' +
        '" class="item__checkbox js-theme" data-theme-id="bindend-referendum"><label for="theme_' 
        + index + '"><span>' + subject.title + '</span></label>'
        '<button class="item__help tipso tipso-left tipso_style" data-tipso="' + subject.statement + '"></button>';
        extraWeightOpinion.appendChild(li);
    }
}

function setHeavystatement(value) {
    if (value.checked) {
        subjects[value.id.split("_").pop()].heavy = true;
    } else {
        delete subjects[value.id.split("_").pop()].heavy;
    }
}

function getResult() {
    extraWeight.style.display = "none";
    result.style.display = "block";

    for(var i = 0; i < parties.length - 1; i++){
        parties[i].count = 0;
        let totalPoints = 0;
        for (let x = 0; x < answers.length - 1; x++) {
            if (answers[x] === subjects[x].parties[i].position) {
                if ("heavy" in subjects[i]) {
                    parties[i].count++;
                    totalPoints++;
                } 
                parties[i].count++;
                totalPoints++;
            } else {
                totalPoints++;
            }
        }
       parties[i].percentage = Math.round(100 / totalPoints * parties[i].count);
    }

    parties.sort(function(a, b) {
        return b.percentage - a.percentage;
    });

    if (filterBigParties.checked) {
        console.log(parties);
        parties = parties.filter(function(parties) {
            return parties.size > 0;
        });
        console.log(parties);
    }
    if (filterSecular.checked) {
        console.log(parties);
        parties = parties.filter(function(parties) {
            return parties.secular == true;
        });
        console.log(parties);
    }

    resultOneImg.src = "parties/" + parties[0].name + ".png";
    resultTwoImg.src = "parties/" + parties[1].name + ".png";
    resultThreeImg.src = "parties/" + parties[2].name + ".png";

    resultOne.innerHTML = parties[0].percentage;
    resultTwo.innerHTML = parties[1].percentage;
    resultThree.innerHTML = parties[2].percentage;
}

function removeClass() {
    agreeButton.classList.remove("btn--active");
    noneButton.classList.remove("btn--active");
    disagreeButton.classList.remove("btn--active");
}