import {
  Body,
  Container,
  Img,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Font,
  TailwindProps,
  Link,
} from 'jsx-email';
import * as React from 'react';

export const TemplateName = 'Forgot Password';

const paragraph = {
  color: '#2D3045',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  margin: '0',
};

const tailwindConfig: TailwindProps['config'] = {
  theme: {
    colors: {
      base: {
        white: '#FFFFFF',
        black: '#2D3045',
      },
    },
  },
};

interface IForgotPasswordTemplate {
  name: string;
  redirectLink: string;
  previewText: string;
}

export const Template = ({
  name,
  redirectLink,
  previewText = 'Reset Password - Better Half Courses',
}: IForgotPasswordTemplate) => (
  <Html lang="en">
    <Head>
      <Font
        fontFamily="Proxima Nova"
        // todo: find webfont with varying font weights
        fallbackFontFamily="Verdana"
        // webFont={{
        //   url: 'https://db.onlinewebfonts.com/t/f14eee643541cf03a10f26c944cc29f5.woff2',
        //   format: 'woff2',
        // }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>{previewText}</Preview>
    <Tailwind config={tailwindConfig} production>
      <Body className="bg-base-white text-base-black">
        <Container className="mx-auto my-10 h-full bg-base-white">
          <Section className="w-full max-w-[600px]">
            <Img
              src={`https://api.betterhalfcourse.com/v1/storage/buckets/profile-images/files/662986ab31351afef6f3/view?project=betterhalf-course-stage&mode=admin`}
              alt="Better Half Logo"
              width={160}
              height={36.6}
            />
            <Img
              src={`https://api.betterhalfcourse.com/v1/storage/buckets/profile-images/files/662991da70b34e06841a/view?project=betterhalf-course-stage&mode=admin`}
              width={0}
              height={240}
              className="my-7 h-[240px] w-full object-cover"
            />
            <Text style={{ fontSize: '24px', lineHeight: 'normal' }} className="mb-2 font-semibold">
              Forgot your password, {name}?{' '}
            </Text>

            <Text style={{ ...paragraph, marginBottom: '20px' }}>
              We received a request to reset the password for your Better Half account.{' '}
            </Text>
            <Text style={{ ...paragraph, marginBottom: '12px' }}>Click the link below to reset your password. </Text>
            <Link
              href={redirectLink}
              className="font-semibold"
              // ! note: Link needs to be manually word-broken
              style={{ ...paragraph, marginBottom: '8px', wordBreak: 'break-word' }}
            >
              {redirectLink}
            </Link>

            <div className="mt-[10.4%]">
              <Text style={{ ...paragraph, marginBottom: '4px' }}>Thanks for choosing Better Half.</Text>
              <Text style={{ ...paragraph }} className="font-semibold">
                - The Better Half Team.
              </Text>
            </div>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);