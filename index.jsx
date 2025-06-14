import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './style.css';

function App() {
  const collectionsRef = useRef(null);
  const quizRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');
  const [quizState, setQuizState] = useState({ started: false, questions: [], current: 0, score: 0 });

  // Initialize AOS
  useEffect(() => {
    AOS.init({ once: false, mirror: true });
  }, []);

  // Scroll to collections
  const scrollToCollections = () => {
    collectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Highlight active nav link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let closest = null;
      let minOffset = Infinity;

      sections.forEach(section => {
        const offset = Math.abs(section.getBoundingClientRect().top);
        if (offset < minOffset) {
          minOffset = offset;
          closest = section.getAttribute('id');
        }
      });

      setActiveSection(closest);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Quiz logic
  const allQuestions = [
    { q: 'Who won the Battle of Hastings?', a: 'b', options: ['Harold II', 'William the Conqueror', 'Henry VII'] },
    { q: "What document limited the king's power in 1215?", a: 'a', options: ['Magna Carta', 'Royal Charter', 'Bill of Rights'] },
    { q: "Who was England's monarch during most of the 20th century?", a: 'c', options: ['Queen Victoria', 'King George VI', 'Queen Elizabeth II'] }
  ];

  const startQuiz = () => {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 3);
    setQuizState({ started: true, questions: shuffled, current: 0, score: 0 });
  };

  const handleAnswer = (choice) => {
    const currentQ = quizState.questions[quizState.current];
    const correct = ['a', 'b', 'c'].indexOf(choice) === currentQ.options.indexOf(currentQ.options[currentQ.a.charCodeAt(0) - 97]);
    setQuizState(prev => ({
      ...prev,
      score: correct ? prev.score + 1 : prev.score,
      current: prev.current + 1
    }));
  };

  const restartQuiz = () => setQuizState({ started: false, questions: [], current: 0, score: 0 });

  return (
    <div>
      <header className="header">
        <a href="#" className="logo">England's History</a>
        <nav className="navbar">
          {['collections', 'history', 'modern-era', 'quiz', 'contact'].map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              style={{ '--i': i }}
              className={activeSection === id ? 'active' : ''}
            >
              {id.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </a>
          ))}
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
          >
            Dive Deeper
          </button>
        </div>
      </section>

      <main className="main-content">
        <section className="collections" id="collections" ref={collectionsRef}>
          <article className="collection-text1">
            <h2>Explore the<br />Collections</h2>
          </article>
          <div className="collection-row">
            {[
              { img: 'Images/queenelizabethonee.png', title: 'Queen Elizabeth I', years: '1533–1603', desc: 'The Virgin Queen who ruled England for 44 years.' },
              { img: 'Images/williamcollectionimg.png', title: 'William Shakespeare', years: '1564–1616', desc: "England's greatest playwright." },
              { img: 'Images/isaaccollectionimg.png', title: 'Isaac Newton', years: '1643–1727', desc: 'Father of modern physics.' }
            ].map(({ img, title, years, desc }, index) => (
              <article
                key={index}
                className="collection-item"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="1000"
              >
                <div className="image-container">
                  <img src={img} alt={title} className="collection-img" />
                  <div className="image-overlay">
                    <h3>{title}</h3>
                    <h3>{years}</h3>
                    <p>{desc}</p>
                  </div>
                  <div className="mobile-hint">Tap to view more</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="quiz" ref={quizRef} className="quiz-section">
          <h2 className="quiz-title" data-aos="fade-down">Test your knowledge!</h2>
          {!quizState.started ? (
            <div className="quiz-card active-question">
              <h4 className="question-text">Ready to test your knowledge?</h4>
              <p>Challenge yourself with 3 quick questions about England's rich history.</p>
              <button className="next-btn" onClick={startQuiz}>Start the test</button>
            </div>
          ) : quizState.current < quizState.questions.length ? (
            <div className="quiz-card active-question">
              <p className="question-text">{quizState.questions[quizState.current].q}</p>
              {quizState.questions[quizState.current].options.map((opt, i) => (
                <label key={i}>
                  <input type="radio" name="option" onClick={() => handleAnswer(['a', 'b', 'c'][i])} /> {opt}
                </label>
              ))}
            </div>
          ) : (
            <div className="quiz-card active-question">
              <p>You got {quizState.score} out of {quizState.questions.length} correct! 🎉</p>
              <button className="next-btn" onClick={restartQuiz}>Restart Quiz</button>
            </div>
          )}
        </section>

        <section id="contact" className="contact">
          <div className="contact-container">
            <div className="contact-info" data-aos="fade-down" data-aos-duration="1000">
              <h2>Let's get in touch!</h2>
              <h5>Have questions or feedback? We're all ears!</h5>
              <p>Email: sample123@gmail.com<br />Phone: +123 456 7890</p>
            </div>
            <form className="contact-form" action="https://formspree.io/f/xjkwnewq" method="POST">
              <h3>Contact us!</h3>
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

