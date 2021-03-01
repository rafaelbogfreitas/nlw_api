import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

class SendEmailService {
  private client: Transporter
  constructor() {
    nodemailer.createTestAccount()
      .then(account => {
        let transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        });

        this.client = transporter;
      });
  }

  async execute(to: string, subject:string, variables: object, path: string) {
    const emailTemplateHbsFile = fs.readFileSync(path).toString("utf-8");
    const compiledHbsEmail = handlebars.compile(emailTemplateHbsFile);

    const emailHtml = compiledHbsEmail(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html: emailHtml,
      from: "NPS <noreply@noreply.com>"
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));

  }
}

export default new SendEmailService();