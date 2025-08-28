import React, { useState, useEffect, useRef } from 'react';
import {
    Home, User, Briefcase, MessageSquareText, Mail, Linkedin, Github, Download,
    ChevronRight, Menu, X, ArrowUp, Plus, Heart, Quote, Star, Code, Database,
    GitBranch, Network, FileSearch, Monitor, BarChart2, Award, Phone, GraduationCap,
    UserCircle, Paperclip, Send, Building, Users, ShieldCheck, MessageCircle, FileText
} from 'lucide-react';

// --- Helper function to load external scripts ---
const useScript = (url, onload) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = onload;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url, onload]);
};

// --- Data untuk Portfolio ---
const portfolioItemsData = [
    // Tech Stack
    { id: 1, category: 'tech', icon: <Code size={56} className="text-accent"/>, title: 'Python' },
    { id: 2, category: 'tech', icon: <Code size={56} className="text-accent"/>, title: 'C++' },
    { id: 3, category: 'tech', icon: <Database size={56} className="text-accent"/>, title: 'MySQL' },
    { id: 4, category: 'tech', icon: <GitBranch size={56} className="text-accent"/>, title: 'Git & GitHub' },
    { id: 5, category: 'tech', icon: <Network size={56} className="text-accent"/>, title: 'Nmap' },
    { id: 6, category: 'tech', icon: <FileSearch size={56} className="text-accent"/>, title: 'Wireshark' },
    { id: 7, category: 'tech', icon: <Monitor size={56} className="text-accent"/>, title: 'VS Code' },
    { id: 8, category: 'tech', icon: <BarChart2 size={56} className="text-accent"/>, title: 'Pandas & NumPy' },
    // Projects
    {
        id: 17,
        category: 'projects',
        title: 'Warcoff',
        description: 'Warcoff adalah aplikasi web inovatif untuk warkop digital. Aplikasi ini mempermudah pengelolaan menu, pesanan, dan pembayaran dengan antarmuka yang minimalis dan intuitif, mengoptimalkan alur kerja, mengurangi kesalahan, dan meningkatkan efisiensi layanan.',
        image: 'warcoff.png',
        demoLink: '#',
        languages: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS']
    },
    {
        id: 18,
        category: 'projects',
        title: 'SayurMart',
        description: 'Sistem manajemen inventaris berbasis web untuk toko sayuran. Aplikasi ini dirancang untuk mengelola stok, mencatat penjualan, dan memantau persediaan dengan efisien, membantu toko sayuran mengoptimalkan operasional dan mengurangi pemborosan.',
        image: 'sayurmart.png',
        demoLink: '#',
        languages: ['Python', 'Flask', 'SQLite', 'HTML', 'CSS']
    },
    {
        id: 22,
        category: 'projects',
        title: 'Kalkulator Zakat',
        description: 'Aplikasi kalkulator zakat berbasis web yang dibuat menggunakan HTML, CSS, dan JavaScript. Aplikasi ini membantu pengguna menghitung berbagai jenis zakat, seperti zakat penghasilan dan zakat maal, dengan antarmuka yang sederhana dan mudah digunakan.',
        image: 'kalkulator zakat.png',
        demoLink: '#',
        languages: ['JavaScript', 'HTML', 'CSS']
    },
    {
        id: 24,
        category: 'projects',
        title: 'Wellnest App',
        description: 'Wellnest adalah aplikasi berbasis web yang dirancang untuk mendukung kesehatan mental dengan menyediakan ruang aman dan anonim bagi pengguna untuk berbagi perasaan dan cerita mereka. Platform ini menghubungkan pengguna dengan pendengar sebaya yang menawarkan empati, membantu meringankan beban emosional dan menumbuhkan komunitas yang suportif.',
        image: 'wellnest app.png',
        demoLink: '#',
        languages: ['JavaScript', 'HTML', 'CSS']
    },
    // Trainings
    { id: 15, category: 'trainings', image: 'sertifikat p3h.png', title: 'Halal Product Process Assistance Training', link: '#' },
    { id: 16, category: 'trainings', image: 'sertifikat lkmm TD.png', title: 'LKMM-TD HMIT V', link: '#' },
];

