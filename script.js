document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("uploadForm");
    const questionList = document.getElementById("questionsList");
    const displayButton = document.getElementById("displayButton");

    // Array to hold the questions and answers
    let questions = [];

    // Event listener for form submission to upload question and answer
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get the input values
        const questionTitle = document.getElementById("questionTitle").value;
        const questionDescription = document.getElementById("questionDescription").value;
        const codeLanguage = document.getElementById("codeLanguage").value;
        const codeSolution = document.getElementById("codeSolution").value;

        // Create an object for the question data
        const questionData = {
            title: questionTitle,
            description: questionDescription,
            language: codeLanguage,
            solution: codeSolution,
        };

        // Add the question to the array
        questions.push(questionData);

        // Reset form after submission
        form.reset();

        // Save the questions to a .txt file
        saveQuestionsToFile();

        // Display the question
        displayQuestion(questionData);
    });

    // Function to save questions to a .txt file
    function saveQuestionsToFile() {
        let fileContent = "DSA Questions and Solutions\n\n";

        // Loop through each question and format it
        questions.forEach((question, index) => {
            fileContent += `Question ${index + 1}:\n`;
            fileContent += `Title: ${question.title}\n`;
            fileContent += `Description: ${question.description}\n`;
            fileContent += `Language: ${question.language}\n`;
            fileContent += `Solution:\n${question.solution}\n\n`;
        });

        // Create a Blob from the text content
        const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });

        // Save the file using FileSaver.js
        saveAs(blob, "dsa_questions.txt");
    }

    // Function to display a question's title, description, and solution code on the page
    function displayQuestion(question) {
        const questionItem = document.createElement("div");
        questionItem.classList.add("question");

        const questionContent = `
            <h3>${question.title}</h3>
            <p><strong>Description:</strong> ${question.description}</p>
            <p><strong>Language:</strong> ${question.language}</p>
            <pre><code class="language-${question.language}">${question.solution}</code></pre>
        `;

        questionItem.innerHTML = questionContent;
        questionList.appendChild(questionItem);

        // Apply syntax highlighting using highlight.js
        hljs.highlightAll();
    }

    // Display the questions when the "Display Code" button is clicked
    displayButton.addEventListener("click", function () {
        questionList.innerHTML = ""; // Clear the current list before displaying the questions
        questions.forEach(displayQuestion); // Display all questions
    });
});
