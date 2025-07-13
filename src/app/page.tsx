"use client";
import React, { useState } from 'react';

// --- ATOMS ---

// Button Atom
interface ButtonProps {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
}

const Button: React.FC<ButtonProps> = ({ href, onClick, children, className = '', type = 'button', target, rel }) => {
  const baseClasses = "font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-300";
  const combinedClasses = `${baseClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick} target={target} rel={rel}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
};

// Input Atom
interface InputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  rows?: number; // For textarea
}

const Input: React.FC<InputProps> = ({ id, name, type, placeholder, required = false, label, value, onChange, rows }) => {
  const inputClasses = "bg-gray-700 border border-gray-600 text-gray-200 w-full p-3 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200";
  return (
    <div>
      <label htmlFor={id} className="block text-gray-300 text-sm font-bold mb-2">{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          className={inputClasses}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          className={inputClasses}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

// Select Atom
interface SelectProps {
  id: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ id, name, label, options, required = false, value, onChange }) => {
  const selectClasses = "bg-gray-700 border border-gray-600 text-gray-200 w-full p-3 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200";
  return (
    <div>
      <label htmlFor={id} className="block text-gray-300 text-sm font-bold mb-2">{label}</label>
      <select id={id} name={name} className={selectClasses} required={required} value={value} onChange={onChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

// Checkbox Atom
interface CheckboxProps {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, value, label, checked, onChange }) => {
  return (
    <label className="flex items-center text-gray-300">
      <input
        type="checkbox"
        name={name}
        value={value}
        className="mr-2 rounded text-blue-500 focus:ring-blue-500"
        checked={checked}
        onChange={onChange}
      /> {label}
    </label>
  );
};

// SocialIcon Atom (using placeholder images)
interface SocialIconProps {
  href: string;
  src: string;
  alt: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, src, alt }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
    <img src={src} alt={alt} className="w-10 h-10 rounded-full" />
  </a>
);

// SectionTitle Atom
interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <h2 className="text-4xl md:text-5xl font-bold mb-12 text-blue-400 relative inline-block pb-2 section-title">
    {children}
  </h2>
);

// --- MOLECULES ---

// Navbar Molecule
interface NavbarProps {
  toggleMobileMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleMobileMenu }) => (
  <nav className="container mx-auto flex justify-between items-center">
    <a href="#inicio" className="text-3xl font-bold text-blue-400 hover:text-blue-300 transition-colors duration-300 rounded-lg p-2">
      Vintage Group
    </a>
    <div className="hidden md:flex space-x-6">
      <a href="#inicio" className="text-lg hover:text-blue-400 transition-colors duration-300 rounded-md p-2">Inicio</a>
      <a href="#nosotros" className="text-lg hover:text-blue-400 transition-colors duration-300 rounded-md p-2">Nosotros</a>
      <a href="#musica" className="text-lg hover:text-blue-400 transition-colors duration-300 rounded-md p-2">Música</a>
      <a href="#servicios" className="text-lg hover:text-blue-400 transition-colors duration-300 rounded-md p-2">Servicios</a>
      <a href="#contacto" className="text-lg hover:text-blue-400 transition-colors duration-300 rounded-md p-2">Contacto</a>
    </div>
    <button id="mobile-menu-button" className="md:hidden text-white focus:outline-none" onClick={toggleMobileMenu}>
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
  </nav>
);

// MobileMenu Molecule
interface MobileMenuProps {
  isOpen: boolean;
  toggleMobileMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, toggleMobileMenu }) => {
  if (!isOpen) return null;
  return (
    <div id="mobile-menu" className="md:hidden bg-gray-800 mt-2 rounded-lg shadow-xl">
      <a href="#inicio" className="block py-3 px-4 text-lg hover:bg-gray-700 rounded-md transition-colors duration-300" onClick={toggleMobileMenu}>Inicio</a>
      <a href="#nosotros" className="block py-3 px-4 text-lg hover:bg-gray-700 rounded-md transition-colors duration-300" onClick={toggleMobileMenu}>Nosotros</a>
      <a href="#musica" className="block py-3 px-4 text-lg hover:bg-gray-700 rounded-md transition-colors duration-300" onClick={toggleMobileMenu}>Música</a>
      <a href="#servicios" className="block py-3 px-4 text-lg hover:bg-gray-700 rounded-md transition-colors duration-300" onClick={toggleMobileMenu}>Servicios</a>
      <a href="#contacto" className="block py-3 px-4 text-lg hover:bg-gray-700 rounded-md transition-colors duration-300" onClick={toggleMobileMenu}>Contacto</a>
    </div>
  );
};

// HeroContent Molecule
interface HeroContentProps {
  title: string;
  subtitle: string;
}

const HeroContent: React.FC<HeroContentProps> = ({ title, subtitle }) => (
  <div className="relative z-10 p-6 max-w-4xl mx-auto">
    <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 animate-fade-in-down">
      {title}
    </h1>
    <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-up">
      {subtitle}
    </p>
    <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
      <Button href="#musica" className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-700 hover:to-blue-500">
        Escucha Nuestra Música
      </Button>
      <Button href="#contacto" className="bg-gray-700 text-white hover:bg-gray-600">
        Contrata para Eventos
      </Button>
    </div>
  </div>
);

// MemberCard Molecule
interface MemberCardProps {
  imgSrc: string;
  name: string;
  role: string;
  description: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ imgSrc, name, role, description }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
    <img src={imgSrc} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-400" />
    <h3 className="text-2xl font-semibold text-white mb-2">{name}</h3>
    <p className="text-blue-300 font-medium mb-2">{role}</p>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

// SongCard Molecule
interface SongCardProps {
  title: string;
  description: string;
  audioSrc: string;
  spotifyLink: string;
}

const SongCard: React.FC<SongCardProps> = ({ title, description, audioSrc, spotifyLink }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
    <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-gray-400 mb-4">{description}</p>
    <audio controls className="mb-4 w-full rounded-md bg-gray-700 p-2">
      <source src={audioSrc} type="audio/mpeg" />
      Tu navegador no soporta el elemento de audio.
    </audio>
    <a href={spotifyLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Escuchar en Spotify</a>
  </div>
);

// VideoCard Molecule
interface VideoCardProps {
  youtubeEmbedUrl: string;
  title: string;
  description: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ youtubeEmbedUrl, title, description }) => (
  <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg mb-4">
      <iframe className="absolute top-0 left-0 w-full h-full" src={youtubeEmbedUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={title}></iframe>
    </div>
    <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
    <p className="text-gray-400">{description}</p>
  </div>
);

// ServiceCard Molecule
interface ServiceCardProps {
  icon: string; // Emoji
  title: string;
  description: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
    <div className="text-5xl mb-4 text-blue-400">{icon}</div>
    <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-gray-300">{description}</p>
    <ul className="list-disc list-inside text-gray-400 text-left mt-4">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
  </div>
);

// ContactForm Molecule
interface ContactFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formMessage: string;
  messageType: 'success' | 'error' | '';
}

const ContactForm: React.FC<ContactFormProps> = ({ handleSubmit, formMessage, messageType }) => {
  const eventTypeOptions = [
    { value: "", label: "Selecciona un tipo de evento" },
    { value: "boda", label: "Boda" },
    { value: "corporativo", label: "Evento Corporativo" },
    { value: "fiesta-privada", label: "Fiesta Privada" },
    { value: "festival", label: "Festival / Concierto" },
    { value: "otro", label: "Otro" },
  ];

  const musicStyleCheckboxes = [
    { value: "rock", label: "Rock" },
    { value: "pop", label: "Pop" },
    { value: "jazz", label: "Jazz" },
    { value: "folclore", label: "Folclore" },
    { value: "electronica", label: "Electrónica" },
    { value: "varios", label: "Varios" },
    { value: "otro", label: "Otro" },
  ];

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <Input id="name" name="name" type="text" label="Nombre Completo:" placeholder="Tu Nombre" required />
        <Input id="email" name="email" type="email" label="Correo Electrónico:" placeholder="tu.correo@ejemplo.com" required />
        <Input id="phone" name="phone" type="tel" label="Número de Teléfono:" placeholder="+591 7XXXXXXXX" />
        <Select id="event-type" name="event-type" label="Tipo de Evento:" options={eventTypeOptions} required />
        <Input id="event-date" name="event-date" type="date" label="Fecha Preferida del Evento:" placeholder='Fecha evento' required />
        <Input id="event-location" name="event-location" type="text" label="Ubicación del Evento:" placeholder="Ciudad, Salón, etc." required />
        <div className="md:col-span-2">
          <label className="block text-gray-300 text-sm font-bold mb-2">Estilo Musical Preferido:</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {musicStyleCheckboxes.map(cb => (
              <Checkbox key={cb.value} name="music-style" value={cb.value} label={cb.label} />
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <Input id="message" name="message" type="textarea" label="Mensaje / Detalles Adicionales:" placeholder="Cuéntanos más sobre tu evento y tus necesidades musicales." rows={5} />
        </div>
        <div className="md:col-span-2 text-center">
          <Button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-700 hover:to-blue-500">
            Enviar Consulta
          </Button>
        </div>
      </form>
      {formMessage && (
        <div className={`mt-6 p-4 rounded-md text-center ${messageType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {formMessage}
        </div>
      )}
    </div>
  );
};

