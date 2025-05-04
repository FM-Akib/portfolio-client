import About from '@/components/about';
import Achievements from '@/components/achievements';
import Certificates from '@/components/certificates';
import Contact from '@/components/contact';
import Experiences from '@/components/experience';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import Projects from '@/components/projects';
import Skills from '@/components/skills';
import axiosInstance from '@/lib/axios';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mohammad Fahim Muntasir Akib | Software Engineer Portfolio',
  description:
    'Professional portfolio showcasing my work as a software engineer',
};

export default async function Home() {
  const response = await axiosInstance.get('/about');
  const response2 = await axiosInstance.get('/projects');
  const response3 = await axiosInstance.get('/experiences');
  const response4 = await axiosInstance.get('/certificates');
  const response5 = await axiosInstance.get('/achievements');
  const response6 = await axiosInstance.get(
    '/contacts/68178dc2c8a6959569effb35',
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Hero aboutData={response.data.data} />
      <About aboutData={response.data.data} />
      <Experiences experiences={response3.data.data} />
      <Projects projects={response2.data.data} />
      <Skills />
      <Certificates certificates={response4.data.data} />
      <Achievements achievements={response5.data.data} />
      <Contact contactData={response6.data.data} />
      <Footer />
    </main>
  );
}
