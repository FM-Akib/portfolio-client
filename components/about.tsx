'use client';

import { AboutData } from '@/types/allTypes';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap } from 'lucide-react';
import Image from 'next/image';

export default function About({ aboutData }: { aboutData: AboutData }) {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square relative rounded-xl overflow-hidden border-4 border-primary/20">
              <Image
                src={aboutData.image || '/placeholder.svg?height=500&width=500'}
                alt="Profile"
                width={500}
                height={500}
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 h-full w-full border-4 border-primary rounded-xl -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              Software Engineer & Problem Solver
            </h3>
            <p className="text-muted-foreground mb-6">
              {aboutData.description ||
                'I am a passionate software engineer with a knack for problem-solving and a love for technology. I thrive in challenging environments and enjoy creating innovative solutions that make a difference.'}
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Education</h4>
                  <p className="text-sm text-muted-foreground">
                    B.Sc in Computer Science, International Islamic University
                    Chitagong, 2021-2024
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Experience</h4>
                  <p className="text-sm text-muted-foreground">
                    1.5+ years of professional software development experience
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Achievements</h4>
                  <p className="text-sm text-muted-foreground">
                    Open source contributor, Hackathon winner, Tech conference
                    speaker
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
