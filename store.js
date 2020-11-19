
const store = {
    questions: [
      {// 1
        question: 'Which of the following spirits are distilled from sugar cane?',
        answers: [
          'Vodka',
          'Whiskey',
          'Tequila',
          'Rum'
        ],
        correctAnswer: 'Rum'
      },
      {//2
        question: 'Which spirit is a classic Old Fashioned made with?',
        answers: [
          'Vodka',
          'Scotch',
          'Bourbon',
          'Tequlia'
        ],
        correctAnswer: 'Bourbon'
      },
      { //3
        question: 'What cocktail is made by mixing equal parts of: gin, Campari, and sweet vermouth?',
        answers: [
            'Negroni',
            'Vesper',
            'Manhattan',
            'French 75'
        ],
        correctAnswer: 'Negroni'
      },
      { //4
        question: 'What does it mean when you ask for a cocktail to be served “up”?',
        answers: [
            'The drink is served with ice',
            'The drink is served without ice at room temp',
            'The drink is chilled, by either shaking or stirring, then strained of ice and poured into an ‘up’ cocktail glass',
            'The drink is delivered to the customer ‘up high’ with the glass never touching the bar'
        ],
        correctAnswer: 'The drink is chilled, by either shaking or stirring, then strained of ice and poured into an ‘up’ cocktail glass'
      },
      { //5
        question: 'The Moscow Mule is a popular cocktail that consists of which 3 ingredients?',
        answers: [
            'Gin / lemon juice / ginger beer',
            'Vodka / lime juice / ginger beer',
            'Rum / grenadine / tonic water',
            'Scotch / orange juice / cherry liquor'
        ],
        correctAnswer: 'Vodka / lime juice / ginger beer' 
      }
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
  };
  
  /**
   * 
   * Technical requirements:
   * 
   * Your app should include a render() function, that regenerates the view each time the store is updated. 
   * See your course material and access support for more details.
   *
   * NO additional HTML elements should be added to the index.html file.
   *
   * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
   *
   * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
   * 
   */
  
  /********** TEMPLATE GENERATION FUNCTIONS **********/
  
  // These functions return HTML templates

  function generateStartScreen() {
    return `
      <div class="start-screen">
        <p>This quiz will challenge your knowledge of Classic Cocktails and Spirits.</p>
        <button type="button" id="start">Let's Get Started</button>
      </div>`;
  }

  function generateQuizNumberAndScore() {
    return `
    <ul class="question-and-score">
      <li id="question-number">
        Question Number: ${store.questionNumber + 1}/${store.questions.length}
      </li>
      <li id="score">
        Score: ${store.score}/${store.questions.length}
      </li>
    </ul>
  `
  }
  
  function generateQuestion() {
    let currentQuestion = store.questions[store.questionNumber];
    return `
    <form id="question-form" class="question-form">
      <fieldset>
        <div class="question">
          <legend> ${currentQuestion.question}</legend>
        </div>
        <div class="options">
          <div class="answers">
            ${generateAnswers()}
          </div>
        </div>
        <button type="submit" id="submit-answer-btn" tabindex="5">Submit</button>
        <button type="button" id="next-question-btn" tabindex="6"> Next &gt;></button>
      </fieldset>
    </form >
  `;
  }


  function generateAnswers() {
    const answersArray = store.questions[store.questionNumber].answers
    let answersHtml = '';
    let i = 0;

    answersArray.forEach(answer => {
      answersHtml += ` 
        <div id="option-container-${i}">
          <input type="radio" name="options" id="option${i + 1}" value= "${answer}" tabindex ="${i + 1}" required>
          <label class="label" for="option${i + 1}"> ${answer}</label>
        </div>`;
      i++;
    });

    return answersHtml
  }

  function generateResultsResponse() {
    let html = '';
    let finalScore = store.score
    if (finalScore <= 2) {
      html = `<p>Oh, sorry friend, need some more practice.</p>`;
    } else {
      html = `<p>Great Job Bartender!</p>`;
    }
    return html;
  }

  function generateResults() {
    return `
      <div class="results">
        <form id="js-restart-quiz">
          <fieldset>
            <div class="row">
              <div class="col-12">
                ${generateResultsResponse()}
                <legend>Your Score is: ${store.score}/${store.questions.length}</legend>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button type="button" id="restart">Try the Quiz Again</button>
              </div>
            </div>
          </fieldset>
      </form>
      </div>
    `;
  }  

  function generateFeedback(answerStatus) {
    let correctAnswer = store.questions[store.questionNumber].correctAnswer;
    
    let html = '';

    if ( answerStatus === 'correct') {
      html = `<div class="right-answer">That is correct!</div>`;
    } 
    else if ( answerStatus === 'incorrect') {
      html = `<div class="wrong-answer">That is incorrect. The correct answer is: ${correctAnswer}.</div>`;
    }
    return html
  }


  /********** RENDER FUNCTION(S) **********/
  
  // This function conditionally replaces the contents of the <main> tag based on the state of the store

  function render() {
    let html = '';
  
    if (store.quizStarted === false) {
      $('main').html(generateStartScreen());
      return;
    }
    else if (store.questionNumber >= 0 && store.questionNumber < store.questions.length) {
      html = generateQuizNumberAndScore();
      html += generateQuestion();
      $('main').html(html);
    }
    else {
      $('main').html(generateResults());
    }
  }
  
  /********** EVENT HANDLER FUNCTIONS **********/
  
  // These functions handle events (submit, click, etc)

  function handleStartButton() {
    $('body').on('click', "#start", function (event) {

      store.quizStarted = true;
   
      render();
    });
  }

  function handleNextQuestionButton() {
    $('body').on('click', '#next-question-btn', function(event) {
        render();
    }); 
  }

  function handleQuestionAnswerSubmission() {
      $('body').on('submit', '#question-form', function(event) {
        event.preventDefault();

        const currentQuestion = store.questions[store.questionNumber];
        
        let selectedOption = $('input[name=options]:checked').val();

        let optionContainerId = `#option-container-${currentQuestion.answers.findIndex(i => i === selectedOption)}`;

        if (selectedOption === currentQuestion.correctAnswer) {
            store.score++;
            $(optionContainerId).append(generateFeedback('correct'));
        } else {
            $(optionContainerId).append(generateFeedback('incorrect'));
      };

      store.questionNumber++;

      $('#submit-answer-btn').hide();

      $('input[type=radio]').each( () => {
        $('input[type=radio]').attr('disabled', true);
      });
      
      $('#next-question-btn').show();
    });
  }


  function restartQuiz() {
    store.questionNumber = 0
    store.quizStarted = false;
    store.score = 0;
  };

  function handleRestartButton() {
    $('main').on('click', '#restart', function(event) {
        restartQuiz();
       
        render();
    }); 
  };

  function handleQuizApp() {
    render();
    
    handleStartButton();
    handleNextQuestionButton();
    handleQuestionAnswerSubmission();
    handleRestartButton();
  }

$(handleQuizApp);