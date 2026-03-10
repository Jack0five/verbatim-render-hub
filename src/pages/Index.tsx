import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { 
  ChevronRight, Shirt, Baby, Bike, 
  Youtube, Send, Mail, X, Loader2, 
  ArrowRight, Globe, ShieldCheck, Zap, Heart, 
  PawPrint, TrendingUp, Brain, Tv, Trophy, Compass, Wrench, ChevronDown,
  Instagram, Facebook, Hammer, ArrowUp
} from 'lucide-react';
import * as THREE from 'three';

/**
 * COMPOSANT D'ARRIÈRE-PLAN ANIMÉ AU SCROLL (PARTICULES VISIBLES)
 */
const ScrollBackground = () => {
  const mountRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (!mountRef.current) return;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const count = 4000; 
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04, 
      color: 0xFFD700,
      transparent: true,
      opacity: 0.6, 
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(points);

    let lastScrollY = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      points.rotation.y += 0.001;
      
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      points.rotation.x += scrollDelta * 0.001;
      points.rotation.z += scrollDelta * 0.0008;
      lastScrollY = currentScrollY;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  const yPos = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  
  return (
    <motion.div 
      ref={mountRef} 
      style={{ translateY: yPos }}
      className="fixed inset-0 z-0 pointer-events-none" 
    />
  );
};

