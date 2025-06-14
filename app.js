// "Dive Deeper" to collections section
document.getElementById('dive-deeper').addEventListener('click', scrollToCollections);

window.addEventListener('load', AOS.refresh);

function scrollToCollections() {
    const collectionSection = document.getElementById('collections');
    collectionSection.scrollIntoView({behavior: 'smooth'});
}

document.addEventListener("DOMContentLoaded", function () {
    // Quote slider
    const slides = document.querySelectorAll('.quote-slide');
    const nextBtn = document.querySelector('.quote-next');
    const prevBtn = document.querySelector('.quote-prev');
    let current = 0;
    let autoplayInterval;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === current);
        });
    }

    function showNextSlide() {
        current = (current + 1) % slides.length;
        updateSlides();
    }

    function showPrevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        updateSlides();
    }

    if (nextBtn && prevBtn && slides.length) {
        nextBtn.addEventListener('click', () => {
            showNextSlide();
            resetAutoplay();
        });

        prevBtn.addEventListener('click', () => {
            showPrevSlide();
            resetAutoplay();
        });

        updateSlides();

        // Autoplay every 3 seconds
        function startAutoplay() {
            autoplayInterval = setInterval(showNextSlide, 3000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        startAutoplay();
    }

    // Form reset
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            setTimeout(() => {
                contactForm.reset();
            }, 100);
        });
    }
});

// Quiz

// Next question button and Update Progress

function updateProgress(index) {
    const progressDiv = document.getElementById("quiz-progress");
    progressDiv.textContent = `Question ${index + 1} of ${window.activeQuestions.length}`;
}

function nextQuestion(btn) {
    const currentCard = btn.closest(".quiz-card");
    const selected = currentCard.querySelector('input[type="radio"]:checked');

    if (!selected) {
        alert("Please select an answer before continuing");
        return;
    }

    const index = window.activeQuestions.indexOf(currentCard);
    currentCard.classList.remove("active-question");
    currentCard.style.display = "none";

    const nextCard = window.activeQuestions[index + 1];
    if (nextCard) {
        nextCard.classList.add("active-question");
        nextCard.style.display = "block";
        updateProgress(index + 1);
    } else {
        showResult();
    }
}

function prevQuestion(btn) {
    const currentCard = btn.closest(".quiz-card");
    const index = window.activeQuestions.indexOf(currentCard);

    if (index > 0) {
        currentCard.classList.remove("active-question");
        currentCard.style.display = "none";

        const prevCard = window.activeQuestions[index - 1];
        prevCard.classList.add("active-question");
        prevCard.style.display = "block";
        updateProgress(index - 1);
    }
}

// Show result

function showResult() {
  const answers = {
    q1: "b",
    q2: "a",
    q3: "c",
    q4: "c",
    q5: "a",
    q6: "b",
    q7: "a",
    q8: "c",
    q9: "b",
    q10: "c"
  };

  let score = 0;

window.activeQuestions.forEach(card => {
  const radios = card.querySelectorAll("input[type='radio']");
  radios.forEach(radio => {
    const label = radio.closest("label");
    radio.disabled = true;

    const name = radio.name;
    const correct = answers[name];

    if (radio.value === correct) {
      label.style.color = "green";
      label.style.fontWeight = "bold";
    }

    if (radio.checked && radio.value !== correct) {
      label.style.color = "red";
      label.style.fontWeight = "bold";
    }

    if (radio.checked && radio.value === correct) {
      score++;
    }
  });

  card.classList.remove("active-question");
  card.style.display = "block";

  const buttons = card.querySelectorAll("button");
  buttons.forEach(btn => btn.style.display = "none");
});

  const resultDiv = document.getElementById("quiz-result");
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <p>You got ${score} out of ${window.activeQuestions.length} correct! 🎉</p>
    <button onclick="restartQuiz()" class="next-btn">Restart Quiz</button>
  `;
}

// Restart Quiz

function restartQuiz() {
    const questionContainer = document.getElementById("quiz-question");

    const allQuestions = Array.from(document.querySelectorAll(".quiz-card.question-card"));
    allQuestions.forEach(card => {
        const radios = card.querySelectorAll("input[type='radio']");
        radios.forEach(radio => {
            radio.checked = false;
            radio.disabled = false;
            const label = radio.closest("label");
            if (label) {
                label.style.color = "";
                label.style.fontWeight = "";
            }
        });

        const buttons = card.querySelectorAll("button");
        buttons.forEach(btn => btn.remove());

        card.classList.remove("active-question");
        card.style.display = "none";
        if (!questionContainer.contains(card)) {
            questionContainer.appendChild(card);
        }
    });

    document.getElementById("quiz-result").innerHTML = "";
    document.getElementById("quiz-result").style.display = "none";
    document.getElementById("quiz-progress").textContent = "";

    const startScreen = document.getElementById("start-screen");
    startScreen.classList.add("active-question");
    startScreen.style.display = "block";
}

// Start Quiz

function startQuiz() {
    const startScreen = document.getElementById("start-screen");
    startScreen.classList.remove("active-question");
    startScreen.style.display = "none";

    const questionContainer = document.getElementById("quiz-question");
    const allQuestions = Array.from(document.querySelectorAll(".quiz-card.question-card"));

    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);
    window.activeQuestions = selected;

    allQuestions.forEach(q => {
        q.style.display = "none";
        q.classList.remove("active-question");
        const oldBtns = q.querySelectorAll("button");
        oldBtns.forEach(btn => btn.remove());
    });

    selected.forEach((card, index) => {
        const nextBtn = document.createElement("button");
        nextBtn.className = "next-btn";
        nextBtn.textContent = index === selected.length - 1 ? "Finish" : "Next";
        nextBtn.setAttribute("onclick", index === selected.length - 1 ? "showResult()" : "nextQuestion(this)");

        card.appendChild(nextBtn);

        if (index > 0) {
            const backBtn = document.createElement("button");
            backBtn.className = "next-btn";
            backBtn.textContent = "Back";
            backBtn.style.marginRight = "10px";
            backBtn.setAttribute("onclick", "prevQuestion(this)");
            card.insertBefore(backBtn, nextBtn);
        }

        card.classList.remove("active-question");
        card.style.display = "none";
        questionContainer.appendChild(card);
    });

    selected[0].classList.add("active-question");
    selected[0].style.display = "block";
    updateProgress(0);
}

// NavBar 

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar a");

    function onScroll() {
    let closestSection = null;
    let closestOffset = Infinity;

    sections.forEach(section => {
        const offset = Math.abs(section.getBoundingClientRect().top);
        if (offset < closestOffset) {
            closestOffset = offset;
            closestSection = section;
        }
    });

    const currentSectionId = closestSection ? closestSection.getAttribute("id") : null;

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
        }
    });
}

    window.addEventListener("scroll", onScroll);
    onScroll();
});

// Mobile
document.addEventListener("DOMContentLoaded", () => {
    const hintElements = document.querySelectorAll(".mobile-hint, .tap-hint");

    function updateHintVisibility() {
        const isMobile = window.innerWidth <= 768;
        hintElements.forEach(hint => {
        });
    }

    updateHintVisibility();
    window.addEventListener("resize", updateHintVisibility);

  if (window.innerWidth <= 768) {
    document.querySelectorAll('.collection-item').forEach(item => {
      item.addEventListener('click', function (e) {
        e.stopPropagation();
        this.classList.toggle('active');
      });
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.collection-item.active').forEach(active => {
        active.classList.remove('active');
      });
    });
  }
});