"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Mail, Linkedin, MessageCircle, Code, Briefcase, TrendingUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  language: string
  stargazers_count: number
  topics: string[]
}

interface ChatMessage {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

const messageFlows = {
  employer: [
    "Hi! I'm excited you're here. I'm a passionate developer with expertise in modern web technologies.",
    "I specialize in React, Next.js, and full-stack development. I love solving complex problems and building scalable applications.",
    "I'm currently open to new opportunities and would love to discuss how I can contribute to your team!",
    "Feel free to check out my projects below and don't hesitate to reach out!",
  ],
  investor: [
    "Welcome! I'm a tech entrepreneur and developer with a track record of building innovative solutions.",
    "I've developed several applications that demonstrate market potential and technical excellence.",
    "I'm passionate about creating products that solve real-world problems and scale efficiently.",
    "I'm currently seeking investment opportunities for my next venture. Let's connect!",
  ],
  general: [
    "Hello! Welcome to my portfolio. I'm a developer who loves creating amazing digital experiences.",
    "I enjoy working with cutting-edge technologies and turning ideas into reality.",
    "Take a look around and see what I've been building. I'm always excited to connect with fellow tech enthusiasts!",
    "Thanks for visiting! Feel free to reach out if you'd like to collaborate or just chat about tech.",
  ],
}

export default function Portfolio() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [selectedAudience, setSelectedAudience] = useState<keyof typeof messageFlows | null>(null)
  const [showAudienceSelector, setShowAudienceSelector] = useState(false)

  // Fetch GitHub repositories
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Replace 'yourusername' with your actual GitHub username
        const response = await fetch("https://api.github.com/users/yourusername/repos?sort=updated&per_page=6")
        const data = await response.json()
        setRepos(data)
      } catch (error) {
        console.error("Error fetching repos:", error)
        // Fallback demo data
        setRepos([
          {
            id: 1,
            name: "awesome-web-app",
            description: "A full-stack web application built with Next.js and TypeScript",
            html_url: "https://github.com/yourusername/awesome-web-app",
            homepage: "https://awesome-web-app.vercel.app",
            language: "TypeScript",
            stargazers_count: 42,
            topics: ["nextjs", "typescript", "tailwindcss"],
          },
          {
            id: 2,
            name: "react-dashboard",
            description: "Modern dashboard with data visualization and real-time updates",
            html_url: "https://github.com/yourusername/react-dashboard",
            homepage: "https://react-dashboard-demo.vercel.app",
            language: "JavaScript",
            stargazers_count: 28,
            topics: ["react", "dashboard", "charts"],
          },
          {
            id: 3,
            name: "mobile-app-backend",
            description: "RESTful API backend for mobile applications with authentication",
            html_url: "https://github.com/yourusername/mobile-app-backend",
            homepage: "",
            language: "Python",
            stargazers_count: 15,
            topics: ["python", "fastapi", "postgresql"],
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  // Auto-messaging system
  useEffect(() => {
    if (showChat && selectedAudience && currentMessageIndex < messageFlows[selectedAudience].length) {
      const timer = setTimeout(() => {
        const newMessage: ChatMessage = {
          id: Date.now(),
          text: messageFlows[selectedAudience][currentMessageIndex],
          isBot: true,
          timestamp: new Date(),
        }
        setChatMessages((prev) => [...prev, newMessage])
        setCurrentMessageIndex((prev) => prev + 1)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [showChat, selectedAudience, currentMessageIndex])

  const startChat = (audience: keyof typeof messageFlows) => {
    setSelectedAudience(audience)
    setShowAudienceSelector(false)
    setShowChat(true)
    setChatMessages([])
    setCurrentMessageIndex(0)
  }

  const closeChat = () => {
    setShowChat(false)
    setShowAudienceSelector(false)
    setChatMessages([])
    setCurrentMessageIndex(0)
    setSelectedAudience(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <Avatar className="mx-auto h-32 w-32 border-4 border-white/20">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
              <AvatarFallback className="text-2xl">YN</AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Your Name
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              className="ml-2 inline-block h-1 w-1 bg-purple-400"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8 text-xl text-gray-300 sm:text-2xl"
          >
            Full-Stack Developer & Tech Innovator
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              onClick={() => setShowAudienceSelector(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat with Me
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Github className="mr-2 h-4 w-4" />
              View GitHub
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-20 left-10 h-20 w-20 rounded-full bg-purple-500/20 blur-xl"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-20 right-10 h-32 w-32 rounded-full bg-blue-500/20 blur-xl"
        />
      </section>

      {/* Projects Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Featured Projects</h2>
            <p className="text-gray-400">Here are some of my recent works and contributions</p>
          </motion.div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-white/5 border-white/10 animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-white/20 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-white/10 rounded w-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-lg">{repo.name}</CardTitle>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                            <Github className="h-4 w-4" />
                          </Button>
                          {repo.homepage && (
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <CardDescription className="text-gray-300">
                        {repo.description || "No description available"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {repo.language && (
                            <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                              {repo.language}
                            </Badge>
                          )}
                          <span className="text-sm text-gray-400">⭐ {repo.stargazers_count}</span>
                        </div>
                      </div>
                      {repo.topics && repo.topics.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {repo.topics.slice(0, 3).map((topic) => (
                            <Badge key={topic} variant="outline" className="border-white/20 text-gray-300 text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Audience Selector Modal */}
      <AnimatePresence>
        {showAudienceSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAudienceSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">I'm here as a...</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => startChat("employer")}
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Briefcase className="mr-3 h-5 w-5" />
                  Potential Employer
                </Button>
                <Button
                  onClick={() => startChat("investor")}
                  className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
                >
                  <TrendingUp className="mr-3 h-5 w-5" />
                  Investor
                </Button>
                <Button
                  onClick={() => startChat("general")}
                  className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Code className="mr-3 h-5 w-5" />
                  Fellow Developer
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed bottom-4 right-4 w-80 h-96 bg-slate-800 rounded-lg border border-white/10 shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-semibold text-white">Chat with Me</h3>
              <Button
                onClick={closeChat}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {chatMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.isBot ? "bg-purple-600 text-white" : "bg-gray-600 text-white"
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {showChat && selectedAudience && currentMessageIndex < messageFlows[selectedAudience].length && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-purple-600/50 p-3 rounded-lg text-sm text-white">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      Typing...
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-gray-400">© 2024 Your Name. Built with Next.js & hosted on GitHub Pages.</p>
            <div className="flex gap-4">
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                <Github className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
