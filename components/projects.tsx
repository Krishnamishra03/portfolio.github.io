"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import 3D components with no SSR
const ProjectsTitleComponent = dynamic(() => import("./projects-title"), {
  ssr: false,
  loading: () => (
    <div className="h-24 flex items-center justify-center">
      <div className="text-center text-muted-foreground">Loading...</div>
    </div>
  ),
})

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [scrollProps, setScrollProps] = useState({ opacity: 1, y: 0 })

  // First, just set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Then, in a separate effect, add event listeners only after mounting
  useEffect(() => {
    if (!mounted) return
    if (typeof window === "undefined") return

    const handleScroll = () => {
      try {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const offsetTop = rect.top
        const elementHeight = rect.height

        // Calculate scroll progress
        const scrollProgress = 1 - offsetTop / (windowHeight + elementHeight)
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress))

        // Transform values based on scroll progress
        let opacity = 1
        let y = 0

        if (clampedProgress < 0.2) {
          opacity = clampedProgress / 0.2
          y = 100 - (clampedProgress / 0.2) * 100
        } else if (clampedProgress > 0.8) {
          opacity = (1 - clampedProgress) / 0.2
          y = ((clampedProgress - 0.8) / 0.2) * -100
        }

        setScrollProps({ opacity, y })
      } catch (error) {
        console.error("Error in scroll handler:", error)
      }
    }

    try {
      window.addEventListener("scroll", handleScroll)
      handleScroll() // Initial check
    } catch (error) {
      console.error("Error setting up scroll listener:", error)
    }

    return () => {
      try {
        window.removeEventListener("scroll", handleScroll)
      } catch (error) {
        console.error("Error removing scroll listener:", error)
      }
    }
  }, [mounted])

  const projects = [
    {
      title: "Career Counselling System",
      description:
        "It is an online platform that helps students and professionals choose the right career based on their skills, interests, and education. It offers career suggestions, assessments, mentorship, and learning resources to support better career decisions.",
      image: "https://iili.io/FlsYuvs.png",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySql", "Bootsrap"],
      liveUrl: "https://careersystem.netlify.app/",
      githubUrl: "#",
    },
    {
      title: "Online food ordering system",
      description:
        "A food ordering system that allows users to order food from restaurants and delivery services.",
      image: "https://iili.io/FlsE7wu.jpg",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySql", "Bootsrap"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Care Connect",
      description: "It is a smart platform that allows users to book, reschedule, or cancel appointments easily through a website or app. It uses Artificial Intelligence to suggest the best available time slots, send automated reminders, manage cancellations, and even predict user preferences. The system improves efficiency, reduces no-shows, and offers a personalized booking experience for users in sectors like healthcare, salons, education, and business services.",
      image: "https://iili.io/FlsBzOX.png",
      tags: ["React", "Node.js", "Express.js", "MongoDB", "Framer Motion", "Tailwind CSS"],
      liveUrl: "https://prescripto.vercel.app/",
      githubUrl: "#",
    },
    {
      title: "Portfolio Website",
      description: "A personal portfolio website that showcases my skills, projects, and contact information.",
      image: "https://iili.io/FlsoyBa.png",
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  if (!mounted) {
    return (
      <div className="container mx-auto">
        <div className="h-24 mb-6 flex items-center justify-center">
          <div className="text-center text-muted-foreground">Loading...</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 bg-muted rounded-md"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto" ref={containerRef}>
      <div className="h-24 mb-6">
        <ProjectsTitleComponent />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            style={{
              opacity: scrollProps.opacity,
              y: scrollProps.y,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.03,
              rotateY: 5,
              z: 10,
            }}
            className="perspective-1000"
          >
            <Card className="overflow-hidden border border-purple-500/20 bg-background/50 backdrop-blur-sm h-full flex flex-col transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-muted hover:bg-purple-500/10 transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between">
                <Button variant="ghost" size="sm" className="hover:bg-purple-500/10" asChild>
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-purple-500/10" asChild>
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
