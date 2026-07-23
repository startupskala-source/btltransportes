import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();

          const nome = cleanText(body?.nome, 120);
          const empresa = cleanText(body?.empresa, 160);
          const email = cleanText(body?.email, 180).toLowerCase();
          const whatsapp = cleanText(body?.whatsapp, 40);
          const assunto = cleanText(body?.assunto, 60);
          const mensagem = cleanText(body?.mensagem, 3000);
          const botcheck = cleanText(body?.botcheck, 200);

          // Honeypot: responde como sucesso sem enviar e-mail.
          if (botcheck) {
            return Response.json({ success: true });
          }

          if (!nome || !email) {
            return Response.json(
              {
                success: false,
                message: "Preencha seu nome e e-mail para continuar.",
              },
              { status: 400 },
            );
          }

          if (!isValidEmail(email)) {
            return Response.json(
              {
                success: false,
                message: "Digite um endereço de e-mail válido.",
              },
              { status: 400 },
            );
          }

          const resendApiKey = process.env.RESEND_API_KEY;
          const toEmail =
            process.env.CONTACT_TO_EMAIL || "contato@btltransportes.com.br";
          const fromEmail = process.env.CONTACT_FROM_EMAIL;

          if (!resendApiKey || !fromEmail) {
            console.error(
              "Variáveis ausentes: RESEND_API_KEY ou CONTACT_FROM_EMAIL.",
            );

            return Response.json(
              {
                success: false,
                message:
                  "O serviço de e-mail ainda não foi configurado. Entre em contato diretamente pelo e-mail da BTL.",
              },
              { status: 500 },
            );
          }

          const departamento =
            DEPARTMENT_LABELS[assunto] || assunto || "Contato geral";

          const submittedAt = new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "full",
            timeStyle: "short",
            timeZone: "America/Sao_Paulo",
          }).format(new Date());

          const subject = `${EMAIL_COPY.subjectPrefix} — ${departamento}`;

          const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
              Accept: "application/json",
              "User-Agent": "BTL-Website/1.0",
            },
            body: JSON.stringify({
              from: fromEmail,
              to: [toEmail],
              reply_to: email,
              subject,
              html: createEmailHtml({
                nome,
                empresa,
                email,
                whatsapp,
                departamento,
                mensagem,
                submittedAt,
              }),
              text: createEmailText({
                nome,
                empresa,
                email,
                whatsapp,
                departamento,
                mensagem,
                submittedAt,
              }),
            }),
          });

          const resendData = await resendResponse.json().catch(() => null);

          if (!resendResponse.ok) {
            console.error("Erro do Resend:", {
              status: resendResponse.status,
              response: resendData,
            });

            return Response.json(
              {
                success: false,
                message:
                  "Não foi possível enviar sua mensagem agora. Tente novamente em alguns instantes.",
              },
              { status: 502 },
            );
          }

          return Response.json({
            success: true,
            id: resendData?.id,
          });
        } catch (error) {
          console.error("Erro na rota /api/contact:", error);

          return Response.json(
            {
              success: false,
              message:
                "Ocorreu um erro inesperado. Tente novamente em alguns instantes.",
            },
            { status: 500 },
          );
        }
      },
    },
  },
});

/*
 * TEXTO EDITÁVEL DO E-MAIL
 * Altere estas frases diretamente no GitHub quando desejar.
 */
const EMAIL_COPY = {
  subjectPrefix: "Novo contato pelo site da BTL",
  title: "Novo contato recebido",
  intro:
    "Uma nova mensagem foi enviada pelo formulário do site da BTL Transportes. Confira os dados abaixo.",
  footer:
    "Mensagem enviada automaticamente pelo site oficial da BTL Transportes.",
};

const DEPARTMENT_LABELS: Record<string, string> = {
  orcamentos: "Orçamentos",
  frota: "Frota",
  mecanica: "Mecânica/Manutenção",
  rh: "Recrutamento",
};

type EmailData = {
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  departamento: string;
  mensagem: string;
  submittedAt: string;
};

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function display(value: string, fallback = "Não informado"): string {
  return escapeHtml(value || fallback);
}

function createEmailHtml(data: EmailData): string {
  const rows = [
    ["Nome", display(data.nome)],
    ["Empresa", display(data.empresa)],
    ["E-mail", display(data.email)],
    ["WhatsApp", display(data.whatsapp)],
    ["Departamento", display(data.departamento)],
    ["Enviado em", display(data.submittedAt)],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #ead9dd;font-weight:700;color:#7C0F24;width:150px;">
            ${label}
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #ead9dd;color:#252525;">
            ${value}
          </td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:0;background:#f5f2f3;font-family:Arial,Helvetica,sans-serif;color:#252525;">
    <div style="padding:28px 14px;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #ead9dd;">
        <div style="background:#7C0F24;padding:28px 30px;">
          <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#f5dfe4;">
            BTL Transportes
          </div>
          <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;color:#ffffff;">
            ${escapeHtml(EMAIL_COPY.title)}
          </h1>
        </div>

        <div style="padding:28px 30px;">
          <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#4b4144;">
            ${escapeHtml(EMAIL_COPY.intro)}
          </p>

          <table role="presentation" style="width:100%;border-collapse:collapse;border:1px solid #ead9dd;border-radius:10px;">
            ${rowsHtml}
          </table>

          <div style="margin-top:24px;padding:20px;border-radius:10px;background:#faf5f6;border-left:4px solid #7C0F24;">
            <div style="margin-bottom:8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#7C0F24;">
              Mensagem
            </div>
            <div style="white-space:pre-wrap;font-size:15px;line-height:1.7;color:#252525;">
              ${display(data.mensagem, "Nenhuma mensagem adicional foi informada.")}
            </div>
          </div>

          <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#766b6e;">
            Para responder ao cliente, basta clicar em “Responder” no seu aplicativo de e-mail.
          </p>
        </div>

        <div style="padding:18px 30px;background:#f7f2f3;border-top:1px solid #ead9dd;font-size:12px;color:#766b6e;text-align:center;">
          ${escapeHtml(EMAIL_COPY.footer)}
        </div>
      </div>
    </div>
  </body>
</html>`;
}

function createEmailText(data: EmailData): string {
  return [
    "BTL TRANSPORTES",
    EMAIL_COPY.title,
    "",
    EMAIL_COPY.intro,
    "",
    `Nome: ${data.nome}`,
    `Empresa: ${data.empresa || "Não informada"}`,
    `E-mail: ${data.email}`,
    `WhatsApp: ${data.whatsapp || "Não informado"}`,
    `Departamento: ${data.departamento}`,
    `Enviado em: ${data.submittedAt}`,
    "",
    "Mensagem:",
    data.mensagem || "Nenhuma mensagem adicional foi informada.",
    "",
    EMAIL_COPY.footer,
  ].join("\n");
}
