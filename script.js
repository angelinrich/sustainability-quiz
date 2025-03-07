const userResponses = [];
let currentQuestionIndex = 0;
const averageLifeExpectancy = 80;
const simulationRuns = 10000;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
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
        radioInput.value = currentQuestion.co2Impact[index]; // Store CO₂ impact
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
        userResponses.push(parseInt(selectedOption.value));
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            calculatePollution();
        }
    }
});

function calculatePollution() {
    const yearlyCO2 = userResponses.reduce((sum, val) => sum + val, 0);
    const expectedLifetimeCO2 = yearlyCO2 * averageLifeExpectancy;

    let simulations = [];
    for (let i = 0; i < simulationRuns; i++) {
        let randomFactor = (Math.random() * 0.2) + 0.9; // Random variability
        simulations.push(expectedLifetimeCO2 * randomFactor);
    }

    const avgSimulatedCO2 = simulations.reduce((a, b) => a + b, 0) / simulations.length;
    displayResults(avgSimulatedCO2);
}

function displayResults(lifetimeCO2) {
    questionEl.innerText = "Results";
    optionsEl.innerHTML = `
        <p>Your estimated lifetime CO₂ impact: <strong>${lifetimeCO2.toFixed(0)} kg</strong></p>
        <p>Average person's impact: <strong>4,000,000 kg</strong></p>
    `;

    if (lifetimeCO2 < 2000000) {
        optionsEl.innerHTML += `<p>🌱 You have a lower-than-average footprint! Keep up the great work!</p>`;
    } else {
        optionsEl.innerHTML += `<p>🚗 Your impact is higher than average. Try reducing car use and plastic waste.</p>`;
    }

    nextButton.style.display = "none"; // Hide next button at the end
}

loadQuestion();
