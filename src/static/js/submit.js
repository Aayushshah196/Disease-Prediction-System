const form = document.getElementById("search-personality");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  innerText = event.target["personality-text"].value;
  modelChoose =
    event.target["model"].options[event.target["model"].selectedIndex].value;

  const data = await displayResult(innerText, modelChoose);
  value = data["searchResult"];
  resultContainer = document.getElementById("result-container");
  resultContainer.innerText = `Your Personality type is ${value} 
  ${value[0]}: ${get(value[0])}
  ${value[1]}: ${get(value[1])}
  ${value[2]}: ${get(value[2])}
  ${value[3]}: ${get(value[3])}`;
  resultContainer.style.display = "block";
});

async function displayResult(text, model) {
  var queryUrl = "http://127.0.0.1:8000/";
  payload = {
    text: text,
    model: model,
  };
  settings = {
    method: "POST",
    headers: {
      "Content-type": "application/JSON",
    },
    body: JSON.stringify(payload),
  };
  response = await fetch(queryUrl, settings);
  var data = await response.json();
  return data;
}

dictionary = {
  E: "Extrovert",
  I: "Introvert",
  N: "Intuition",
  S: "Sensing",
  T: "Thinking",
  F: "Feeling",
  J: "Judging",
  P: "Perceiving",
};

function get(key) {
  var result = dictionary[key];
  return typeof result !== "undefined" ? result : "";
}