<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sustainability Quiz</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .quiz-container {
            background: white;
            max-width: 500px;
            margin: auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .question {
            font-size: 18px;
            margin-bottom: 15px;
        }
        .options label {
            display: block;
            margin: 8px 0;
            cursor: pointer;
        }
        button {
            margin-top: 15px;
            padding: 10px 15px;
            border: none;
            background: green;
            color: white;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
        }
        button:disabled {
            background: gray;
            cursor: not-allowed;
        }
    </style>
</head>
<body>

    <div class="quiz-container">
        <h2>Sustainability Quiz</h2>
        <p id="question-number"></p>
        <div id="question" class="question"></div>
        <div id="options" class="options"></div>
        <button id="next-btn" disabled>Next</button>
        <p id="result" style="display:none; font-weight:bold;"></p>
    </div>

    <script>
        const questions = [
            { question: "How often do you recycle plastic bottles?", options: ["Always", "Sometimes", "Never"], scores: [3, 2, 0] },
            { question: "How do you usually commute?", options: ["Public transport / Walking / Biking", "Carpooling", "Driving alone"], scores: [3, 2, 0] },
            { question: "Do you bring reusable bags when shopping?", options: ["Always", "Sometimes", "Never"], scores: [3, 2, 0] },
            { question: "How often do you eat meat?", options: ["Never / Rarely", "A few times a week", "Every day"], scores: [3, 1, 0] },
            { question: "How do you dispose of food waste?", options: ["Compost", "Trash", "Garbage disposal"], scores: [3, 1, 0] },
            { question: "How do you usually drink water?", options: ["Reusable bottle", "Filtered water", "Plastic water bottles"], scores: [3, 2, 0] },
            { question: "What type of energy powers your home?", options: ["Renewable (solar, wind)", "Mixed", "Non-renewable (coal, gas)"], scores: [3, 2, 0] },
            { question: "How often do you turn off lights when leaving a room?", options: ["Always", "Sometimes", "Rarely"], scores: [3, 2, 0] },
            { question: "Do you use energy-efficient appliances?", options: ["Yes, all", "Some", "No"], scores: [3, 2, 0] },
            { question: "How long are your showers?", options: ["Less than 5 min", "5-10 min", "More than 10 min"], scores: [3, 2, 0] }
        ];

        let currentQuestionIndex = 0;
        let score = 0;

        const questionEl = document.getElementById("question");
        const optionsEl = document.getElementById("options");
        const nextButton = document.getElementById("next-btn");
        const resultEl = document.getElementById("result");
        const questionNumberEl = document.getElementById("question-number");

        function loadQuestion() {
            nextButton.disabled = true;
            questionNumberEl.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
            const currentQuestion = questions[currentQuestionIndex];

            questionEl.innerText = currentQuestion.question;
            optionsEl.innerHTML = "";

            currentQuestion.options.forEach((option, index) => {
                const radioWrapper = document.createElement("div");
                const radioInput = document.createElement("input");
                radioInput.type = "radio";
                radioInput.name = "answer";
                radioInput.value = currentQuestion.scores[index];
                radioInput.id = `option${index}`;

                const radioLabel = document.createElement("label");
                radioLabel.htmlFor = `option${index}`;
                radioLabel.innerText = option;

                radioWrapper.appendChild(radioInput);
                radioWrapper.appendChild(radioLabel);
                optionsEl.appendChild(radioWrapper);

                radioInput.addEventListener("change", () => {
                    nextButton.disabled = false;
                });
            });
        }

        nextButton.addEventListener("click", () => {
            const selectedOption = document.querySelector('input[name="answer"]:checked');
            if (selectedOption) {
                score += parseInt(selectedOption.value);
                currentQuestionIndex++;

                if (currentQuestionIndex < questions.length) {
                    loadQuestion();
                } else {
                    showResult();
                }
            }
        });

        function showResult() {
            questionEl.style.display = "none";
            optionsEl.style.display = "none";
            nextButton.style.display = "none";
            questionNumberEl.style.display = "none";

            let message;
            if (score >= 25) {
                message = "You're a sustainability champion! 🌍";
            } else if (score >= 15) {
                message = "You're doing well, but there's room to improve! ♻️";
            } else {
                message = "You can make more eco-friendly choices! 🌱";
            }

            resultEl.innerText = `Your sustainability score: ${score}/30\n${message}`;
            resultEl.style.display = "block";
        }

        loadQuestion();
    </script>

</body>
</html>
