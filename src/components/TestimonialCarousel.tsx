import { useEffect, useRef, useState } from "react";
import Conrad from "@/assets/Conrad.jpeg";
import Patrizia from "@/assets/Patrizia.jpeg";
import Kumar from "@/assets/Kumar.jpeg";
import Howard from "@/assets/Howard.jpeg";
import Manivannan from "@/assets/Manivannan.jpeg";
import Sunil from "@/assets/sunil.jpeg";
import Archana from "@/assets/Archana.jpeg";
import Reshma from "@/assets/Reshma.jpeg";

type Testimonial = {
  quote: string;
  name: string;
  title?: string;
  img: string;
  imgPosition?: string; // object-position for the image
  imgScale?: number; // image scale for zooming
  imgAlign?: "left" | "right" | "center"; // image placement
};

const testimonials: Testimonial[] = [
  {
    quote:
      "I have worked with Irene for 7 years while she managed the design and delivery of projects with the Indian Red Cross Society across 4 states in India. Her work with children- preschoolers, high schoolers and youth made significant contributions to healthier and safer growing years for young people. She stood out for her commitment, professionalism, community engagement and integrity. I wish her latest endeavour for teenagers the very best",
    name: "Conrad Sauvé",
    title: "CEO, Canadian Red Cross | Ottawa",
    img: Conrad,
    imgPosition: "50% 30%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote:
      "What I valued about Irene as a colleague was her integrity and depth of engagement. Irene combined thoughtful leadership with strong interpersonal skills and a grounded professional approach. Her work with staff and beneficiaries reflected both competence and care. It would be a renewed pleasure to see her ace in her new profile as the Founder of Ikigai Teen.",
    name: "Patrizia Coppola",
    title: "Giove, Italy — Former IFRC National Society Development Delegate",
    img: Patrizia,
    imgPosition: "50% 5%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote:
      "I had the opportunity to work with Irene on several community and school initiatives, and I deeply appreciated her people-centred approach to leadership. She brings sincerity, accountability, and emotional intelligence into every project she handles. Her engagement with children and youth was especially thoughtful and respectful.",
    name: "Dr. Kumar V.L.S",
    title:
      "Master Trainer-Disaster Management and First Aid — Indian Red Cross Society",
    img: Kumar,
    imgPosition: "50% 30%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote:
      "In my capacity as Canadian Red Cross Head of Delegation for India, Irene served as the delegation's Program Manager. She brought a rare balance of professionalism, empathy, and ethical clarity to her work, consistently earning trust through her authenticity and maturity.",
    name: "Howard Arfin",
    title: "Canada",
    img: Howard,
    imgPosition: "50% 30%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote:
      "I had the opportunity to work with Irene when I joined the Canadian Red Cross in 2011... I have always appreciated her grounded leadership and her commitment to meaningful and responsible work.",
    name: "Manivannan P",
    title: "Centre Director — Trans Family Services, Singapore",
    img: Manivannan,
    imgPosition: "50% 30%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote:
      "I’ve known Irene Arathi since our younger years... Her passion for nurturing younger generations and helping people navigate life with integrity has profoundly shaped who I am today.",
    name: "Sunil Kumar Raja",
    title: "Australia",
    img: Sunil,
    imgPosition: "50% 30%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote:
      "I've known Irene since 1993 from college... She continues to be a great support through thick & thin day/night - 33 years since. I am proud as she is giving her all to what she believes in - making a difference in lives of teens through Ikigai Teen.",
    name: "Archie (ArchanaJayaprasad)",
    title: "Chicago",
    img: Archana,
    imgPosition: "50% 30%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote:
      "I’ve known Irene Arathi in her teaching capacity since my teenage years... Very proud to have known her and inspired by her initiatives in making a better world for our future generations to come.",
    name: "Reshma KV",
    title: "Client Operations Delivery Analyst — Cisco Systems Pvt Ltd",
    img: Reshma,
    imgPosition: "50% 30%",
    imgScale: 1,
    imgAlign: "left",
  },
];

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // advance every 7 seconds
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 7000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">What People Say</h2>

        <div className="relative overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: "transform 700ms ease-in-out",
            }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="min-w-full flex-shrink-0 flex justify-center px-1.5 sm:px-3 md:px-4">
                <article className="w-full max-w-[calc(100vw-3.5rem)] sm:max-w-[calc(100vw-1.5rem)] md:max-w-2xl bg-white rounded-2xl shadow-lg p-3 sm:p-5 md:p-8 border border-[#2C423F]/30 min-h-[280px] sm:min-h-[160px]">
                  <div
                    className={`flex flex-col md:flex-row items-start gap-2.5 md:gap-4 ${
                      t.imgAlign === "right" ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="flex-shrink-0" style={{ width: "64px", height: "64px" }}>
                      <img
                        src={t.img}
                        alt={t.name}
                        className="w-18 h-18 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover"
                        style={{
                          objectPosition: t.imgPosition ?? "50% 30%",
                          transform: `scale(${t.imgScale ?? 1})`,
                          transition: "transform 300ms ease",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                    <div className="text-[11px] sm:text-sm md:text-base leading-relaxed">
                      <p className="text-foreground mb-1.5 md:mb-3">“{t.quote}”</p>
                      <p className="font-semibold">{t.name}</p>
                      {t.title && <p className="text-sm text-muted-foreground">{t.title}</p>}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className={`w-3 h-3 rounded-full transition-colors duration-200 focus:outline-none ${
                  i === index
                    ? "bg-[#2C423F]"
                    : "bg-white/70 border border-[#2C423F]/10 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
