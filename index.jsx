import { useEffect, useRef, useState } from "react";

// Scroll to Collections Section
const scrollToCollections = () => {
  const section = document.getElementById("collections");
  if (section) section.scrollIntoView({ behavior: "smooth" });
};

// Quote Slider Logic
const useQuoteSlider = () => {
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef(null);
  const total = 3;

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(autoplayRef.current);
  }, [total]);

  const showNext = () => {
    setCurrent((prev) => (prev + 1) % total);
    resetAutoplay();
  };

  const showPrev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
    resetAutoplay();
  };

  const resetAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3000);
  };

  return { current, showNext, showPrev };
};

// Quiz Logic
const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(-1);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const allQuestions = [
    { id: "q1", question: "Who won the Battle of Hastings?", correct: "b" },
    { id: "q2", question: "What document limited the king's power in 1215?", correct: "a" },
    { id: "q3", question: "Who was England's monarch during most of the 20th century?", correct: "c" },
    { id: "q4", question: "Who was the first Tudor monarch?", correct: "c" },
    { id: "q5", question: "In what year did the Battle of Hastings take place?", correct: "a" },
    { id: "q6", question: "What major event did the Magna Carta initiate?", correct: "b" },
    { id: "q7", question: "Who was queen during the Spanish Armada?", correct: "a" },
    { id: "q8", question: "What caused the English Civil War?", correct: "c" },
    { id: "q9", question: "Which king founded the Church of England?", correct: "b" },
    { id: "q10", question: "What was the Black Death?", correct: "c" }
  ];

  const startQuiz = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);
    setQuestions(selected);
    setStep(0);
    setScore(0);
    setShowResult(false);
  };

  const next = () => {
    setStep((prev) => prev + 1);
  };

  const back = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const submitAnswer = (id, value) => {
    const question = questions.find((q) => q.id === id);
    if (question && value === question.correct) {
      setScore((prev) => prev + 1);
    }
    next();
  };

  const restart = () => {
    setQuestions([]);
    setStep(-1);
    setScore(0);
    setShowResult(false);
  };

  useEffect(() => {
    if (step === questions.length && step > 0) {
      setShowResult(true);
    }
  }, [step]);

  return {
    questions,
    step,
    score,
    showResult,
    startQuiz,
    submitAnswer,
    restart,
    back
  };
};

