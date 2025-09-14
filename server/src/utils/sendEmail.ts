import nodemailer, { Transporter } from "nodemailer";

type SendEmailParams = {
  credential: string;
  subject: string;
  message: string;
};

export const sendEmail = async ({
  credential,
  subject,
  message,
}: SendEmailParams): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "hossantopu@gmail.com",
      pass: "nlfr hkxg xwer bpmg",
    },
  });

  const options = {
    from: "hossantopu@gmail.com",
    to: credential,
    subject,
    html: message,
  };

  await transporter.sendMail(options);
};
