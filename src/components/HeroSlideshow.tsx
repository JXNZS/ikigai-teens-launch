import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VolumeX, Volume2, Youtube, ChevronLeft, ChevronRight } from "lucide-react";
import tile1Image from "@/assets/Tile 1 image.png";

const tiles = [
  {
    id: 1,
    content: "Ikigai Teen is a youth resilience and identity initiative focused on helping teenagers navigate the growing challenges of modern adolescence in a hyper-digital world. We work at the intersection of the following:",
    image: tile1Image,
  },
  {
    id: 2,
    content: "Across India and globally, young people today are growing up in an environment of constant stimulation, fragmented attention and increasing emotional overload. While technology has created unprecedented access and opportunity, it has also introduced new challenges related to mental wellbeing, identity formation, digital dependency, loneliness, anxiety and social pressure. Ikigai Teen was created in response to this reality.",
  },
  {
    id: 3,
    content: "Rather than focusing only on academic achievement or performance, we aim to support the development of the whole individual. Our programs and conversations encourage teens to cultivate emotional intelligence, self-regulation, critical thinking, communication skills, healthy digital habits, purpose discovery and values-based leadership.",
  },
  {
    id: 4,
    content: "We believe the future requires more than technical competence. It requires young people who can think independently, act ethically, manage emotions wisely and contribute positively to families, communities and society.",
  },
  {
    id: 5,
    content: "We believe sustainable youth development requires a collaborative ecosystem rather than isolated interventions. Therefore. Ikigai Teen also seeks to build meaningful dialogue between teens, parents, educators, mental health professionals, storytellers, media creators and ethical technology thinkers.",
  },
  {
    id: 6,
    content: "Through podcasts, workshops, surveys, mentorship programs, creative projects, internships, digital content and community initiatives, we aim to create spaces where young people feel seen, heard, guided and empowered. Our long-term vision is to contribute toward a generation of emotionally healthy, socially responsible and purpose-driven young leaders for tomorrow.",
  },
];

const HeroSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tiles.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  // Hide the thumbnail overlay after the video has had time to load and start autoplaying
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 2500);
    return () => clearTimeout(loadTimer);
  }, []);

  // Pause video when it scrolls out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If video is out of viewport and currently playing, pause it
          if (!entry.isIntersecting && isPlaying) {
            if (iframeRef.current && iframeRef.current.contentWindow) {
              iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
                "*"
              );
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.1 } // Trigger when less than 10% visible
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isPlaying]);

  const toggleMute = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const func = isMuted ? "unMute" : "mute";
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: func, args: [] }),
        "*"
      );
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const func = isPlaying ? "pauseVideo" : "playVideo";
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: func, args: [] }),
        "*"
      );
      setIsPlaying(!isPlaying);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % tiles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + tiles.length) % tiles.length);
  };

  return (
    <div className="relative flex flex-col items-center lg:items-end justify-center pt-4 lg:pt-0 gap-3 md:gap-6 w-full">
      {/* Slideshow container */}
      <div className="relative w-full h-[240px] sm:h-[270px] md:h-[350px] lg:h-[370px] max-w-[280px] md:max-w-[320px] mx-auto lg:mr-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col px-6 pt-4 pb-8 sm:px-8 sm:pt-5 sm:pb-10 md:px-10 md:pt-6 md:pb-12 bg-white/10 backdrop-blur-md rounded-2xl border border-[#FCEADE]/50 shadow-xl"
          >
            <div className="w-full h-full flex flex-col justify-start items-center overflow-y-auto no-scrollbar gap-3 text-center">
              <p className="text-[13px] md:text-sm text-white/95 font-medium leading-relaxed font-body">
                {tiles[currentIndex].content}
              </p>
              {tiles[currentIndex].image && (
                <div className="flex-shrink-0 w-full max-w-[160px] mx-auto mt-2">
                  <img
                    src={tiles[currentIndex].image}
                    alt="Tile graphic"
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2.5 z-10">
          {tiles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="w-full max-w-[280px] md:max-w-[320px] mx-auto lg:ml-auto lg:mr-0 flex flex-col gap-2 md:gap-4 mt-1 md:mt-0">
        <h3 className="text-[#FCEADE] font-display font-semibold text-base md:text-xl text-center drop-shadow-md">
          Why IkigaiTeen?
        </h3>
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 bg-black group z-20">

          {/* 
            By positioning the iframe absolutely and scaling its width/height to 150%, 
            we push all of YouTube's native UI (title at the top, YouTube logo at the bottom) 
            completely outside the visible bounds of our overflow-hidden container.
          */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/EFeykHZoAv0?autoplay=1&mute=1&loop=1&playlist=EFeykHZoAv0&enablejsapi=1&controls=0&disablekb=1&fs=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&cc_load_policy=0"
              title="Ikigai Teen YouTube video"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260%] h-[150%]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Cover thumbnail to hide YouTube's initial loading UI (fades out after 2.5s) */}
          <div
            className={`absolute inset-0 z-0 bg-black transition-opacity duration-1000 pointer-events-none ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
          >
            <img
              src="https://img.youtube.com/vi/EFeykHZoAv0/maxresdefault.jpg"
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ALWAYS VISIBLE Mute Button */}
          <div className="absolute top-3 right-3 z-20">
            <button
              onClick={toggleMute}
              className="flex items-center gap-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full px-3 py-1.5 backdrop-blur-sm transition-all shadow-md border border-white/10"
              title={isMuted ? "Unmute video" : "Mute video"}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <>
                  <VolumeX size={14} className="text-red-400" />
                  <span className="text-[10px] md:text-[11px] font-bold tracking-wide uppercase text-white/90 mt-0.5">Tap to unmute</span>
                </>
              ) : (
                <>
                  <Volume2 size={14} className="text-white" />
                  <span className="text-[10px] md:text-[11px] font-bold tracking-wide uppercase text-white/90 mt-0.5">Mute</span>
                </>
              )}
            </button>
          </div>

          {/* Custom Controls Overlay Container (Play/Pause only) */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 pointer-events-none">
            <button
              onClick={togglePlay}
              className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 backdrop-blur-sm transition-all shadow-lg transform hover:scale-105 pointer-events-auto"
              title={isPlaying ? "Pause video" : "Play video"}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              )}
            </button>
          </div>

          {/* ALWAYS VISIBLE YouTube Link */}
          <div className="absolute bottom-3 right-3 z-20">
            <a
              href="https://www.youtube.com/watch?v=EFeykHZoAv0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#CD201F]/90 hover:bg-[#CD201F] text-white text-[10px] md:text-[11px] font-bold px-2.5 py-1.5 rounded flex items-center gap-1.5 backdrop-blur-sm transition-all shadow-md tracking-wide uppercase"
            >
              <Youtube size={14} /> Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlideshow;
