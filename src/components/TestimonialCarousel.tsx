import { useEffect, useRef, useState } from "react";
import Conrad from "@/assets/Conrad.jpeg";
import Patrizia from "@/assets/Patrizia.jpeg";
import Kumar from "@/assets/Kumar.jpeg";
import Howard from "@/assets/Howard.jpeg";
import Manivannan from "@/assets/Manivannan.jpeg";
import Sunil from "@/assets/sunil.jpeg";
import Archana from "@/assets/Archana.jpeg";
import Reshma from "@/assets/Reshma.jpeg";
import Dilip from "@/assets/Dilip.jpeg";
import TextToSpeechButton from "@/components/TextToSpeechButton";

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
      "I have worked with Irene for 7 years while she managed the design and delivery of projects with the Indian Red Cross Society across 4 states in India. Her work with children- preschoolers, high schoolers and youth made significant contributions to healthier and safer growing years for young people. \nShe stood out for her commitment, professionalism, community engagement and integrity. I wish her latest endeavour for teenagers the very best",
    name: "Conrad Sauvé",
    title: "CEO, Canadian Red Cross | Ottawa",
    img: Conrad,
    imgPosition: "50% 30%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote:
      "What I valued about Irene as a colleague was her integrity and depth of engagement. Irene combined thoughtful leadership with strong interpersonal skills and a grounded professional approach. Her work with staff and beneficiaries reflected both competence and care. \nShe worked well with both senior and young team members, and beneficiaries always maintaining and ensuring respectful and collaborative relationships. What stood out most was her authenticity, ethical clarity, and her sincere commitment to creating meaningful and responsible connection and impact through her work. It would be a renewed pleasure to see her ace in her new profile as the Founder of Ikigai Teen.",
    name: "Patrizia Coppola",
    title: "Giove, Italy — Former IFRC National Society Development Delegate",
    img: Patrizia,
    imgPosition: "50% 5%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote:
      "I had the opportunity to work with Irene on several community and school initiatives, and I deeply appreciated her people-centred approach to leadership. \nShe brings sincerity, accountability, and emotional intelligence into every project she handles. What sets Irene apart is her ability to lead with both head and heart. She listens actively, takes ownership of outcomes, and ensures that team members feel supported throughout.\nHer engagement with children and youth was especially thoughtful and respectful. Irene consistently created environments where young people felt heard, valued, and safe to express themselves. She has a natural ability to build trust and encourage participation, even among the most hesitant voices. i wish her all the Best for the new Project.",
    name: "Dr. Kumar V.L.S",
    title:
      "Master Trainer-Disaster Management and First Aid. \nNational & South Aisa Regional Disaster Response Team\nIndian Red Cross Society",
    img: Kumar,
    imgPosition: "50% -80%",
    imgScale: 1.4,
    imgAlign: "left",
  },
  {
    quote:
      "In my capacity as Canadian Red Cross Head of Delegation for India, Irene served as the delegation's Program Manager, including on school- and community-based initiatives focused on children and youth development. She brought a rare balance of professionalism, empathy, and ethical clarity to her work, consistently earning trust through her authenticity and maturity. \nIrene possesses a natural ability to connect meaningfully with students, educators, and teams alike, ensuring program delivery is always grounded in sincere care and genuine human sensitivity.",
    name: "Howard Arfin",
    title: "Canada",
    img: Howard,
    imgPosition: "50% 28%",
    imgScale: 0.85,
    imgAlign: "left",
  },
  {
    quote:
      "I had the opportunity to work with Irene when I joined the Canadian Red Cross in 2011, where she oversaw the CRC programmes. What stood out to me was her unwavering focus on the well-being of children and young people, and how she consistently guided the team to keep this at the centre of our work.\nIrene brings a strong balance of clarity, empathy, and intentionality into her practice. She connects naturally with both youth and adults, creating spaces where young people feel safe, heard, and respected. At the same time, she is thoughtful and reflective, often looking beyond surface behaviours to understand deeper needs.\nI have always appreciated her grounded leadership and her commitment to meaningful and responsible work. I am confident that through IKIGAI TEEN, she will continue to create impactful spaces that support and empower young people.",
    name: "Manivannan P",
    title: "Centre Director — Trans Family Services, Singapore",
    img: Manivannan,
    imgPosition: "50% 30%",
    imgScale: 1.4,
    imgAlign: "left",
  },
  {
    quote:
      "I’ve known Irene Arathi since our younger years, and she has always been thoughtful, adventurous, and unafraid to challenge the status quo. She listens deeply, asks the right questions, and brings clarity to complex situations. \nDuring some of the most challenging periods of my life, she was the person I turned to for perspective, grounding, and honest guidance. Her passion for nurturing younger generations and helping people navigate life with integrity has profoundly shaped who I am today. The work she does now feels like a natural continuation of who she has always been.",
    name: "Sunil Kumar Raja",
    title: "Australia",
    img: Sunil,
    imgPosition: "50% 30%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote:
      "I've known Irene since 1993 from college for her passion about small things that mattered to each friend in every way. She has always been curious to question why or what made one think a certain way. Over the years some of her words stayed with me and made a very strong impact on my decision making when stuck with a personal issues in life. \nShe has influenced me by saying 'staying strong with patience and a strong mind is the the best in the hardest of times no matter what the situation was. She continues to be a great support through thick & thin day/night - 33 years since. I am proud as she is giving her all to what she believes in - making a difference in lives of teens through Ikigai Teen.",
    name: "Archana Jayaprasad",
    title: "Chicago",
    img: Archana,
    imgPosition: "50% 20%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote:
      "I’ve known Irene Arathi in her teaching capacity since my teenage years, and I remember her as someone who was very lively, in the moment always, thoughtful, expressive and very easy to talk to, naturally inclined to engage deeply with people and ideas.\nShe always listened, questioned, and tried to bring clarity to conversations. Very proud to have known her and inspired by her initiatives in making a better world for our future generations to come. It is an exhilarating experience to know how she has integrated her learnings and experiences for the upliftment of society and especially teens in this crucial age.",
    name: "Reshma KV",
    title: "Client Operations Delivery Analyst — Cisco Systems Pvt Ltd",
    img: Reshma,
    imgPosition: "50% 20%",
    imgScale: 1,
    imgAlign: "left",
  },
  {
    quote:
      "It is truly inspiring to see the Ikigai Teen vision taking shape into a meaningful platform for children, youth, and families. During my association with the Indian Red Cross Society, Karnataka State Branch, I had the opportunity to receive guidance and mentorship from Irene which I continue to value deeply.\nHer mentoring abilities, especially for working with children and youth, are truly exemplary and reflect great empathy, patience, and professionalism. I have always admired the sincerity, ethical clarity, and human-centred approach she brings into every initiative. I am sure Ikigai Teen Hub will become a trusted and impactful space that positively influences many young lives and families.",
    name: "Dilip C.S",
    title: "Entrepreneur | Co-Founder, Kalpamrutha",
    img: Dilip,
    imgPosition: "50% 0%",
    imgScale: 1,
    imgAlign: "left",
  },
];

