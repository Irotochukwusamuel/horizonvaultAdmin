import sendMail from '@/services/mail';
import { NextApiRequest, NextApiResponse } from 'next';
import { render } from 'jsx-email';
import { BASE_URL } from '@/lib/constants';
import { Template } from '@/emails/WelcomeAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { to, password, name } = await req.json();

  if (req.method === 'POST') {
    try {
      const html = await render(
        Template({
          email: to,
          name,
          redirectLink: `${BASE_URL}`,
          password,
          previewText: 'Welcome to Better Half – Your Admin Account has been  set up!',
        }),
      );

      const info = await sendMail({
        from: process.env.MAIL_SENDER,
        to,
        subject: 'Welcome to Better Half – Your Admin Account has been  set up!',
        html,
      });

      console.log('info', info);

      return new NextResponse(JSON.stringify({ message: 'Email sent successfully' }), {
        status: 200,
      });

    } catch (error) {
      console.error(error);

      return new NextResponse(JSON.stringify({ message: 'Error sending email' }), {
        status: 500,
      });
    }
  }
}

