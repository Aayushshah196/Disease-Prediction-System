$(document).ready(function () {
    var ctx = document.getElementById("myChart1").getContext("2d");
    var barColors = ["red", "green", "blue", "orange", "brown"];
    
    context = {
      x_values: [
        "Decision Tree",
        "Random Forest Classifier",
        "Naive Bayes Classifier",
        "K Nearest Neighbor",
        "Logisitic Regression"
      ],
      y_values: [
        [100-100*0.9927, 100-100*0.9869, 100-100*0.9927, 100-100*0.9938, 100-100*0.9927],
        [100-100*0.9919, 100-100*0.9846, 100-100*0.9919, 100-100*0.9932, 100-100*0.9919],
        [100-100*0.9920, 100-100*0.9849, 100-100*0.9920, 100-100*0.9932, 100-100*0.9920],
      ],
    };
    new Chart(ctx, {
      type: "bar",
      data: {
        datasets: context.x_values.map((element, i) => {
          return {
            label: element,
            data: [context.y_values[0][i]],
            backgroundColor: barColors[i],
          };
        }),
      },
      options: {
        title: {
          display: true,
          text: "1-Precision % (Macro Average)",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    var ctx2 = document.getElementById("myChart2").getContext("2d");
    new Chart(ctx2, {
      type: "bar",
      data: {
        datasets: context.x_values.map((element, i) => {
          return {
            label: element,
            data: [context.y_values[1][i]],
            backgroundColor: barColors[i],
          };
        }),
      },
      options: {
        title: {
          display: true,
          text: "1-Recall % (Macro Average)",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    var ctx3 = document.getElementById("myChart3").getContext("2d");
    new Chart(ctx3, {
      type: "bar",
      data: {
        datasets: context.x_values.map((element, i) => {
          return {
            label: element,
            data: [context.y_values[2][i]],
            backgroundColor: barColors[i],
          };
        }),
      },
      options: {
        title: {
          display: true,
          text: "1-F1Score % (Macro Average)",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  });