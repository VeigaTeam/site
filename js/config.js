// Configurações do site Veiga Team
const VEIGA_TEAM_CONFIG = {
    // Informações da academia
    academy: {
        name: 'Veiga Team',
        address: 'Av. Getúlio Vargas, 496 (1º andar), Nova Paulínia, Paulínia - SP',
        phone: '(19) 99392-7371',
        email: 'contato@veigateam.com.br',
        instagram: 'https://www.instagram.com/veigateam',
        whatsapp: 'https://linktr.ee/veigateam',
        youtube: '#'
    },
    
    // Configurações de performance
    performance: {
        lazyLoading: true,
        imageOptimization: true,
        preloadCritical: true,
        cacheStrategy: 'network-first'
    },
    
    // Configurações de analytics (substitua pelos seus IDs reais)
    analytics: {
        googleAnalytics: 'GA_MEASUREMENT_ID', // Substitua pelo seu ID do GA4
        facebookPixel: 'FACEBOOK_PIXEL_ID', // Substitua pelo seu ID do Facebook Pixel
        hotjar: 'HOTJAR_ID' // Substitua pelo seu ID do Hotjar
    },
    
    // Configurações de formulários
    forms: {
        trialClass: {
            endpoint: '/.netlify/functions/trial-class', // Endpoint para envio do formulário via Netlify Functions
            requiredFields: ['name', 'email', 'phone', 'interest'],
            validation: {
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                phone: /^[\d\s\-\(\)\+]+$/
            }
        },
        newsletter: {
            endpoint: '/.netlify/functions/newsletter', // Endpoint para inscrição na newsletter via Netlify Functions
            validation: {
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            }
        }
    },
    
    // Configurações de vídeos
    videos: {
        muayThai: 'https://www.youtube.com/embed/v0IIDNUjHPg?si=ecckm-c5_2zHAASa',
        jiuJitsu: 'https://www.youtube.com/embed/0QDgz6cD4LQ?si=A5iPnB_6LSnNuCM6',
        mma: 'https://www.youtube.com/embed/EedXzImhybs?si=mwnLQ5Ix2BtSDD1O'
    },
    
    // Configurações de horários
    schedule: {
        weekdays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        timeSlots: [
            '09:00 - 22:00',
            '09:00 - 22:00',
            '09:00 - 22:00',
            '09:00 - 22:00',
            '09:00 - 22:00'
        ]
    },
    
    // Configurações de acessibilidade
    accessibility: {
        enableReducedMotion: true,
        enableHighContrast: true,
        enableKeyboardNavigation: true,
        skipToContent: true
    },
    
    // Configurações de cache
    cache: {
        version: '1.0.0',
        maxAge: 86400, // 24 horas em segundos
        strategies: {
            images: 'cache-first',
            css: 'stale-while-revalidate',
            js: 'stale-while-revalidate',
            api: 'network-first'
        }
    }
};

// Função para obter configurações
function getConfig(key) {
    return key.split('.').reduce((obj, k) => obj && obj[k], VEIGA_TEAM_CONFIG);
}

// Função para definir configurações
function setConfig(key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, k) => obj[k] = obj[k] || {}, VEIGA_TEAM_CONFIG);
    target[lastKey] = value;
}

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VEIGA_TEAM_CONFIG;
} else {
    window.VEIGA_TEAM_CONFIG = VEIGA_TEAM_CONFIG;
    window.getConfig = getConfig;
    window.setConfig = setConfig;
}
