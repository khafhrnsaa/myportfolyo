import React, { useState, useEffect, useRef } from 'react';
import { 
    Github, Linkedin, Mail, ArrowRight, Menu, X, Code, Eye, Briefcase, User, 
    MessageSquareText, Award, Paperclip, Star, Building, Users, Phone, GraduationCap,
    Database, GitBranch, Network, Monitor, BarChart2, ShieldCheck, FileSearch,
    Send, ChevronRight, MessageCircle
} from 'lucide-react';

// --- Custom Hook for Typing Effect ---
const useTypingEffect = (words, typeSpeed = 70, backSpeed = 70, backDelay = 1000) => {
    const [text, setText] = useState('');
    const wordIndex = useRef(0);
    const charIndex = useRef(0);
    const isDeleting = useRef(false);

    useEffect(() => {
        if (!words || words.length === 0) return;

        const handleTyping = () => {
            const currentWord = words[wordIndex.current];
            
            if (isDeleting.current) {
                setText(currentWord.substring(0, charIndex.current - 1));
                charIndex.current--;
            } else {
                setText(currentWord.substring(0, charIndex.current + 1));
                charIndex.current++;
            }

            if (!isDeleting.current && charIndex.current === currentWord.length) {
                setTimeout(() => isDeleting.current = true, backDelay);
            } else if (isDeleting.current && charIndex.current === 0) {
                isDeleting.current = false;
                wordIndex.current = (wordIndex.current + 1) % words.length;
            }
        };

        const typingInterval = setInterval(handleTyping, isDeleting.current ? backSpeed : typeSpeed);

        return () => clearInterval(typingInterval);
    }, [words, typeSpeed, backSpeed, backDelay]);

    return text;
};


// --- Portfolio Configuration Data ---
const portfolioConfig = {
    name: "Kharisma Fahrun Nisa'",
    roles: ["Software Development", "Cybersecurity Enthusiast", "Data Analyst"],
    githubUrl: "https://github.com/airenmeyy",
    linkedinUrl: "https://linkedin.com/in/khafhrnsaa",
    email: "gaharuearn@gmail.com",
    phone: "+6281239362587",
    whatsappUrl: "https://wa.me/62882007503321",
    cvUrl: "https://its.id/m/CVRUNNIE", // Replace with your CV link
    
    home: {
        intro: "A proactive and enthusiastic 4th-semester Information Technology student with a strong interest in software development and cybersecurity.",
        profileImageUrl: "profile.jpg",
        quickStats: [
            { icon: <Briefcase size={24} />, value: "2+ Years", label: "Experience" },
            { icon: <Code size={24} />, value: "Python", label: "Main Language" },
            { icon: <Paperclip size={24} />, value: "3+ Projects", label: "Completed" },
            { icon: <Award size={24} />, value: "2.92 / 4.00", label: "GPA" },
        ]
    },

    about: {
        imageUrl: "profile.jpg",
        whoAmI: "I am a proactive and enthusiastic Information Technology student, driven by a deep passion for software development and cybersecurity.",
        myPassion: "My approach combines a rigorous analytical mindset with hands-on technical skills to build efficient and secure digital solutions.",
        personalInfo: [
            { icon: <User size={18} />, text: "Kharisma Fahrun Nisa'" },
            { icon: <Mail size={18} />, text: "gaharuearn@gmail.com" },
            { icon: <Phone size={18} />, text: "+62 882-0075-03321" },
            { icon: <GraduationCap size={18} />, text: "Sepuluh Nopember Institute of Technology" },
            { icon: <Award size={18} />, text: "Awardee of PBSB Scholarship - LPDP RI" },
        ]
    },

    portfolio: {
        projects: [
            {
                title: "Warcoff",
                description: "Warcoff is an innovative web application for digital coffee shops. It simplifies menu, order, and payment management with a minimalist and intuitive interface, optimizing workflow and enhancing service efficiency.",
                imageUrl: "warcoff.png",
                githubUrl: "https://github.com/airenmeyy/warcoff", // Example URL
                liveUrl: "#",
                frameworks: ["React", "Node.js", "MySQL"]
            },
            {
                title: "SayurMart",
                description: "A web-based inventory management system for a vegetable store. This application is designed to efficiently manage stock, record sales, and monitor inventory, helping the store optimize operations and reduce waste.",
                imageUrl: "sayurmart.png",
                githubUrl: "https://github.com/airenmeyy/sayurmart", // Example URL
                liveUrl: "#",
                frameworks: ["HTML", "CSS", "PHP", "MySQL"]
            },
        ],
        certificates: [
            { title: 'Halal Product Process Assistance Training', imageUrl: 'sertifikat p3h.png', link: '#' },
            { title: 'LKMM-TD HMIT V', imageUrl: 'sertifikat lkmm TD.png', link: '#' },
        ],
        techStack: [
            { name: "Python", icon: <Code size={32} /> },
            { name: "C++", icon: <Code size={32} /> },
            { name: "MySQL", icon: <Database size={32} /> },
            { name: "Git & GitHub", icon: <GitBranch size={32} /> },
            { name: "Nmap", icon: <Network size={32} /> },
            { name: "Wireshark", icon: <FileSearch size={32} /> },
            { name: "VS Code", icon: <Monitor size={32} /> },
            { name: "Pandas & NumPy", icon: <BarChart2 size={32} /> },
        ]
    },

    testimonials: [
        {
            quote: "Kharisma shows great initiative and strong analytical skills in cybersecurity projects. Her reports are detailed and provide sharp recommendations.",
            name: "Dr. Budi Rahardjo",
            role: "Cybersecurity Lecturer",
            imageUrl: "https://placehold.co/100x100/e2e8f0/0f172a?text=BR"
        },
        {
            quote: "Working with Kharisma on the database project was very efficient. Her schema design was well-structured and greatly helped in development.",
            name: "Ahmad Zulkifli",
            role: "Database Project Partner",
            imageUrl: "https://placehold.co/100x100/e2e8f0/0f172a?text=AZ"
        }
    ],

    contactLinks: [
        { icon: <Github/>, title: "GitHub", subtitle: "Explore my code & projects", url: "https://github.com/airenmeyy" },
        { icon: <Linkedin/>, title: "LinkedIn", subtitle: "Let's connect professionally", url: "https://linkedin.com/in/khafhrnsaa" },
        { icon: <Mail/>, title: "Email", subtitle: "Send me an email directly", url: "mailto:gaharuearn@gmail.com" },
        { icon: <MessageCircle/>, title: "WhatsApp", subtitle: "Chat with me", url: "https://wa.me/62882007503321" }
    ],

    navLinks: [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Contact", href: "#contact" }
    ]
};

