document.addEventListener('DOMContentLoaded', function() {
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
    });
    
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
                const headerHeight = header.offsetHeight; // Obtém a altura atual do header
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Funcionalidade do modal de vídeo
    const videoButtons = document.querySelectorAll('.video-btn');
    const videoModal = document.getElementById('video-modal');
    const youtubeFrame = document.getElementById('youtube-frame');
    const closeModal = document.querySelector('.close-modal');
    
    // Abrir o modal de vídeo
    videoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video');
            youtubeFrame.src = videoUrl + "?autoplay=1"; // Adiciona autoplay
            videoModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Impede o scroll enquanto o modal estiver aberto
        });
    });
    
    // Fechar o modal ao clicar no X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            closeVideoModal();
        });
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
        videoModal.style.display = 'none';
        youtubeFrame.src = ''; // Interrompe a reprodução do vídeo removendo o src
        document.body.style.overflow = ''; // Restaura o scroll
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


    // Carregar posts do Instagram (Simulação)
    // Em um cenário real, você usaria a API do Instagram ou um widget
    function loadInstagramFeed() {
        const instagramPostsContainer = document.getElementById('instagram-posts');
        
        if (!instagramPostsContainer) return;
        
        // Simulação de dados de posts (substitua pelas suas imagens e legendas)
        const dummyPosts = [
            {
                imageUrl: 'img/instagram-post-1.jpg', // Substituir
                caption: 'Treino intenso de Muay Thai hoje! 👊 #VeigaTeam #MuayThai',
                date: '2 dias atrás',
                link: 'https://www.instagram.com/veigateam/' // Link para o post real
            },
            {
                imageUrl: 'img/instagram-post-2.jpg', // Substituir
                caption: 'Parabéns aos novos graduados de Jiu-Jitsu! 🥋 #JiuJitsu #VeigaTeam',
                date: '5 dias atrás',
                link: 'https://www.instagram.com/veigateam/'
            },
            {
                imageUrl: 'img/instagram-post-3.jpg', // Substituir
                caption: 'Campeonato interno foi um sucesso! Obrigado a todos que participaram 🏆 #VeigaTeam #MMA',
                date: '1 semana atrás',
                link: 'https://www.instagram.com/veigateam/'
            },
            {
                imageUrl: 'img/instagram-post-4.jpg', // Substituir
                caption: 'Nova turma Kids começando hoje! Traga seu filho para experimentar 👦👧 #VeigaTeamKids',
                date: '1 semana atrás',
                link: 'https://www.instagram.com/veigateam/'
            },
            {
                imageUrl: 'img/instagram-post-5.jpg', // Substituir
                caption: 'Seminário com o mestre! Conhecimento é poder 🔝 #VeigaTeam #ArtesMarciais',
                date: '2 semanas atrás',
                link: 'https://www.instagram.com/veigateam/'
            },
            {
                imageUrl: 'img/instagram-post-6.jpg', // Substituir
                caption: 'Segunda-feira de muito treino e superação! 💪 #VeigaTeam #SegundaFeira',
                date: '2 semanas atrás',
                link: 'https://www.instagram.com/veigateam/'
            }
        ];
        
        // Limpa o conteúdo atual (spinner)
        instagramPostsContainer.innerHTML = '';
        
        // Cria e adiciona os elementos dos posts
        dummyPosts.forEach(post => {
            const postElement = document.createElement('a');
            postElement.href = post.link;
            postElement.target = '_blank';
            postElement.classList.add('instagram-post');
            
            postElement.innerHTML = `
                <img src="${post.imageUrl}" alt="Instagram post">
                <div class="instagram-post-info">
                    <p class="instagram-post-caption">${post.caption}</p>
                    <p class="instagram-post-date">${post.date}</p>
                </div>
            `;
            
            instagramPostsContainer.appendChild(postElement);
        });
    }
    
    // Chama a função para carregar o feed do Instagram após um pequeno delay
    // para dar a impressão de carregamento assíncrono
    setTimeout(loadInstagramFeed, 1500);


    // Manipulação do formulário de contato (aula experimental)
    const trialForm = document.getElementById('trial-form');
    
    if (trialForm) {
        trialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio do formulário
            const formData = new FormData(trialForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Dados do formulário de aula experimental:', formValues);
            
            // --- AQUI VOCÊ ADICIONARIA O CÓDIGO REAL DE ENVIO ---
            // Exemplo usando fetch para enviar para um endpoint (substitua por seu URL)
            /*
            fetch('/seu-endpoint-de-contato', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Sua solicitação foi enviada com sucesso! Entraremos em contato em breve.');
                trialForm.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.');
            });
            */

            // Apenas o feedback visual simulado:
            alert('Sua solicitação foi enviada com sucesso! Entraremos em contato em breve.');
            trialForm.reset();
        });
    }
    
    // Formulário de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Simulação de inscrição na newsletter
            console.log('Email inscrito na newsletter:', email);
            
             // --- AQUI VOCÊ ADICIONARIA O CÓDIGO REAL DE ENVIO ---
            // Exemplo usando fetch para enviar para um endpoint (substitua por seu URL)
            /*
            fetch('/seu-endpoint-de-newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Obrigado por se inscrever em nossa newsletter!');
                newsletterForm.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Ocorreu um erro ao se inscrever. Por favor, tente novamente.');
            });
            */

            // Apenas o feedback visual simulado:
            alert('Obrigado por se inscrever em nossa newsletter!');
            newsletterForm.reset();
        });
    }
});