const translations = {
  FR: {
    nav_univers: "Univers",
    nav_logistique: "Logistique",
    nav_contact: "Contact",
    nav_boutiques: "BOUTIQUES",
    hero_title_1: "Le Retail de Qualité.",
    hero_title_2: "La Diversité sans Compromis!",
    hero_subtitle: "Sourcé chez des centaines de fournisseurs qualifiés, vendu sur toutes les grandes marketplaces mondiales, livré avec l'excellence de",
    hero_cta: "Découvrir nos produits",
    univers_title: "Nos",
    univers_span: "Univers",
    univers_explore: "EXPLORER",
    logistics_title_1: "Sélection",
    logistics_title_2: "Rigoureuse.",
    logistics_service: "Service Consommateurs Irréprochable.",
    logistics_security: "Sécurité & Fiabilité Garantie.",
    stat_shipments: "Expéditions / mois",
    stat_satisfaction: "Score de Satisfaction",
    stat_suppliers: "Fournisseurs",
    stat_marketplaces: "Marketplaces",
    live_badge: "FLUX LOGISTIQUE LIVE",
    contact_title_1: "Participez à l'Écosystème.",
    contact_title_2: "Rejoignez le boss.",
    contact_subtitle: "Contact Direct",
    form_identity: "Identité (Obligatoire)",
    form_email: "Email Professionnel (Obligatoire)",
    form_message: "Votre Message (Obligatoire)",
    form_placeholder_name: "VOTRE NOM",
    form_placeholder_message: "QUELLE EST VOTRE AMBITION ?",
    form_submit: "Envoyer la demande",
    form_success_title: "Transmission Réussie",
    form_success_msg: "Nous revenons vers vous instantanément avec l'adresse contact@monkeyatwork.com",
    footer_desc: "Leader européen du retail multi-plateforme. Nous transformons la logistique en art et le sourcing en science.",
    footer_info: "Informations",
    footer_about: "Qui sommes nous",
    footer_expertise: "Notre Expertise",
    footer_partners: "Partenariats",
    footer_key_universes: "Univers Clés",
    footer_legal_title: "Légal",
    footer_mentions: "Mentions Légales",
    footer_confidentiality: "Confidentialité",
    footer_cgu: "Conditions Générales",
    footer_press: "Contact Presse",
    footer_copyright: "© 2026 Monkey At Work - Performance & Excellence",
    const_title: "Site actuellement",
    const_span: "en construction",
    const_p1: "Nos équipes travaillent sur l'excellence logistique de demain.",
    const_p2: "Revenez très bientôt pour découvrir nos nouveaux univers.",
    const_back: "Retour à l'accueil",
    universes: [
      "Style & Textile", "Culture & Médias", "Animaux", "Enfants", 
      "Auto & Moto", "Bricolage & Jardin", "Beauté & Bien être", 
      "Ameublement", "Sports", "Finances & Économie", 
      "Dév. Personnel", "Voyage & Évasion"
    ]
  },
  EN: {
    nav_univers: "Universes",
    nav_logistique: "Logistics",
    nav_contact: "Contact",
    nav_boutiques: "SHOPS",
    hero_title_1: "Quality Retail.",
    hero_title_2: "Diversity without Compromise!",
    hero_subtitle: "Sourced from hundreds of qualified suppliers, sold on all major marketplaces, delivered with the excellence of",
    hero_cta: "Discover our products",
    univers_title: "Our",
    univers_span: "Universes",
    univers_explore: "EXPLORE",
    logistics_title_1: "Rigorous",
    logistics_title_2: "Selection.",
    logistics_service: "Flawless Customer Service.",
    logistics_security: "Guaranteed Security & Reliability.",
    stat_shipments: "Shipments / month",
    stat_satisfaction: "Satisfaction Score",
    stat_suppliers: "Suppliers",
    stat_marketplaces: "Marketplaces",
    live_badge: "LIVE LOGISTICS STREAM",
    contact_title_1: "Join the Ecosystem.",
    contact_title_2: "Join the boss.",
    contact_subtitle: "Direct Contact",
    form_identity: "Identity (Required)",
    form_email: "Business Email (Required)",
    form_message: "Your Message (Required)",
    form_placeholder_name: "YOUR NAME",
    form_placeholder_message: "WHAT IS YOUR AMBITION?",
    form_submit: "Send Request",
    form_success_title: "Transmission Successful",
    form_success_msg: "We will get back to you instantly at contact@monkeyatwork.com",
    footer_desc: "European leader in multi-platform retail. We turn logistics into art and sourcing into science.",
    footer_info: "Information",
    footer_about: "About Us",
    footer_expertise: "Our Expertise",
    footer_partners: "Partnerships",
    footer_key_universes: "Key Universes",
    footer_legal_title: "Legal",
    footer_mentions: "Legal Mentions",
    footer_confidentiality: "Privacy Policy",
    footer_cgu: "Terms & Conditions",
    footer_press: "Press Contact",
    footer_copyright: "© 2026 Monkey At Work - Performance & Excellence",
    const_title: "Site currently",
    const_span: "under construction",
    const_p1: "Our teams are working on the logistics excellence of tomorrow.",
    const_p2: "Come back soon to discover our new universes.",
    const_back: "Back to home",
    universes: [
      "Style & Textile", "Culture & Media", "Pets", "Kids", 
      "Auto & Moto", "DIY & Garden", "Beauty & Wellness", 
      "Furniture", "Sports", "Finance & Economy", 
      "Personal Dev.", "Travel & Escape"
    ]
  },
  ES: {
    nav_univers: "Universos",
    nav_logistique: "Logística",
    nav_contact: "Contacto",
    nav_boutiques: "TIENDAS",
    hero_title_1: "Retail de Calidad.",
    hero_title_2: "¡Diversidad sin Compromiso!",
    hero_subtitle: "Abastecido por cientos de proveedores calificados, vendido en los principales marketplaces, entregado con la excelencia de",
    hero_cta: "Descubrir productos",
    univers_title: "Nuestros",
    univers_span: "Universos",
    univers_explore: "EXPLORAR",
    logistics_title_1: "Selección",
    logistics_title_2: "Rigurosa.",
    logistics_service: "Servicio al Cliente Impecable.",
    logistics_security: "Seguridad y Fiabilidad Garantizada.",
    stat_shipments: "Envíos / mes",
    stat_satisfaction: "Puntuación de Satisfacción",
    stat_suppliers: "Proveedores",
    stat_marketplaces: "Marketplaces",
    live_badge: "LOGÍSTICA EN VIVO",
    contact_title_1: "Únete al Ecosistema.",
    contact_title_2: "Únete al jefe.",
    contact_subtitle: "Contacto Directo",
    form_identity: "Identidad (Obligatorio)",
    form_email: "Email Profesional (Obligatorio)",
    form_message: "Tu Message (Obligatorio)",
    form_placeholder_name: "TU NOMBRE",
    form_placeholder_message: "¿CUÁL EST TU AMBICIÓN?",
    form_submit: "Enviar solicitud",
    form_success_title: "Transmisión Exitosa",
    form_success_msg: "Le responderemos al instante desde contact@monkeyatwork.com",
    footer_desc: "Líder europeo en retail multiplataforma. Convertimos la logística en arte y el abastecimiento en ciencia.",
    footer_info: "Información",
    footer_about: "Quiénes somos",
    footer_expertise: "Nuestra Experiencia",
    footer_partners: "Asociaciones",
    footer_key_universes: "Universos Clave",
    footer_legal_title: "Legal",
    footer_mentions: "Aviso Legal",
    footer_confidentiality: "Privacidad",
    footer_cgu: "Condiciones Generales",
    footer_press: "Contacto de Prensa",
    footer_copyright: "© 2026 Monkey At Work - Performance & Excellence",
    const_title: "Sitio actualmente",
    const_span: "en construcción",
    const_p1: "Nuestros equipos están trabajando en la excelencia logística del mañana.",
    const_p2: "Vuelva pronto para descubrir nuestros nuevos universos.",
    const_back: "Volver al inicio",
    universes: [
      "Estilo y Textil", "Cultura y Medios", "Mascotas", "Niños", 
      "Auto y Moto", "Bricolaje y Jardín", "Belleza y Bienestar", 
      "Muebles", "Deportes", "Finanzas y Economía", 
      "Des. Personal", "Viajes y Escape"
    ]
  },
  DE: {
    nav_univers: "Universen",
    nav_logistique: "Logistik",
    nav_contact: "Kontakt",
    nav_boutiques: "SHOPS",
    hero_title_1: "Qualitäts-Einzelhandel.",
    hero_title_2: "Vielfalt ohne Kompromisse!",
    hero_subtitle: "Bezogen von hunderten qualifizierten Lieferanten, verkauft auf allen großen Marktplätzen, geliefert mit der Exzellenz von",
    hero_cta: "Produkte entdecken",
    univers_title: "Unsere",
    univers_span: "Universen",
    univers_explore: "ERKUNDEN",
    logistics_title_1: "Strenge",
    logistics_title_2: "Auswahl.",
    logistics_service: "Makelloser Kundenservice.",
    logistics_security: "Garantierte Sicherheit & Zuverlässigkeit.",
    stat_shipments: "Versand / Monat",
    stat_satisfaction: "Zufriedenheitswert",
    stat_suppliers: "Lieferanten",
    stat_marketplaces: "Marktplätze",
    live_badge: "LIVE LOGISTIK-STREAM",
    contact_title_1: "Werden Sie Teil des Ökosystems.",
    contact_title_2: "Kommen Sie zum Chef.",
    contact_subtitle: "Direkter Kontakt",
    form_identity: "Identität (Erforderlich)",
    form_email: "Geschäftliche E-Mail (Erforderlich)",
    form_message: "Ihre Nachricht (Erforderlich)",
    form_placeholder_name: "IHR NAME",
    form_placeholder_message: "WAS IST IHRE AMBITION?",
    form_submit: "Anfrage senden",
    form_success_title: "Übermittlung Erfolgreich",
    form_success_msg: "Wir melden uns umgehend bei Ihnen unter contact@monkeyatwork.com",
    footer_desc: "Europäischer Marktführer im Multi-Plattform-Einzelhandel. Wir machen Logistik zur Kunst und Sourcing zur Wissenschaft.",
    footer_info: "Informationen",
    footer_about: "Über uns",
    footer_expertise: "Unsere Expertise",
    footer_partners: "Partnerschaften",
    footer_key_universes: "Kern-Universen",
    footer_legal_title: "Rechtliches",
    footer_mentions: "Impressum",
    footer_confidentiality: "Datenschutz",
    footer_cgu: "AGB",
    footer_press: "Pressekontakt",
    footer_copyright: "© 2026 Monkey At Work - Performance & Excellence",
    const_title: "Website derzeit",
    const_span: "im Aufbau",
    const_p1: "Unsere Teams arbeiten an der logistischen Exzellenz von morgen.",
    const_p2: "Besuchen Sie uns bald wieder, um unsere neuen Universen zu entdecken.",
    const_back: "Zurück zur Startseite",
    universes: [
      "Stil & Textil", "Kultur & Medien", "Tiere", "Kinder", 
      "Auto & Motorrad", "Heimwerken & Garten", "Schönheit & Wellness", 
      "Möbel", "Sport", "Finanzen & Wirtschaft", 
      "Pers. Entw.", "Reisen & Erholung"
    ]
  }
};

