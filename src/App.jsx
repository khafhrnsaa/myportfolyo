import React, { useState, useEffect, useRef } from 'react';
import {
    Home, User, Briefcase, MessageSquareText, Mail, Linkedin, Github, Download,
    ChevronRight, Menu, X, ArrowUp, Plus, Heart, Quote, Star, Code, Database,
    GitBranch, Network, FileSearch, Monitor, BarChart2, Award, Phone, GraduationCap,
    UserCircle, Paperclip, Send, Building, Users, ShieldCheck, MessageCircle, FileText
} from 'lucide-react';

// --- Data untuk Portfolio ---
// Menambahkan properti 'languages' pada setiap item proyek
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
        demoLink: 'https://github.com/airenmeyy/warcoff',
        languages: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'] // Bahasa/teknologi yang digunakan
    },
    {
        id: 18,
        category: 'projects',
        title: 'SayurMart',
        description: 'Sistem manajemen inventaris berbasis web untuk toko sayuran. Aplikasi ini dirancang untuk mengelola stok, mencatat penjualan, dan memantau persediaan dengan efisien, membantu toko sayuran mengoptimalkan operasional dan mengurangi pemborosan.',
        image: 'sayurmart.png',
        demoLink: 'https://github.com/airenmeyy/sayurmart',
        languages: ['HTML5', 'JavaScript', 'CSS'] // Bahasa/teknologi yang digunakan
    },
    {
        id: 22,
        category: 'projects',
        title: 'Kalkulator Zakat',
        description: 'Aplikasi kalkulator zakat berbasis web yang dibuat menggunakan HTML, CSS, dan JavaScript. Aplikasi ini membantu pengguna menghitung berbagai jenis zakat, seperti zakat penghasilan dan zakat maal, dengan antarmuka yang sederhana dan mudah digunakan.',
        image: 'kalkulator zakat.png',
        demoLink: 'https://github.com/airenmeyy/kalkulator-zakat',
        languages: ['JavaScript', 'HTML', 'Tailwind CSS']
    },
    {
        id: 24,
        category: 'projects',
        title: 'Wellnest App',
        description: 'Wellnest adalah aplikasi berbasis web yang dirancang untuk mendukung kesehatan mental dengan menyediakan ruang aman dan anonim bagi pengguna untuk berbagi perasaan dan cerita mereka. Platform ini menghubungkan pengguna dengan pendengar sebaya yang menawarkan empati, membantu meringankan beban emosional dan menumbuhkan komunitas yang suportif.',
        image: 'wellnest app.png',
        demoLink: 'https://youtu.be/y7ICPdUQ474',
        languages: ['React', 'HTML', 'Node.js']
    },
    // Trainings
    { id: 15, category: 'trainings', image: 'sertifikat p3h.png', title: 'Halal Product Process Assistance Training', link: '#' },
    { id: 16, category: 'trainings', image: 'sertifikat lkmm TD.png', title: 'LKMM-TD HMIT V', link: '#' },
];

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
            <a href="#home" className="text-2xl font-bold text-white"></a>
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-2">
                {navLinks.map(link => (
                    <a key={link.id} href={`#${link.id}`}
                       className={`nav-link text-lg font-medium text-gray-300 ${activeSection === link.id ? 'nav-active' : ''}`}>
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
            <nav className={`mobile-nav md:hidden flex flex-col space-y-2 text-left ${isMenuOpen ? 'active' : ''}`}>
                {navLinks.map(link => (
                    <a key={link.id} href={`#${link.id}`}
                       onClick={() => setIsMenuOpen(false)}
                       className={`nav-link text-lg font-medium text-gray-300 ${activeSection === link.id ? 'nav-active' : ''}`}>
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
        <section id="home" className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 pt-24 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
                <div className="home-content space-y-4 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">Hi, I'm Kharisma Fahrun Nisa' 👋</h1>
                    <h3 className="text-2xl md:text-3xl font-bold text-accent h-8">
                        <span ref={typedEl}></span>
                    </h3>
                    <p className="text-gray-300 max-w-lg mx-auto md:mx-0">
                        A proactive and enthusiastic 4th-semester Information Technology student with a strong interest in software development and cybersecurity.
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
                        <a href="#contact" className="btn inline-flex items-center gap-2 bg-accent text-[#060407] font-semibold px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors btn-shadow">
                            <Mail size={20}/> Contact Me
                        </a>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-8 md:mt-0">
                    <div className="relative w-3/4 md:w-full max-w-sm">
                        <img src="profile.jpg" alt="Profile" className="rounded-full border-8 border-accent w-full h-auto object-cover aspect-square animate-float" />
                        <div className="floating-icon absolute top-5 -left-5 w-16 h-16 bg-[#221932] rounded-full flex items-center justify-center shadow-lg" style={{animationDelay: '0.2s'}}>
                            <Code size={36} style={{color: '#722548'}}/>
                        </div>
                        <div className="floating-icon absolute top-1/4 -right-8 w-16 h-16 bg-[#221932] rounded-full flex items-center justify-center shadow-lg" style={{animationDelay: '0.5s'}}>
                            <Database size={36} style={{color: '#541533'}}/>
                        </div>
                        <div className="floating-icon absolute bottom-10 -right-2 w-16 h-16 bg-[#221932] rounded-full flex items-center justify-center shadow-lg" style={{animationDelay: '0.8s'}}>
                            <ShieldCheck size={36} style={{color: '#775E88'}}/>
                        </div>
                            <div className="floating-icon absolute bottom-0 -left-10 w-16 h-16 bg-[#221932] rounded-full flex items-center justify-center shadow-lg" style={{animationDelay: '1s'}}>
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


// --- Komponen About (UPDATED) ---
const AboutSection = () => (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center bg-[#221932] px-4 sm:px-8 md:px-16 lg:px-24 py-20 overflow-hidden">
        <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl font-bold mb-2 text-white">About <span className="text-accent">Me</span></h2>
            <p className="text-gray-300">A little glimpse into my world!</p>
        </div>

        <div className="relative w-full max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
            {/* Chibi Accessories - positioned relative to the main container */}
            <img src="zayne.png" alt="Chibi with stethoscope" className="hidden lg:block w-28 h-28 absolute -top-12 left-10 transform -rotate-[20deg] animate-float z-20" style={{animationDelay: '0.2s'}} />
            <img src="zayne1.png" alt="Chibi reading a book" className="hidden lg:block w-32 h-32 absolute -bottom-16 right-1/4 transform rotate-[15deg] animate-float" style={{animationDelay: '0.5s'}} />
            <img src="zayne2.png" alt="Smiling Chibi" className="hidden lg:block w-24 h-24 absolute top-1/2 -right-8 transform -translate-y-1/2 rotate-[25deg] animate-float" style={{animationDelay: '0.8s'}} />

            {/* Main Photo with playful background */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] flex-shrink-0 about-reveal">
                 <div className="absolute inset-0 bg-accent rounded-full transform -rotate-6 transition-transform group-hover:rotate-0"></div>
                 <img src="profile.jpg" alt="About Kharisma" className="relative w-full h-full object-cover rounded-full border-8 border-[#221932] transform rotate-3 transition-transform group-hover:rotate-0" />
            </div>

            {/* Text Content Card */}
            <div className="relative lg:-ml-20 bg-[#060407] p-8 rounded-2xl shadow-2xl max-w-lg z-10 about-reveal">
                <h3 className="text-3xl font-bold mb-4 text-accent">Hello there! I'm Kharisma.</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                    I'm a proactive and enthusiastic Information Technology student, deeply passionate about the realms of <strong className="text-white">software development</strong> and <strong className="text-white">cybersecurity</strong>. I thrive on blending a sharp analytical mindset with practical technical skills to craft digital solutions that are not only efficient but also secure.
                </p>
                <div className="mt-6 border-t border-gray-700 pt-6">
                     <h4 className="text-xl font-semibold mb-4 text-white">Quick Facts:</h4>
                     <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-3"><GraduationCap className="text-accent w-5 h-5 mt-1 flex-shrink-0"/><span>Student at Sepuluh Nopember Institute of Technology</span></li>
                        <li className="flex items-start gap-3"><Award className="text-accent w-5 h-5 mt-1 flex-shrink-0"/><span>Awardee of PBSB Scholarship - LPDP RI</span></li>
                        <li className="flex items-start gap-3"><Mail className="text-accent w-5 h-5 mt-1 flex-shrink-0"/><span>khafhrnsaa@gmail.com</span></li>
                     </ul>
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

    return (
        <section id="portfolio" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24 py-20">
            <h2 className="text-4xl font-bold mb-4 text-center text-white">My <span className="text-accent">Portfolio</span></h2>
            <p className="text-gray-300 mb-12 text-center max-w-2xl">Explore my work, certifications, and the technologies & trainings I've attended — all in one place.</p>
            
            <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
                {filters.map(filter => (
                    <button key={filter} onClick={() => setActiveFilter(filter)}
                            className={`filter-btn bg-[#221932] px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${activeFilter === filter ? 'active' : 'text-white'}`}>
                        {filter}
                    </button>
                ))}
            </div>
            
            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredItems.map(item => (
                    <div key={item.id} className="portfolio-item bg-[#221932] rounded-lg transition-transform hover:-translate-y-2"
                         style={{ gridColumn: (item.category === 'projects' || item.category === 'trainings') ? 'span 2' : 'span 1' }}>
                        {item.category === 'tech' ? (
                            <div className="p-6 flex flex-col items-center justify-center space-y-3 h-full">
                                {item.icon}
                                <h3 className="font-semibold text-lg text-white">{item.title}</h3>
                            </div>
                        ) : item.category === 'projects' ? (
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
                                                    {item.languages.map((lang, index) => (
                                                        <span key={index} className="bg-[#060407] text-accent text-xs font-medium px-2.5 py-1 rounded-full border border-accent">
                                                            {lang}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {item.demoLink && (
                                            <a href={item.demoLink} target="_blank" rel="noopener noreferrer" className="btn inline-flex items-center justify-center gap-2 bg-accent text-[#060407] font-semibold px-4 py-2 rounded-lg hover:bg-accent-dark transition-colors mt-auto">
                                                Demo <ChevronRight size={16}/>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : ( // For 'trainings'
                            <div className="overflow-hidden group h-full">
                                <div className="relative h-full">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105"/>
                                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4 text-center">
                                        <h4 className="text-white font-bold text-lg">{item.title}</h4>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-2 text-white text-lg border-2 border-accent bg-accent p-3 rounded-full">
                                            <Paperclip size={20}/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
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
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24 py-20 bg-[#221932]">
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
                <a href="https://github.com/airenmeyy" target="_blank" rel="noopener noreferrer" className="contact-card bg-[#060407] p-6 rounded-lg flex items-center justify-between transition-transform hover:-translate-y-1">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-3 text-white"><Github/> GitHub</h3>
                        <p className="text-gray-400">Explore my code & projects</p>
                    </div>
                    <ChevronRight className="text-white"/>
                </a>
                 <a href="https://linkedin.com/in/khafhrnsaa" target="_blank" rel="noopener noreferrer" className="contact-card bg-[#060407] p-6 rounded-lg flex items-center justify-between transition-transform hover:-translate-y-1">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-3 text-white"><Linkedin/> LinkedIn</h3>
                        <p className="text-gray-400">Let's connect professionally</p>
                    </div>
                    <ChevronRight className="text-white"/>
                </a>
                <a href="mailto:khafhrnsaa@gmail.com" className="contact-card bg-[#060407] p-6 rounded-lg flex items-center justify-between transition-transform hover:-translate-y-1">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-3 text-white"><Mail/> Email</h3>
                        <p className="text-gray-400">Send me an email directly</p>
                    </div>
                    <ChevronRight className="text-white"/>
                </a>
                <a href="https://wa.me/62882007503321" target="_blank" rel="noopener noreferrer" className="contact-card bg-[#060407] p-6 rounded-lg flex items-center justify-between transition-transform hover:-translate-y-1">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-3 text-white"><MessageCircle/> WhatsApp</h3>
                        <p className="text-gray-400">Chat with me</p>
                    </div>
                    <ChevronRight className="text-white"/>
                </a>
            </div>
            <div id="contact-form" className="lg:col-span-2 bg-[#060407] p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white"><Send/> Send Me a Message</h3>
                <form action="#" className="space-y-6">
                    <input type="text" placeholder="Your Name" className="w-full p-3 bg-[#221932] rounded-lg border border-transparent focus:border-accent focus:outline-none text-white"/>
                    <input type="email" placeholder="Your Email" className="w-full p-3 bg-[#221932] rounded-lg border border-transparent focus:border-accent focus:outline-none text-white"/>
                    <textarea placeholder="Your Message" rows="5" className="w-full p-3 bg-[#221932] rounded-lg border border-transparent focus:border-accent focus:outline-none text-white"></textarea>
                    <div className="text-right">
                        <button type="submit" className="btn bg-accent text-[#060407] font-semibold px-8 py-3 rounded-lg hover:bg-accent-dark transition-colors btn-shadow">Send Message</button>
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
        <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100]" onClick={onClose}>
            <div className="modal-content bg-[#221932] p-8 rounded-lg shadow-2xl w-full max-w-sm text-center relative" onClick={e => e.stopPropagation()}>
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
    <a href="#home" className={`fixed bottom-8 right-8 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-[#060407] text-2xl transition-all duration-500 hover:bg-accent-dark btn-shadow ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <ArrowUp/>
    </a>
);


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
            sr.reveal('.about-reveal', { origin: 'left', interval: 200, distance: '80px' });
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
