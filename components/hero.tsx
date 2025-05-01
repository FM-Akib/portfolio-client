'use client';

import Navbar from '@/components/navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AboutData } from '@/types/allTypes';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  Briefcase,
  ChefHat,
  Code,
  Facebook,
  FileText,
  Github,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

export default function Hero({ aboutData }: { aboutData: AboutData }) {
  console.log(aboutData);
  const handleDownloadResume = () => {
    // This would typically link to your actual resume file
    const link = document.createElement('a');
    link.href = aboutData?.resumeUrl || '/path/to/your/resume.pdf';
    link.download = 'Mohammad_Fahim_Muntasir_Akib_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 container flex flex-col justify-center items-start max-w-4xl mx-auto pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-2"
        >
          <Badge
            variant="outline"
            className="px-4 py-1 text-sm font-medium border-primary/30 bg-primary/5 text-primary mb-4 flex items-center gap-2"
          >
            <Code className="h-3.5 w-3.5" />
            Software Engineer
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 relative">
            {aboutData.name || 'Mohammad Fahim Muntasir Akib'}
            <span className="absolute bottom-1 left-0 w-full h-2 bg-primary/20 -z-10 rounded-full"></span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-2xl md:text-3xl font-medium text-muted-foreground mb-6 h-[40px]"
        >
          <TypeAnimation
            sequence={[
              'Full Stack Developer',
              2000,
              'MERN Stack Developer',
              2000,
              'Problem Solver',
              2000,
              'Tech Innovator',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Number.POSITIVE_INFINITY}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-lg text-muted-foreground mb-8 max-w-2xl"
        >
          I build exceptional and accessible digital experiences for the web.
          Passionate about creating elegant solutions to complex problems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            size="lg"
            onClick={() =>
              document
                .querySelector('#projects')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 flex items-center gap-2"
          >
            <Briefcase className="h-4 w-4" />
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleDownloadResume}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Download Resume
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex gap-4 mt-8"
        >
          {aboutData?.socialLinks?.github && (
            <Link
              href={aboutData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </Link>
          )}

          {aboutData?.socialLinks?.linkedin && (
            <Link
              href={aboutData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
          )}

          {aboutData?.socialLinks?.facebook && (
            <Link
              href={aboutData.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </Link>
          )}

          {aboutData?.socialLinks?.instagram && (
            <Link
              href={aboutData.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </Link>
          )}

          {aboutData?.socialLinks?.codeforces && (
            <Link
              href={aboutData.socialLinks.codeforces}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Codeforces"
            >
              <Code className="h-6 w-6" />
            </Link>
          )}

          {aboutData?.socialLinks?.codechef && (
            <Link
              href={aboutData.socialLinks.codechef}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="CodeChef"
            >
              <ChefHat className="h-6 w-6" />
            </Link>
          )}

          {aboutData?.socialLinks?.youtube && (
            <Link
              href={aboutData.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-6 w-6" />
            </Link>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() =>
          document
            .querySelector('#about')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground">Scroll Down</span>
          <ArrowDown className="h-6 w-6 text-primary animate-bounce" />
        </div>
      </motion.div>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-bl from-primary/10 to-transparent -z-10 clip-path-polygon"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-primary/10 to-transparent -z-10 rounded-tr-full"></div>
    </section>
  );
}
