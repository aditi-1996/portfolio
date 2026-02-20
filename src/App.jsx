import React, { useState, useEffect, useCallback } from 'react';
import { Briefcase, Code, Mail, User, Phone, ArrowRight, Github, Linkedin, File, Sun, Moon } from 'lucide-react';
import { FaKaggle, FaMedium } from 'react-icons/fa6';

// --- Configuration Data ---
const CONFIG = {
  name: "Aditi Bhardwaj",
  taglines: ["Data Scientist", "Health Informatics Expert", "ML Enthusiast", "Data-Driven Innovator"],
  email: "bhardwajaditi20@outlook.com",
  phone: "+1 (317) 982-4562",
  linkedin: "https://linkedin.com/in/bhardwajaditi/",
  medium: "https://medium.com/@bhardwajaditi203",
  github: "https://github.com/aditi-1996",
  kaggle: "https://kaggle.com/ad20iti",
  resume: "https://drive.google.com/file/d/18yr1-TJmafsT4aUHjWOG_-GXxG74kRwK/view?usp=sharing", 
  aboutMe: "Driven by a passion for leveraging data and machine learning to solve complex challenges in public health and healthcare. My expertise spans cohort analysis, time series modeling, multi-modal machine learning pipelines, and developing explainable AI solutions, primarily utilizing Python and the latest cloud technologies (AWS, GCP). I aim to translate complex data into actionable insights that drive significant clinical and economic impact.",
  
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
      title: "StateIQ: A National AI Readiness Index",
      description: "A data pipeline and interactive dashboard that measures U.S. state-level AI readiness by scraping, indexing, and analyzing thousands of legislative bills and executive orders across 8 policy dimensions — infrastructure, environment, data, privacy & security, perception, education & workforce, accessibility, and equity & diversity.",
      tech: ["Python", "Legiscan API", "NLP", "Google Cloud Storage", "Elasticsearch", "Pandas", "Git"],
      link: ""
    },
    {
      title: "Spending to Outcomes: A National School and District Finance Explorer",
      description: "An end-to-end data platform that scrapes school-level and district-level financial and academic data from ESSA Report Card portals — using Requests to query hidden API endpoints and Playwright for dynamic page automation — then maps per-pupil expenditures against student academic outcomes at the school and district level across U.S. states, enabling policymakers and education leaders to identify which schools and districts are maximizing their resource investments.",
      tech: ["Python", "Playwright", "asyncio", "Requests", "openpyxl", "R", "R Shiny (prototyping & statistical modeling)", "Tableau (production dashboard)", "ggplot2", "dplyr", "tidyr", "Git"],
      link: ""
    },
    {
      title: "Perinatal Mood & Anxiety Disorder Outcome Modeling", 
      description: "Developed a longitudinal dataset of 4,000+ maternal-infant dyads (2022-2025) and applied XGBoost, Random Forest, and GLM to distinguish pre-existing vs. pregnancy-related PMADs, quantify clinical/economic burden, and project long-term impacts.", 
      tech: ["Python", "SQL", "XGBoost", "Random Forest", "GLM"], 
      link: "" 
    },
    { 
      title: "Healthcare Claims & Patient Outcome Modeling", 
      description: "Built ML and statistical models on claims and MIMIC-IV datasets to detect fraud, forecast ICU length of stay, and predict readmissions, reducing insurer losses and improving hospital resource planning. Implemented clustering and autoencoders in TensorFlow to identify anomalies and cost drivers.", 
      tech: ["Python", "SQL", "TensorFlow", "MIMIC-IV"], 
      link: "" 
    },
    { 
      title: "Explainable AI in Radiology Image Analysis Pipeline", 
      description: "Developed a CNN-based chest X-ray classification model (DenseNet121) on the NIH-14 dataset using AWS SageMaker, applying SHAP for pixel-level explainability to enhance radiologist trust and interpretability.", 
      tech: ["Python", "CNN", "AWS SageMaker", "SHAP"], 
      link: "https://github.com/aditi-1996/chest_xray_classification"
    },
    {
      title: "Automated Weather ETL Pipeline Using Apache Airflow",
      description: "Created an ETL pipeline using Apache Airflow and Python to automate the extraction, transformation, and loading of location-based weather data into PostgreSQL, containerizing the entire workflow with Docker.",
      tech: ["Python", "SQL", "PostgreSQL", "Airflow", "Docker"],
      link: "https://github.com/aditi-1996/airflow-weather-etl"
    },
    { 
      title: "Real-Time Log Streaming and Monitoring",
      description: "Built an end-to-end log processing pipeline using Kafka, Filebeat, Elasticsearch, Logstash, and Kibana for real-time ingestion, transformation, and visualization of application logs for improved observability.",
      tech: ["Python", "ELK stack"],
      link: "https://github.com/aditi-1996/elk-kafka-project"
    },
    {
      title: "Transaction Fraud Detection Model",
      description: "Built an end-to-end fraud-detection pipeline on card transactions data, performing feature engineering, class-imbalance handling, and model benchmarking achieving 94% accuracy in flagging fraudulent transactions.",
      tech: ["Python", "Scikit-Learn", "Logistic Regression", "XGBoost"],
      link: ""
    }
  ]
};