// Navbar scroll detection (active link)
const useNavbarHighlight = () => {
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar a");

    const onScroll = () => {
      let closest = null;
      let offset = Infinity;
      sections.forEach((s) => {
        const top = Math.abs(s.getBoundingClientRect().top);
        if (top < offset) {
          offset = top;
          closest = s;
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${closest?.id}`) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
};

// Contact form reset
const useFormReset = () => {
  useEffect(() => {
    const form = document.querySelector(".contact-form");
    if (form) {
      const listener = () => {
        setTimeout(() => form.reset(), 100);
      };
      form.addEventListener("submit", listener);
      return () => form.removeEventListener("submit", listener);
    }
  }, []);
};

const Index = () => {
  // Call the hooks
  useEffect(() => {
    AOS.init({ once: false, mirror: true });
  }, []);

  const { current, showNext, showPrev } = useQuoteSlider();
  const quiz = useQuiz();
  useNavbarHighlight();
  useFormReset();

  return (
    <div>
      <header className="header">
  <div className="header-left"></div>
  <a href="#hero" className="logo">England's History</a>

  <input type="checkbox" id="check" />
  <label htmlFor="check" className="icons">
    <i className='bx bx-menu' id="menu-icon"></i>
    <i className='bx bx-x' id="close-icon"></i>
  </label>

  <nav className="navbar">
    <a href="#collections" style={{ "--i": 0 }}>Collections</a>
    <a href="#history" style={{ "--i": 1 }}>History</a>
    <a href="#modern-era" style={{ "--i": 2 }}>Modern Era</a>
    <a href="#contact" style={{ "--i": 3 }}>Contact</a>
  </nav>
</header>

      <section id="hero">
  <div className="hero-text">
    <hr className="line1" data-aos="fade-down" data-aos-duration="1000" />
    <div className="hero-text1" data-aos="fade-down" data-aos-duration="1000">
      <h2>England's Everlasting Past</h2>
    </div>
    <div className="hero-text2" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
      <h2>Chronicles of History</h2>
    </div>
    <hr className="line2" data-aos="zoom-in" data-aos-duration="1000" />
    <div className="hero-text3" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
      <p>Uncover England's timeless History.</p>
    </div>
    <button
      className="header-button"
      data-aos="fade-up"
      data-aos-delay="300"
      data-aos-duration="1000"
      onClick={scrollToCollections}
      id="dive-deeper"
    >
      Dive Deeper
    </button>
  </div>
</section>

      <section className="collections" id="collections">
  <article className="collection-text1">
    <h2>Explore the<br />Collections</h2>
  </article>

  <div className="collection-row">
    {/* Queen Elizabeth I */}
    <article className="collection-item" data-aos="fade-up" data-aos-duration="1000">
      <div className="image-container">
        <img src="Images/queenelizabethonee.png" alt="Queen Elizabeth I" className="collection-img" />
        <div className="image-overlay">
          <h3>Queen Elizabeth I</h3>
          <h3>1533–1603</h3>
          <p>The Virgin Queen who ruled England for 44 years.</p>
        </div>
        <div className="mobile-hint">Tap to view more</div>
      </div>
    </article>

    {/* William Shakespeare */}
    <article className="collection-item" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
      <div className="image-container">
        <img src="Images/williamcollectionimg.png" alt="William Shakespeare" className="collection-img" />
        <div className="image-overlay">
          <h3>William Shakespeare</h3>
          <h3>1564–1616</h3>
          <p>England's greatest playwright.</p>
        </div>
        <div className="mobile-hint">Tap to view more</div>
      </div>
    </article>

    {/* Isaac Newton */}
    <article className="collection-item" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
      <div className="image-container">
        <img src="Images/isaaccollectionimg.png" alt="Isaac Newton" className="collection-img" />
        <div className="image-overlay">
          <h3>Isaac Newton</h3>
          <h3>1643–1727</h3>
          <p>Father of modern physics.</p>
        </div>
        <div className="mobile-hint">Tap to view more</div>
      </div>
    </article>
  </div>
</section>

      <section className="history" id="history">
  <div className="scroll-frame" data-aos="zoom-in" data-aos-duration="500">
    <div className="history-text1" data-aos="fade-down" data-aos-delay="100" data-aos-duration="1000">
      <h2>England Through Time</h2>
    </div>

    <div className="history-p1" data-aos="fade-down" data-aos-delay="300" data-aos-duration="800">
      <p>Journey through the key eras and turning points that shaped<br />England’s history—from ancient beginnings to modern transformation.</p>
    </div>

    {/* Norman Conquest */}
    <div className="history-text1" data-aos="fade-down" data-aos-duration="1000">The Norman Conquest<br />(1066–1154)</div>
    <div className="history-container">
      <div className="history-boxes">
        <div className="history-box1" data-aos="fade-down" data-aos-delay="100">
          <div className="label1">Battle of Hastings (1066)</div>
          <div className="content">
            <h4>This was the battle that marked the turning point when William, Duke of Normandy, defeated King Harold II of England. The death of Harold in the battle allowed William to inherit the throne of England, thus marking the beginning of Norman domination of England.</h4>
          </div>
        </div>

        <div className="history-box2" data-aos="fade-down" data-aos-duration="1000">
          <div className="label2">Feudal System</div>
          <div className="content">
            <h4>Following the conquest, William introduced the feudal system, redistributing land to his Norman supporters. This change reshaped England’s political structure, replacing the Anglo-Saxon elite with Norman nobility and altering the country’s social hierarchy.</h4>
          </div>
        </div>

        <a className="learn-more" href="https://en.wikipedia.org/wiki/Norman_Conquest" target="_blank" rel="noreferrer">Learn more</a>
      </div>

      <img src="Images/williamtheconqueror.png" className="history-image1" data-aos="flip-down" data-aos-delay="100" data-aos-duration="1000" alt="William the Conqueror" />
    </div>

    {/* Magna Carta */}
    <div className="history-text2" data-aos="fade-down" data-aos-duration="1000">Magna Carta<br />(1215)</div>
    <div className="history-container">
      <div className="history-boxes">
        <div className="history-box3" data-aos="fade-down" data-aos-delay="100" data-aos-duration="1000">
          <div className="label3">Limitation of Royal Power</div>
          <div className="content">
            <h4>The Magna Carta limited the power of King John, establishing that the king was subject to the law, not above it.</h4>
          </div>
        </div>

        <div className="history-box4" data-aos="fade-down" data-aos-duration="1000">
          <div className="label4">Protection of Barons' Rights</div>
          <div className="content">
            <h4>The document granted protections to the barons, such as fair trials and protection from excessive taxation.</h4>
          </div>
        </div>

        <a className="learn-more" href="https://en.wikipedia.org/wiki/Magna_Carta" target="_blank" rel="noreferrer">Learn more</a>
      </div>

      <img src="Images/magnacarta.png" className="history-image2" alt="Magna Carta" data-aos="flip-up" data-aos-delay="100" data-aos-duration="1000" />
    </div>

    {/* War of Roses */}
    <div className="history-text3" data-aos="fade-down" data-aos-duration="1000">The War of Roses<br />(1455-1487)</div>
    <div className="history-container">
      <div className="history-boxes">
        <div className="history-box5" data-aos="fade-down" data-aos-delay="100" data-aos-duration="1000">
          <div className="label5">Rivalry Between Houses</div>
          <div className="content">
            <h4>The wars were fought between the Lancasters and the Yorks, two noble families vying for control of the English throne.</h4>
          </div>
        </div>

        <div className="history-box6" data-aos="fade-down" data-aos-duration="1000">
          <div className="label6">End of the Conflict</div>
          <div className="content">
            <h4>The wars ended in 1485 with Henry Tudor's victory at Bosworth Field, beginning the Tudor dynasty.</h4>
          </div>
        </div>

        <a className="learn-more" href="https://en.wikipedia.org/wiki/Wars_of_the_Roses" target="_blank" rel="noreferrer">Learn more</a>
      </div>

      <img src="Images/The-war-of-roses.png" className="history-image3" alt="The War of Roses" data-aos="flip-down" data-aos-delay="100" data-aos-duration="1000" />
    </div>
  </div>
</section>

      <section id="quote" className="quote">
  <div className="quote-container" data-aos="flip-down" data-aos-duration="1000">
    <div className="quote-text1">Quotes from the past</div>
    <hr className="line3" />

    <div className="quote-slider">
      <div className={`quote-slide ${current === 0 ? "active" : ""}`}>
        <h3>"To be, or not to be, that is the question."</h3>
        <h4>— William Shakespeare</h4>
      </div>
      <div className={`quote-slide ${current === 1 ? "active" : ""}`}>
        <h3>"I will have but one mistress here — and no master."</h3>
        <h4>— Queen Elizabeth I</h4>
      </div>
      <div className={`quote-slide ${current === 2 ? "active" : ""}`}>
        <h3>"We shall never surrender."</h3>
        <h4>— Winston Churchill</h4>
      </div>
    </div>

    <div className="quote-slider-controls">
      <button className="quote-prev" onClick={showPrev}>&#10094;</button>
      <button className="quote-next" onClick={showNext}>&#10095;</button>
    </div>
  </div>
</section>

      <section id="modern-era" className="modern-era">
  <div className="modern-container">
    <div className="modern-text1" data-aos="fade-right" data-aos-duration="1000">
      England: 20th Century to Today
    </div>

    <div className="modern-p1" data-aos="fade-up" data-aos-delay="200" data-aos-duration="700">
      <h4>
        The Modern Era in England marks a period of profound change, resilience, and reinvention.
        <br />
        From the aftermath of World War II to Brexit, England has continuously adapted to global shifts
        while shaping modern culture, politics, and technology.
      </h4>
    </div>

    <div className="flip-card-container">
      {/* Card 1 */}
      <div className="flip-card" id="post-war" data-aos="fade-up" data-aos-duration="1000">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="tap-hint">Tap to flip</div>
            <h3>Post-War Recovery</h3>
            <i className="bx bx-first-aid"></i>
            <div className="desktop-hint">Hover to flip</div>
          </div>
          <div className="flip-card-back">
            <h4>(1945–1960s)</h4>
            <ul>
              <li>Massive rebuilding after WWII destruction</li>
              <li>Establishment of the National Health</li>
              <li>Decolonization and the end of the British Empire</li>
              <li>Rise of the welfare state</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="flip-card" id="cultural-revolution" data-aos="fade-down" data-aos-delay="100" data-aos-duration="1000">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="tap-hint">Tap to flip</div>
            <h3>Cultural Revolution</h3>
            <i className="bx bx-building-house"></i>
            <div className="desktop-hint">Hover to flip</div>
          </div>
          <div className="flip-card-back">
            <h4>(1960s–1970s)</h4>
            <ul>
              <li>The "Swinging Sixties" in London: fashion, music, and youth culture</li>
              <li>The Beatles, The Rolling Stones, and the British Invasion</li>
              <li>Social liberalization: civil rights, women's rights, and reforms</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="flip-card" id="economic-shifts" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="tap-hint">Tap to flip</div>
            <h3>Economic and Political Shifts</h3>
            <i className="bx bx-bar-chart"></i>
            <div className="desktop-hint">Hover to flip</div>
          </div>
          <div className="flip-card-back">
            <h4>(1980s–1990s)</h4>
            <ul>
              <li>Margaret Thatcher's privatization & deregulation</li>
              <li>Strikes and economic tensions</li>
              <li>Rise of New Labour under Tony Blair</li>
              <li>Advances in technology and globalization</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Card 4 */}
      <div className="flip-card" id="modern-identity" data-aos="fade-down" data-aos-delay="300" data-aos-duration="1000">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="tap-hint">Tap to flip</div>
            <h3>Modern Challenges and Identity</h3>
            <i className="bx bx-globe"></i>
            <div className="desktop-hint">Hover to flip</div>
          </div>
          <div className="flip-card-back">
            <h4>(2000s–Present)</h4>
            <ul>
              <li>2005 London bombings and global terrorism</li>
              <li>2008 financial crisis</li>
              <li>Brexit and EU exit (2020)</li>
              <li>Ongoing debates on immigration, identity, and monarchy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      <section id="quiz" className="quiz-section">
  <h2 className="quiz-title" data-aos="fade-down">Test your knowledge!</h2>
  <div id="quiz-progress" className="quiz-progress">
    {quiz.step >= 0 && !quiz.showResult && `Question ${quiz.step + 1} of ${quiz.questions.length}`}
  </div>

  <div className="quiz-box" data-aos="fade-up" id="quiz-question">
    {/* Start screen */}
    {quiz.step === -1 && !quiz.showResult && (
      <div className="quiz-card active-question" id="start-screen">
        <h4 className="question-text">Ready to test your knowledge?</h4>
        <p>Challenge yourself with 3 quick questions about England's rich history.</p>
        <button className="next-btn" onClick={quiz.startQuiz}>Start the test</button>
      </div>
    )}

    {/* Quiz questions */}
    {quiz.questions.map((q, index) => (
      <div
        key={q.id}
        className={`quiz-card question-card ${quiz.step === index ? "active-question" : ""}`}
        style={{ display: quiz.step === index ? "block" : "none" }}
      >
        <p className="question-text">{q.question}</p>
        {["a", "b", "c"].map((choice) => (
          <label key={choice}>
            <input
              type="radio"
              name={q.id}
              value={choice}
              onChange={(e) => quiz.submitAnswer(q.id, e.target.value)}
              disabled={quiz.step > index || quiz.showResult}
            />
            {choice.toUpperCase()}
          </label>
        ))}
        {index > 0 && (
          <button className="next-btn" style={{ marginRight: "10px" }} onClick={quiz.back}>
            Back
          </button>
        )}
        {index < quiz.questions.length - 1 && (
          <button className="next-btn" onClick={quiz.next}>Next</button>
        )}
        {index === quiz.questions.length - 1 && (
          <button className="next-btn" onClick={() => quiz.setStep(quiz.questions.length)}>
            Finish
          </button>
        )}
      </div>
    ))}

    {/* Quiz result */}
    {quiz.showResult && (
      <div className="quiz-result">
        <p>You got {quiz.score} out of {quiz.questions.length} correct! 🎉</p>
        <button className="next-btn" onClick={quiz.restart}>Restart Quiz</button>
      </div>
    )}
  </div>
</section>

      <section id="contact" className="contact">
  <div className="contact-container">
    {/* Contact Text Info */}
    <div className="contact-info" data-aos="fade-down" data-aos-duration="1000">
      <h2>Let's get in touch!</h2>
      <h5 data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200">
        Have questions or feedback? Don't hesitate to contact us, we're all ears!
      </h5>
      <p data-aos="fade-down" data-aos-duration="1000" data-aos-delay="300">
        Email: sample123@gmail.com<br />
        Phone: +123 456 7890
      </p>

      {/* Social Links */}
      <div className="social-links" style={{ marginTop: "20px" }}>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <i className="fab fa-facebook-f" style={{ marginRight: "10px" }}></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <i className="fab fa-twitter" style={{ marginRight: "10px" }}></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <i className="fab fa-instagram" style={{ marginRight: "10px" }}></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          <i className="fab fa-linkedin-in" style={{ marginRight: "10px" }}></i>
        </a>
      </div>
    </div>

    {/* Contact Form */}
    <form
      data-aos="fade-up"
      data-aos-duration="1000"
      className="contact-form"
      action="https://formspree.io/f/xjkwnewq"
      method="POST"
    >
      <h3>Contact us!</h3>
      <input type="text" name="_gotcha" style={{ display: "none" }} />
      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
      <textarea name="message" rows="5" placeholder="Your Message" required />
      <button type="submit">Send</button>
    </form>
  </div>
</section>

            <footer className="footer">
        &copy; {new Date().getFullYear()} England's History. All Rights Reserved.
      </footer>
    </>
  );
};

export default Index;





