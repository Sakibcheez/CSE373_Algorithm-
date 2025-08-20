document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("uploadForm");
    const questionList = document.getElementById("questionsList");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const questionTitle = document.getElementById("questionTitle").value;
        const questionDescription = document.getElementById("questionDescription").value;
        const codeLanguage = document.getElementById("codeLanguage").value;
        const codeSolution = document.getElementById("codeSolution").value;

        const questionItem = document.createElement("div");
        questionItem.classList.add("question");

        const questionContent = `
            <h3>${questionTitle}</h3>
            <p><strong>Description:</strong> ${questionDescription}</p>
            <p><strong>Language:</strong> ${codeLanguage}</p>
            <pre><code class="language-${codeLanguage}">${codeSolution}</code></pre>
        `;

        questionItem.innerHTML = questionContent;
        questionList.appendChild(questionItem);

        // Reset form
        form.reset();

        // Highlight code
        hljs.highlightAll();
    });
});
