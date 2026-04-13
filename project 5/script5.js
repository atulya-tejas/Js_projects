document.addEventListener('DOMContentLoaded',()=>{
    console.log("Script attached!");

    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const nextBtn = document.getElementById("next-btn");
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const choicesList = document.getElementById('choices-list');
    const resultContainer = document.getElementById('result-container');
    const scoreDisplay = document.getElementById('score');



    const  questions =[
        {
            question:"What is the capital of France?",
            choices:['Madrid' ,'Berlin' ,'Paris' ,'Rome'],
            answer:'Paris',
        },
        {
            question:"Which planet is known as the Red Planet?",
            choices:["Venus","Mars","Jupiter","Saturn"],
            answer:"Mars",
        },
        {
            question:`Who wrote the play "Romeo and Juliet"`,
            choices:["Charles Dickens","William Wordsworth","William Shakespeare","Jane Austen"],
            answer:"William Shakespeare",
        },
        {
            question:"What is the largest ocean on Earth?",
            choices:["Indian Ocean","Atlantic Ocean","Arctic Ocean","Pacific Ocean"],
            answer:"Pacific Ocean",
        },
        {
            question:"Which gas do plants absorb from the atmosphere?",
            choices:["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"],
            answer:"Carbon Dioxide",
        }
    ];

    let currentQuestionIndex = 0 ;
    let score = 0 ;


    startBtn.addEventListener('click', startQuiz);

    nextBtn.addEventListener('click',()=>{
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestions();
        }else{
            showResult();
        }
    });

    restartBtn.addEventListener('click',()=>{
        currentQuestionIndex = 0 ;
        score = 0 ;
        resultContainer.classList.add("hidden");
        startQuiz();


    });


    function startQuiz (){
        startBtn.classList.add("hidden");
        resultContainer.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        showQuestions();
    };

    function showQuestions(){
        nextBtn.classList.add("hidden");
        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML = "" //clear previous options
        questions[currentQuestionIndex].choices.forEach(choice =>{
            const li = document.createElement("li");
            li.textContent = choice
            li.addEventListener('click', () => selectAnswer(choice))
            choicesList.appendChild(li);
        });
    };    

    function selectAnswer(choice){
        correctOption = questions[currentQuestionIndex].answer;
        if(choice === correctOption){
            score++;
        }
        nextBtn.classList.remove("hidden");
    };

    function showResult(){
        questionContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        scoreDisplay.textContent = `${score} out of ${questions.length}`
    };

    



})