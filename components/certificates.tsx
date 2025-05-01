"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Calendar, ExternalLink } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRef, useEffect } from "react"

const certificates = [
  {
    title: "Advanced Web Development Certification",
    organization: "Udemy",
    date: "December 2023",
    image: "/placeholder.svg?height=300&width=500",
    link: "#",
  },
  {
    title: "React & Redux Masterclass",
    organization: "Coursera",
    date: "October 2023",
    image: "/placeholder.svg?height=300&width=500",
    link: "#",
  },
  {
    title: "Full Stack JavaScript Developer",
    organization: "freeCodeCamp",
    date: "August 2023",
    image: "/placeholder.svg?height=300&width=500",
    link: "#",
  },
  {
    title: "UI/UX Design Principles",
    organization: "Google",
    date: "June 2023",
    image: "/placeholder.svg?height=300&width=500",
    link: "#",
  },
  {
    title: "Data Structures & Algorithms",
    organization: "HackerRank",
    date: "April 2023",
    image: "/placeholder.svg?height=300&width=500",
    link: "#",
  },
]

export default function Certificates() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeRef.current) return

      const marqueeContent = marqueeRef.current.querySelector(".marquee-content")
      if (!marqueeContent) return

      // Clone the content for seamless looping
      const clone = marqueeContent.cloneNode(true)
      marqueeRef.current.appendChild(clone)
    }

    setupMarquee()
  }, [])

  return (
    <section id="certificates" className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">Certificates & Credentials</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
        </motion.div>

        {/* Marquee Effect for Titles */}
        <div ref={marqueeRef} className="relative overflow-hidden mb-12 py-4 bg-primary/5 rounded-lg">
          <div
            className="marquee-content flex whitespace-nowrap animate-marquee"
            style={{
              animation: "marquee 30s linear infinite",
            }}
          >
            {certificates.map((cert, index) => (
              <span key={index} className="mx-8 text-xl font-bold text-primary">
                {cert.title}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {cert.date}
                    </div>
                  </div>
                </div>
                <CardContent className="flex-1 flex flex-col p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">{cert.organization}</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Certificate
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
