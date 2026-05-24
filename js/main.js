const milestones = [
  {
    top: "75%",
    left: "20%",
    text: "Graduated Rutgers University with Cell Bio/Neuroscience degree, 2020.",
  },
  {
    top: "65%",
    left: "40%",
    text: "Worked as a medical scribe at CityMd, 2021.",
  },
  {
    top: "50%",
    left: "60%",
    text: "Worked as a medical-legal assistant for orthopedist, 2023.",
  },
  {
    top: "40%",
    left: "50%",
    text: "Discovered AI in the workplace & Gained interest in tech, 2024.",
  },
  {
    top: "30%",
    left: "55%",
    text: "Joined Align CS Masters at Northeastern in Jan 2025.",
  },
  {
    top: "10%",
    left: "52%",
    text: "Interned at BirthModel Startup, Nov 2025-Jan 2026.",
  },
  { top: "-10%", left: "42%", text: "Goal: SWE at Health Tech Company." },
];

const button = document.querySelector("#journey-btn");
const counter = document.querySelector("#journey-counter");
counter.textContent = "0 of " + milestones.length;

const hikerGroup = document.querySelector(".hiker-group");
const bubble = document.querySelector(".bubble");

let step = 0;
button.addEventListener("click", () => {
  if (step >= milestones.length) {
    // reset the initial conditions
    step = 0;
    hikerGroup.style.top = "";
    hikerGroup.style.left = "";
    bubble.textContent = "";
    counter.style.color = "";
    counter.textContent = "0 of " + milestones.length;
    return;
  } else if (step === milestones.length - 1) {
    // last step
    bubble.classList.remove("bubble-top");
    bubble.classList.add("bubble-right");
    counter.style.color = "green";
  } else {
    // main journey
    bubble.classList.remove("bubble-right");
    bubble.classList.add("bubble-top");
    counter.style.color = "red";
  }

  // main step to move hiker and show bubble
  const m = milestones[step];
  hikerGroup.style.top = m.top;
  hikerGroup.style.left = m.left;
  bubble.textContent = m.text;

  step++;
  counter.textContent = step + " of " + milestones.length;
});
