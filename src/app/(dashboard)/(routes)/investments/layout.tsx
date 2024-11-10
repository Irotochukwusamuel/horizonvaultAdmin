import Header from '@/app/(dashboard)/(routes)/investments/components/header';


export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>
    <Header />
    {children}
  </section>;
}
