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
    
    // Validar email
    const { email } = formData;
    
    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email é obrigatório' })
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

    // Preparar o email de confirmação para o cliente
    const emailToClient = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@veigateam.com.br',
      subject: 'Inscrição na newsletter confirmada - Veiga Team',
      html: `
        <h2>Bem-vindo à newsletter do Veiga Team!</h2>
        <p>Obrigado por se inscrever para receber nossas novidades, eventos e promoções.</p>
        <p>Você receberá informações sobre:</p>
        <ul>
          <li>Novos horários de aulas</li>
          <li>Eventos e competições</li>
          <li>Promoções especiais</li>
          <li>Dicas de treino</li>
          <li>Novidades da academia</li>
        </ul>
        <br>
        <p>Para cancelar a inscrição, responda a este email com "CANCELAR".</p>
        <br>
        <p><strong>Veiga Team</strong></p>
        <p>Av. Getúlio Vargas, 496 (1º andar), Nova Paulínia, Paulínia - SP</p>
        <p>Telefone: (19) 99392-7371</p>
      `
    };

    // Preparar o email de notificação para a academia
    const emailToAcademy = {
      to: process.env.ACADEMY_EMAIL || 'contato@veigateam.com.br',
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@veigateam.com.br',
      subject: 'Nova inscrição na newsletter',
      html: `
        <h2>Nova inscrição na newsletter</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Data da inscrição:</strong> ${new Date().toLocaleString('pt-BR')}</p>
      `
    };

    // Enviar emails
    await sgMail.send(emailToClient);
    await sgMail.send(emailToAcademy);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Inscrição realizada com sucesso! Verifique seu email.' 
      })
    };

  } catch (error) {
    console.error('Erro ao processar newsletter:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Erro interno do servidor. Tente novamente mais tarde.' 
      })
    };
  }
};
