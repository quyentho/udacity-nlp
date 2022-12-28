import { checkInput } from "./nameChecker";
function handleSubmit(formText) {
  if (checkInput(formText)) {
    const body = {
      userInput: formText,
    };
    console.log("::: Form Submitted :::");
    fetch("http://localhost:8080/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(function (res) {
        console.log(res);

        const divSubject = document.createElement("div");
        divSubject.innerHTML = `Subjectivity: ${res.subjectivity}`;

        const divResult = document.getElementById("results");

        divResult.appendChild(divSubject);

        const divText = document.createElement("div");
        divText.innerHTML = "Text: ";
        divResult.appendChild(divText);
        const ul = document.createElement("ul");
        res.sentence_list.map((s) => {
          const li = document.createElement("li");
          li.innerText = `${s.text} (Polarity: ${s.score_tag})`;
          ul.appendChild(li);
        });
        divResult.appendChild(ul);
      });
  } else {
    alert("input cannot be empty");
  }
}

export { handleSubmit };