// --- Komponen Styling untuk Carousel ---
const CarouselStyles = () => {
    const projectCount = portfolioItemsData.filter(item => item.category === 'projects').length;
    const cardWidth = 384; // Lebar kartu dalam piksel (w-96 di Tailwind)
    const animationDuration = projectCount * 8; // Durasi animasi (detik), bisa disesuaikan

    return (
        <style>{`
            @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-${cardWidth}px * ${projectCount})); }
            }
            .slider {
                margin: auto;
                overflow: hidden;
                position: relative;
                width: 100%;
            }
            .slider::before,
            .slider::after {
                background: linear-gradient(to right, rgba(6,4,7,1) 0%, rgba(6,4,7,0) 100%);
                content: "";
                height: 100%;
                position: absolute;
                width: 10%;
                z-index: 2;
                top: 0;
            }
            .slider::before { left: 0; }
            .slider::after { right: 0; transform: rotateZ(180deg); }
            .slider .slide-track {
                animation: scroll ${animationDuration}s linear infinite;
                display: flex;
                width: calc(${cardWidth}px * ${projectCount * 2});
            }
            .slider:hover .slide-track {
                animation-play-state: paused;
            }
            .slider .slide {
                width: ${cardWidth}px;
                padding: 0 1rem;
                flex-shrink: 0;
                height: 100%;
                box-sizing: border-box;
            }
            /* Animasi Chibi */
            .chibi {
                position: fixed;
                bottom: -100px;
                animation: floatUp 20s linear infinite;
                z-index: 40;
                opacity: 0.8;
            }
            @keyframes floatUp {
                0% {
                    transform: translateY(0) translateX(0vw) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-50vh) translateX(5vw) rotate(180deg);
                }
                100% {
                    transform: translateY(-110vh) translateX(-5vw) rotate(360deg);
                    opacity: 0;
                }
            }
        `}</style>
    );
};


