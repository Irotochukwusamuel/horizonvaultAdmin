import {
  Body,
  Button,
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

export const TemplateName = 'Welcome Admin';

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

interface IWelcomePartnerTemplate {
  email: string;
  name: string;
  redirectLink: string;
  password: string;
  previewText: string;
}

export const Template = ({
  email,
  name,
  redirectLink,
  password,
  previewText = 'Welcome to Better Half Courses – Your Marriage Journey Begins!',
}: IWelcomePartnerTemplate) => (
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
        <Container className="mx-auto my-10 bg-base-white">
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
              className="my-8 h-[240px] w-full object-cover"
            />
            <Text style={{ fontSize: '24px', lineHeight: 'normal' }} className="mb-2 font-semibold">
              Welcome to Better Half, {name}!
            </Text>

            <Text style={{ ...paragraph, marginBottom: '20px' }}>
              You have been successfully invited to Better Half as an admin.
            </Text>
            <Text style={{ ...paragraph, marginBottom: '8px' }}>Your auto-generated credentials are:</Text>
            <Text style={{ ...paragraph, marginBottom: '4px' }} className="font-semibold">
              Email: {email}
            </Text>
            <Text style={{ ...paragraph, marginBottom: '24px' }} className="font-semibold">
              Password: {password}
            </Text>
            <Text style={{ ...paragraph, marginBottom: '8px' }}>Click the link below to log into your account.</Text>
            <Link
              href={redirectLink}
              className="font-semibold"
              // ! note: Link needs to be manually word-broken
              style={{ ...paragraph, marginBottom: '8px', wordBreak: 'break-word' }}
            >
              {redirectLink}
            </Link>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);