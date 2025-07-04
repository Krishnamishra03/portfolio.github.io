"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import 3D components with no SSR
const CertificationsTitleComponent = dynamic(() => import("./certifications-title"), {
  ssr: false,
  loading: () => (
    <div className="h-24 flex items-center justify-center">
      <div className="text-center text-muted-foreground">Loading...</div>
    </div>
  ),
})

export default function Certifications() {
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

  const certifications = [
    {
      title: "Cybersecurity",
      issuer: "TATA",
      date: "February 26th, 2025",
      image: "https://media-hosting.imagekit.io/06e441c1aa6b4030/Screenshot%202025-04-27%20234650.png?Expires=1840385823&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=XoD0drTD-3XmO4tBXP7YcCx0nErzjmYTsA6LpEy7NAfpfXphJROF~1OFMLgT-~XWzEWhm7MALHGfMAyPFbnY-8k1rOtXacLsotUFp6cZVxGububc1tATTslZUW4wEzP8KseOEHU6tp95J11SXJDD33g1ke3UYAPErJkCEUL1814F4n-47pdmLS17FrkspjaLCwYzkVGy9vuB522CtgjhDoFO0pPt2-9DybyxpgEQCwvYl859dvpb3iWtL7JkrbwyJxO~OEf-Xi2qqkvLngPiopukiiC34n~InpW8lgISzb~Qs3Qm5Vf0uDwpntPgsNQKhFhesIbT-U6T2FWFQJ-1nw__",
      url: "https://media-hosting.imagekit.io/06e441c1aa6b4030/Screenshot%202025-04-27%20234650.png?Expires=1840385823&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=XoD0drTD-3XmO4tBXP7YcCx0nErzjmYTsA6LpEy7NAfpfXphJROF~1OFMLgT-~XWzEWhm7MALHGfMAyPFbnY-8k1rOtXacLsotUFp6cZVxGububc1tATTslZUW4wEzP8KseOEHU6tp95J11SXJDD33g1ke3UYAPErJkCEUL1814F4n-47pdmLS17FrkspjaLCwYzkVGy9vuB522CtgjhDoFO0pPt2-9DybyxpgEQCwvYl859dvpb3iWtL7JkrbwyJxO~OEf-Xi2qqkvLngPiopukiiC34n~InpW8lgISzb~Qs3Qm5Vf0uDwpntPgsNQKhFhesIbT-U6T2FWFQJ-1nw__",
    },
    {
      title: "Certificate of Participation in a Hackathon",
      issuer: "Jagran Lakecity University",
      date: "April 2025",
      image: "https://media-hosting.imagekit.io/0b942f3c96524eae/hackthon.jpg?Expires=1840770606&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=SYe2IX3BdgbjS0L6nUT4xYLI17HWSdgGkgGaBZs9Vjct8EbhpwcWtFCejYjeOHJ3ev1t2aFtRlhLsCYqAI6mufDxy0l2Cygr~nI7zecMYm9QTJoLw~QHD931c78typLTB1bL~xxIu9oziRkVQFdibsp6at7x7-IKr7zn9wkvT7rG-~g4T1aMBIi9nQC2q7QC5BKm--~mgmB1hDsx0DoJe7j-YhU9qXMQZgsjcsw0mQET3K-R8FQHoFmxE6wRx1iF~xRnIJyOlX5ltTLYy1JEIwIKkRgPEcYlyIc~CgC55v3pzMRXSzYpissbNUZhx8r4vMIv3ra6xJY46MQsn~uBUA__",
      url: "https://media-hosting.imagekit.io/0b942f3c96524eae/hackthon.jpg?Expires=1840770606&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=SYe2IX3BdgbjS0L6nUT4xYLI17HWSdgGkgGaBZs9Vjct8EbhpwcWtFCejYjeOHJ3ev1t2aFtRlhLsCYqAI6mufDxy0l2Cygr~nI7zecMYm9QTJoLw~QHD931c78typLTB1bL~xxIu9oziRkVQFdibsp6at7x7-IKr7zn9wkvT7rG-~g4T1aMBIi9nQC2q7QC5BKm--~mgmB1hDsx0DoJe7j-YhU9qXMQZgsjcsw0mQET3K-R8FQHoFmxE6wRx1iF~xRnIJyOlX5ltTLYy1JEIwIKkRgPEcYlyIc~CgC55v3pzMRXSzYpissbNUZhx8r4vMIv3ra6xJY46MQsn~uBUA__",
    },
    {
      title: " Introduction to Cybersecurity",
      issuer: "Cisco",
      date: "Apr 2024",
      image: "https://media-hosting.imagekit.io/a8cfdce653374fa0/Screenshot%202025-05-04%20224645.png?Expires=1840987026&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=lR1tD5mV1hoeQfBqoTMrsjjjLe5YL0eD3HnpqtDM0lp4yysS1hp9Ms~xJ4sp95h9B-cn54uyzqDM7HtYqos9KRGKT7U4R1CbNYqY0QKHBTlU~d85oTigqEr00g0EhB8UmPijXzd5e1tyJk4RunO2XWBRxHMgSXMfHvs~rKzoeFTAX9sWksGBD99WjiL7quwk-bl~5ncMksC37cdrZQKrpsAyBC8SZM8r90p7JV8rrZT15RwsdWeqNxSGttjbWDf7BHaeTnMiWqt21ZlZHi3GSIbpaYkyBCnrbMEPi~F7mYh9xBHhmiF4Lill9CNSaaFveaTpqE662aa3L~RasQVQ2A__",
      url: "https://media-hosting.imagekit.io/a8cfdce653374fa0/Screenshot%202025-05-04%20224645.png?Expires=1840987026&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=lR1tD5mV1hoeQfBqoTMrsjjjLe5YL0eD3HnpqtDM0lp4yysS1hp9Ms~xJ4sp95h9B-cn54uyzqDM7HtYqos9KRGKT7U4R1CbNYqY0QKHBTlU~d85oTigqEr00g0EhB8UmPijXzd5e1tyJk4RunO2XWBRxHMgSXMfHvs~rKzoeFTAX9sWksGBD99WjiL7quwk-bl~5ncMksC37cdrZQKrpsAyBC8SZM8r90p7JV8rrZT15RwsdWeqNxSGttjbWDf7BHaeTnMiWqt21ZlZHi3GSIbpaYkyBCnrbMEPi~F7mYh9xBHhmiF4Lill9CNSaaFveaTpqE662aa3L~RasQVQ2A__",
    },
    {
      title: "Web develpment",
      issuer: "MNIT, Bhopal",
      date: "Sep 2024",
      image: "https://media-hosting.imagekit.io/ef223841bd42450d/MNIT%20web.jpg?Expires=1841474308&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=NOsFHqgBjDiVdZFy4TlqgVwX2Zk~M-XiAZnmi5nk7ivQX1Rj4SOgPWKsTD30hDB44EuKu1aXNN5ituTlPbBVLF0YOj6QhSocP7F-sAgrVFRET4kJTZhftrgG-qUZ9UjcaNo64ROXIbClxseQ3XFHXEA6QtxI4Ue-1IfNNjF4k4OQnRs1dVUDnAk5EKbc4AhlUK9QmF1QAW1frRA-cciMIyqRlkqqQFQf0IJvKBSTfLoSn1RgwwDKqwfSZPPWpZ5ZNHMycqsrMs3GhOIf1Hri-YRfXHxcIn55V2qr6xCoZ7UvFGy3Ezvm3XpS8~4knjcohykwLtJPLZoxxIJeMY207g__",
      url: "https://media-hosting.imagekit.io/ef223841bd42450d/MNIT%20web.jpg?Expires=1841474308&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=NOsFHqgBjDiVdZFy4TlqgVwX2Zk~M-XiAZnmi5nk7ivQX1Rj4SOgPWKsTD30hDB44EuKu1aXNN5ituTlPbBVLF0YOj6QhSocP7F-sAgrVFRET4kJTZhftrgG-qUZ9UjcaNo64ROXIbClxseQ3XFHXEA6QtxI4Ue-1IfNNjF4k4OQnRs1dVUDnAk5EKbc4AhlUK9QmF1QAW1frRA-cciMIyqRlkqqQFQf0IJvKBSTfLoSn1RgwwDKqwfSZPPWpZ5ZNHMycqsrMs3GhOIf1Hri-YRfXHxcIn55V2qr6xCoZ7UvFGy3Ezvm3XpS8~4knjcohykwLtJPLZoxxIJeMY207g__",
    },
  ]

  if (!mounted) return null

  return (
    <div className="container mx-auto" ref={containerRef}>
      <div className="h-24 mb-6">{mounted && <CertificationsTitleComponent />}</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {certifications.map((cert, index) => (
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
              scale: 1.05,
              rotateY: 10,
              z: 10,
            }}
            className="perspective-1000"
          >
            <Card className="border border-purple-500/20 bg-background/50 backdrop-blur-sm h-full flex flex-col transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <CardContent className="p-6 text-center flex-grow">
                <div className="mb-4 flex justify-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500/20 p-1 transform-gpu transition-all duration-300 hover:border-purple-500/50">
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.title}
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {cert.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">{cert.issuer}</p>
                <div className="flex items-center justify-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {cert.date}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-center">
                <Badge variant="outline" className="hover:bg-purple-500/10 cursor-pointer transition-colors" asChild>
                  <Link href={cert.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    View Certificate
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </Badge>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
