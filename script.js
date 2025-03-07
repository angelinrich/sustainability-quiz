const questions = [
    { question: "How often do you recycle plastic bottles?", options: ["Always", "Sometimes", "Never"], co2Impact: [10, 50, 100] },
    { question: "How do you usually commute?", options: ["Public transport / Walking / Biking", "Carpooling", "Driving alone"], co2Impact: [500, 2000, 4000] },
    { question: "Do you bring reusable bags when shopping?", options: ["Always", "Sometimes", "Never"], co2Impact: [20, 80, 200] },
    { question: "How often do you eat meat?", options: ["Never / Rarely", "A few times a week", "Every day"], co2Impact: [300, 1000, 3000] },
    { question: "How do you dispose of food waste?", options: ["Compost", "Trash", "Garbage disposal"], co2Impact: [50, 400, 700] },
    { question: "How often do you fly per year?", options: ["0-1 times", "2-5 times", "More than 5 times"], co2Impact: [1000, 5000, 15000] },
    { question: "What type of energy powers your home?", options: ["Renewable (solar, wind)", "Mixed", "Non-renewable (coal, gas)"], co2Impact: [500, 3000, 7000] },
    { question: "How often do you turn off lights when leaving a room?", options: ["Always", "Sometimes", "Rarely"], co2Impact: [50, 200, 500] },
    { question: "Do you use energy-efficient appliances?", options: ["Yes, all", "Some", "No"], co2Impact: [300, 1000, 3000] },
    { question: "How long are your showers?", options: ["Less than 5 min", "5-10 min", "More than 10 min"], co2Impact: [200, 600, 1500] },
    { question: "How often do you buy fast fashion?", options: ["Rarely / Thrift", "Sometimes", "Often"], co2Impact: [100, 700, 2000] },
    { question: "Do you use a clothes dryer?", options: ["Rarely / Hang dry", "Sometimes", "Frequently"], co2Impact: [200, 800, 2000] },
    { question: "Do you offset your carbon emissions from flights?", options: ["Yes", "No, but I try to minimize", "No"], co2Impact: [0, 500, 2000] },
    { question: "Do you use single-use plastic utensils or containers?", options: ["Never", "Sometimes", "Frequently"], co2Impact: [50, 400, 1200] },
    { question: "How often do you eat locally sourced food?", options: ["Often", "Sometimes", "Rarely"], co2Impact: [100, 600, 2000] },
    { question: "Do you have a garden or grow any food?", options: ["Yes", "No, but I’d like to", "No"], co2Impact: [50, 300, 1000] },
    { question: "How often do you buy secondhand items?", options: ["Often", "Sometimes", "Rarely"], co2Impact: [50, 400, 1200] },
    { question: "How do you dispose of old electronics?", options: ["Recycle / Donate", "Store them", "Throw them away"], co2Impact: [50, 500, 2000] },
    { question: "What type of vehicle do you use most?", options: ["Electric / Hybrid", "Fuel-efficient car", "Gas-powered car"], co2Impact: [500, 2500, 7000] }
];

let currentQuestionIndex = 0;
let userResponses = new Array(questions.length).fill(null);

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const progressBar = document.getElementById("progress-bar");
const questionNumberEl = document.getElementById("question-number");
const resultsEl = document.getElementById("results");

function loadQuestion() {
    nextButton.disabled = true;
    questionNumberEl.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    const currentQuestion = questions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.question;
    optionsEl.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "answer";
        radioInput.id = `option${index}`;
        radioInput.value = currentQuestion.co2Impact[index];

        if (userResponses[currentQuestionIndex] === index) {
            radioInput.checked = true;
            nextButton.disabled = false;
        }

        const radioWrapper = document.createElement("label");
        radioWrapper.classList.add("radio-container");
        radioWrapper.appendChild(radioInput);
        radioWrapper.appendChild(document.createTextNode(option));

        optionsEl.appendChild(radioWrapper);

        radioInput.addEventListener("change", () => {
            nextButton.disabled = false;
        });
    });

    prevButton.disabled = currentQuestionIndex === 0;
}

nextButton.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userResponses[currentQuestionIndex] = Array.from(document.querySelectorAll('input[name="answer"]')).indexOf(selectedOption);
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            calculateResults();
        }
    }
});

prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

function calculateResults() {
    const yearlyCO2 = userResponses.reduce((sum, index, i) => sum + questions[i].co2Impact[index], 0);
    const lifetimeCO2 = yearlyCO2 * 80; // Assume 80-year lifespan

    let badge;
    if (lifetimeCO2 < 1500000) {
        badge = "🌍 Eco Hero (Great job!)";
    } else if (lifetimeCO2 < 4000000) {
        badge = "🚗 Sustainability Starter (Room to improve!)";
    } else {
        badge = "🔥 Carbon Overloader (Time to rethink!)";
    }

    resultsEl.innerHTML = `
        <h3>Your Results</h3>
        <p><strong>Estimated Lifetime CO₂ Impact:</strong> ${lifetimeCO2.toLocaleString()} kg</p>
        <p><strong>Badge:</strong> ${badge}</p>
    `;
    resultsEl.style.display = "block";
    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    nextButton.style.display = "none";
    prevButton.style.display = "none";
}

loadQuestion();
