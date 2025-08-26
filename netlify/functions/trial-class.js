const sgMail = require('@sendgrid/mail');

// Configurar SendGrid com a chave da API
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  // Habilitar CORS para GitHub Pages
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Responder a requisições OPTIONS (preflight CORS)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Verificar se é uma requisição POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método não permitido' })
    };
  }

  try {
    // Parsear os dados do formulário
    const formData = JSON.parse(event.body);
    
    // Validar campos obrigatórios
    const { name, email, phone, interest, message } = formData;
    
    if (!name || !email || !phone || !interest) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Campos obrigatórios não preenchidos',
          required: ['name', 'email', 'phone', 'interest']
        })
      };
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Formato de email inválido' })
      };
    }

    // Preparar o email para a academia
    const emailToAcademy = {
      to: process.env.ACADEMY_EMAIL || 'contato@veigateam.com.br',
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@veigateam.com.br',
      subject: `Nova solicitação de aula experimental - ${interest}`,
      html: `
        <h2>Nova solicitação de aula experimental</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Modalidade de interesse:</strong> ${interest}</p>
        ${message ? `<p><strong>Mensagem:</strong> ${message}</p>` : ''}
        <p><strong>Data da solicitação:</strong> ${new Date().toLocaleString('pt-BR')}</p>
      `
    };

    // Preparar email de confirmação para o cliente
    const emailToClient = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@veigateam.com.br',
      subject: 'Solicitação de aula experimental recebida - Veiga Team',
      html: `
        <h2>Olá ${name}!</h2>
        <p>Recebemos sua solicitação de aula experimental na modalidade <strong>${interest}</strong>.</p>
        <p>Nossa equipe entrará em contato em breve para confirmar o horário e tirar suas dúvidas.</p>
        <br>
        <p><strong>Dados da solicitação:</strong></p>
        <p>Nome: ${name}</p>
        <p>Email: ${email}</p>
        <p>Telefone: ${phone}</p>
        <p>Modalidade: ${interest}</p>
        ${message ? `<p>Mensagem: ${message}</p>` : ''}
        <br>
        <p>Agradecemos seu interesse!</p>
        <p><strong>Veiga Team</strong></p>
        <p>Av. Getúlio Vargas, 496 (1º andar), Nova Paulínia, Paulínia - SP</p>
        <p>Telefone: (19) 99392-7371</p>
      `
    };

    // Enviar emails
    await sgMail.send(emailToAcademy);
    await sgMail.send(emailToClient);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Solicitação enviada com sucesso! Verifique seu email.' 
      })
    };

  } catch (error) {
    console.error('Erro ao processar formulário:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Erro interno do servidor. Tente novamente mais tarde.' 
      })
    };
  }
};