// --- Theme Utility ---

/**
 * Maps element type and current theme to appropriate Tailwind CSS classes.
 */
const getThemeClasses = (type, theme) => {
    const isDark = theme === 'dark';
    
    switch (type) {
        // Main structural background and text colors
        case 'main-bg': return isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
        
        // Header styling (includes backdrop blur)
        case 'header-bg': return isDark ? 'bg-gray-900/90 shadow-lg' : 'bg-white/90 shadow-md border-b border-gray-200';
        
        // Card/Section background (slightly lighter than main bg in dark mode)
        case 'card-bg': return isDark ? 'bg-gray-800' : 'bg-gray-100';
        
        // General text color variations
        case 'primary-text': return isDark ? 'text-white' : 'text-gray-900';
        case 'secondary-text': return isDark ? 'text-gray-300' : 'text-gray-700';
        case 'tertiary-text': return isDark ? 'text-gray-400' : 'text-gray-600';

        // Accent/Primary action color
        case 'accent-text': return isDark ? 'text-indigo-400' : 'text-indigo-600';
        case 'accent-bg': return isDark ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-700';
        
        // Border colors for interactive/structural elements
        case 'border': return isDark ? 'border-gray-700' : 'border-gray-300';
        case 'hover-border': return isDark ? 'hover:border-indigo-500' : 'hover:border-indigo-600';
        
        // Background dot animation color
        case 'dot-color': return isDark ? 'bg-indigo-500' : 'bg-pink-500';
        
        default: return '';
    }
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
 * Header Component - Fixed navigation bar with theme toggle
 */
const Header = ({ theme, toggleTheme }) => (
  <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm ${getThemeClasses('header-bg', theme)}`}>
    <div className="container mx-auto flex justify-between items-center p-4 sm:p-6">
      <h1 className={`text-xl font-extrabold ${getThemeClasses('primary-text', theme)} tracking-widest`}>
        {CONFIG.name.toUpperCase().split(' ')[0]}<span className={getThemeClasses('accent-text', theme)}>.DEV</span>
      </h1>
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex space-x-8">
          {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`${getThemeClasses('secondary-text', theme)} hover:${getThemeClasses('accent-text', theme)} transition duration-300 font-medium tracking-wide`}
            >
              {item}
            </a>
          ))}
        </nav>
        
        {/* Theme Toggle Button */}
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition duration-300 transform hover:scale-110 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? 
                <Sun className="w-6 h-6 text-yellow-400" /> : 
                <Moon className="w-6 h-6 text-indigo-600" />
            }
        </button>

        {/* Mobile Menu Icon Placeholder */}
        <div className="md:hidden">
          <button className={`${getThemeClasses('secondary-text', theme)} hover:${getThemeClasses('accent-text', theme)} p-2 rounded-md`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>
    </div>
  </header>
);

/**
 * Hero Section - Includes the typing animation
 */
const Hero = ({ typedText, theme }) => {
    const dotColorClass = getThemeClasses('dot-color', theme);
    const bgColorClass = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
    const accentTextClass = getThemeClasses('accent-text', theme);

    return (
        <section id="home" className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Animation */}
            <div className={`absolute inset-0 ${bgColorClass} z-0`}>
                <div className="dots-background">
                    {[...Array(50)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`absolute rounded-full opacity-10 blur-sm ${dotColorClass}`} 
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
                <p className={`text-xl sm:text-2xl ${getThemeClasses('secondary-text', theme)} mb-2 font-light`}>Hello, I'm</p>
                <h1 className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black ${getThemeClasses('primary-text', theme)} mb-6 leading-tight`}>
                    {CONFIG.name}
                </h1>
                <h2 className={`text-3xl sm:text-4xl md:text-5xl font-light ${accentTextClass}`}>
                    I am a <span className="font-bold">{typedText}</span>
                    <span className={`inline-block w-1 ${getThemeClasses('primary-text', theme) === 'text-white' ? 'bg-white' : 'bg-gray-900'} ml-1 animate-pulse`}>|</span>
                </h2>
                <div className="flex justify-center space-x-6 mt-10">
                    <a href="#projects" className={`group flex items-center ${getThemeClasses('accent-bg', theme)} text-white px-6 py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 font-semibold text-lg`}>
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
const SectionTitle = ({ id, icon: Icon, title, theme }) => (
    <div id={id} className="pt-24 mb-12 text-center">
        <Icon className={`w-10 h-10 mx-auto ${getThemeClasses('accent-text', theme)} mb-2`} />
        <h2 className={`text-4xl font-extrabold ${getThemeClasses('primary-text', theme)} mb-2`}>{title}</h2>
        <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full"></div>
    </div>
);


/**
 * About Section
 */
const About = ({ theme }) => {
    const cardBgClass = getThemeClasses('card-bg', theme);
    const borderClass = getThemeClasses('border', theme);
    const primaryTextClass = getThemeClasses('primary-text', theme);
    const secondaryTextClass = getThemeClasses('secondary-text', theme);
    const tertiaryTextClass = getThemeClasses('tertiary-text', theme);
    const accentTextClass = getThemeClasses('accent-text', theme);

    return (
        <section className="min-h-screen container mx-auto px-4 md:px-8">
            <SectionTitle id="about" icon={User} title="About Me" theme={theme} />
            <div className={`max-w-4xl mx-auto ${cardBgClass} p-8 sm:p-12 rounded-2xl shadow-2xl border-t-4 border-indigo-500`}>
                <p className={`text-lg ${secondaryTextClass} leading-relaxed font-light mb-8`}>
                    {CONFIG.aboutMe}
                </p>
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${secondaryTextClass}`}>
                    <div>
                        <p className={`font-semibold ${primaryTextClass}`}>Full Name:</p>
                        <p>{CONFIG.name}</p>
                    </div>
                    <div>
                        <p className={`font-semibold ${primaryTextClass}`}>Email:</p>
                        <a href={`mailto:${CONFIG.email}`} className={`${accentTextClass} hover:underline`}>{CONFIG.email}</a>
                    </div>
                    <div className="sm:col-span-2">
                        <p className={`font-semibold ${primaryTextClass} mb-2`}>Social Profiles:</p>
                        <div className="flex space-x-4">

                          {/* 1. LinkedIn Profile */}
                          <a 
                              href={CONFIG.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className={`relative group ${tertiaryTextClass} hover:${primaryTextClass} transition duration-300 p-2 ${cardBgClass} rounded-full border ${borderClass}`} 
                              aria-label="LinkedIn Profile"
                          >
                              <Linkedin className="w-6 h-6" />
                              <span className={`absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap ${cardBgClass} border border-indigo-500 ${primaryTextClass} text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20`}>
                                  LinkedIn Profile
                              </span>
                          </a>

                          {/* 2. Medium Profile */}
                          <a 
                                href={CONFIG.medium} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`relative group ${tertiaryTextClass} hover:${primaryTextClass} transition duration-300 p-2 ${cardBgClass} rounded-full border ${borderClass}`} 
                                aria-label="Medium Profile"
                            >
                                <FaMedium className="w-6 h-6" />
                                <span className={`absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap ${cardBgClass} border border-indigo-500 ${primaryTextClass} text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20`}>
                                    Medium Profile
                                </span>
                            </a>
                            
                          {/* 3. GitHub Profile */}
                          <a 
                              href={CONFIG.github} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className={`relative group ${tertiaryTextClass} hover:${primaryTextClass} transition duration-300 p-2 ${cardBgClass} rounded-full border ${borderClass}`} 
                              aria-label="GitHub Profile"
                          >
                              <Github className="w-6 h-6" />
                              <span className={`absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap ${cardBgClass} border border-indigo-500 ${primaryTextClass} text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20`}>
                                  GitHub Profile
                              </span>
                          </a>
                            
                          {/* 4. Kaggle Profile */}
                          <a 
                              href={CONFIG.kaggle} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className={`relative group ${tertiaryTextClass} hover:${primaryTextClass} transition duration-300 p-2 ${cardBgClass} rounded-full border ${borderClass}`} 
                              aria-label="Kaggle Profile"
                          >
                              <FaKaggle className="w-6 h-6" />
                              <span className={`absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap ${cardBgClass} border border-indigo-500 ${primaryTextClass} text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20`}>
                                  Kaggle Profile
                              </span>
                          </a>

                          {/* 5. Resume Link */}
                          <a 
                              href={CONFIG.resume} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className={`relative group ${tertiaryTextClass} hover:${primaryTextClass} transition duration-300 p-2 ${cardBgClass} rounded-full border ${borderClass}`} 
                              aria-label="View Resume"
                          >
                              <File className="w-6 h-6" />
                              <span className={`absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap ${cardBgClass} border border-indigo-500 ${primaryTextClass} text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20`}>
                                  View Resume
                              </span>
                          </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};


/**
 * Experience Section
 */
const Experience = ({ theme }) => {
    const cardBgClass = getThemeClasses('card-bg', theme);
    const primaryTextClass = getThemeClasses('primary-text', theme);
    const accentTextClass = getThemeClasses('accent-text', theme);
    const tertiaryTextClass = getThemeClasses('tertiary-text', theme);
    const borderClass = getThemeClasses('border', theme);
    const hoverBorderClass = getThemeClasses('hover-border', theme);

    return (
        <section className="min-h-screen container mx-auto px-4 md:px-8">
            <SectionTitle id="experience" icon={Briefcase} title="Work Experience" theme={theme} />
            <div className="max-w-4xl mx-auto space-y-12">
                {CONFIG.experience.map((job, index) => (
                    <div 
                        key={index} 
                        className="relative pl-8 md:pl-16 group transition duration-500"
                    >
                        {/* Vertical Line */}
                        <div className={`absolute left-0 md:left-4 top-0 h-full w-0.5 ${getThemeClasses('border', theme)} group-hover:bg-indigo-500 transition duration-500`}></div>
                        
                        {/* Icon Circle */}
                        <div className={`absolute -left-2 md:left-2.5 top-2 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center border-4 ${getThemeClasses('main-bg', theme).split(' ')[0]} group-hover:scale-110 transition duration-300`}>
                            <Briefcase className="w-3 h-3 text-white" />
                        </div>

                        {/* Job Card */}
                        <div className={`${cardBgClass} p-6 rounded-xl shadow-xl border ${borderClass} ${hoverBorderClass} transition duration-500 transform group-hover:-translate-y-1`}>
                            <p className={`text-sm font-semibold ${accentTextClass} uppercase tracking-widest mb-1`}>{job.duration}</p>
                            <h3 className={`text-2xl font-bold ${primaryTextClass} mb-1`}>{job.title}</h3>
                            <p className={`text-lg ${getThemeClasses('secondary-text', theme)} font-medium mb-4`}>{job.company} - <span className={`${tertiaryTextClass} font-normal italic`}>{job.location}</span></p>
                            
                            <ul className={`list-disc pl-5 space-y-2 ${tertiaryTextClass}`}>
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
};

/**
 * Project Card Component
 */
const ProjectCard = ({ project, theme }) => {
    const cardBgClass = getThemeClasses('card-bg', theme);
    const primaryTextClass = getThemeClasses('primary-text', theme);
    const accentTextClass = getThemeClasses('accent-text', theme);
    const borderClass = getThemeClasses('border', theme);
    const hoverBorderClass = getThemeClasses('hover-border', theme);
    const secondaryTextClass = getThemeClasses('secondary-text', theme);
    const tertiaryTextClass = getThemeClasses('tertiary-text', theme);

    return (
        <div className={`${cardBgClass} rounded-xl shadow-xl overflow-hidden border ${borderClass} ${hoverBorderClass} transition duration-500 group`}>
            <div className="p-6">
                <h3 className={`text-2xl font-bold ${primaryTextClass} mb-2 group-hover:${accentTextClass} transition duration-300`}>{project.title}</h3>
                <p className={`${tertiaryTextClass} mb-4`}>{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(t => (
                        <span key={t} className={`text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-indigo-300' : 'bg-indigo-100 text-indigo-700'} px-3 py-1 rounded-full`}>{t}</span>
                    ))}
                </div>
                {project.link && (
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center ${accentTextClass} font-semibold hover:${secondaryTextClass} transition duration-300`}
                    >
                        Link <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                )}
            </div>
        </div>
    );
};


/**
 * Projects Section
 */
const Projects = ({ theme }) => (
  <section className="min-h-screen container mx-auto px-4 md:px-8">
    <SectionTitle id="projects" icon={Code} title="Featured Projects" theme={theme} />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {CONFIG.projects.map((project, index) => (
        <ProjectCard key={index} project={project} theme={theme} />
      ))}
    </div>
  </section>
);

/**
 * Contact Section
 */
const Contact = ({ theme }) => {
    const cardBgClass = getThemeClasses('card-bg', theme);
    const primaryTextClass = getThemeClasses('primary-text', theme);
    const accentTextClass = getThemeClasses('accent-text', theme);
    const secondaryTextClass = getThemeClasses('secondary-text', theme);
    const borderClass = getThemeClasses('border', theme);
    const hoverBgClass = theme === 'dark' ? 'hover:bg-gray-700/30' : 'hover:bg-gray-200';

    return (
        <section className="container mx-auto px-4 md:px-8 py-20">
            <SectionTitle id="contact" icon={Mail} title="Get In Touch" theme={theme} />
            <div className={`max-w-3xl mx-auto ${cardBgClass} p-8 sm:p-12 rounded-2xl shadow-2xl border-b-4 border-indigo-500`}>
                <p className={`text-xl ${secondaryTextClass} text-center mb-8`}>
                    I'm currently available for new opportunities and collaborations. Feel free to reach out!
                </p>
                
                {/* Contact Information*/}
                <div className="flex flex-col sm:flex-row justify-center items-stretch gap-8 mb-10">
                    {/* Phone Link */}
                    <a 
                        href={`tel:${CONFIG.phone}`} 
                        className={`flex-1 block text-center p-6 rounded-xl border ${borderClass} hover:border-indigo-500 ${hoverBgClass} transition duration-300 group cursor-pointer`}
                    >
                        <Phone className={`w-8 h-8 ${accentTextClass} mx-auto mb-2 group-hover:scale-105 transition`} />
                        <p className={`${primaryTextClass} font-medium mb-1`}>Phone</p>
                        <p className={`${secondaryTextClass} text-sm`}>{CONFIG.phone}</p>
                    </a>
                    
                    {/* Email Link */}
                    <a 
                        href={`mailto:${CONFIG.email}`} 
                        className={`flex-1 block text-center p-6 rounded-xl border ${borderClass} hover:border-indigo-500 ${hoverBgClass} transition duration-300 group cursor-pointer`}
                    >
                        <Mail className={`w-8 h-8 ${accentTextClass} mx-auto mb-2 group-hover:scale-105 transition`} />
                        <p className={`${primaryTextClass} font-medium mb-1`}>Email</p>
                        <p className={`${secondaryTextClass} text-sm`}>{CONFIG.email}</p>
                    </a>
                </div>
            </div>
        </section>
    );
};


/**
 * Main App Component
 */
const App = () => {
  // Theme state and toggler logic
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // Use the typing effect hook
  const typedText = useTypingEffect(CONFIG.taglines);
  const mainBgClass = getThemeClasses('main-bg', theme);
  const secondaryTextClass = getThemeClasses('secondary-text', theme);
  const borderClass = getThemeClasses('border', theme);


  useEffect(() => {
    // Add smooth scrolling for anchor links globally
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className={`min-h-screen font-sans antialiased ${mainBgClass}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero typedText={typedText} theme={theme} />
        <About theme={theme} />
        <Experience theme={theme} />
        <Projects theme={theme} />
        <Contact theme={theme} />
      </main>
      <footer className={`py-8 text-center ${secondaryTextClass} text-sm border-t ${borderClass}`}>
        <p>&copy; {new Date().getFullYear()} {CONFIG.name}</p>
      </footer>
    </div>
  );
};

export default App;
