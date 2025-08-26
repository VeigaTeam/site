# 🚀 Deploy Rápido - Veiga Team

## ⚡ Passos para Deploy

### 1. Push para GitHub
```bash
git add .
git commit -m "Implementação de formulários funcionais"
git push origin main
```

### 2. Conectar ao Netlify
- Acesse [netlify.com](https://netlify.com)
- Clique em **"New site from Git"**
- Conecte com GitHub
- Selecione o repositório `site`

### 3. Configurar Build Settings
- **Build command**: deixe vazio
- **Publish directory**: `.` (ponto)
- **Functions directory**: `netlify/functions`

### 4. Configurar Variáveis de Ambiente
No painel do Netlify, vá em **Site settings > Environment variables**:

```
SENDGRID_API_KEY=sua_chave_api_aqui
SENDGRID_FROM_EMAIL=noreply@seudominio.com
ACADEMY_EMAIL=contato@veigateam.com.br
```

### 5. Deploy
- Clique em **"Deploy site"**
- Aguarde o deploy das funções
- Site estará disponível em `https://seudominio.netlify.app`

## 🔧 Configuração do SendGrid

1. Crie conta em [sendgrid.com](https://sendgrid.com)
2. Obtenha API Key em **Settings > API Keys**
3. Configure domínio de envio em **Settings > Sender Authentication**

## ✅ Teste

1. Acesse o site deployado
2. Preencha o formulário de aula experimental
3. Inscreva-se na newsletter
4. Verifique se os emails foram recebidos

## 📞 Suporte

- Logs: **Functions** no painel do Netlify
- Console: F12 no navegador
- Documentação completa: `SETUP.md`

---

**Status**: ✅ Pronto para deploy!