// --- Main Application Component ---
export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("#home");
    const [activePortfolioFilter, setActivePortfolioFilter] = useState('projects');
    const sectionRefs = useRef({});
    const typedText = useTypingEffect(portfolioConfig.roles);

    useEffect(() => {
        portfolioConfig.navLinks.forEach(link => {
            sectionRefs.current[link.href] = document.querySelector(link.href);
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${entry.target.id}`);
                    }
                });
            },
            { rootMargin: "-50% 0px -50% 0px" }
        );

        Object.values(sectionRefs.current).forEach(section => {
            if (section) observer.observe(section);
        });

        return () => {
            Object.values(sectionRefs.current).forEach(section => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);
    
    const handleLinkClick = () => {
        if (isMenuOpen) setIsMenuOpen(false);
    };

    const renderPortfolioContent = () => {
        switch (activePortfolioFilter) {
            case 'projects':
                return (
                    <div className="grid md:grid-cols-2 gap-8 w-full">
                        {portfolioConfig.portfolio.projects.map(project => (
                            <div key={project.title} className="bg-[#1e293b] rounded-lg overflow-hidden group border border-gray-700 transition-all duration-300 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20">
                                <div className="overflow-hidden"><img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" /></div>
                                <div className="p-6 flex flex-col h-full">
                                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Frameworks & Technologies:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.frameworks.map(fw => <span key={fw} className="bg-gray-700 text-cyan-300 text-xs font-medium px-2.5 py-1 rounded-full">{fw}</span>)}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-gray-700/50">
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors duration-300"><Github size={20} className="mr-2" />GitHub</a>
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-cyan-500 text-black font-bold rounded-md hover:bg-cyan-400 transition-colors duration-300"><Eye size={20} className="mr-2" />Live Demo</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'certificates':
                return (
                    <div className="grid md:grid-cols-2 gap-8 w-full">
                        {portfolioConfig.portfolio.certificates.map(cert => (
                            <a href={cert.link} target="_blank" rel="noopener noreferrer" key={cert.title} className="block bg-[#1e293b] rounded-lg overflow-hidden group border border-gray-700 transition-all duration-300 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 relative">
                                <img src={cert.imageUrl} alt={cert.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="text-xl font-bold text-white text-center">{cert.title}</h3>
                                </div>
                            </a>
                        ))}
                    </div>
                );
            case 'tech stack':
                 return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-4xl mx-auto w-full">
                        {portfolioConfig.portfolio.techStack.map(skill => (
                            <div key={skill.name} className="flex flex-col items-center p-6 bg-[#1e293b] rounded-lg border border-gray-700 hover:border-cyan-400 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-2">
                                <div className="text-cyan-400 mb-3">{skill.icon}</div>
                                <h3 className="text-lg font-semibold text-white text-center">{skill.name}</h3>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-[#0f172a] text-gray-200 font-sans leading-relaxed selection:bg-cyan-400 selection:text-black">
            {/* --- Header --- */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/80 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#home" className="text-2xl font-bold text-white"> <span className="text-cyan-400"> </span></a>
                    <nav className="hidden md:flex items-center space-x-8">
                        {portfolioConfig.navLinks.map(link => (
                            <a key={link.name} href={link.href} className={`text-lg transition-colors duration-300 ${activeSection === link.href ? 'text-cyan-400' : 'text-white hover:text-cyan-400'}`}>{link.name}</a>
                        ))}
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
                    </div>
                </div>
            </header>

            {/* --- Mobile Menu --- */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-[#0f172a] flex flex-col items-center justify-center md:hidden">
                    <nav className="flex flex-col items-center space-y-8">
                        {portfolioConfig.navLinks.map(link => (
                            <a key={link.name} href={link.href} onClick={handleLinkClick} className={`text-2xl transition-colors duration-300 ${activeSection === link.href ? 'text-cyan-400' : 'text-white hover:text-cyan-400'}`}>{link.name}</a>
                        ))}
                    </nav>
                </div>
            )}

            <main className="container mx-auto px-6">
                {/* --- Hero Section --- */}
                <section id="home" className="min-h-screen flex flex-col justify-center pt-24 md:pt-0">
                    <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-8">
                        <div className="md:w-3/5 text-center md:text-left">
                            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">Hi, I'm <br /><span className="text-cyan-400">{portfolioConfig.name}</span></h1>
                            <h2 className="text-xl md:text-2xl text-gray-300 mt-4 h-8"><span className="text-cyan-300">{typedText}</span></h2>
                            <p className="text-gray-300 mt-4 mb-8 max-w-xl mx-auto md:mx-0">{portfolioConfig.home.intro}</p>
                            <div className="flex justify-center md:justify-start space-x-4 mb-8">
                                <a href={portfolioConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-700 rounded-full text-white hover:bg-cyan-500 transition-colors duration-300"><Github size={24} /></a>
                                <a href={portfolioConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-700 rounded-full text-white hover:bg-cyan-500 transition-colors duration-300"><Linkedin size={24} /></a>
                                <a href={`mailto:${portfolioConfig.email}`} className="p-3 bg-gray-700 rounded-full text-white hover:bg-cyan-500 transition-colors duration-300"><Mail size={24} /></a>
                            </div>
                            <a href={portfolioConfig.cvUrl} download className="inline-flex items-center px-8 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors duration-300">Download CV <ArrowRight className="ml-2" size={20} /></a>
                        </div>
                        <div className="md:w-2/5 flex justify-center">
                            <div className="relative w-64 h-64 md:w-96 md:h-96">
                                <div className="w-full h-full rounded-full bg-gray-800 border-4 border-cyan-400 overflow-hidden shadow-2xl shadow-cyan-500/20">
                                    <img src={portfolioConfig.home.profileImageUrl} alt={portfolioConfig.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute top-5 -left-5 w-16 h-16 bg-[#1e293b] rounded-full flex items-center justify-center shadow-lg text-cyan-400"><Code size={32}/></div>
                                <div className="absolute top-1/4 -right-8 w-16 h-16 bg-[#1e293b] rounded-full flex items-center justify-center shadow-lg text-cyan-400"><Database size={32}/></div>
                                <div className="absolute bottom-10 -right-2 w-16 h-16 bg-[#1e293b] rounded-full flex items-center justify-center shadow-lg text-cyan-400"><ShieldCheck size={32}/></div>
                                <div className="absolute bottom-0 -left-10 w-16 h-16 bg-[#1e293b] rounded-full flex items-center justify-center shadow-lg text-cyan-400"><Network size={32}/></div>
                            </div>
                        </div>
                    </div>
                     <div className="mt-16 md:mt-24 w-full">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                            {portfolioConfig.home.quickStats.map(stat => (
                                <div key={stat.label} className="bg-[#1e293b] p-4 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-3 border border-gray-700">
                                    <div className="text-cyan-400">{stat.icon}</div>
                                    <div>
                                        <h5 className="text-lg font-bold text-white">{stat.value}</h5>
                                        <p className="text-sm text-gray-400">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- About Section --- */}
                <section id="about" className="py-24">
                    <h2 className="text-4xl font-bold text-center text-white mb-4">About Me</h2>
                    <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12"></div>
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/3 flex justify-center">
                             <div className="w-60 h-60 md:w-80 md:h-80 rounded-lg bg-gray-800 overflow-hidden transform rotate-[-6deg] transition-transform duration-300 hover:rotate-0 hover:scale-105">
                                 <img src={portfolioConfig.about.imageUrl} alt="About Me" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="lg:w-2/3 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-[#1e293b] p-6 rounded-lg border border-gray-700">
                                    <h3 className="text-xl font-bold mb-3 text-cyan-400 flex items-center gap-2"><Building size={22}/> Who Am I</h3>
                                    <p className="text-gray-300">{portfolioConfig.about.whoAmI}</p>
                                </div>
                                <div className="bg-[#1e293b] p-6 rounded-lg border border-gray-700">
                                    <h3 className="text-xl font-bold mb-3 text-cyan-400 flex items-center gap-2"><Star size={22}/> My Passion</h3>
                                    <p className="text-gray-300">{portfolioConfig.about.myPassion}</p>
                                </div>
                            </div>
                             <div className="bg-[#1e293b] p-6 rounded-lg border border-gray-700">
                                <h3 className="text-xl font-bold mb-4 text-cyan-400">Personal Info</h3>
                                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                                    {portfolioConfig.about.personalInfo.map(info => (
                                        <div key={info.text} className="flex items-center gap-3 text-gray-300">
                                            <span className="text-cyan-400">{info.icon}</span>
                                            <span>{info.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Portfolio Section --- */}
                <section id="portfolio" className="py-24">
                    <h2 className="text-4xl font-bold text-center text-white mb-4">My Portfolio</h2>
                    <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12"></div>
                    <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
                        {['projects', 'certificates', 'tech stack'].map(filter => (
                            <button key={filter} onClick={() => setActivePortfolioFilter(filter)}
                                    className={`px-5 py-2 rounded-lg font-semibold transition-colors capitalize text-lg ${activePortfolioFilter === filter ? 'bg-cyan-500 text-black' : 'bg-[#1e293b] text-white hover:bg-gray-700'}`}>
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        {renderPortfolioContent()}
                    </div>
                </section>

                {/* --- Testimonials Section --- */}
                <section id="testimonials" className="py-24">
                    <h2 className="text-4xl font-bold text-center text-white mb-4">Testimonials</h2>
                    <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12"></div>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                        {portfolioConfig.testimonials.map(testimonial => (
                            <div key={testimonial.name} className="bg-[#1e293b] p-8 rounded-lg border border-gray-700">
                                <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <img src={testimonial.imageUrl} alt={testimonial.name} className="w-16 h-16 rounded-full border-2 border-cyan-400 object-cover"/>
                                    <div>
                                        <h4 className="font-bold text-lg text-white">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Contact Section --- */}
                <section id="contact" className="py-24">
                    <h2 className="text-4xl font-bold text-center text-white mb-4">Get In Touch</h2>
                    <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12"></div>
                    <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            {portfolioConfig.contactLinks.map(link => (
                                <a key={link.title} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-5 bg-[#1e293b] rounded-lg border border-gray-700 hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300">
                                    <span className="text-cyan-400 mr-5">{React.cloneElement(link.icon, { size: 28 })}</span>
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-bold text-white">{link.title}</h3>
                                        <p className="text-gray-400">{link.subtitle}</p>
                                    </div>
                                    <ChevronRight className="text-gray-500" size={24}/>
                                </a>
                            ))}
                        </div>
                        <div className="bg-[#1e293b] p-8 rounded-lg border border-gray-700">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white"><Send size={24} className="text-cyan-400"/> Send Me a Message</h3>
                            <form action="#" className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="text-gray-400 mb-2 block sr-only">Your Name</label>
                                    <input type="text" id="name" placeholder="Your Name" className="w-full p-4 bg-[#0f172a] rounded-lg border border-gray-600 focus:border-cyan-400 focus:outline-none text-white transition-colors"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-gray-400 mb-2 block sr-only">Your Email</label>
                                    <input type="email" id="email" placeholder="Your Email" className="w-full p-4 bg-[#0f172a] rounded-lg border border-gray-600 focus:border-cyan-400 focus:outline-none text-white transition-colors"/>
                                </div>
                                <div>
                                    <label htmlFor="message" className="text-gray-400 mb-2 block sr-only">Your Message</label>
                                    <textarea id="message" placeholder="Your Message" rows="5" className="w-full p-4 bg-[#0f172a] rounded-lg border border-gray-600 focus:border-cyan-400 focus:outline-none text-white transition-colors"></textarea>
                                </div>
                                <div className="text-right">
                                    <button type="submit" className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors duration-300">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            {/* --- Footer --- */}
            <footer className="border-t border-gray-800 mt-12">
                <div className="container mx-auto px-6 py-6 text-center text-gray-500">
                    <p>Copyright &copy; {new Date().getFullYear()} {portfolioConfig.name}. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