const TestimonialSlide = ({ testimonial }: { testimonial: Testimonial }) => {
  const contentRef = useRef<HTMLElement>(null);

  return (
    <div className="min-w-full flex-shrink-0 flex justify-center px-1.5 sm:px-3 md:px-4">
      <article
        ref={contentRef}
        className="relative w-full max-w-[calc(100vw-3.5rem)] md:max-w-4xl bg-card rounded-lg md:rounded-2xl border border-border/60 p-4 sm:p-6 md:p-10 min-h-[320px] md:min-h-[400px] flex flex-col justify-center"
      >
        <TextToSpeechButton targetRef={contentRef} label={`Read testimonial from ${testimonial.name}`} />
        <div
          className={`flex flex-col md:flex-row items-start gap-4 md:gap-8 ${
            testimonial.imgAlign === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          <div
            className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-2xl overflow-hidden"
            style={{ borderRadius: '0.75rem' }}
          >
            <img
              src={testimonial.img}
              alt={testimonial.name}
              className="w-full h-full object-cover rounded-xl"
              style={{
                objectPosition: testimonial.imgPosition ?? "50% 30%",
                transform: `scale(${testimonial.imgScale ?? 1})`,
                transition: "transform 300ms ease",
                borderRadius: '0.5rem',
              }}
            />
          </div>
          <div className="text-[12px] sm:text-sm md:text-base leading-relaxed text-left">
            <div className="text-foreground mb-3 md:mb-5 whitespace-pre-line italic">“{testimonial.quote}”</div>
            <div className="space-y-0.5">
              <p className="font-semibold text-primary">{testimonial.name}</p>
              {testimonial.title && <p className="text-xs md:text-sm text-muted-foreground whitespace-pre-line">{testimonial.title}</p>}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

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
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">What People Say</h2>

        <div className="relative overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: "transform 700ms ease-in-out",
            }}
          >
            {testimonials.map((testimonial) => (
              <TestimonialSlide key={testimonial.name} testimonial={testimonial} />
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
