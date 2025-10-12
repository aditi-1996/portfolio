import React, { useState, useEffect, useCallback } from 'react';
import { Briefcase, Code, Mail, User, BookOpen, ArrowRight, Github, Linkedin, MessageSquare, GraduationCap } from 'lucide-react';

// --- Configuration Data ---
const CONFIG = {
  name: "Aditi Bhardwaj",
  taglines: ["Data Scientist", "Health Informatics Expert", "ML Enthusiast", "Data-Driven Innovator"],
  email: "bhardwajaditi20@outlook.com",
  phone: "+1 (317) 982-4562",
  kaggle: "https://kaggle.com/ad20iti",
  github: "https://github.com/aditi-1996",
  linkedin: "https://linkedin.com/in/bhardwajaditi/",
  aboutMe: "Driven by a passion for leveraging data and machine learning to solve complex challenges in public health and healthcare. My expertise spans cohort analysis, time series modeling, multi-modal machine learning pipelines, and developing explainable AI solutions, primarily utilizing Python and the latest cloud technologies (AWS, GCP). I aim to translate complex data into actionable insights that drive significant clinical and economic impact.",
  
  // New Experience Data from Resume
  experience: [
    { 
      title: "Data Scientist", 
      company: "Massive Data Institute | Georgetown University", 
      duration: "September 2023 - Present", 
      location: "Washington D.C.",
      bullets: [
        "Performed cohort-based analysis of 2020-2023 clinical datasets on 10,000+ MedStar Health mother-infant dyads to estimate preterm birth reductions using Risk Stratification, Logistic Regression, and Generalized Linear Model, yielding 600+ avoided preterm cases and $30M+ in savings.",
        "Quantified the ROI of MedStar Health's Safe Babies Safe Moms program by evaluating associated maternal and neonatal outcomes with risk-adjusted difference-in-differences analysis, validating findings through one-way sensitivity analyses to demonstrate cost-effectiveness of the program.",
        "Created a state-level AI Readiness Index and an interactive dashboard on Google Cloud Platform (GCP) to visualize AI policy trends, utilizing Legiscan API with Python, Elasticsearch, and NLP techniques to classify state legislative documents and generate comparative insights on governance strategies across pilot states."
      ]
    },
    { 
      title: "Data Scientist", 
      company: "Polis Center | Indiana University", 
      duration: "June 2022 - May 2023", 
      location: "Indianapolis, IN",
      bullets: [
        "Built R modules to compute community vulnerability scores and optimize public health resource allocation based on Social Assets and Vulnerability Indicators (SAVI), community data from American Community Survey (ACS), Indiana State Department of Health (ISDH), and the US Census Bureau Data.",
        "Built a multivariate time series forecasting model and Tableau dashboards to monitor healthcare KPIs and detect anomalies in claim patterns, enabling policymakers to make data-driven decisions on resource allocation."
      ]
    },
    { 
      title: "Data Scientist", 
      company: "School of Dentistry | Indiana University", 
      duration: "August 2021 - May 2022", 
      location: "Indianapolis, IN",
      bullets: [
        "Designed and implemented a multi-modal ML pipeline combining CNNs for dental radiographs with BERT-based NLP for EHR clinical notes, improving early disease detection accuracy by 80%.",
        "Developed an ensemble ML model that leverages gradient boosting and SVM to identify social determinants of health (SDoH) affecting COVID-19, accurately predicting mortality rates with over 85% precision."
      ]
    }
  ],

  projects: [
    { 
      title: "Perinatal Mood & Anxiety Disorder Outcome Modeling", 
      description: "Developed a longitudinal dataset of 4,000+ maternal-infant dyads (2022-2025) and applied XGBoost, Random Forest, and GLM to distinguish pre-existing vs. pregnancy-related PMADs, quantify clinical/economic burden, and project long-term impacts.", 
      tech: ["Python", "SQL", "XGBoost", "Random Forest", "GLM"], 
      link: "#" 
    },
    { 
      title: "Healthcare Claims & Patient Outcome Modeling", 
      description: "Built ML and statistical models on claims and MIMIC-IV datasets to detect fraud, forecast ICU length of stay, and predict readmissions, reducing insurer losses and improving hospital resource planning. Implemented clustering and autoencoders in TensorFlow to identify anomalies and cost drivers.", 
      tech: ["Python", "SQL", "TensorFlow", "MIMIC-IV"], 
      link: "#" 
    },
    { 
      title: "Explainable AI in Radiology Image Analysis Pipeline", 
      description: "Developed a CNN-based chest X-ray classification model (DenseNet121) on the NIH-14 dataset using AWS SageMaker, applying SHAP for pixel-level explainability to enhance radiologist trust and interpretability.", 
      tech: ["Python", "CNN", "AWS SageMaker", "SHAP"], 
      link: "https://github.com/aditi-1996/chest_xray_classification" 
    },
  ]
};