// ContactInfo Molecule
interface ContactInfoProps {
  email: string;
  phone: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ email, phone, facebookUrl, instagramUrl, youtubeUrl }) => (
  <div className="mt-16 text-center">
    <h3 className="text-2xl font-bold mb-4 text-blue-400">También puedes contactarnos directamente:</h3>
    <p className="text-xl text-gray-200 mb-2">
      📧 <a href={`mailto:${email}`} className="text-blue-400 hover:underline">{email}</a>
    </p>
    <p className="text-xl text-gray-200 mb-4">
      📞 <a href={`tel:${phone}`} className="text-blue-400 hover:underline">{phone}</a>
    </p>
    <div className="flex justify-center space-x-6 mt-6">
      <SocialIcon href={facebookUrl} src="https://placehold.co/40x40/3b5998/ffffff?text=FB" alt="Facebook Icon" />
      <SocialIcon href={instagramUrl} src="https://placehold.co/40x40/c13584/ffffff?text=IG" alt="Instagram Icon" />
      <SocialIcon href={youtubeUrl} src="https://placehold.co/40x40/ff0000/ffffff?text=YT" alt="YouTube Icon" />
    </div>
  </div>
);

// --- ORGANISMS ---

// Header Organism
interface HeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => (
  <header className="bg-gray-950 text-white p-4 shadow-lg sticky top-0 z-50">
    <Navbar toggleMobileMenu={toggleMobileMenu} />
    <MobileMenu isOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
  </header>
);

