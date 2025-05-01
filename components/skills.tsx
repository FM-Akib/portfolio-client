"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Globe, Layout, Server, Settings } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    icon: <Layout className="h-6 w-6" />,
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: <Server className="h-6 w-6" />,
    skills: ["Node.js", "Express", "NestJS", "Python", "Django", "RESTful APIs", "GraphQL"],
  },
  {
    title: "Database",
    icon: <Database className="h-6 w-6" />,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Prisma", "Mongoose"],
  },
  {
    title: "DevOps",
    icon: <Settings className="h-6 w-6" />,
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Vercel", "Netlify", "GitHub Actions"],
  },
  {
    title: "Tools",
    icon: <Code className="h-6 w-6" />,
    skills: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Jest", "Cypress"],
  },
  {
    title: "Other",
    icon: <Globe className="h-6 w-6" />,
    skills: ["Agile/Scrum", "UI/UX Design", "SEO", "Performance Optimization", "Accessibility", "Technical Writing"],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are the technologies and tools I work with to build modern, efficient, and scalable applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full text-primary">{category.icon}</div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <div key={i} className="bg-muted px-3 py-1 rounded-full text-sm">
                        {skill}
                      </div>
                    ))}
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