const AnimatedCounter = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest).toLocaleString());
    });
  }, [springValue]);

  return <span ref={ref}>{displayValue}</span>;
};

const Monkey3DHero = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    let width = mountRef.current.clientWidth;
    let height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const material = new THREE.MeshPhongMaterial({
      color: 0xFFD700,
      wireframe: true,
      emissive: 0xC5A031,
      emissiveIntensity: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xFFD700,
      transparent: true,
      opacity: 0.8
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.005;
      mesh.rotation.x += 0.002;
      particlesMesh.rotation.y += 0.001;
      mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, mouseX * 2, 0.1);
      mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, -mouseY * 2, 0.1);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      width = mountRef.current.clientWidth;
      height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 opacity-60" />;
};

const MarketplacesMarquee = () => {
  const markets = [
    { name: "amazon", logoType: 'amazon' },
    { name: "ebay", colors: ["#e53238", "#0064d2", "#f5af02", "#86b817"], logoType: 'ebay' },
    { name: "Walmart", logoType: 'walmart' },
    { name: "Target", logoType: 'target' },
    { name: "Cdiscount", logoType: 'cdiscount' },
    { name: "AliExpress", logoType: 'aliexpress' },
    { name: "Etsy", logoType: 'etsy' },
    { name: "Kaufland", logoType: 'kaufland' },
    { name: "Zalando", logoType: 'zalando' },
    { name: "ManoMano", logoType: 'manomano' },
    { name: "Rakuten", logoType: 'rakuten' }
  ];

  return (
    <div className="py-16 bg-white/5 border-y border-white/5 overflow-hidden relative z-10">
      <div className="flex whitespace-nowrap animate-marquee gap-32 items-center">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-32 items-center">
            {markets.map((m, idx) => (
              <div key={idx} className="flex items-center">
                {m.logoType === 'ebay' ? (
                  <span className="text-5xl font-bold flex tracking-[-0.07em] font-sans">
                    {m.name.split('').map((char, ci) => (
                      <span key={ci} style={{ color: m.colors[ci % 4] }}>{char}</span>
                    ))}
                  </span>
                ) : m.logoType === 'amazon' ? (
                  <div className="flex flex-col items-center pt-2">
                    <span className="text-5xl font-black lowercase tracking-tighter leading-none text-white font-sans">amazon</span>
                    <svg width="80" height="20" viewBox="0 0 100 25" fill="none" className="mt-[-2px]">
                      <path d="M15 5C35 18 65 18 85 5" stroke="#FF9900" strokeWidth="6" strokeLinecap="round" />
                      <path d="M83 5L92 12L80 10" fill="#FF9900" />
                    </svg>
                  </div>
                ) : m.logoType === 'walmart' ? (
                  <div className="flex items-center gap-1">
                    <span className="text-5xl font-bold tracking-tighter text-[#0071CE] font-sans">Walmart</span>
                    <div className="relative w-8 h-8 flex items-center justify-center">
                        {[0, 60, 120, 180, 240, 300].map(deg => (
                            <div 
                                key={deg} 
                                className="absolute w-[3px] h-3 bg-[#FFC220] rounded-full" 
                                style={{ transform: `rotate(${deg}deg) translateY(-10px)` }} 
                            />
                        ))}
                    </div>
                  </div>
                ) : m.logoType === 'target' ? (
                    <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full border-[6px] border-[#CC0000]" />
                            <div className="absolute w-4 h-4 bg-[#CC0000] rounded-full" />
                        </div>
                        <span className="text-5xl font-black text-white font-sans tracking-tighter">Target</span>
                    </div>
                ) : m.logoType === 'kaufland' ? (
                    <div className="flex items-center border-[4px] border-[#E30613] px-3 py-1">
                        <span className="text-4xl font-black text-white font-sans tracking-tighter">Kaufland</span>
                    </div>
                ) : m.logoType === 'zalando' ? (
                    <div className="flex items-center gap-2">
                        <svg width="40" height="40" viewBox="0 0 40 40">
                             <path d="M20 2L35 32L20 38L5 32L20 2Z" fill="#FF6900" />
                        </svg>
                        <span className="text-5xl font-black text-white font-sans tracking-tighter italic">zalando</span>
                    </div>
                ) : m.logoType === 'manomano' ? (
                    <div className="flex items-center gap-1">
                        <span className="text-5xl font-black text-[#00AFAB] font-sans tracking-tighter">Mano</span>
                        <span className="text-5xl font-black text-[#F49F12] font-sans tracking-tighter">Mano</span>
                    </div>
                ) : m.logoType === 'etsy' ? (
                  <span className="text-6xl font-serif text-[#F1641E] lowercase tracking-tight">Etsy</span>
                ) : m.logoType === 'aliexpress' ? (
                  <span className="text-5xl font-black italic tracking-tighter text-[#FF4747] font-sans">AliExpress</span>
                ) : m.logoType === 'cdiscount' ? (
                  <div className="bg-[#25225D] px-4 py-2 flex items-center gap-0.5 transform -skew-x-12 border-r-4 border-[#E2001A]">
                    <span className="text-4xl font-black text-white italic tracking-tighter">C</span>
                    <span className="text-3xl font-bold text-white tracking-tighter lowercase">discount</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-5xl font-black text-white font-sans tracking-tighter">Rakuten</span>
                    <div className="w-full h-1.5 bg-[#BF0000] mt-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const phoneCodes = [
  { code: '+93', country: 'AF' }, { code: '+355', country: 'AL' }, { code: '+213', country: 'DZ' },
  { code: '+376', country: 'AD' }, { code: '+244', country: 'AO' }, { code: '+1-268', country: 'AG' },
  { code: '+54', country: 'AR' }, { code: '+374', country: 'AM' }, { code: '+61', country: 'AU' },
  { code: '+43', country: 'AT' }, { code: '+994', country: 'AZ' }, { code: '+1-242', country: 'BS' },
  { code: '+973', country: 'BH' }, { code: '+880', country: 'BD' }, { code: '+1-246', country: 'BB' },
  { code: '+375', country: 'BY' }, { code: '+32', country: 'BE' }, { code: '+501', country: 'BZ' },
  { code: '+229', country: 'BJ' }, { code: '+975', country: 'BT' }, { code: '+591', country: 'BO' },
  { code: '+387', country: 'BA' }, { code: '+267', country: 'BW' }, { code: '+55', country: 'BR' },
  { code: '+673', country: 'BN' }, { code: '+359', country: 'BG' }, { code: '+226', country: 'BF' },
  { code: '+257', country: 'BI' }, { code: '+855', country: 'KH' }, { code: '+237', country: 'CM' },
  { code: '+1', country: 'CA' }, { code: '+238', country: 'CV' }, { code: '+236', country: 'CF' },
  { code: '+235', country: 'TD' }, { code: '+56', country: 'CL' }, { code: '+86', country: 'CN' },
  { code: '+57', country: 'CO' }, { code: '+269', country: 'KM' }, { code: '+242', country: 'CG' },
  { code: '+243', country: 'CD' }, { code: '+506', country: 'CR' }, { code: '+225', country: 'CI' },
  { code: '+385', country: 'HR' }, { code: '+53', country: 'CU' }, { code: '+357', country: 'CY' },
  { code: '+420', country: 'CZ' }, { code: '+45', country: 'DK' }, { code: '+253', country: 'DJ' },
  { code: '+1-767', country: 'DM' }, { code: '+1-809', country: 'DO' }, { code: '+593', country: 'EC' },
  { code: '+20', country: 'EG' }, { code: '+503', country: 'SV' }, { code: '+240', country: 'GQ' },
  { code: '+291', country: 'ER' }, { code: '+372', country: 'EE' }, { code: '+268', country: 'SZ' },
  { code: '+251', country: 'ET' }, { code: '+679', country: 'FJ' }, { code: '+358', country: 'FI' },
  { code: '+33', country: 'FR' }, { code: '+241', country: 'GA' }, { code: '+220', country: 'GM' },
  { code: '+995', country: 'GE' }, { code: '+49', country: 'DE' }, { code: '+233', country: 'GH' },
  { code: '+30', country: 'GR' }, { code: '+1-473', country: 'GD' }, { code: '+502', country: 'GT' },
  { code: '+224', country: 'GN' }, { code: '+245', country: 'GW' }, { code: '+592', country: 'GY' },
  { code: '+509', country: 'HT' }, { code: '+504', country: 'HN' }, { code: '+36', country: 'HU' },
  { code: '+354', country: 'IS' }, { code: '+91', country: 'IN' }, { code: '+62', country: 'ID' },
  { code: '+98', country: 'IR' }, { code: '+964', country: 'IQ' }, { code: '+353', country: 'IE' },
  { code: '+972', country: 'IL' }, { code: '+39', country: 'IT' }, { code: '+1-876', country: 'JM' },
  { code: '+81', country: 'JP' }, { code: '+962', country: 'JO' }, { code: '+7', country: 'KZ' },
  { code: '+254', country: 'KE' }, { code: '+686', country: 'KI' }, { code: '+850', country: 'KP' },
  { code: '+82', country: 'KR' }, { code: '+965', country: 'KW' }, { code: '+996', country: 'KG' },
  { code: '+856', country: 'LA' }, { code: '+371', country: 'LV' }, { code: '+961', country: 'LB' },
  { code: '+266', country: 'LS' }, { code: '+231', country: 'LR' }, { code: '+218', country: 'LY' },
  { code: '+423', country: 'LI' }, { code: '+370', country: 'LT' }, { code: '+352', country: 'LU' },
  { code: '+261', country: 'MG' }, { code: '+265', country: 'MW' }, { code: '+60', country: 'MY' },
  { code: '+960', country: 'MV' }, { code: '+223', country: 'ML' }, { code: '+356', country: 'MT' },
  { code: '+692', country: 'MH' }, { code: '+222', country: 'MR' }, { code: '+230', country: 'MU' },
  { code: '+52', country: 'MX' }, { code: '+691', country: 'FM' }, { code: '+373', country: 'MD' },
  { code: '+377', country: 'MC' }, { code: '+976', country: 'MN' }, { code: '+382', country: 'ME' },
  { code: '+212', country: 'MA' }, { code: '+258', country: 'MZ' }, { code: '+95', country: 'MM' },
  { code: '+264', country: 'NA' }, { code: '+674', country: 'NR' }, { code: '+977', country: 'NP' },
  { code: '+31', country: 'NL' }, { code: '+64', country: 'NZ' }, { code: '+505', country: 'NI' },
  { code: '+227', country: 'NE' }, { code: '+234', country: 'NG' }, { code: '+389', country: 'MK' },
  { code: '+47', country: 'NO' }, { code: '+968', country: 'OM' }, { code: '+92', country: 'PK' },
  { code: '+680', country: 'PW' }, { code: '+507', country: 'PA' }, { code: '+675', country: 'PG' },
  { code: '+595', country: 'PY' }, { code: '+51', country: 'PE' }, { code: '+63', country: 'PH' },
  { code: '+48', country: 'PL' }, { code: '+351', country: 'PT' }, { code: '+974', country: 'QA' },
  { code: '+40', country: 'RO' }, { code: '+7', country: 'RU' }, { code: '+250', country: 'RW' },
  { code: '+1-869', country: 'KN' }, { code: '+1-758', country: 'LC' }, { code: '+1-784', country: 'VC' },
  { code: '+685', country: 'WS' }, { code: '+378', country: 'SM' }, { code: '+239', country: 'ST' },
  { code: '+966', country: 'SA' }, { code: '+221', country: 'SN' }, { code: '+381', country: 'RS' },
  { code: '+248', country: 'SC' }, { code: '+232', country: 'SL' }, { code: '+65', country: 'SG' },
  { code: '+421', country: 'SK' }, { code: '+386', country: 'SI' }, { code: '+677', country: 'SB' },
  { code: '+252', country: 'SO' }, { code: '+27', country: 'ZA' }, { code: '+211', country: 'SS' },
  { code: '+34', country: 'ES' }, { code: '+94', country: 'LK' }, { code: '+249', country: 'SD' },
  { code: '+597', country: 'SR' }, { code: '+46', country: 'SE' }, { code: '+41', country: 'CH' },
  { code: '+963', country: 'SY' }, { code: '+886', country: 'TW' }, { code: '+992', country: 'TJ' },
  { code: '+255', country: 'TZ' }, { code: '+66', country: 'TH' }, { code: '+670', country: 'TL' },
  { code: '+228', country: 'TG' }, { code: '+676', country: 'TO' }, { code: '+1-868', country: 'TT' },
  { code: '+216', country: 'TN' }, { code: '+90', country: 'TR' }, { code: '+993', country: 'TM' },
  { code: '+688', country: 'TV' }, { code: '+256', country: 'UG' }, { code: '+380', country: 'UA' },
  { code: '+971', country: 'AE' }, { code: '+44', country: 'GB' }, { code: '+1', country: 'US' },
  { code: '+598', country: 'UY' }, { code: '+998', country: 'UZ' }, { code: '+678', country: 'VU' },
  { code: '+379', country: 'VA' }, { code: '+58', country: 'VE' }, { code: '+84', country: 'VN' },
  { code: '+967', country: 'YE' }, { code: '+260', country: 'ZM' }, { code: '+263', country: 'ZW' },
  { code: '+262', country: 'RE' }, { code: '+590', country: 'GP' }, { code: '+594', country: 'GF' },
  { code: '+596', country: 'MQ' }, { code: '+687', country: 'NC' }, { code: '+689', country: 'PF' },
  { code: '+852', country: 'HK' }, { code: '+853', country: 'MO' }, { code: '+970', country: 'PS' },
  { code: '+599', country: 'CW' }, { code: '+290', country: 'SH' }, { code: '+500', country: 'FK' },
];

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentLang, setCurrentLang] = useState('FR');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [phoneCode, setPhoneCode] = useState('+33');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const languages = [
    { code: 'FR', label: 'Français' },
    { code: 'EN', label: 'English' },
    { code: 'ES', label: 'Español' },
    { code: 'DE', label: 'Deutsch' }
  ];

  const universes = [
    { title: t.universes[1], icon: <Tv size={40} />, img: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=800" },
    { title: t.universes[0], icon: <Shirt size={40} />, img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800" }, 
    { title: t.universes[2], icon: <PawPrint size={40} />, img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800" },
    { title: t.universes[3], icon: <Baby size={40} />, img: "https://images.unsplash.com/photo-1510154221590-ff63e90a136f?q=80&w=800" }, 
    { title: t.universes[4], icon: <Bike size={40} />, img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800" },
    { title: t.universes[5], icon: <Wrench size={40} />, img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800" },
    { title: t.universes[6], icon: <Heart size={40} />, img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800" }, 
    { title: t.universes[7], icon: <Globe size={40} />, img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800" },
    { title: t.universes[8], icon: <Trophy size={40} />, img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800" },
    { title: t.universes[9], icon: <TrendingUp size={40} />, img: "https://images.unsplash.com/photo-1579532536935-619928decd08?q=80&w=800" },
    { title: t.universes[10], icon: <Brain size={40} />, img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800" },
    { title: t.universes[11], icon: <Compass size={40} />, img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleRedirect = (e) => {
    e.preventDefault();
    setCurrentPage('construction');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'construction') {
    return (
      <div className="bg-[#000000] text-white h-screen w-full flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <ScrollBackground />
        <Monkey3DHero />
        <div className="relative z-10 max-w-4xl space-y-12 bg-black/40 backdrop-blur-md p-10 rounded-3xl">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex p-8 bg-[#FFD700] rounded-full text-black shadow-[0_0_50px_rgba(255,215,0,0.4)]"
          >
            <Hammer size={80} />
          </motion.div>
          
          <div className="space-y-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter"
            >
              {t.const_title} <br/> <span className="text-[#FFD700]">{t.const_span}</span>
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-white/50 uppercase font-bold tracking-[0.2em] leading-loose max-w-2xl mx-auto"
            >
              <p className="mb-6">{t.const_p1}</p>
              <p>{t.const_p2}</p>
            </motion.div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('home')}
            className="bg-white text-black px-12 py-5 font-black uppercase tracking-widest text-xs flex items-center gap-4 mx-auto"
          >
            <ArrowRight className="rotate-180" /> {t.const_back}
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white font-sans selection:bg-[#FFD700] selection:text-black relative">
      <ScrollBackground />

      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 py-1 px-8 flex justify-between items-center">
        <div className="flex items-center gap-4 cursor-pointer" onClick={scrollToTop}>
          <img src="/images/logo-monkey.jpg" alt="Logo MAW" className="w-32 h-32 rounded-lg border border-[#FFD700]/50 object-contain relative z-10" />
          <div className="flex flex-col uppercase font-black italic leading-none tracking-tighter">
            <span className="text-2xl">Monkey <span className="text-[#FFD700]">At Work</span></span>
          </div>
        </div>
        <div className="hidden lg:flex gap-8 text-xs font-black uppercase tracking-widest text-white/50">
          <a href="#univers" className="hover:text-[#FFD700] transition-colors">{t.nav_univers}</a>
          <a href="#logistique" className="hover:text-[#FFD700] transition-colors">{t.nav_logistique}</a>
          <a href="#contact" className="hover:text-[#FFD700] transition-colors">{t.nav_contact}</a>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-[#FFD700] transition-colors"
            >
              {currentLang} <ChevronDown size={14} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-4 bg-neutral-900 border border-white/10 p-2 rounded-xl shadow-2xl min-w-[120px]"
                >
                  {languages.map((l) => (
                    <button 
                      key={l.code}
                      onClick={() => { setCurrentLang(l.code); setIsLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-xs font-black uppercase tracking-widest hover:bg-[#FFD700] hover:text-black transition-colors rounded-lg ${currentLang === l.code ? 'text-[#FFD700]' : 'text-white'}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={handleRedirect} className="bg-[#FFD700] text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]">
            {t.nav_boutiques}
          </button>
        </div>
      </nav>

      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <Monkey3DHero />
        <div className="relative z-20 max-w-6xl pt-20 flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl lg:text-[7.5rem] font-black uppercase italic leading-[0.95] tracking-tighter mb-8"
          >
            {t.hero_title_1} <br/>
            <span className="text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">{t.hero_title_2}</span>
          </motion.h1>
          <motion.p className="max-w-3xl mx-auto text-xl lg:text-2xl font-medium text-white/60 mb-12 uppercase tracking-wide leading-relaxed">
            {t.hero_subtitle} <span className="text-[#FFFF00] font-black drop-shadow-[0_0_15px_rgba(255,255,0,0.8)]">Monkey At Work</span>.
          </motion.p>
        </div>
      </section>

      <div className="flex justify-center relative z-[40] -mb-12 md:-mb-16" style={{ marginTop: '-30px' }}>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-[#FFD700] text-black px-12 py-6 font-black text-xl tracking-[0.2em] uppercase overflow-hidden transition-all shadow-[0_0_40px_rgba(255,215,0,0.5)]"
          onClick={() => document.getElementById('univers').scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="relative z-10 flex items-center gap-4">{t.hero_cta} <ArrowRight /></span>
          <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
        </motion.button>
      </div>

      <MarketplacesMarquee />

      <section id="univers" className="py-32 px-8 max-w-[1800px] mx-auto mt-16 md:mt-24 relative z-10 bg-transparent">
        <h2 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter mb-24">
          {t.univers_title} <span className="text-[#FFD700]">{t.univers_span}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universes.map((u, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -15 }}
              onClick={handleRedirect}
              className="group relative h-[500px] lg:h-[700px] overflow-hidden rounded-[2rem] border border-white/5 bg-neutral-900/40 backdrop-blur-sm cursor-pointer"
            >
              <img src={u.img} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700" alt={u.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
                <div className="text-[#FFD700] mb-6 transform group-hover:scale-125 transition-transform origin-left">{u.icon}</div>
                <h3 className="text-3xl lg:text-4xl font-black uppercase italic tracking-tighter mb-6">{u.title}</h3>
                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity">
                  {t.univers_explore} <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="logistique" className="relative py-40 bg-transparent overflow-hidden border-y border-white/5 z-10">
        <div className="max-w-[1800px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <h2 className="text-5xl lg:text-7xl font-black uppercase italic leading-[1] tracking-tighter">
              {t.logistics_title_1} <br/> <span className="text-[#FFD700]">{t.logistics_title_2}</span>
            </h2>
            <div className="flex items-start gap-8 border-l-4 border-[#FFD700] pl-8">
              <ShieldCheck size={64} className="text-[#FFD700] shrink-0" />
              <div className="flex flex-col gap-4">
                <p className="text-2xl lg:text-4xl font-black italic tracking-tighter text-white uppercase">
                  {t.logistics_service}
                </p>
                <p className="text-2xl lg:text-4xl font-black italic tracking-tighter text-white uppercase">
                  {t.logistics_security}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: 15000, lab: t.stat_shipments },
                { val: 4.9, lab: t.stat_satisfaction, suffix: "/5" },
                { val: 2000, lab: t.stat_suppliers },
                { val: 280, lab: t.stat_marketplaces }
              ].map((stat, si) => (
                <div key={si} className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                  <div className="text-3xl font-black text-[#FFD700] mb-1">
                    <AnimatedCounter value={stat.val} />{stat.suffix || "+"}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/60">{stat.lab}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative h-[450px] lg:h-[550px] mt-8 lg:mt-0 rounded-[3rem] overflow-hidden group self-end border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-black">
             <iframe 
               className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105"
               src="https://www.youtube.com/embed/ydYDqZQpim8?autoplay=1&mute=1&controls=0&loop=1&playlist=ydYDqZQpim8&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0" 
               title="Live Logistics Camera" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
             ></iframe>
            <div className="absolute top-12 left-12 bg-[#FFD700] text-black px-8 py-4 font-black uppercase tracking-widest text-xs rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(255,215,0,0.5)] z-20">
              <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
              {t.live_badge}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="pt-40 pb-20 px-8 bg-transparent z-10 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20 space-y-12">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]">
              <span className="text-[#FFD700]">{t.contact_title_1}</span> <br/>
              <div className="h-8 md:h-12" />
              <span className="text-white">{t.contact_title_2}</span>
            </h2>
            
            <div className="flex flex-wrap justify-center gap-8 py-10">
              {[
                { icon: <Instagram />, label: "Instagram", color: "hover:bg-gradient-to-tr from-purple-500 to-pink-500" },
                { icon: <Send />, label: "Telegram", color: "hover:bg-[#0088cc]" },
                { icon: <Youtube />, label: "Youtube", color: "hover:bg-[#ff0000]" },
                { icon: <Facebook />, label: "Facebook", color: "hover:bg-[#1877f2]" },
                { icon: <X />, label: "X / Twitter", color: "hover:bg-white hover:text-black" }
              ].map((social, i) => (
                <motion.button 
                  key={i} 
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  onClick={handleRedirect}
                  className={`group relative w-20 h-20 rounded-2xl border-2 border-white/10 flex flex-col items-center justify-center transition-all duration-300 bg-black/40 backdrop-blur-md ${social.color}`}
                >
                  {React.cloneElement(social.icon, { size: 32 })}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-black/60 p-8 md:p-16 rounded-[4rem] border border-white/5 backdrop-blur-xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center mb-8 mx-auto shadow-[0_0_30px_rgba(255,215,0,0.5)]">
                    <Zap size={40} className="text-black" />
                  </div>
                  <h3 className="text-4xl font-black italic uppercase mb-4">{t.form_success_title}</h3>
                  <p className="text-white/50 uppercase tracking-widest text-sm">{t.form_success_msg}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <Mail className="text-[#FFD700]" />
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">{t.contact_subtitle}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <input required placeholder={t.form_placeholder_name} className="bg-transparent border-b-2 border-white/10 py-4 focus:border-[#FFD700] outline-none font-bold uppercase" />
                    <input required type="email" placeholder="CONTACT@EMAIL.COM" className="bg-transparent border-b-2 border-white/10 py-4 focus:border-[#FFD700] outline-none font-bold uppercase" />
                  </div>
                  <div className="flex gap-4 items-end">
                    <select 
                      value={phoneCode} 
                      onChange={(e) => setPhoneCode(e.target.value)}
                      className="bg-transparent border-b-2 border-white/10 py-4 focus:border-[#FFD700] outline-none font-bold uppercase text-white w-[140px] shrink-0"
                      style={{ backgroundColor: '#000' }}
                    >
                      {phoneCodes.map((p) => (
                        <option key={p.country + p.code} value={p.code} style={{ backgroundColor: '#000', color: '#fff' }}>
                          {p.country} {p.code}
                        </option>
                      ))}
                    </select>
                    <input 
                      type="tel" 
                      placeholder="TÉLÉPHONE (FACULTATIF)" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-transparent border-b-2 border-white/10 py-4 focus:border-[#FFD700] outline-none font-bold uppercase flex-1" 
                    />
                  </div>
                  <textarea required rows={4} placeholder={t.form_placeholder_message} className="w-full bg-transparent border-b-2 border-white/10 py-4 focus:border-[#FFD700] outline-none font-bold uppercase resize-none" />
                  <button type="submit" className="w-full bg-[#FFD700] text-black py-8 font-black uppercase tracking-[0.5em] hover:bg-white transition-all shadow-xl">
                    {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : t.form_submit}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <footer className="px-8 pb-20 bg-transparent border-t border-white/5 relative z-10">
        <div className="max-w-[1400px] mx-auto pt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 text-sm">
          <div className="col-span-2 lg:col-span-2 space-y-8">
            <div className="flex items-center gap-4 cursor-pointer" onClick={handleRedirect}>
              <img src="/images/logo-monkey.jpg" alt="Logo MAW" className="w-28 h-28 rounded-xl object-contain" />
              <span className="text-3xl font-black uppercase italic tracking-tighter">Monkey <span className="text-[#FFD700]">At Work</span></span>
            </div>
            <p className="text-white/60 uppercase font-bold text-xs leading-loose max-w-sm">
              {t.footer_desc}
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-black uppercase tracking-widest text-[#FFD700] text-xs">{t.footer_info}</h4>
            <ul className="space-y-4 text-white/50 font-bold uppercase text-[10px] tracking-widest">
              <li><button onClick={handleRedirect} className="hover:text-white">{t.footer_about}</button></li>
              <li><button onClick={handleRedirect} className="hover:text-white">{t.footer_expertise}</button></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-black uppercase tracking-widest text-[#FFD700] text-xs">{t.footer_key_universes}</h4>
            <ul className="space-y-4 text-white/50 font-bold uppercase text-[10px] tracking-widest">
              <li><button onClick={handleRedirect} className="hover:text-white">{t.universes[0]}</button></li>
              <li><button onClick={handleRedirect} className="hover:text-white">{t.universes[4]}</button></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-black uppercase tracking-widest text-[#FFD700] text-xs">{t.footer_legal_title}</h4>
            <ul className="space-y-4 text-white/50 font-bold uppercase text-[10px] tracking-widest">
              <li><button onClick={handleRedirect} className="hover:text-white">{t.footer_mentions}</button></li>
              <li><button onClick={handleRedirect} className="hover:text-white">{t.footer_cgu}</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center mt-20 pt-10 border-t border-white/5 gap-6">
          <p className="text-[10px] font-black text-white uppercase tracking-[0.5em]">{t.footer_copyright}</p>
          <div className="flex items-center gap-2 text-[#FFD700]">
            <Globe size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest italic">Global Operations Network</span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#FFD700] text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:bg-white transition-colors"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        body { background-color: #000; scroll-behavior: smooth; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #FFD700; border-radius: 10px; }
        * { cursor: crosshair; }
        .whitespace-nowrap { white-space: nowrap !important; }
      `}</style>
    </div>
  );
};

export default App;