// HeroSection Organism
interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, backgroundImage }) => (
  <section id="inicio" className="relative h-screen flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: `url('${backgroundImage}')` }}>
    <div className="absolute inset-0 bg-black opacity-60"></div>
    <HeroContent title={title} subtitle={subtitle} />
  </section>
);

// AboutUsSection Organism
interface AboutUsSectionProps {
  description: string;
  members: MemberCardProps[];
}

const AboutUsSection: React.FC<AboutUsSectionProps> = ({ description, members }) => (
  <section id="nosotros" className="py-16 md:py-24 bg-gray-900">
    <div className="container mx-auto px-6 text-center">
      <SectionTitle>Sobre Nosotros</SectionTitle>
      <div className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300">
        <p className="mb-6">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {members.map((member, index) => (
          <MemberCard key={index} {...member} />
        ))}
      </div>
    </div>
  </section>
);

// MusicSection Organism
interface MusicSectionProps {
  songs: SongCardProps[];
  videos: VideoCardProps[];
}

const MusicSection: React.FC<MusicSectionProps> = ({ songs, videos }) => (
  <section id="musica" className="py-16 md:py-24 bg-gray-950">
    <div className="container mx-auto px-6 text-center">
      <SectionTitle>Nuestra Música</SectionTitle>
      <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
        Explora nuestra discografía y sumérgete en la diversidad de nuestros sonidos. Aquí encontrarás una muestra de los estilos que dominamos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {songs.map((song, index) => (
          <SongCard key={index} {...song} />
        ))}
      </div>

      <h3 className="text-3xl font-bold mb-8 text-blue-400 relative inline-block pb-2 section-title">Videos Destacados</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div>
    </div>
  </section>
);

// ServicesSection Organism
interface ServicesSectionProps {
  introText: string;
  services: ServiceCardProps[];
  ctaText: string;
  ctaHref: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ introText, services, ctaText, ctaHref }) => (
  <section id="servicios" className="py-16 md:py-24 bg-gray-900">
    <div className="container mx-auto px-6 text-center">
      <SectionTitle>Servicios y Eventos</SectionTitle>
      <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
        {introText}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>

      <p className="text-xl text-gray-200 mt-16 max-w-3xl mx-auto">
        {ctaText}
      </p>
      <Button href={ctaHref} className="bg-gradient-to-r from-blue-500 to-blue-700 text-white mt-8 inline-block hover:from-blue-700 hover:to-blue-500">
        Solicita tu Presupuesto
      </Button>
    </div>
  </section>
);

