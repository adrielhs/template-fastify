import { format } from "date-fns"

export function scheduleConfirmation(
  inital_date: Date,
  expected_final_date: Date,
  name: string,
  model: string,
  scheduleConfirmationLink: string,
): string {
  const formatedInitialDate = format(inital_date, "dd/MM/yyyy HH:mm")
  const formatedExpectedFinalDate = format(
    expected_final_date,
    "dd/MM/yyyy HH:mm",
  )

  return `
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmação de Agendamento - anything </title>

  <style>
    /* -------------------------------------
          GLOBAL RESETS
      ------------------------------------- */
    img {
      border: none;
      -ms-interpolation-mode: bicubic;
      max-width: 100%;
    }

    body {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      -webkit-font-smoothing: antialiased;
      font-size: 14px;
      line-height: 1.6;
      margin: 0;
      padding: 20px 0;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    table {
      border-collapse: separate;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      width: 100%;
    }

    table td {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 14px;
      vertical-align: top;
    }

    /* -------------------------------------
          BODY & CONTAINER
      ------------------------------------- */
    .body {
      width: 100%;
    }

    .container {
      display: block;
      margin: 0 auto !important;
      max-width: 600px;
      padding: 10px;
      width: 600px;
    }

    .content {
      box-sizing: border-box;
      display: block;
      margin: 0 auto;
      max-width: 600px;
      padding: 10px;
    }

    /* -------------------------------------
          HEADER, FOOTER, MAIN
      ------------------------------------- */
    .main {
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      width: 100%;
    }

    .wrapper {
      box-sizing: border-box;
      padding: 40px;
    }

    .content-block {
      padding-bottom: 10px;
      padding-top: 10px;
    }

    .footer {
      clear: both;
      margin-top: 20px;
      text-align: center;
      width: 100%;
    }

    .footer td,
    .footer p,
    .footer span,
    .footer a {
      color: #7F7F7F;
      font-size: 12px;
      text-align: center;
    }

    /* -------------------------------------
          TYPOGRAPHY
      ------------------------------------- */
    h1,
    h2,
    h3,
    h4 {
      color: #2D3748;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 600;
      line-height: 1.3;
      margin: 0;
      margin-bottom: 20px;
    }

    h1 {
      font-size: 32px;
      text-align: center;
      background: linear-gradient(135deg, #D96C89 0%, #04C4D9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 10px;
    }

    h4 {
      font-size: 22px;
      font-weight: 500;
      text-align: center;
      color: #2D3748;
      margin-bottom: 25px;
    }
    
    p {
      text-align: center;
      color: #4A5568;
      font-size: 16px;
      line-height: 1.6;
    }

    p,
    ul,
    ol {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 16px;
      font-weight: normal;
      margin: 0;
      margin-bottom: 20px;
      line-height: 1.6;
    }

    a {
      color: #D96C89;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    /* -------------------------------------
          BUTTONS
      ------------------------------------- */
    .btn-container {
      text-align: center;
      margin: 30px 0;
    }

    .bt-link {
      padding: 16px 40px;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 600;
      display: inline-block;
      text-decoration: none;
      background: linear-gradient(135deg, #D96C89 0%, #04C4D9 100%);
      color: #ffffff;
      box-shadow: 0 4px 15px rgba(217, 108, 137, 0.3);
      transition: all 0.3s ease;
      text-align: center;
      border: none;
      cursor: pointer;
    }

    .bt-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(217, 108, 137, 0.4);
    }

    /* -------------------------------------
          OTHER STYLES
      ------------------------------------- */
    .last {
      margin-bottom: 0;
    }

    .first {
      margin-top: 0;
    }

    .align-center {
      text-align: center;
    }

    .align-right {
      text-align: right;
    }

    .align-left {
      text-align: left;
    }

    .clear {
      clear: both;
    }

    .mt0 {
      margin-top: 0;
    }

    .mb0 {
      margin-bottom: 0;
    }

    .mb40 {
      margin-bottom: 40px;
    }

    .preheader {
      color: transparent;
      display: none;
      height: 0;
      max-height: 0;
      max-width: 0;
      opacity: 0;
      overflow: hidden;
      mso-hide: all;
      visibility: hidden;
      width: 0;
    }

    .logo {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .logo img {
        display: block;
        margin: 0 auto;
        border-radius: 12px;
    }

    .powered-by {
      font-size: 9px !important;
    }

    .powered-by a {
      text-decoration: none;
      font-size: 9px;
    }

    hr {
      border: 0;
      border-bottom: 1px solid #f6f6f6;
      margin: 20px 0;
    }

    .word-break {
      -ms-word-break: break-all;
      word-break: break-all;
      word-break: break-word;
    }

    .img-header {
      margin: 2rem 0 1rem;
    }
    
    .details-card {
      background: #F8FAFC;
      border-radius: 12px;
      padding: 25px;
      margin: 30px 0;
      border-left: 4px solid #D96C89;
    }

    .details-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    .details-table td {
      padding: 12px 0;
      border-bottom: 1px solid #E2E8F0;
      font-size: 16px;
      vertical-align: middle;
    }

    .details-table tr:last-child td {
      border-bottom: none;
    }

    .details-table .label {
      font-weight: 600;
      color: #2D3748;
      padding-right: 15px;
      width: 40%;
      font-size: 15px;
    }

    .details-table .value {
      color: #4A5568;
      font-weight: 500;
    }
    
    .divider {
      height: 3px;
      background: linear-gradient(90deg, #D96C89 0%, #04C4D9 100%);
      margin: 30px 0;
      border-radius: 3px;
      opacity: 0.7;
    }

    .icon-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background: #D96C89;
      color: white;
      border-radius: 50%;
      margin-right: 10px;
      font-size: 12px;
    }
    
    .contact-info {
      background: #F8FAFC;
      border-radius: 12px;
      padding: 20px;
      margin: 25px 0;
      text-align: center;
    }

    .social-links {
      margin: 20px 0;
    }

    .social-links a {
      display: inline-block;
      margin: 0 8px;
      padding: 8px 16px;
      background: #F8FAFC;
      border-radius: 6px;
      color: #4A5568;
      transition: all 0.3s ease;
    }

    .social-links a:hover {
      background: #D96C89;
      color: white;
      transform: translateY(-1px);
    }

    /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
      ------------------------------------- */
    @media only screen and (max-width: 620px) {
      body {
        padding: 10px !important;
        background: #667eea !important;
      }

      .container {
        width: 100% !important;
        padding: 5px !important;
      }

      .wrapper {
        padding: 25px !important;
      }

      table[class=body] h1 {
        font-size: 24px !important;
        margin-bottom: 10px !important;
      }

      table[class=body] h4 {
        font-size: 18px !important;
      }

      table[class=body] p,
      table[class=body] ul,
      table[class=body] ol,
      table[class=body] td,
      table[class=body] span,
      table[class=body] a {
        font-size: 16px !important;
      }

      .details-table .label,
      .details-table .value {
        font-size: 14px !important;
      }

      .bt-link {
        padding: 14px 30px !important;
        font-size: 15px !important;
        display: block !important;
        margin: 0 10px !important;
      }

      .details-card {
        padding: 20px !important;
        margin: 20px 0 !important;
      }
    }

    /* -------------------------------------
          PRESERVE THESE STYLES IN THE HEAD
      ------------------------------------- */
    @media all {
      .ExternalClass {
        width: 100%;
      }

      .apple-link a {
        color: inherit !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
      }
    }
  </style>
</head>

<body class="">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
    <tr>
      <td>&nbsp;</td>
      <td class="container">
        <div class="content">
          <!-- START CENTERED WHITE CONTAINER -->
          <table role="presentation" class="main">
            <!-- START MAIN CONTENT AREA -->
            <tr>
              <td class="wrapper">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="logo">
                      <img src="https://www.anything/site/wp-content/uploads/2021/01/Logotipo_Small.png" alt="Logo do anything" width="160" height="160" style="max-width: 160px; height: auto; border-radius: 12px;">
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h1>✅ Agendamento Confirmado!</h1>
                      <h4>Olá, ${name}!</h4>
                      <p>
                        Seu agendamento foi confirmado com sucesso! Estamos ansiosos para atendê-lo.
                      </p>
                      
                      <!-- Card de detalhes -->
                      <div class="details-card">
                        <table role="presentation" class="details-table">
                          <tr>
                            <td class="label">
                              <span class="icon-badge">🚗</span>Veículo
                            </td>
                            <td class="value"><strong>${model}</strong></td>
                          </tr>
                          <tr>
                            <td class="label">
                              <span class="icon-badge">📅</span>Data de Retirada
                            </td>
                            <td class="value">${formatedInitialDate}</td>
                          </tr>
                          <tr>
                            <td class="label">
                              <span class="icon-badge">⏰</span>Data de Devolução
                            </td>
                            <td class="value">${formatedExpectedFinalDate}</td>
                          </tr>
                        </table>
                      </div>
                      
                      <div class="divider"></div>
                      
                      <div class="btn-container">
                        <a class="bt-link" href="${scheduleConfirmationLink}" target="_blank" rel="noopener noreferrer">
                          📋 Acessar Meus Agendamentos
                        </a>
                      </div>
                      
                      <div class="contact-info">
                        <p style="margin-bottom: 15px; font-weight: 600; color: #2D3748;">Precisa de ajuda?</p>
                        <p style="margin-bottom: 10px;">
                          📞 <strong>(19) 0000-0000</strong><br>
                          ✉️ <strong>contato@anything.com</strong>
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- END MAIN CONTENT AREA -->
          </table>
          <!-- END CENTERED WHITE CONTAINER -->

          <!-- START FOOTER -->
          <div class="footer">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td class="content-block">
                  <span class="apple-link"><b>anything</b></span><br>
                  <span>Rua Exemplo, 123 - Centro, Piracicaba/SP</span>
                </td>
              </tr>
              <tr>
                <td class="content-block social-links">
                  <span style="display: block; margin-bottom: 10px; color: #7F7F7F;">Siga-nos nas redes sociais:</span>
                  <a href="https://facebook.com/anything">Facebook</a>
                  <a href="https://instagram.com/anything">Instagram</a>
                  <a href="https://linkedin.com/company/anything">LinkedIn</a>
                </td>
              </tr>
              <tr>
                <td class="content-block">
                  <span style="font-size: 11px; color: #A0A0A0;">
                    &copy; 2024 anything. Todos os direitos reservados.
                  </span>
                </td>
              </tr>
            </table>
          </div>
          <!-- END FOOTER -->

        </div>
      </td>
      <td>&nbsp;</td>
    </tr>
  </table>
</body>

</html>
  `
}