// --- Custom Hooks and Components ---

/**
 * Custom hook to manage the typing animation effect for the hero section.
 */
const useTypingEffect = (words, typingSpeed = 100, deletingSpeed = 50, delay = 1500) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (index >= words.length) setIndex(0);

    // Typing logic
    if (subIndex < words[index].length && !reverse) {
      const timeout = setTimeout(() => {
        setSubIndex((prev) => prev + 1);
        setText(words[index].substring(0, subIndex + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } 
    // Wait at the end of the word
    else if (subIndex === words[index].length && !reverse) {
      const timeout = setTimeout(() => setReverse(true), delay);
      return () => clearTimeout(timeout);
    }
    // Deleting logic
    else if (subIndex > 0 && reverse) {
      const timeout = setTimeout(() => {
        setSubIndex((prev) => prev - 1);
        setText(words[index].substring(0, subIndex - 1));
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    }
    // Switch to the next word
    else if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
    }
  }, [subIndex, index, reverse, words, typingSpeed, deletingSpeed, delay]);

  return text;
};


/**
 * Header Component - Fixed navigation bar
 */
const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm shadow-lg">
    <div className="container mx-auto flex justify-between items-center p-4 sm:p-6">
      <h1 className="text-xl font-extrabold text-white tracking-widest">
        {CONFIG.name.toUpperCase().split(' ')[0]}<span className="text-indigo-400">.DEV</span>
      </h1>
      <nav className="hidden md:flex space-x-8">
        {/* Navigation updated: 'Skills' changed to 'Experience' */}
        {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-gray-300 hover:text-indigo-400 transition duration-300 font-medium tracking-wide"
          >
            {item}
          </a>
        ))}
      </nav>
      {/* Mobile Menu Icon Placeholder */}
      <div className="md:hidden">
        <button className="text-gray-300 hover:text-indigo-400 p-2 rounded-md">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
    </div>
  </header>
);

/**
 * Hero Section - Includes the typing animation
 */