// --- Komponen Header ---
const Header = ({ activeSection }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = [
        { id: 'home', title: 'Home', icon: <Home size={20}/> },
        { id: 'about', title: 'About', icon: <User size={20}/> },
        { id: 'portfolio', title: 'Portfolio', icon: <Briefcase size={20}/> },
        { id: 'testimonials', title: 'Testimonials', icon: <MessageSquareText size={20}/> },
        { id: 'contact', title: 'Contact', icon: <Mail size={20}/> },
    ];

    return (
        <header className="fixed top-0 left-0 w-full px-4 sm:px-8 md:px-16 py-4 flex justify-between items-center z-50 transition-shadow duration-300 bg-[#221932] shadow-lg">
            <a href="#home" className="text-2xl font-bold text-white">Kharisma</a>
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-2">
                {navLinks.map(link => (
                    <a key={link.id} href={`#${link.id}`}
                       className={`nav-link text-lg font-medium text-gray-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent hover:text-[#060407] transition-colors ${activeSection === link.id ? 'bg-accent text-[#060407]' : ''}`}>
                        {link.icon}
                        <span>{link.title}</span>
                    </a>
                ))}
            </nav>

            {/* Mobile Menu Icon */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl text-white z-[101]">
                {isMenuOpen ? <X/> : <Menu/>}
            </button>

            {/* Mobile Nav */}
            <nav className={`fixed top-0 right-0 h-full w-64 bg-[#060407] transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col items-start p-8 space-y-4`}>
                {navLinks.map(link => (
                    <a key={link.id} href={`#${link.id}`}
                       onClick={() => setIsMenuOpen(false)}
                       className={`nav-link text-lg font-medium text-gray-300 flex items-center gap-3 w-full p-3 rounded-md hover:bg-accent hover:text-[#060407] ${activeSection === link.id ? 'bg-accent text-[#060407]' : ''}`}>
                        {link.icon}
                        <span>{link.title}</span>
                    </a>
                ))}
            </nav>
        </header>
    );
};

// --- Komponen Home/Hero ---
const HomeSection = () => {
    const typedEl = useRef(null);

    useEffect(() => {
        if (window.Typed) {
            const typed = new window.Typed(typedEl.current, {
                strings: ['Software Development', 'Cybersecurity Enthusiast', 'Data Analyst'],
                typeSpeed: 70,
                backSpeed: 70,
                backDelay: 1000,
                loop: true
            });
            return () => {
                if(typed) typed.destroy();
            };
        }
    }, []);

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 pt-24 pb-12 bg-[#060407]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
                <div className="home-content space-y-4 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">Hi, I'm Kharisma Fahrun Nisa' 👋</h1>
                    <h3 className="text-2xl md:text-3xl font-bold text-accent h-8">
                        <span ref={typedEl}></span>
                    </h3>
                    <p className="text-gray-300 max-w-lg mx-auto md:mx-0">
                        A proactive and enthusiastic 5th-semester Information Technology student with a strong interest in software development and cybersecurity.
                    </p>
                    <div className="flex items-center justify-center md:justify-start space-x-4 pt-4">
                        <span className="font-semibold text-white">Follow me on:</span>
                        <a href="https://linkedin.com/in/khafhrnsaa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#221932] rounded-full flex items-center justify-center text-white hover:bg-accent transition-all duration-300">
                            <Linkedin size={20}/>
                        </a>
                        <a href="https://github.com/airenmeyy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#221932] rounded-full flex items-center justify-center text-white hover:bg-accent transition-all duration-300">
                           <Github size={20}/>
                        </a>
                    </div>
                    <div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                        <a href="#portfolio" className="btn inline-flex items-center gap-2 bg-transparent border-2 border-accent text-accent font-semibold px-6 py-3 rounded-lg hover:bg-accent hover:text-[#060407] transition-colors">
                            <Briefcase size={20}/> Explore My Project
                        </a>
                        <a href="#contact" className="btn inline-flex items-center gap-2 bg-accent text-[#060407] font-semibold px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors shadow-lg shadow-accent/30">
                            <Mail size={20}/> Contact Me
                        </a>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-8 md:mt-0">
                    <div className="relative w-3/4 md:w-full max-w-sm">
                        <img src="https://placehold.co/400x400/221932/ffffff?text=Foto+Profil" alt="Profile" className="rounded-full border-8 border-accent w-full h-auto object-cover aspect-square animate-pulse" />
                        <div className="absolute top-5 -left-5 w-16 h-16 bg-[#221932] rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '0.2s'}}>
                            <Code size={36} className="text-accent"/>
                        </div>
                        <div className="absolute top-1/4 -right-8 w-16 h-16 bg-[#221932] rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '0.5s'}}>
                            <Database size={36} className="text-accent"/>
                        </div>
                        <div className="absolute bottom-10 -right-2 w-16 h-16 bg-[#221932] rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '0.8s'}}>
                            <ShieldCheck size={36} className="text-accent"/>
                        </div>
                            <div className="absolute bottom-0 -left-10 w-16 h-16 bg-[#221932] rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '1s'}}>
                                <Network size={36} className="text-accent"/>
                            </div>
                    </div>
                </div>
            </div>
            <div className="quick-stats-container mt-16 md:mt-24 w-full">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-white"><BarChart2/>Quick Stats:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    <div className="stat-item bg-white text-[#060407] p-4 rounded-full flex items-center justify-center gap-3 shadow-lg">
                        <Briefcase size={30} className="text-accent"/>
                        <div><h5 className="text-xl font-bold">2+ Years</h5><p className="text-sm">Experience</p></div>
                    </div>
                     <div className="stat-item bg-white text-[#060407] p-4 rounded-full flex items-center justify-center gap-3 shadow-lg">
                        <Code size={30} className="text-accent"/>
                        <div><h5 className="text-xl font-bold">PHP</h5><p className="text-sm">Main Language</p></div>
                    </div>
                     <div className="stat-item bg-white text-[#060407] p-4 rounded-full flex items-center justify-center gap-3 shadow-lg">
                        <Paperclip size={30} className="text-accent"/>
                        <div><h5 className="text-xl font-bold">4+ Projects</h5><p className="text-sm">Completed</p></div>
                    </div>
                     <div className="stat-item bg-white text-[#060407] p-4 rounded-full flex items-center justify-center gap-3 shadow-lg">
                        <Award size={30} className="text-accent"/>
                        <div><h5 className="text-xl font-bold">2.92 / 4.00</h5><p className="text-sm">GPA</p></div>
                    </div>
                </div>
            </div>
        </section>
    );
};


// --- Komponen About ---
const AboutSection = () => (
    <section id="about" className="min-h-screen flex flex-col justify-center bg-[#221932] px-4 sm:px-8 md:px-16 lg:px-24 py-20">
        <div className="text-center">
            <h2 className="text-4xl font-bold mb-2 text-white">About <span className="text-accent">Me</span></h2>
            <p className="text-gray-300 mb-12">Discover my journey, passions, and the story behind my work</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start w-full">
            <div className="flex justify-center">
                <img src="profile.jpg" alt="About Kharisma" className="rounded-lg w-full max-w-sm h-auto object-cover" />
            </div>
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="about-reveal bg-[#060407] p-6 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4 text-accent flex items-center gap-2"><Building size={24}/> Who Am I</h3>
                        <p className="text-gray-300 leading-relaxed">I am a proactive and enthusiastic Information Technology student, driven by a deep passion for software development and cybersecurity.</p>
                    </div>
                    <div className="about-reveal bg-[#060407] p-6 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4 text-accent flex items-center gap-2"><Star size={24}/> My Passion</h3>
                        <p className="text-gray-300 leading-relaxed">My approach combines a rigorous analytical mindset with hands-on technical skills to build efficient and secure digital solutions.</p>
                    </div>
                </div>
                <div className="about-reveal bg-[#060407] p-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-6 text-accent">Personal Info</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-white">
                        <div className="flex items-center gap-3"><UserCircle className="text-accent"/><span>Kharisma Fahrun Nisa'</span></div>
                        <div className="flex items-center gap-3"><Mail className="text-accent"/><span>gaharuearn@gmail.com</span></div>
                        <div className="flex items-center gap-3"><Phone className="text-accent"/><span>+62 882-0075-03321</span></div>
                        <div className="flex items-center gap-3"><GraduationCap className="text-accent"/><span>Sepuluh Nopember Institute of Technology</span></div>
                        <div className="flex items-center gap-3 col-span-full"><Award className="text-accent"/><span>Awardee of PBSB Scholarship - LPDP RI</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


// --- Komponen Portfolio ---
const PortfolioSection = () => {
    const [activeFilter, setActiveFilter] = useState('projects');
    const filters = ['projects', 'tech', 'trainings'];

    const filteredItems = portfolioItemsData.filter(item => item.category === activeFilter);
    const projectItems = portfolioItemsData.filter(item => item.category === 'projects');

    return (
        <section id="portfolio" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24 py-20 bg-[#060407]">
            <h2 className="text-4xl font-bold mb-4 text-center text-white">My <span className="text-accent">Portfolio</span></h2>
            <p className="text-gray-300 mb-12 text-center max-w-2xl">Explore my work, certifications, and the technologies & trainings I've attended — all in one place.</p>
            
            <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
                {filters.map(filter => (
                    <button key={filter} onClick={() => setActiveFilter(filter)}
                            className={`filter-btn bg-[#221932] px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${activeFilter === filter ? 'bg-accent text-[#060407]' : 'text-white hover:bg-pink-900'}`}>
                        {filter}
                    </button>
                ))}
            </div>
            
            {activeFilter === 'projects' && (
                 <div className="slider w-full max-w-6xl py-4">
                    <div className="slide-track">
                        {[...projectItems, ...projectItems].map((item, index) => (
                             <div key={`${item.id}-${index}`} className="slide">
                                <div className="portfolio-item bg-[#221932] rounded-lg transition-transform hover:-translate-y-2 h-full flex flex-col">
                                    <div className="overflow-hidden group h-full">
                                        <div className="relative h-full flex flex-col">
                                            {item.image && (
                                                <img src={item.image} alt={item.title} className="w-full h-48 object-cover transition-transform group-hover:scale-105"/>
                                            )}
                                            <div className="p-4 flex flex-col text-center flex-grow">
                                                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                                <p className="text-gray-400 text-sm flex-grow mb-4 text-justify">{item.description}</p>
                                                
                                                {item.languages && (
                                                    <div className="mt-auto pt-4">
                                                         <div className="flex flex-wrap justify-center gap-2 mb-4">
                                                            {item.languages.map((lang, langIndex) => (
                                                                <span key={langIndex} className="bg-[#060407] text-accent text-xs font-medium px-2.5 py-1 rounded-full border border-accent">
                                                                    {lang}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {item.demoLink && (
                                                    <a href={item.demoLink} target="_blank" rel="noopener noreferrer" className="btn inline-flex items-center justify-center gap-2 bg-accent text-[#060407] font-semibold px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors mt-auto">
                                                        Demo <ChevronRight size={16}/>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {(activeFilter === 'tech' || activeFilter === 'trainings') && (
                <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredItems.map(item => (
                        <div key={item.id} className="portfolio-item bg-[#221932] rounded-lg transition-transform hover:-translate-y-2"
                             style={{ gridColumn: item.category === 'trainings' ? 'sm:span-2 md:span-2 lg:span-2' : 'span 1' }}>
                            {item.category === 'tech' ? (
                                <div className="p-6 flex flex-col items-center justify-center space-y-3 h-full aspect-square">
                                    {item.icon}
                                    <h3 className="font-semibold text-lg text-white text-center">{item.title}</h3>
                                </div>
                            ) : ( // For 'trainings'
                                <div className="overflow-hidden group h-full">
                                    <div className="relative h-full">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105"/>
                                        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4 text-center">
                                            <h4 className="text-white font-bold text-lg">{item.title}</h4>
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-2 text-white text-lg border-2 border-accent bg-accent p-3 rounded-full hover:bg-pink-700">
                                                <Paperclip size={20}/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

// --- Komponen Testimonials ---
const TestimonialsSection = () => (
    <section id="testimonials" className="min-h-screen flex flex-col justify-center items-center bg-[#221932] px-4 sm:px-8 md:px-16 lg:px-24 py-20">
        <div className="text-center w-full max-w-4xl">
            <h2 className="text-4xl font-bold mb-2 text-white">What People Say</h2>
            <p className="text-gray-400 mb-12">Voices from clients, collaborators, and friends who have experienced my work.</p>
            <div className="bg-[#060407] p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold flex items-center gap-3 text-white"><Users/>Testimonials</h3>
                    <button className="bg-white text-[#060407] font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
                        <Plus size={20}/> Add Testimonial
                    </button>
                </div>
                <div className="space-y-6">
                    <div className="border border-gray-700 p-6 rounded-lg text-left">
                        <Quote className="text-4xl text-accent mb-4 transform -scale-x-100"/>
                        <p className="text-gray-300 italic mb-4">"Kharisma shows great initiative and strong analytical skills in cybersecurity projects. Her reports are detailed and provide sharp recommendations."</p>
                        <div className="flex items-center gap-4">
                            <img src="https://placehold.co/100x100/ededed/060407?text=BR" alt="Dr. Budi Rahardjo" className="w-16 h-16 rounded-full border-2 border-accent"/>
                            <div>
                                <h4 className="font-bold text-lg text-accent">Dr. Budi Rahardjo</h4>
                                <p className="text-sm text-gray-500">Cybersecurity Lecturer</p>
                            </div>
                        </div>
                    </div>
                     <div className="border border-gray-700 p-6 rounded-lg text-left">
                        <Quote className="text-4xl text-accent mb-4 transform -scale-x-100"/>
                        <p className="text-gray-300 italic mb-4">"Working with Kharisma on the database project was very efficient. Her schema design was well-structured and greatly helped in development."</p>
                        <div className="flex items-center gap-4">
                            <img src="https://placehold.co/100x100/ededed/060407?text=AZ" alt="Ahmad Zulkifli" className="w-16 h-16 rounded-full border-2 border-accent"/>
                            <div>
                                <h4 className="font-bold text-lg text-accent">Ahmad Zulkifli</h4>
                                <p className="text-sm text-gray-500">Database Project Partner</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- Komponen Contact ---
const ContactSection = ({ onSupportClick }) => (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24 py-20 bg-[#060407]">
        <div className="text-center">
            <h2 className="text-4xl font-bold mb-2 text-white">Contact Me</h2>
            <p className="text-gray-400 mb-8">Reach out via form, social media, or support platforms.</p>
            <div className="flex justify-center gap-4 mb-12">
                <a href="#contact-form" className="btn bg-white text-[#060407] font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                    <Mail size={20}/> Contact Me
                </a>
                <button onClick={onSupportClick} className="btn bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-[#060407] transition-colors flex items-center gap-2">
                    <Heart size={20}/> Support Me
                </button>
            </div>
        </div>
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
                {/* Contact Cards */}
                <a href="https://github.com/airenmeyy" target="_blank" rel="noopener noreferrer" className="contact-card bg-[#221932] p-6 rounded-lg flex items-center justify-between transition-transform hover:-translate-y-1">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-3 text-white"><Github/> GitHub</h3>
                        <p className="text-gray-400">Explore my code & projects</p>
                    </div>
                    <ChevronRight className="text-white"/>
                </a>
                 <a href="https://linkedin.com/in/khafhrnsaa" target="_blank" rel="noopener noreferrer" className="contact-card bg-[#221932] p-6 rounded-lg flex items-center justify-between transition-transform hover:-translate-y-1">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-3 text-white"><Linkedin/> LinkedIn</h3>
                        <p className="text-gray-400">Let's connect professionally</p>
                    </div>
                    <ChevronRight className="text-white"/>
                </a>
                <a href="mailto:gaharuearn@gmail.com" className="contact-card bg-[#221932] p-6 rounded-lg flex items-center justify-between transition-transform hover:-translate-y-1">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-3 text-white"><Mail/> Email</h3>
                        <p className="text-gray-400">Send me an email directly</p>
                    </div>
                    <ChevronRight className="text-white"/>
                </a>
                <a href="https://wa.me/62882007503321" target="_blank" rel="noopener noreferrer" className="contact-card bg-[#221932] p-6 rounded-lg flex items-center justify-between transition-transform hover:-translate-y-1">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-3 text-white"><MessageCircle/> WhatsApp</h3>
                        <p className="text-gray-400">Chat with me</p>
                    </div>
                    <ChevronRight className="text-white"/>
                </a>
            </div>
            <div id="contact-form" className="lg:col-span-2 bg-[#221932] p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white"><Send/> Send Me a Message</h3>
                <form action="https://formspree.io/f/your-form-id" method="POST" className="space-y-6">
                    <input type="text" name="name" placeholder="Your Name" required className="w-full p-3 bg-[#060407] rounded-lg border border-transparent focus:border-accent focus:outline-none text-white"/>
                    <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 bg-[#060407] rounded-lg border border-transparent focus:border-accent focus:outline-none text-white"/>
                    <textarea name="message" placeholder="Your Message" rows="5" required className="w-full p-3 bg-[#060407] rounded-lg border border-transparent focus:border-accent focus:outline-none text-white"></textarea>
                    <div className="text-right">
                        <button type="submit" className="btn bg-accent text-[#060407] font-semibold px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors shadow-lg shadow-accent/30">Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
);

// --- Komponen Footer ---
const Footer = () => (
    <footer className="bg-[#221932] text-center p-6 text-gray-400">
        <p>Created by Kharisma Fahrun Nisa' | &copy; {new Date().getFullYear()} All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
            <a href="https://linkedin.com/in/khafhrnsaa" target="_blank" rel="noopener noreferrer" className="w-8 h-8 border-2 border-accent rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-[#060407] transition-all duration-300"><Linkedin size={16}/></a>
            <a href="https://github.com/airenmeyy" target="_blank" rel="noopener noreferrer" className="w-8 h-8 border-2 border-accent rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-[#060407] transition-all duration-300"><Github size={16}/></a>
        </div>
    </footer>
);

// --- Komponen Support Modal ---
const SupportModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100]" onClick={onClose}>
            <div className="bg-[#221932] p-8 rounded-lg shadow-2xl w-full max-w-sm text-center relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl">&times;</button>
                <h2 className="text-3xl font-bold mb-4 text-white">Support My Work</h2>
                <p className="text-gray-300 mb-6">If you find my work valuable, consider supporting me. Thank you! 🙏</p>
                <div className="bg-white p-4 rounded-lg">
                    <img src="https://placehold.co/300x300/ffffff/060407?text=Your+QRIS+Code+Here" alt="QRIS Code" className="w-full h-auto object-cover rounded-md"/>
                </div>
                <p className="text-sm text-gray-400 mt-4">Scan the QR code with your mobile banking or e-wallet app.</p>
            </div>
        </div>
    );
};

// --- Komponen BackToTop ---
const BackToTopButton = ({ isVisible }) => (
    <a href="#home" className={`fixed bottom-8 right-8 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-[#060407] text-2xl transition-all duration-500 hover:bg-pink-700 shadow-lg shadow-accent/40 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <ArrowUp/>
    </a>
);

const ChibiContainer = () => {
    const chibis = [
        "zayne.png",
        "zayne1.png",
        "zayne2.png",
    ];

    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            {chibis.map((src, index) => (
                <img 
                    key={index}
                    src={src} 
                    alt={`chibi-${index}`} 
                    className="chibi w-20 h-20"
                    style={{
                        left: `${Math.random() * 90}vw`,
                        animationDelay: `${Math.random() * 20}s`,
                        animationDuration: `${15 + Math.random() * 10}s`
                    }}
                />
            ))}
        </div>
    );
};


// --- Komponen Utama App ---
export default function App() {
    const [activeSection, setActiveSection] = useState('home');
    const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scriptsLoaded, setScriptsLoaded] = useState(false);

    useEffect(() => {
        const loadScript = (src, onLoad) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = onLoad;
            document.body.appendChild(script);
            return script;
        };
        
        const scrollRevealScript = loadScript('https://unpkg.com/scrollreveal', () => {
            loadScript('https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js', () => {
                setScriptsLoaded(true); 
            });
        });

        return () => {
            document.querySelectorAll('script[src^="https://unpkg.com"]').forEach(s => s.remove());
        }
    }, []);

    useEffect(() => {
        if (!scriptsLoaded) return;

        const ScrollReveal = window.ScrollReveal;
        if (ScrollReveal) {
            const sr = ScrollReveal({
                distance: '60px',
                duration: 1500,
                reset: false 
            });
            sr.reveal('.home-content, .heading', { origin: 'top' });
            sr.reveal('.quick-stats-container, #testimonials, .contact-card, form', { origin: 'bottom', interval: 100 });
            sr.reveal('.about-reveal', { origin: 'left', interval: 200 });
            sr.reveal('.portfolio-item', { origin: 'bottom', interval: 100, cleanup: true });
        }

        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let current = 'home';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });
            setActiveSection(current);
            setIsBackToTopVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scriptsLoaded]);

    if (!scriptsLoaded) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#060407] text-white text-xl font-semibold">
                Loading Portfolio...
            </div>
        );
    }

    return (
        <>
            <style>{`
                :root { --accent: #E11D48; --accent-dark: #BE123C; }
                body { background-color: #060407; color: #f1f5f9; }
                .text-accent { color: var(--accent); }
                .bg-accent { background-color: var(--accent); }
                .border-accent { border-color: var(--accent); }
                .hover\\:bg-accent-dark:hover { background-color: var(--accent-dark); }
            `}</style>
            <CarouselStyles />
            <ChibiContainer />
            <Header activeSection={activeSection} />
            <main>
                <HomeSection />
                <AboutSection />
                <PortfolioSection />
                <TestimonialsSection />
                <ContactSection onSupportClick={() => setIsModalOpen(true)} />
            </main>
            <Footer />
            <BackToTopButton isVisible={isBackToTopVisible} />
            <SupportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
