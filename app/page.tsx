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
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Hero aboutData={response.data.data} />
      <About aboutData={response.data.data} />
      <Experiences experiences={response3.data.data} />
      <Projects projects={response2.data.data} />
      <Skills />
      <Certificates />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}