// ContactSection Organism
interface ContactSectionProps {
  introText: string;
  email: string;
  phone: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  formMessage: string;
  messageType: 'success' | 'error' | '';
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  introText, email, phone, facebookUrl, instagramUrl, youtubeUrl, formMessage, messageType, handleSubmit
}) => (
  <section id="contacto" className="py-16 md:py-24 bg-gray-950">
    <div className="container mx-auto px-6 text-center">
      <SectionTitle>Contacto y Contrataciones</SectionTitle>
      <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
        {introText}
      </p>

      <ContactForm handleSubmit={handleSubmit} formMessage={formMessage} messageType={messageType} />
      <ContactInfo email={email} phone={phone} facebookUrl={facebookUrl} instagramUrl={instagramUrl} youtubeUrl={youtubeUrl} />
    </div>
  </section>
);

// Footer Organism
const Footer: React.FC = () => (
  <footer className="bg-gray-950 text-gray-400 py-8 text-center text-sm">
    <div className="container mx-auto px-6">
      <p>&copy; {new Date().getFullYear()} Vintage Group. Todos los derechos reservados.</p>
      <p className="mt-2">Diseñado con pasión por la música.</p>
    </div>
  </footer>
);

// --- TEMPLATES / PAGES (Main App Component) ---

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [formMessage, setFormMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      phone: { value: string };
      'event-type': { value: string };
      'event-date': { value: string };
      'event-location': { value: string };
      'music-style': NodeListOf<HTMLInputElement>;
      message: { value: string };
    };

    console.log("Formulario enviado:", {
      name: target.name.value,
      email: target.email.value,
      phone: target.phone.value,
      eventType: target['event-type'].value,
      musicStyle: Array.from(target['music-style']).filter(cb => cb.checked).map(cb => cb.value),
      eventDate: target['event-date'].value,
      eventLocation: target['event-location'].value,
      message: target.message.value,
    });

    setFormMessage('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    setMessageType('success');
    (event.target as HTMLFormElement).reset();

    setTimeout(() => {
      setFormMessage('');
      setMessageType('');
    }, 5000);
  };

  // Data for sections
  const membersData: MemberCardProps[] = [
    { imgSrc: "https://placehold.co/150x150/4a5568/e2e8f0?text=Miembro+1", name: "Juan Pérez", role: "Voz Principal / Guitarra", description: "Apasionado por el rock clásico y las baladas pop. Aporta la energía y la emotividad al grupo." },
    { imgSrc: "https://placehold.co/150x150/4a5568/e2e8f0?text=Miembro+2", name: "María García", role: "Teclados / Coros", description: "Experta en armonías de jazz y arreglos electrónicos. El cerebro detrás de los paisajes sonoros." },
    { imgSrc: "https://placehold.co/150x150/4a5568/e2e8f0?text=Miembro+3", name: "Carlos Sánchez", role: "Batería / Percusión", description: "El corazón rítmico del grupo, con influencias de ritmos latinos y funk. Mantiene a todos en movimiento." },
  ];

  const songsData: SongCardProps[] = [
    { title: "Fuerza Interior (Rock)", description: "Un himno de rock enérgico con riffs potentes y letras inspiradoras.", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", spotifyLink: "https://open.spotify.com/track/YOUR_SPOTIFY_TRACK_ID" },
    { title: "Sueños Compartidos (Pop Acústico)", description: "Una melodía pop suave y emotiva, perfecta para momentos de reflexión.", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", spotifyLink: "https://open.spotify.com/track/YOUR_SPOTIFY_TRACK_ID" },
    { title: "Noches de Blues (Jazz Fusión)", description: "Una pieza instrumental que fusiona el jazz con toques de blues y funk.", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", spotifyLink: "https://open.spotify.com/track/YOUR_SPOTIFY_TRACK_ID" },
    { title: "Raíces Andinas (Folclore Moderno)", description: "Una reinterpretación moderna de ritmos folclóricos con instrumentos tradicionales.", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", spotifyLink: "https://open.spotify.com/track/YOUR_SPOTIFY_TRACK_ID" },
    { title: "Pulso Urbano (Electrónica Experimental)", description: "Un viaje sonoro a través de texturas electrónicas y ritmos innovadores.", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", spotifyLink: "https://open.spotify.com/track/YOUR_SPOTIFY_TRACK_ID" },
    { title: "Alma en Vuelo (Balada Soul)", description: "Una balada conmovedora con influencias de soul y R&B, ideal para momentos íntimos.", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", spotifyLink: "https://open.spotify.com/track/YOUR_SPOTIFY_TRACK_ID" },
  ];

  const videosData: VideoCardProps[] = [
    { youtubeEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Concierto en Vivo - Festival de Verano", description: "Revive la energía de nuestra presentación en el Festival de Verano, mostrando nuestra faceta más rockera." },
    { youtubeEmbedUrl: "https://www.youtube.com/embed/M_g3t32r2b8", title: "Sesión Acústica Íntima - Melodías al Atardecer", description: "Una versión despojada y emotiva de nuestras canciones, mostrando la calidez de nuestras voces e instrumentos." },
  ];

  const servicesData: ServiceCardProps[] = [
    { icon: "🎉", title: "Bodas y Celebraciones", description: "Desde la ceremonia hasta la fiesta, creamos el ambiente musical ideal para tu día especial.", features: ["Música en vivo para la ceremonia", "Recepción y cóctel", "Fiesta bailable con repertorio variado"] },
    { icon: "🏢", title: "Eventos Corporativos", description: "Profesionalismo y versatilidad para conferencias, lanzamientos de productos y cenas de gala.", features: ["Música de fondo elegante", "Show principal dinámico", "Sets personalizados para la marca"] },
    { icon: "�", title: "Festivales y Conciertos", description: "Llevamos nuestra energía y diversidad musical a grandes escenarios y audiencias.", features: ["Actuaciones en vivo de alto impacto", "Repertorio adaptado al público del festival", "Experiencia en grandes producciones"] },
    { icon: "🏡", title: "Fiestas Privadas", description: "Haz de tu fiesta una experiencia inolvidable con un repertorio a tu medida.", features: ["Cumpleaños, aniversarios, reuniones", "Música para bailar y disfrutar", "Interacción con los invitados"] },
    { icon: "🎨", title: "Eventos Temáticos", description: "Creamos sets especiales para noches temáticas: retro, jazz club, rock tribute, etc.", features: ["Repertorio y vestuario acorde al tema", "Ambiente inmersivo", "Experiencia única y personalizada"] },
    { icon: "✨", title: "Paquetes Personalizados", description: "Ofrecemos opciones flexibles para adaptarnos a tu visión y presupuesto.", features: ["Duración del show ajustable", "Número de músicos", "Repertorio a medida", "Servicios de sonido e iluminación (opcional)"] },
  ];


  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-inter antialiased">
      <Header isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />

      <main>
        <HeroSection
          title="Vintage Group"
          subtitle="Tu banda sonora para cada momento. Ritmos que te harán vibrar, melodías que te emocionarán."
          backgroundImage="https://placehold.co/1920x1080/1a202c/e2e8f0?text=Vintage+Group"
        />

        <AboutUsSection
          description="Vintage Group nació de la pasión compartida por la música y el deseo de explorar un universo sonoro sin límites. Desde nuestros inicios en [Año de Fundación], hemos crecido y evolucionado, fusionando géneros y creando experiencias musicales únicas. Nuestra versatilidad es nuestro sello. Nos movemos con facilidad entre el potente Rock, la energía del Pop, la sofisticación del Jazz, la riqueza del Folclore y la modernidad de la Electrónica. Esta diversidad nos permite adaptarnos a cualquier ambiente y evento, garantizando siempre una conexión profunda con nuestra audiencia. Creemos que la música es un lenguaje universal que une a las personas, y estamos comprometidos a ofrecer actuaciones memorables que dejen una huella duradera."
          members={membersData}
        />

        <MusicSection
          songs={songsData}
          videos={videosData}
        />

        <ServicesSection
          introText="Vintage Group está listo para darle vida a tu evento con la banda sonora perfecta. Nos adaptamos a tus necesidades para crear una experiencia inolvidable."
          services={servicesData}
          ctaText="¿Tienes una idea diferente? ¡Nos encanta la creatividad! Contáctanos y diseñemos juntos la experiencia musical perfecta para tu evento."
          ctaHref="#contacto"
        />

        <ContactSection
          introText="¿Listo para llevar la música de Vintage Group a tu próximo evento? Completa el formulario a continuación o contáctanos directamente."
          email="contacto@vintagegroup.com"
          phone="+5917XXXXXXXX"
          facebookUrl="https://www.facebook.com/vintagegroup.bol"
          instagramUrl="https://instagram.com/vintagegroup"
          youtubeUrl="https://youtube.com/vintagegroup"
          formMessage={formMessage}
          messageType={messageType}
          handleSubmit={handleSubmit}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;