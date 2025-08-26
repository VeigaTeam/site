# Configuração do Sistema de Formulários - Veiga Team

Este documento explica como configurar o sistema de formulários funcionais para o site da Veiga Team usando GitHub Pages, Netlify Functions e SendGrid.

## 🚀 Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript (GitHub Pages)
- **Backend**: Netlify Functions (Serverless)
- **Email**: SendGrid
- **Deploy**: Netlify (gratuito)

## 📋 Pré-requisitos

1. Conta no [GitHub](https://github.com)
2. Conta no [Netlify](https://netlify.com) (gratuita)
3. Conta no [SendGrid](https://sendgrid.com) (gratuita até 100 emails/dia)

## 🔧 Configuração do SendGrid

### 1. Criar conta no SendGrid
- Acesse [sendgrid.com](https://sendgrid.com)
- Crie uma conta gratuita
- Verifique seu domínio de email

### 2. Obter API Key
- No painel do SendGrid, vá em **Settings > API Keys**
- Clique em **Create API Key**
- Escolha **Full Access** ou **Restricted Access** (recomendado)
- Copie a chave gerada

### 3. Configurar domínio de envio
- Vá em **Settings > Sender Authentication**
- Configure o domínio que você usará para enviar emails
- Adicione os registros DNS necessários

## 🌐 Configuração do Netlify

### 1. Conectar com GitHub
- Faça login no [Netlify](https://netlify.com)
- Clique em **New site from Git**
- Conecte com sua conta GitHub
- Selecione o repositório do site

### 2. Configurar variáveis de ambiente
No painel do Netlify, vá em **Site settings > Environment variables** e adicione:

```
SENDGRID_API_KEY=sua_chave_api_aqui
SENDGRID_FROM_EMAIL=noreply@seudominio.com
ACADEMY_EMAIL=contato@veigateam.com.br
```

### 3. Configurar build settings
- **Build command**: deixe vazio (não é necessário)
- **Publish directory**: `.` (ponto)
- **Functions directory**: `netlify/functions`

## 📁 Estrutura de Arquivos

```
site/
├── netlify/
│   ├── functions/
│   │   ├── trial-class.js      # Formulário de aula experimental
│   │   └── newsletter.js       # Newsletter
│   └── netlify.toml           # Configuração do Netlify
├── js/
│   ├── config.js              # Configurações do site
│   └── main.js                # Lógica principal
├── css/
│   └── style.css              # Estilos incluindo notificações
├── package.json               # Dependências
└── index.html                 # Página principal
```

## 🔄 Como Funciona

### 1. Formulário de Aula Experimental
- Usuário preenche o formulário
- JavaScript valida os campos
- Dados são enviados para `/.netlify/functions/trial-class`
- Netlify Function processa e envia emails via SendGrid
- Usuário recebe confirmação
- Academia recebe notificação

### 2. Newsletter
- Usuário inscreve email
- Dados são enviados para `/.netlify/functions/newsletter`
- Netlify Function processa e envia emails via SendGrid
- Usuário recebe confirmação de inscrição
- Academia recebe notificação

## 📧 Emails Enviados

### Formulário de Aula Experimental
- **Para a academia**: Dados completos da solicitação
- **Para o cliente**: Confirmação de recebimento

### Newsletter
- **Para o cliente**: Boas-vindas e informações sobre a newsletter
- **Para a academia**: Notificação de nova inscrição

## 🚀 Deploy

### 1. Push para GitHub
```bash
git add .
git commit -m "Implementação de formulários funcionais"
git push origin main
```

### 2. Netlify Deploy
- O Netlify detectará automaticamente as mudanças
- As funções serão construídas e deployadas
- O site estará disponível em `https://seudominio.netlify.app`

### 3. Configurar domínio customizado (opcional)
- No Netlify, vá em **Domain settings**
- Adicione seu domínio customizado
- Configure os registros DNS

## 🧪 Testando

### 1. Teste local (opcional)
```bash
npm install -g netlify-cli
netlify dev
```

### 2. Teste em produção
- Acesse o site deployado
- Preencha o formulário de aula experimental
- Inscreva-se na newsletter
- Verifique se os emails foram recebidos

## 🔍 Troubleshooting

### Problema: Emails não são enviados
- Verifique se a API Key do SendGrid está correta
- Confirme se o domínio de envio está verificado
- Verifique os logs do Netlify Functions

### Problema: Formulário não funciona
- Verifique se as funções foram deployadas
- Confirme se as variáveis de ambiente estão configuradas
- Verifique o console do navegador para erros

### Problema: CORS errors
- As funções já estão configuradas com CORS habilitado
- Se persistir, verifique se o domínio está correto

## 📊 Monitoramento

### Logs do Netlify
- Acesse **Functions** no painel do Netlify
- Clique em uma função para ver os logs
- Monitore erros e performance

### SendGrid Analytics
- No painel do SendGrid, veja estatísticas de envio
- Monitore taxa de entrega e aberturas
- Configure alertas para problemas

## 🔒 Segurança

- API Keys estão protegidas como variáveis de ambiente
- Validação de entrada implementada
- Rate limiting pode ser configurado no Netlify
- CORS configurado adequadamente

## 💰 Custos

- **Netlify**: Gratuito (100GB de banda/mês, 125k requests/mês)
- **SendGrid**: Gratuito (100 emails/dia)
- **GitHub Pages**: Gratuito

## 📞 Suporte

Para problemas técnicos:
1. Verifique os logs do Netlify
2. Consulte a documentação do SendGrid
3. Verifique o console do navegador
4. Teste as funções localmente

---

**Nota**: Este sistema é totalmente funcional e pode ser usado em produção. As funções serverless garantem escalabilidade e confiabilidade.
