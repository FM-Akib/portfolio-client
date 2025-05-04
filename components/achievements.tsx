'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Achievement } from '@/types/allTypes';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  BadgeIcon as Certificate,
  ChevronLeft,
  ChevronRight,
  Medal,
  Star,
  Trophy,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export const icons = {
  award: <Award className="h-6 w-6" />,
  certificate: <Certificate className="h-6 w-6" />,
  medal: <Medal className="h-6 w-6" />,
  star: <Star className="h-6 w-6" />,
  trophy: <Trophy className="h-6 w-6" />,
};

export default function Achievements({
  achievements,
}: {
  achievements: Achievement[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex(prev => (prev === achievements.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex(prev => (prev === 0 ? achievements.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section
      id="achievements"
      className="py-20 bg-gradient-to-b from-primary/5 to-background"
    >
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            Achievements & Recognition
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Highlights of my professional journey and recognition received along
            the way.
          </p>
        </motion.div>

        <div className="relative" ref={containerRef}>
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="md:w-1/2">
                  <div className="relative rounded-lg overflow-hidden border-8 border-background shadow-xl">
                    <Image
                      src={
                        achievements[activeIndex].image || '/placeholder.svg'
                      }
                      alt={achievements[activeIndex].title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <Badge
                          variant="outline"
                          className="bg-primary/20 text-white border-primary/30 mb-2"
                        >
                          {achievements[activeIndex].year}
                        </Badge>
                        <h3 className="text-xl font-bold">
                          {achievements[activeIndex].organization}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <Card className="border-none shadow-lg bg-gradient-to-br from-background to-primary/5 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 p-2 rounded-full text-primary">
                          {/* {achievements[activeIndex].icon} */}
                          {icons[
                            achievements[activeIndex].icon as keyof typeof icons
                          ] || <Award className="h-6 w-6" />}
                        </div>
                        <h3 className="text-2xl font-bold text-primary">
                          {achievements[activeIndex].title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        {achievements[activeIndex].description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          {achievements.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => goToSlide(index)}
                              className={cn(
                                'w-3 h-3 rounded-full transition-all',
                                index === activeIndex
                                  ? 'bg-gradient-to-r from-primary to-primary/70 scale-125'
                                  : 'bg-muted hover:bg-primary/30',
                              )}
                              aria-label={`Go to slide ${index + 1}`}
                            />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={prevSlide}
                            className="rounded-full hover:bg-primary/10 hover:text-primary"
                          >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">
                              Previous achievement
                            </span>
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={nextSlide}
                            className="rounded-full hover:bg-primary/10 hover:text-primary"
                          >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next achievement</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {!isMobile && (
            <>
              <Button
                size="icon"
                variant="ghost"
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm shadow-lg z-10 hover:bg-primary/10 hover:text-primary"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous achievement</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm shadow-lg z-10 hover:bg-primary/10 hover:text-primary"
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next achievement</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
