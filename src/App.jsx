import React, { useState, useEffect, useCallback } from 'react';
import { Briefcase, Code, Mail, User, BookOpen, ArrowRight, Github, Linkedin, MessageSquare } from 'lucide-react';

// --- Configuration Data ---
const CONFIG = {
  name: "Your Name",
  taglines: ["Software Engineer", "Frontend Developer", "React Enthusiast", "Code Artisan"],
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  aboutMe: "Driven by a passion for creating impactful and beautiful web applications, I specialize in building robust, high-performance user interfaces. My expertise lies in the React ecosystem, coupled with modern tools like Tailwind CSS and TypeScript. I thrive in challenging environments and am always eager to learn and apply new technologies to solve real-world problems.",
  skills: [
    { name: "React", level: 90, icon: "react" },
    { name: "JavaScript (ES6+)", level: 95, icon: "js" },
    { name: "Tailwind CSS", level: 85, icon: "tailwind" },
    { name: "Node.js", level: 75, icon: "node" },
    { name: "TypeScript", level: 70, icon: "ts" },
    { name: "Firebase/Firestore", level: 65, icon: "firebase" },
  ],
  projects: [
    { 
      title: "Task Manager Pro", 
      description: "A full-stack task management application featuring real-time updates and user authentication. Built with React, TypeScript, and Firestore.", 
      tech: ["React", "TypeScript", "Firestore", "Tailwind CSS"], 
      link: "#" 
    },
    { 
      title: "E-Commerce Mockup", 
      description: "A responsive, modern e-commerce front end showcasing product filtering, cart functionality, and dynamic routing.", 
      tech: ["Next.js", "Redux", "Tailwind CSS"], 
      link: "#" 
    },
    { 
      title: "Data Visualization Dashboard", 
      description: "An interactive dashboard for complex datasets using D3.js integrated into a React framework.", 
      tech: ["React", "D3.js", "Context API"], 
      link: "#" 
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

// Simple icon mapping for skills display (mimics the reference design)
const SkillIcon = ({ iconName, className = 'w-6 h-6' }) => {
    switch (iconName) {
        case 'react': return <svg viewBox="0 0 100 100" className={`text-cyan-400 ${className}`}><path fill="currentColor" d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 13c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8V21c0-4.4-3.6-8-8-8H50zM21 42c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8V50c0-4.4-3.6-8-8-8H21zM65 42c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8V50c0-4.4-3.6-8-8-8H65z"/></svg>;
        case 'js': return <Code className={`text-yellow-400 ${className}`} />;
        case 'tailwind': return <svg viewBox="0 0 100 100" className={`text-sky-400 ${className}`}><path fill="currentColor" d="M85 30c-5.5 0-10 4.5-10 10v10c0 5.5 4.5 10 10 10s10-4.5 10-10V40c0-5.5-4.5-10-10-10zM50 15c-5.5 0-10 4.5-10 10v10c0 5.5 4.5 10 10 10s10-4.5 10-10V25c0-5.5-4.5-10-10-10zM15 30c-5.5 0-10 4.5-10 10v10c0 5.5 4.5 10 10 10s10-4.5 10-10V40c0-5.5-4.5-10-10-10zM50 45c-5.5 0-10 4.5-10 10v10c0 5.5 4.5 10 10 10s10-4.5 10-10V55c0-5.5-4.5-10-10-10zM85 60c-5.5 0-10 4.5-10 10v10c0 5.5 4.5 10 10 10s10-4.5 10-10V70c0-5.5-4.5-10-10-10zM15 60c-5.5 0-10 4.5-10 10v10c0 5.5 4.5 10 10 10s10-4.5 10-10V70c0-5.5-4.5-10-10-10z"/></svg>;
        case 'node': return <svg viewBox="0 0 100 100" className={`text-green-500 ${className}`}><path fill="currentColor" d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 88c-21 0-38-17-38-38s17-38 38-38 38 17 38 38-17 38-38 38zM60 25L40 75h20l-5 15L75 25H60zM25 25h15l-5 15H25v-15zM75 75H60l-5 15h15V75z"/></svg>;
        case 'ts': return <BookOpen className={`text-blue-500 ${className}`} />;
        case 'firebase': return <Briefcase className={`text-orange-500 ${className}`} />;
        default: return <Code className={`text-gray-400 ${className}`} />;
    }
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
        {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
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
    const isMobile = window.innerWidth < 640;

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
                <a href={CONFIG.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300 p-2 bg-gray-700 rounded-full">
                    <Github className="w-6 h-6" />
                </a>
                <a href={CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-300 p-2 bg-gray-700 rounded-full">
                    <Linkedin className="w-6 h-6" />
                </a>
            </div>
        </div>
      </div>
    </div>
  </section>
);


/**
 * Skills Section
 */
const Skills = () => (
  <section className="min-h-screen container mx-auto px-4 md:px-8">
    <SectionTitle id="skills" icon={Code} title="Technical Skills" />
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {CONFIG.skills.map((skill) => (
        <div key={skill.name} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-500 transition duration-300 transform hover:scale-[1.02]">
          <div className="flex items-center space-x-4 mb-3">
            <SkillIcon iconName={skill.icon} className="w-8 h-8"/>
            <h3 className="text-xl font-bold text-white">{skill.name}</h3>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-indigo-500 h-2.5 rounded-full" 
              style={{ width: `${skill.level}%` }}
              aria-label={`Skill level: ${skill.level}%`}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">{skill.level}% Proficiency</p>
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
        <a 
          href={project.link} 
          className="flex items-center text-indigo-400 font-semibold hover:text-indigo-300 transition duration-300"
        >
          View Demo (Mock Link) <ArrowRight className="w-4 h-4 ml-2" />
        </a>
      </div>
    </div>
);


/**
 * Projects Section
 */
const Projects = () => (
  <section className="min-h-screen container mx-auto px-4 md:px-8">
    <SectionTitle id="projects" icon={Briefcase} title="Featured Projects" />
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
                <div className="text-center">
                    <MessageSquare className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                    <p className="text-white font-medium">LinkedIn</p>
                    <a href={CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition">Message Me</a>
                </div>
            </div>

            {/* Note on Form Functionality */}
            <div className="text-center p-4 bg-gray-700/50 border-l-4 border-yellow-500 rounded-lg">
                <p className="text-sm text-yellow-300">
                    <span className="font-bold">Note:</span> The contact form is a placeholder in this demo. For a live site, you would connect this form to a backend service like Firebase, Netlify Forms, or a serverless function.
                </p>
            </div>
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
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800">
        <p>Built with React & Tailwind CSS | Designed to mimic the structure of aryapriyank.vercel.app</p>
        <p>&copy; {new Date().getFullYear()} {CONFIG.name}</p>
      </footer>
    </div>
  );
};

export default App;