const Hero = ({ typedText }) => {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Animation (Subtle Floating Dots) */}
            <div className="absolute inset-0 bg-gray-900 z-0">
                <div className="dots-background">
                    {[...Array(50)].map((_, i) => (
                        <div 
                            key={i} 
                            className="absolute bg-indigo-500 rounded-full opacity-10 blur-sm" 
                            style={{
                                width: `${Math.random() * 4 + 2}px`, 
                                height: `${Math.random() * 4 + 2}px`, 
                                top: `${Math.random() * 100}vh`, 
                                left: `${Math.random() * 100}vw`,
                                animation: `float ${Math.random() * 20 + 10}s infinite alternate ease-in-out`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="relative z-10 text-center px-4">
                <p className="text-xl sm:text-2xl text-gray-300 mb-2 font-light">Hello, I'm</p>
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-tight">
                    {CONFIG.name}
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-indigo-400">
                    I am a <span className="font-bold">{typedText}</span>
                    <span className="inline-block w-1 bg-white ml-1 animate-pulse">|</span>
                </h2>
                <div className="flex justify-center space-x-6 mt-10">
                    <a href="#projects" className="group flex items-center bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-500 transition duration-300 transform hover:scale-105 font-semibold text-lg">
                        View Projects <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </div>

            {/* Custom CSS for the subtle background animation */}
            <style jsx="true">{`
                @keyframes float {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(calc(var(--rand-x, 1) * 50px), calc(var(--rand-y, 1) * 50px)); }
                }
                .dots-background > div {
                    --rand-x: ${Math.random() > 0.5 ? 1 : -1};
                    --rand-y: ${Math.random() > 0.5 ? 1 : -1};
                }
            `}</style>
        </section>
    );
};


/**
 * Section Title Component
 */
const SectionTitle = ({ id, icon: Icon, title }) => (
    <div id={id} className="pt-24 mb-12 text-center">
        <Icon className="w-10 h-10 mx-auto text-indigo-400 mb-2" />
        <h2 className="text-4xl font-extrabold text-white mb-2">{title}</h2>
        <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full"></div>
    </div>
);


/**
 * About Section
 */
const About = () => (
  <section className="min-h-screen container mx-auto px-4 md:px-8">
    <SectionTitle id="about" icon={User} title="About Me" />
    <div className="max-w-4xl mx-auto bg-gray-800 p-8 sm:p-12 rounded-2xl shadow-2xl border-t-4 border-indigo-500">
      <p className="text-lg text-gray-300 leading-relaxed font-light mb-8">
        {CONFIG.aboutMe}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300">
        <div>
          <p className="font-semibold text-white">Full Name:</p>
          <p>{CONFIG.name}</p>
        </div>
        <div>
          <p className="font-semibold text-white">Email:</p>
          <a href={`mailto:${CONFIG.email}`} className="text-indigo-400 hover:underline">{CONFIG.email}</a>
        </div>
        <div className="sm:col-span-2">
            <p className="font-semibold text-white mb-2">Social Profiles:</p>
            <div className="flex space-x-4">
                <a href={CONFIG.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300 p-2 bg-gray-700 rounded-full" aria-label="Kaggle Profile">
                    <GraduationCap className="w-6 h-6" /> {/* Using GraduationCap for the academic/data theme */}
                </a>
                <a href={CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300 p-2 bg-gray-700 rounded-full" aria-label="LinkedIn Profile">
                    <Linkedin className="w-6 h-6" />
                </a>
            </div>
        </div>
      </div>
    </div>
  </section>
);


/**
 * Experience Section (Replaces Skills)
 */
const Experience = () => (
  <section className="min-h-screen container mx-auto px-4 md:px-8">
    {/* ID updated to 'experience' for navigation */}
    <SectionTitle id="experience" icon={Briefcase} title="Work Experience" />
    <div className="max-w-4xl mx-auto space-y-12">
      {CONFIG.experience.map((job, index) => (
        <div 
          key={index} 
          className="relative pl-8 md:pl-16 group transition duration-500"
        >
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-4 top-0 h-full w-0.5 bg-gray-700 group-hover:bg-indigo-500 transition duration-500"></div>
          
          {/* Icon Circle */}
          <div className="absolute -left-2 md:left-2.5 top-2 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center border-4 border-gray-900 group-hover:scale-110 transition duration-300">
            <Briefcase className="w-3 h-3 text-white" />
          </div>

          {/* Job Card */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-indigo-500 transition duration-500 transform group-hover:-translate-y-1">
            <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-1">{job.duration}</p>
            <h3 className="text-2xl font-bold text-white mb-1">{job.title}</h3>
            <p className="text-lg text-gray-300 font-medium mb-4">{job.company} - <span className="text-gray-500 font-normal italic">{job.location}</span></p>
            
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              {job.bullets.map((bullet, i) => (
                <li key={i} className="text-base leading-relaxed">{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </section>
);

/**
 * Project Card Component
 */
const ProjectCard = ({ project }) => (
    <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition duration-500 group">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition duration-300">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map(t => (
            <span key={t} className="text-xs font-medium bg-gray-700 text-indigo-300 px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>
        {project.link && (
          <a 
            href={project.link} 
            className="flex items-center text-indigo-400 font-semibold hover:text-indigo-300 transition duration-300"
          >
          Link <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        )}
      </div>
    </div>
);


/**
 * Projects Section
 */
const Projects = () => (
  <section className="min-h-screen container mx-auto px-4 md:px-8">
    <SectionTitle id="projects" icon={Code} title="Featured Projects" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {CONFIG.projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  </section>
);

/**
 * Contact Section
 */
const Contact = () => (
    <section className="container mx-auto px-4 md:px-8 py-20">
        <SectionTitle id="contact" icon={Mail} title="Get In Touch" />
        <div className="max-w-3xl mx-auto bg-gray-800 p-8 sm:p-12 rounded-2xl shadow-2xl border-b-4 border-indigo-500">
            <p className="text-xl text-gray-300 text-center mb-8">
                I'm currently available for new opportunities and collaborations. Feel free to reach out!
            </p>
            
            {/* Contact Information */}
            <div className="flex justify-center space-x-10 mb-10">
                <div className="text-center">
                    <Mail className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                    <p className="text-white font-medium">Email</p>
                    <a href={`mailto:${CONFIG.email}`} className="text-gray-400 hover:text-indigo-400 transition">{CONFIG.email}</a>
                </div>
                {/* <div className="text-center">
                    <Phone className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                    <p className="text-white font-medium">Phone</p>
                    <a href={`tel:${CONFIG.phone}`} className="text-gray-400 hover:text-indigo-400 transition">{CONFIG.phone}</a>
                </div> */}
            </div>

            {/* Note on Form Functionality */}
        </div>
    </section>
);


/**
 * Main App Component
 */
const App = () => {
  // Use the typing effect hook
  const typedText = useTypingEffect(CONFIG.taglines);

  useEffect(() => {
    // Add smooth scrolling for anchor links globally
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 font-sans antialiased text-white">
      <Header />
      <main>
        <Hero typedText={typedText} />
        <About />
        {/* Replaced Skills with Experience */}
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} {CONFIG.name}</p>
      </footer>
    </div>
  );
};

export default App;
