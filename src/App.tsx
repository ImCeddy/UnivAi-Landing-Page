import { motion } from 'motion/react';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Bot, Clock, Globe, BookOpen, TrendingUp, Heart, Sparkles, Star, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import backgroundImage from 'figma:asset/aeff2f3be86bb15bb31b1014a125470f73baf25c.png';

export default function App() {
  const [showThoughtBubble, setShowThoughtBubble] = useState(false);
  const [robotEyes, setRobotEyes] = useState('normal');

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const hoverAnimationVariants = {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      y: -5,
      transition: { duration: 0.3 }
    }
  };

  const sparkleVariants = {
    initial: { scale: 0, rotate: 0 },
    animate: {
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleRedirectToAI = () => {
    window.location.href = 'https://huggingface.co/spaces/UniversityAIChatbot/UnivAI_Inquiries_Chatbot';
  };

  // Thought bubble effect - 5s duration, every 7s
  useEffect(() => {
    const interval = setInterval(() => {
      setShowThoughtBubble(true);
      setTimeout(() => setShowThoughtBubble(false), 5000);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Robot eye animations
  useEffect(() => {
    const eyeInterval = setInterval(() => {
      const animations = ['normal', 'wink', 'side'];
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      setRobotEyes(randomAnimation);
      
      setTimeout(() => setRobotEyes('normal'), 500);
    }, 4000);

    return () => clearInterval(eyeInterval);
  }, []);

  const RobotEyes = () => {
    switch (robotEyes) {
      case 'wink':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-blue-300 rounded-full animate-pulse" />
              <div className="w-2 h-0.5 bg-blue-300 rounded-full" />
            </div>
          </div>
        );
      case 'side':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-blue-300 rounded-full translate-x-0.5" />
              <div className="w-1 h-1 bg-blue-300 rounded-full translate-x-0.5" />
            </div>
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-blue-300 rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-blue-300 rounded-full animate-pulse" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Minimal Overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Very subtle overlay to maintain readability without changing original colors */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Floating Robot Companion */}
      <motion.div
        className="fixed right-8 top-1/2 z-50 cursor-pointer"
        style={{ transform: 'translateY(-50%)' }}
        onClick={handleRedirectToAI}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Thought Bubble */}
        <motion.div
          className="absolute -top-16 -left-32 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border-2 border-white/50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: showThoughtBubble ? 1 : 0,
            scale: showThoughtBubble ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-gray-800 whitespace-nowrap">Tap me when you're ready! 🤖</p>
          <div className="absolute bottom-0 right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white/95 transform translate-y-full" />
        </motion.div>

        {/* Robot Container */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/40 via-amber-400/40 to-orange-500/40 rounded-full blur-xl animate-pulse" />
          <motion.div 
            className="relative bg-gradient-to-r from-yellow-400/60 via-amber-500/60 to-orange-500/60 backdrop-blur-lg border-2 border-white/40 rounded-full p-4 shadow-2xl"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(251, 191, 36, 0.4)',
                '0 0 40px rgba(251, 191, 36, 0.6)',
                '0 0 20px rgba(251, 191, 36, 0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="relative">
              <Bot className="w-8 h-8 text-white drop-shadow-lg" />
              <RobotEyes />
            </div>
          </motion.div>
        </div>

        {/* Sparkle Effects around Robot */}
        <motion.div
          className="absolute -top-2 -left-2"
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
        </motion.div>
        <motion.div
          className="absolute -bottom-2 -right-2"
          animate={{
            scale: [0, 1, 0],
            rotate: [360, 180, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <Star className="w-3 h-3 text-orange-400" />
        </motion.div>
      </motion.div>

      {/* Header */}
      <motion.header 
        className="relative z-20 bg-gradient-to-r from-white/20 via-white/25 to-white/20 backdrop-blur-lg border-b-2 border-white/30"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-r from-yellow-400/60 via-amber-500/60 to-orange-500/60 backdrop-blur-lg border-2 border-white/40 rounded-full p-2 shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-white font-bold text-xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                UnivAI
              </h1>
            </motion.div>
            <motion.nav 
              className="hidden md:flex space-x-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.a 
                href="#about" 
                className="text-white hover:text-amber-300 transition-colors font-medium"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                About
              </motion.a>
              <motion.a 
                href="#features" 
                className="text-white hover:text-amber-300 transition-colors font-medium"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                Features
              </motion.a>
              <motion.a 
                href="#roadmap" 
                className="text-white hover:text-amber-300 transition-colors font-medium"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                Roadmap
              </motion.a>
              <motion.a 
                href="#feedback" 
                className="text-white hover:text-amber-300 transition-colors font-medium"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                Feedback
              </motion.a>
            </motion.nav>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <motion.div 
          className="container mx-auto px-6 py-12 pr-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl mb-8 text-white drop-shadow-2xl max-w-6xl mx-auto font-bold leading-tight"
              style={{
                WebkitTextStroke: '2px rgba(0, 0, 0, 0.8)',
                textShadow: '3px 3px 6px rgba(0, 0, 0, 1), 1px 1px 3px rgba(0, 0, 0, 0.8)'
              }}
              variants={itemVariants}
            >
              <div className="flex flex-col items-center">
                <span className="block">Welcome to the University</span>
                <span className="block -mt-2">Inquiries AI Chatbot</span>
              </div>
            </motion.h1>

            <motion.div 
              className="max-w-4xl mx-auto mb-10"
              variants={itemVariants}
            >
              <motion.div
                variants={hoverAnimationVariants}
                initial="initial"
                whileHover="hover"
              >
                <Card className="bg-gradient-to-r from-white/25 via-white/30 to-white/25 backdrop-blur-lg border-2 border-white/40 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                  <div className="p-8 relative">
                    <p className="text-white leading-relaxed font-medium" 
                       style={{ 
                         textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 0.6)' 
                       }}>
                      This AI project is designed to provide students with immediate and accurate answers to common questions related to university services. It covers a wide range of topics, including admissions, courses, campus facilities, faculty details, and much more. Essentially, it aims to serve as a digital assistant to answer queries that you would typically find in the university handbook.
                    </p>
                    <motion.div 
                      className="mt-6 p-4 bg-gradient-to-r from-amber-200/40 to-orange-200/40 rounded-lg border-2 border-amber-300/60 relative group"
                      variants={hoverAnimationVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      <motion.div
                        className="absolute top-2 right-2"
                        variants={sparkleVariants}
                        initial="initial"
                        whileHover="animate"
                      >
                        <Sparkles className="w-4 h-4 text-amber-600" />
                      </motion.div>
                      <p className="text-white font-medium" 
                         style={{ 
                           textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 0.6)' 
                         }}>
                        <strong>Note:</strong> This project is still in its developmental stages. Like any AI system, UnivAI may occasionally make mistakes or fail to answer specific queries accurately. It is continuously evolving and improving, and your feedback plays a critical role in that process.
                      </p>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* About This Project Section */}
          <motion.div 
            id="about"
            className="mb-16"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl mb-8 text-center relative font-bold leading-tight text-white"
              style={{
                WebkitTextStroke: '2px rgba(0, 0, 0, 0.8)',
                textShadow: '3px 3px 6px rgba(0, 0, 0, 1), 1px 1px 3px rgba(0, 0, 0, 0.8)'
              }}
              variants={itemVariants}
            >
              <motion.div
                className="absolute -top-2 -right-2"
                variants={sparkleVariants}
                initial="initial"
                animate="animate"
              >
                <Star className="w-5 h-5 text-red-500" />
              </motion.div>
              <div className="flex flex-col items-center">
                <span className="block">About This</span>
                <span className="block -mt-2">Project</span>
              </div>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Limited Content */}
              <motion.div 
                variants={itemVariants}
                variants={hoverAnimationVariants}
                initial="initial"
                whileHover="hover"
              >
                <Card className="bg-gradient-to-r from-white/25 via-white/30 to-white/25 backdrop-blur-lg border-2 border-white/40 shadow-xl hover:bg-white/35 hover:border-white/50 transition-all duration-300 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="p-6 relative">
                    <div className="flex items-center mb-4">
                      <motion.div 
                        className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-2 mr-3 shadow-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <BookOpen className="w-5 h-5 text-white" />
                      </motion.div>
                      <h3 className="text-white font-bold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>Limited Content</h3>
                      <Badge className="ml-auto bg-amber-500/60 text-white border-2 border-amber-600/60 font-semibold shadow-sm">
                        2019 Handbook
                      </Badge>
                    </div>
                    <p className="text-white font-medium" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                      Currently, UnivAI relies on a proposed 2019 PUP Handbook as its primary source of information, supplemented by user feedback. While this provides a solid foundation, it means that the AI's knowledge is limited to these sources. However, we can easily add new information as it becomes available.
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* English Only */}
              <motion.div 
                variants={itemVariants}
                variants={hoverAnimationVariants}
                initial="initial"
                whileHover="hover"
              >
                <Card className="bg-gradient-to-r from-white/25 via-white/30 to-white/25 backdrop-blur-lg border-2 border-white/40 shadow-xl hover:bg-white/35 hover:border-white/50 transition-all duration-300 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="p-6 relative">
                    <div className="flex items-center mb-4">
                      <motion.div 
                        className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-2 mr-3 shadow-lg"
                        whileHover={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Globe className="w-5 h-5 text-white" />
                      </motion.div>
                      <h3 className="text-white font-bold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>English Only</h3>
                      <Badge className="ml-auto bg-orange-500/60 text-white border-2 border-orange-600/60 font-semibold shadow-sm">
                        Hardware Limits
                      </Badge>
                    </div>
                    <p className="text-white font-medium" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                      Due to hardware limitations, the AI is currently only available in English. My laptop is not powerful enough to support additional features. Multiple Language Feature may never be available.
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* PUP-Only Queries */}
              <motion.div 
                variants={itemVariants}
                variants={hoverAnimationVariants}
                initial="initial"
                whileHover="hover"
              >
                <Card className="bg-gradient-to-r from-white/25 via-white/30 to-white/25 backdrop-blur-lg border-2 border-white/40 shadow-xl hover:bg-white/35 hover:border-white/50 transition-all duration-300 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="p-6 relative">
                    <div className="flex items-center mb-4">
                      <motion.div 
                        className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg p-2 mr-3 shadow-lg"
                        whileHover={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Bot className="w-5 h-5 text-white" />
                      </motion.div>
                      <h3 className="text-white font-bold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>PUP-Only Queries</h3>
                      <Badge className="ml-auto bg-gradient-to-r from-yellow-500/60 to-amber-500/60 text-white border-2 border-yellow-600/60 font-semibold shadow-sm">
                        Specialized
                      </Badge>
                    </div>
                    <p className="text-white font-medium" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                      UnivAI is designed to answer questions related to PUP (Polytechnic University of the Philippines) only. It does not handle general queries outside of the university context, as answering broader questions would require more computational power. Also, we already have ChatGPT for that.
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Sleeping AI */}
              <motion.div 
                variants={itemVariants}
                variants={hoverAnimationVariants}
                initial="initial"
                whileHover="hover"
              >
                <Card className="bg-gradient-to-r from-white/25 via-white/30 to-white/25 backdrop-blur-lg border-2 border-white/40 shadow-xl hover:bg-white/35 hover:border-white/50 transition-all duration-300 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="p-6 relative">
                    <div className="flex items-center mb-4">
                      <motion.div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-2 mr-3 shadow-lg"
                        whileHover={{ rotate: [0, 360] }}
                        transition={{ duration: 1 }}
                      >
                        <Clock className="w-5 h-5 text-white" />
                      </motion.div>
                      <h3 className="text-white font-bold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>Sleeping AI</h3>
                      <motion.div
                        whileHover={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.5, repeat: 3 }}
                      >
                        <Badge className="ml-auto bg-green-500/60 text-white border-2 border-green-600/60 font-semibold shadow-sm">
                          5min Wake-up
                        </Badge>
                      </motion.div>
                    </div>
                    <p className="text-white font-medium" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                      As a free service hosted on a shared server, UnivAI has a limited uptime. When not in use, the server may "sleep" or shut down to save resources. This means that the AI is not available 24/7 unless I upgrade to a paid server. If you encounter a delay (about 5 minutes), it's likely because the AI is "waking up" after a period of inactivity.
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Feature Roadmap */}
          <motion.div 
            id="roadmap"
            className="mb-16"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl mb-8 text-center relative font-bold leading-tight text-white"
              style={{
                WebkitTextStroke: '2px rgba(0, 0, 0, 0.8)',
                textShadow: '3px 3px 6px rgba(0, 0, 0, 1), 1px 1px 3px rgba(0, 0, 0, 0.8)'
              }}
              variants={itemVariants}
            >
              <motion.div
                className="absolute -top-2 -left-2"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-5 h-5 text-orange-500" />
              </motion.div>
              <div className="flex flex-col items-center">
                <span className="block">Feature</span>
                <span className="block -mt-2">Roadmap</span>
              </div>
            </motion.h2>

            <motion.div 
              variants={itemVariants}
              variants={hoverAnimationVariants}
              initial="initial"
              whileHover="hover"
            >
              <Card className="bg-gradient-to-r from-white/25 via-white/30 to-white/25 backdrop-blur-lg border-2 border-white/40 shadow-xl hover:bg-white/35 hover:border-white/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="p-8 relative">
                  <div className="flex items-start">
                    <motion.div 
                      className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg p-3 mr-4 flex-shrink-0 shadow-lg"
                      whileHover={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <TrendingUp className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-white mb-3 font-bold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>Dashboard Integration</h3>
                      <p className="text-white font-medium" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                        A dashboard will be added that connects to the official PUP Facebook pages, bringing all relevant updates and information into one central location. The AI will analyze these posts in real-time and store them in its database for instant access.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Developer Message */}
          <motion.div 
            className="mb-16"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl mb-8 text-center relative font-bold leading-tight text-white"
              style={{
                WebkitTextStroke: '2px rgba(0, 0, 0, 0.8)',
                textShadow: '3px 3px 6px rgba(0, 0, 0, 1), 1px 1px 3px rgba(0, 0, 0, 0.8)'
              }}
              variants={itemVariants}
            >
              <motion.div
                className="absolute -top-2 right-0"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-5 h-5 text-red-500" />
              </motion.div>
              <div className="flex flex-col items-center">
                <span className="block">A Message from</span>
                <span className="block -mt-2">the Developer</span>
              </div>
            </motion.h2>

            <motion.div 
              variants={itemVariants}
              variants={hoverAnimationVariants}
              initial="initial"
              whileHover="hover"
            >
              <Card className="bg-gradient-to-r from-white/25 via-white/30 to-white/25 backdrop-blur-lg border-2 border-white/40 shadow-xl hover:bg-white/35 hover:border-white/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="p-8 relative">
                  <div className="flex items-start">
                    <motion.div 
                      className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg p-3 mr-4 flex-shrink-0 shadow-lg"
                      whileHover={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Heart className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-white leading-relaxed font-medium" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                        I may not be able to dedicate time for updates on the project in the near future, as I'm currently focusing on other projects. However, I'm eager to hear your feedback so that I can fine-tune the AI and make it more useful for all users. Thank you for your support and for helping this AI grow!
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Feedback Call to Action */}
          <motion.div 
            id="feedback"
            className="text-center mb-16"
            variants={itemVariants}
          >
            <motion.div
              variants={hoverAnimationVariants}
              initial="initial"
              whileHover="hover"
            >
              <Card className="bg-gradient-to-r from-white/25 via-white/30 to-white/25 backdrop-blur-lg border-2 border-white/40 shadow-xl hover:bg-white/35 hover:border-white/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="p-8 relative">
                  <motion.h3 
                    className="text-white mb-4 font-bold" 
                    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
                    whileHover={{ y: [0, -2, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    Help Us Improve
                  </motion.h3>
                  <p className="text-white mb-6 max-w-2xl mx-auto font-medium" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                    To help us improve the AI's performance, we kindly ask that you provide feedback after each interaction. Simply give a thumbs up or thumbs down based on whether the AI's response was relevant and helpful.
                  </p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer 
        className="relative z-20 bg-gradient-to-r from-white/20 via-white/25 to-white/20 backdrop-blur-lg border-t-2 border-white/30 mt-auto"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {/* Brand Section */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-yellow-400/60 via-amber-500/60 to-orange-500/60 backdrop-blur-lg border-2 border-white/40 rounded-full p-2 shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                  UnivAI
                </h3>
              </div>
              <p className="text-white/80 font-medium leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)' }}>
                Your intelligent university companion for PUP-related inquiries and academic support.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-white/80 hover:text-amber-300 transition-colors font-medium" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)' }}>
                    About Project
                  </a>
                </li>
                <li>
                  <a href="#roadmap" className="text-white/80 hover:text-amber-300 transition-colors font-medium" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)' }}>
                    Roadmap
                  </a>
                </li>
                <li>
                  <a href="#feedback" className="text-white/80 hover:text-amber-300 transition-colors font-medium" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)' }}>
                    Feedback
                  </a>
                </li>
                <li>
                  <a href="https://huggingface.co/spaces/UniversityAIChatbot/UnivAi" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-amber-300 transition-colors font-medium" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)' }}>
                    Try UnivAI
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Project Info */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                Project Status
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/80 font-medium" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)' }}>
                    Active Development
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-white/80 font-medium" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)' }}>
                    Beta Version
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-white/80 font-medium" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)' }}>
                    PUP Students Only
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Copyright Section */}
          <motion.div 
            className="border-t border-white/20 pt-6 text-center"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-white/70 font-medium" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)' }}>
              © 2024 UnivAI - University Inquiries AI Chatbot. Developed for PUP Students.
            </p>
            <div className="flex justify-center items-center space-x-4 mt-2">
              <span className="text-white/60 font-medium" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)' }}>
                Built with
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-400" />
              </motion.div>
              <span className="text-white/60 font-medium" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)' }}>
                for PUP Community
              </span>
            </div>
          </motion.div>
        </div>
      </motion.footer>

      {/* Floating Elements for Visual Appeal */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-amber-300/20 to-yellow-300/20 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-full blur-xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Additional Floating Particles */}
        <motion.div
          className="absolute top-1/3 left-20 w-16 h-16 bg-gradient-to-r from-amber-300/25 to-orange-300/25 rounded-full blur-lg"
          animate={{
            x: [0, 30, 0],
            y: [0, 25, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-20 w-20 h-20 bg-gradient-to-r from-green-300/25 to-emerald-300/25 rounded-full blur-lg"
          animate={{
            x: [0, 35, 0],
            y: [0, -20, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Sparkle Effects */}
        <motion.div
          className="absolute top-1/4 left-1/4"
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-8 h-8 text-amber-400/60" />
        </motion.div>
        <motion.div
          className="absolute top-3/4 left-1/4"
          animate={{
            scale: [0, 1, 0],
            rotate: [360, 180, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Star className="w-6 h-6 text-orange-400/60" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/2"
          animate={{
            scale: [0, 1, 0],
            rotate: [0, -180, -360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <Zap className="w-7 h-7 text-yellow-400/60" />
        </motion.div>
      </div>
    </div>
  );
}
