// Would you like to start alert
alert("Would you like to start the 60 second quiz?");

// Timer function
var count = 60;
var interval = setInterval(function(){
  document.getElementById('count').innerHTML=count;
  count--;
  if (count === 0){
    clearInterval(interval);
    document.getElementById('count').innerHTML='Done';
    // or... Out of time!
    alert("You're out of time!");
  }
}, 1000);

// if wrong answer, deduct 10 seconds!!!----------------------------------
// /function myQuestions(results) {
//   correctAnswer(correctAnswer);
//   if (correctAnswer === "false"){
//       score -= 10;
//   } else {
//       count += 0;
//   }
// };
// -------------------------------------------------------FIX ME!

(function(){
 
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // declaration of each question
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // for each answer ...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output with buttons
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );


    // finally combine the output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }
  
  function showResults(){

    // gather answer containers from quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers correct/incorrect
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables 

  // quiz variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  // my question list variable
  const myQuestions = [
    {
      question: "Which of the following is not JavaScript Data Types?",
      answers: {
        a: "Undefined",
        b: "Boolean",
        c: "Float",
        d: "Number",
      },
      correctAnswer: "c"
    },
    {
      question: "Which company developed Javascript?",
      answers: {
        a: "Netscape",
        b: "Sun Microsystems",
        c: "IBM",
        d: "Bell Labs",
      },
      correctAnswer: "a"
    },
    {
      question: "Inside which HTML element do we put the Javascript?",
      answers: {
        a: "script",
        b: "head",
        c: "meta",
        d: "style",
      },
      correctAnswer: "a"
    },
    {
      question: "What is the original name of Javascript?",
      answers: {
        a: "LiveScript",
        b: "EScript",
        c: "Mocha",
        d: "Java",
      },
      correctAnswer: "c"
    },
    {
      question: "What will be the output of the following Javascript code? var string1 = 'Letsfindcourse'; var intvalue = 30; alert( string1 + intvalue );",
      answers: {
        a: "Letsfindcourse 30",
        b: "30",
        c: "Letsfindcourse30",
        d: "Undefined",
      },
      correctAnswer: "c"
    },
    {
      question: "Among the following, which one is a ternary operator in JavaScript?",
      answers: {
        a: "#",
        b: "::",
        c: "B&:",
        d: "?:",
      },
      correctAnswer: "d"
    },
    {
      question: "What should appear at the very end of your JavaScript? The script language='javascript' tag",
      answers: {
        a: " open script",
        b: "closing script",
        c: "script language='javascript'",
        d: "All the above",
      },
      correctAnswer: "b"
    },
    {
      question: "Among the keywords below, which one is not a statement?",
      answers: {
        a: "if",
        b: "with",
        c: "debugger",
        d: "use strict",
      },
      correctAnswer: "d"
    },
    {
      question: "How do we define the term Thread?",
      answers: {
        a: "Device that controls input",
        b: "Variable that controls movement",
        c: "Controlled execution of applications",
        d: "None of the above",
      },
      correctAnswer: "c"
    },
    {
      question: "Which of these is NOT looping structures in Javascript?",
      answers: {
        a: "for",
        b: "while",
        c: "forwhich",
        d: "dowhile",
      },
      correctAnswer: "c"
    },
  ];
  
  

  // calls the function to build the list
  buildQuiz();
  

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide and then loop through them
  showSlide(currentSlide);

  // Event listeners for on click events (submit, previous, next buttons)
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);

})();



