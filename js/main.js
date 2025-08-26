document.addEventListener('DOMContentLoaded', function() {
    // Registrar Service Worker para cache offline
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Usar caminho relativo para o Service Worker
            const swPath = './sw.js';
            
            navigator.serviceWorker.register(swPath)
                .then((registration) => {
                    console.log('Service Worker registrado com sucesso:', registration.scope);
                })
                .catch((error) => {
                    console.warn('Service Worker não pôde ser registrado:', error.message);
                    // Não mostrar erro crítico, apenas aviso
                });
        });
    }
    
    // Menu de navegação responsivo
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Efeito de scroll para o header
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.padding = '10px 0';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.padding = '15px 0';
        }
        
        // Mostrar/ocultar botão scroll to top
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        }
    });
    
    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fechar o menu móvel se estiver aberto
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                // Calcula a posição de scroll levando em conta a altura do header fixo
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Funcionalidade do modal de vídeo melhorada
    const videoButtons = document.querySelectorAll('.video-btn');
    const videoModal = document.getElementById('video-modal');
    const youtubeFrame = document.getElementById('youtube-frame');
    const closeModal = document.querySelector('.close-modal');
    const videoLoading = document.querySelector('.video-loading');
    
    // Abrir o modal de vídeo
    videoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video');
            showVideo(videoUrl);
        });
    });

    // Função para mostrar o vídeo com loading state
    function showVideo(videoUrl) {
        // Mostrar loading
        videoLoading.style.display = 'flex';
        youtubeFrame.style.display = 'none';
        
        // Mostrar modal com animação
        videoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Adicionar classe para animação
        setTimeout(() => {
            videoModal.classList.add('show');
        }, 10);
        
        // Simular carregamento do vídeo
        setTimeout(() => {
            try {
                youtubeFrame.src = videoUrl + "?autoplay=1";
                youtubeFrame.style.display = 'block';
                videoLoading.style.display = 'none';
            } catch (error) {
                console.error('Erro ao carregar vídeo:', error);
                videoLoading.innerHTML = '<p>Erro ao carregar vídeo. Tente novamente.</p>';
            }
        }, 1500);
    }
    
    // Fechar o modal ao clicar no X
    if (closeModal) {
        closeModal.addEventListener('click', closeVideoModal);
    }
    
    // Fechar o modal ao clicar fora do conteúdo
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }
    
    // Fechar o modal ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.style.display === 'block') {
            closeVideoModal();
        }
    });
    
    function closeVideoModal() {
        videoModal.classList.remove('show');
        setTimeout(() => {
            videoModal.style.display = 'none';
            youtubeFrame.src = '';
            videoLoading.style.display = 'flex';
            videoLoading.innerHTML = '<div class="spinner"></div><p>Carregando vídeo...</p>';
        }, 300);
        document.body.style.overflow = '';
    }

    // Adicionar botão de login ao menu móvel apenas em telas menores
    function addLoginButtonToMobileMenu() {
        const loginBtnDesktop = document.querySelector('header .login-btn');
        const navLinksUl = document.querySelector('.nav-links');

        // Remove o botão de login existente no menu móvel se já existir
        const existingMobileLoginBtn = navLinksUl.querySelector('.login-btn-mobile');
        if (existingMobileLoginBtn) {
            existingMobileLoginBtn.remove();
        }

        if (window.innerWidth <= 992 && loginBtnDesktop) {
            const loginBtnMobileLi = document.createElement('li');
            // Copia o link do botão desktop, adicionando uma classe para estilização móvel
            loginBtnMobileLi.innerHTML = loginBtnDesktop.outerHTML.replace('class="login-btn"', 'class="login-btn login-btn-mobile"');
            navLinksUl.appendChild(loginBtnMobileLi);
        }
    }

    // Chamar a função ao carregar a página e redimensionar
    addLoginButtonToMobileMenu();
    window.addEventListener('resize', addLoginButtonToMobileMenu);

    // Validação de formulários melhorada
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        // Limpar mensagens de erro anteriores
        form.querySelectorAll('.error-message').forEach(msg => msg.remove());
        
        inputs.forEach(input => {
            // Remover classes de erro anteriores
            input.classList.remove('error');
            
            if (!input.value.trim()) {
                input.classList.add('error');
                showErrorMessage(input, 'Este campo é obrigatório');
                isValid = false;
            } else {
                // Validação específica para email
                if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        input.classList.add('error');
                        showErrorMessage(input, 'Digite um email válido');
                        isValid = false;
                    }
                }
                
                // Validação específica para telefone brasileiro
                if (input.type === 'tel' && input.value) {
                    // Regex mais flexível para telefones brasileiros
                    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
                    const cleanPhone = input.value.replace(/\D/g, '');
                    
                    if (!phoneRegex.test(input.value) || cleanPhone.length < 10 || cleanPhone.length > 11) {
                        input.classList.add('error');
                        showErrorMessage(input, 'Digite um telefone válido (DDD + número)');
                        isValid = false;
                    }
                }
            }
        });
        
        return isValid;
    }
    
    // Função para mostrar mensagens de erro
    function showErrorMessage(input, message) {
        // Remover mensagem de erro anterior se existir
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Criar nova mensagem de erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Inserir após o input
        input.parentNode.appendChild(errorDiv);
    }

    // Manipulação do formulário de contato (aula experimental) melhorada
    const trialForm = document.getElementById('trial-form');
    
    if (trialForm) {
        // Validação em tempo real
        const inputs = trialForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateSingleField(this);
            });
            
            input.addEventListener('input', function() {
                // Remover erro quando o usuário começa a digitar
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    const errorMsg = this.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
        });
        
        trialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) {
                alert('Por favor, preencha todos os campos obrigatórios corretamente.');
                return;
            }
            
            // Simulação de envio do formulário
            const formData = new FormData(trialForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Dados do formulário de aula experimental:', formValues);
            
            // Mostrar loading no botão
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular envio
            setTimeout(() => {
                alert('Sua solicitação foi enviada com sucesso! Entraremos em contato em breve.');
                trialForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Limpar mensagens de erro
                trialForm.querySelectorAll('.error-message').forEach(msg => msg.remove());
                trialForm.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
            }, 2000);
        });
    }
    
    // Função para validar um campo individual
    function validateSingleField(input) {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
            showErrorMessage(input, 'Este campo é obrigatório');
            return false;
        }
        
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('error');
                showErrorMessage(input, 'Digite um email válido');
                return false;
            }
        }
        
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[\d\s\-\(\)\+]+$/;
            const cleanPhone = input.value.replace(/\D/g, '');
            
            if (!phoneRegex.test(input.value) || cleanPhone.length < 10 || cleanPhone.length > 11) {
                input.classList.add('error');
                showErrorMessage(input, 'Digite um telefone válido (DDD + número)');
                return false;
            }
        }
        
        // Se chegou até aqui, o campo é válido
        input.classList.remove('error');
        const errorMsg = input.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
        return true;
    }
    
    // Formulário de newsletter melhorado
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Simulação de inscrição na newsletter
            console.log('Email inscrito na newsletter:', email);
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Inscrito!';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Obrigado por se inscrever em nossa newsletter!');
                newsletterForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Intersection Observer para animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.class-card, .instructor-card, .testimonial, .feature').forEach(el => {
        observer.observe(el);
    });
    
    // Lazy loading para imagens
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});
