export function passwordRecovery(link: string) {
  return `
<!doctype html>
<html>
<head>
  <meta name="viewport" content="width=device-width" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Recuperação de Senha - anything</title>
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
      background-color: #f8f9fa;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      -webkit-font-smoothing: antialiased;
      font-size: 16px;
      line-height: 1.6;
      margin: 0;
      padding: 0;
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
      font-size: 16px;
      vertical-align: top;
    }

    /* -------------------------------------
          BODY & CONTAINER
      ------------------------------------- */
    .body {
      background-color: #f8f9fa;
      width: 100%;
    }

    .container {
      display: block;
      margin: 0 auto !important;
      max-width: 600px;
      padding: 20px;
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
      width: 100%;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }

    .header-bar {
      background: linear-gradient(90deg, #FDB913 0%, #4ECDC4 50%, #E89BA7 100%);
      height: 12px;
      width: 100%;
    }

    .wrapper {
      box-sizing: border-box;
      padding: 50px 40px;
    }

    .content-block {
      padding-bottom: 10px;
      padding-top: 10px;
    }

    .footer {
      clear: both;
      margin-top: 30px;
      text-align: center;
      width: 100%;
    }

    .footer td,
    .footer p,
    .footer span,
    .footer a {
      color: #6c757d;
      font-size: 14px;
      text-align: center;
    }

    /* -------------------------------------
          TYPOGRAPHY
      ------------------------------------- */
    h1 {
      color: #2c3e50;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 700;
      line-height: 1.3;
      margin: 0;
      margin-bottom: 20px;
      font-size: 36px;
      text-align: center;
    }

    h4 {
      color: #495057;
      font-size: 18px;
      font-weight: 400;
      text-align: center;
      margin: 0;
      margin-bottom: 35px;
      line-height: 1.5;
    }

    p {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 16px;
      font-weight: normal;
      margin: 0;
      margin-bottom: 20px;
      text-align: center;
      color: #495057;
    }

    a {
      color: #4ECDC4;
      text-decoration: none;
    }

    .logo-container {
      text-align: center;
      margin-bottom: 30px;
    }

    .decorative-dots {
      text-align: center;
      margin-bottom: 25px;
    }

    .dot {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin: 0 6px;
    }

    .dot-yellow {
      background-color: #FDB913;
    }

    .dot-blue {
      background-color: #4ECDC4;
    }

    .dot-pink {
      background-color: #E89BA7;
    }

    /* -------------------------------------
          BUTTONS
      ------------------------------------- */
    .btn-container {
      text-align: center;
      margin: 40px 0;
    }

    .bt-link {
      display: inline-block;
      padding: 16px 40px;
      border-radius: 50px;
      font-size: 18px;
      font-weight: 700;
      background: linear-gradient(135deg, #4ECDC4 0%, #3AB5AD 100%);
      color: #ffffff !important;
      text-decoration: none;
      box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
      transition: all 0.3s ease;
      border: none;
    }

    .bt-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(78, 205, 196, 0.4);
    }

    /* -------------------------------------
          OTHER STYLES
      ------------------------------------- */
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

    .brand-name {
      color: #2c3e50;
      font-weight: 700;
    }

    .footer-text {
      color: #6c757d;
      font-size: 14px;
      line-height: 1.8;
    }

    /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
      ------------------------------------- */
    @media only screen and (max-width: 620px) {
      table[class=body] h1 {
        font-size: 28px !important;
      }

      table[class=body] h4 {
        font-size: 16px !important;
      }

      table[class=body] p,
      table[class=body] td,
      table[class=body] span,
      table[class=body] a {
        font-size: 16px !important;
      }

      table[class=body] .wrapper {
        padding: 30px 20px !important;
      }

      table[class=body] .content {
        padding: 0 !important;
      }

      table[class=body] .container {
        padding: 10px !important;
        width: 100% !important;
      }

      table[class=body] .main {
        border-radius: 12px !important;
      }

      table[class=body] .bt-link {
        padding: 14px 30px !important;
        font-size: 16px !important;
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
  <span class="preheader">Recuperação de senha - anything</span>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
    <tr>
      <td>&nbsp;</td>
      <td class="container">
        <div class="content">
          <!-- START CENTERED WHITE CONTAINER -->
          <table role="presentation" class="main">
            <tr>
              <td colspan="3">
                <div class="header-bar"></div>
              </td>
            </tr>
            <!-- START MAIN CONTENT AREA -->
            <tr>
              <td class="wrapper">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <div class="decorative-dots">
                        <span class="dot dot-yellow"></span>
                        <span class="dot dot-blue"></span>
                        <span class="dot dot-pink"></span>
                      </div>
                      
                      <h1>🔐 Recuperação de Senha</h1>
                      <h4>Clique no botão abaixo para redefinir sua senha e acessar sua conta.</h4>
                      
                      <div class="btn-container">
                        <a class="bt-link" href="${link}" target="_blank" rel="noopener noreferrer">
                          Redefinir Minha Senha
                        </a>
                      </div>

                      <p style="color: #6c757d; font-size: 14px; margin-top: 30px;">
                        Se você não solicitou a recuperação de senha, pode ignorar este email com segurança.<br>
                        Este link expira em 24 horas por motivos de segurança.
                      </p>
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
                  <p class="footer-text">
                    <span class="brand-name">anything</span><br>
                    Transformando vidas através da educação
                  </p>
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
