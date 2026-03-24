import Header from "../components/Header";
import Container from "../components/layout/Container";
import PrimaryButton from "../components/layout/PrimaryButton";
import Section from "../components/layout/Section";
import Seperator from "../components/layout/seperator";
import { FiArrowUpRight } from "react-icons/fi";

const ContactBackground = ({ children }) => (
    <div className="relative">
      <div
        className="
          absolute inset-0
          bg-[url('/connect-bg.webp')]
          bg-cover bg-center bg-no-repeat
        "
      />
      <div className="absolute inset-0 bg-black/0" /> 
        <div className="relative z-10">{children}</div>
        </div>
  );

export default function Contact() {
  return (
    <>
    <ContactBackground>
      <Header />
        <Section className="min-h-screen flex items-center">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10">
                    {/* Row 1: Heading */}
                    <div className="md:col-span-12">
                        <h1 className="text-5xl md:text-7xl font-skoda-expanded text-yellow-400 text-center font-thin leading-[0.95]">
                        Forging <br /> Better Bonds<sup className="contact-reg">&trade;</sup>
                        </h1>
                        <p className="text-3xl md:text-4xl mt-10 text-center text-white font-thin">
                            We believe progress is built together.
                        </p>
                        <p className="max-w-xl mt-6 text-center leading-tight">Reach out to explore sustainable raw materials, partnerships, or collaborations that add real value.</p>
                        <div className="text-center mt-10">
                        <PrimaryButton scrollTo="contact-form" offset={100}>
                        Get in Touch
                        </PrimaryButton>
                        
                        {/* <PrimaryButton href="https://calendly.com/demo">
                        Book a Call
                        </PrimaryButton> */}

                        {/* <PrimaryButton to="/contact">
                        Contact Us
                        </PrimaryButton> */}

                        </div>
                    </div>
                </div>
            </Container>
        </Section>
        <Container>
            <Seperator />
        </Container>
        <Section>
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">
                        {/* Left label */}
                        <div className="md:col-span-3">
                            <span className="text-sm uppercase tracking-wider text-white">
                            Let's Connect
                            </span>
                        </div>

                        {/* Right content */}
                        <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
                            <h2 className="text-3xl md:text-4xl font-skoda font-normal text-yellow-400">
                            Let’s Work Together to Drive Positive Change
                            </h2>
                            <p className="mt-4 ">
                            Reach out to discover how our sustainable raw materials can strengthen your processes and support your goals.
                            </p>
                            <p className="mt-4">
                            At Best Mountain, every partnership begins with trust, clarity, and shared purpose — because great outcomes start with the right connections.
                            </p>
                        </div>
                        <div className="md:col-span-12 pt-10">
                            <p className="text-2xl sm:text-4xl md:text-6xl font-thin leading-tight">
                            Transparent in process. Genuine in connection. Continuous in purpose.
                            </p>
                        </div>
                    </div>

                    
                </Container>
            </Section>
            <Container>
                <Seperator />
            </Container>
            <Section>
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">
                        {/* Left label */}
                        <div className="md:col-span-3">
                            <span className="text-sm uppercase tracking-wider text-white">
                            Contact us
                            </span>
                        </div>

                        {/* Right content */}
                        <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
                            <h2 className="text-3xl md:text-4xl font-skoda font-normal text-yellow-400">
                            Let’s Start a Conversation
                            </h2>
                            <div className="mt-15">
                                <p className="uppercase font-3xl ">email</p>
                                <a href="mailto:materials@bm-materials.com"><p className=" font-2xl hover:text-yellow-400 transition font-">materials@bm-materials.com</p></a>
                                <div className="mt-8"></div>
                                <p className="uppercase font-3xl ">call</p>
                                <a href="tel:+85228367022"><p className="hover:text-yellow-400 transition font-2xl font-">+852 2836 7022</p></a>
                                <div className="mt-8"></div>
                                <p className="uppercase font-3xl ">address</p>
                                <a href="https://maps.app.goo.gl/EhwF6ozjPwb8xKbE6" target="_blank" rel="noopener noreferrer"><p className="hover:text-yellow-400 transition font-2xl capitalize font-">Unit C, 5F, Kee Shing Centre, No 74-76 Kimberley Road Tsim Sha Tsui, Kowloon, Hong Kong S.A.R.</p></a>
                            </div>
                        </div>
                    </div>
                </Container>
                <Container className="mt-20">
                    <div className="flex justify-center" id="contact-form">
                    <div className="w-full max-w-6xl p-2 pt-6 pb-6 md:p-12 bg-white/5 backdrop-blur-md border border-white/0 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.6)]">
                        <h2 className="text-center text-3xl md:text-4xl font-skoda font-normal">
                        Get in touch with us today.
                        </h2>

                        <form className="mt-10 space-y-6 max-w-2xl mx-auto">
                        <div className="space-y-1">
                            <input
                            type="text"
                            placeholder="Name"
                            className="w-full bg-transparent border border-white/30 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:border-[#eee8cd] transition"
                            />
                        </div>

                        <div className="space-y-1">
                            <input
                            type="text"
                            placeholder="Company / Organization"
                            className="w-full bg-transparent border border-white/30 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:border-[#eee8cd] transition"
                            />
                        </div>

                        <div className="space-y-1">
                            <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-transparent border border-white/30 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:border-[#eee8cd] transition"
                            />
                        </div>

                        <div className="space-y-1">
                            <textarea
                            rows="4"
                            placeholder="Message"
                            className="w-full bg-transparent border border-white/30 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:border-[#eee8cd] transition"
                            />
                        </div>

                        <div className="flex justify-center pt-4">
                            <button
                            type="submit"
                            className="cursor-pointer group inline-flex items-center gap-3 rounded-full border border-white/0 bg-white/10 backdrop-blur-lg px-8 py-3 text-white transition hover:scale-[1.03]"
                            >
                            <span className="inline-flex text-white transition-transform duration-300 ease-out group-hover:rotate-45">
                                <FiArrowUpRight className="w-5 h-5 flex-shrink-0" />
                            </span>
                            <span className="font-normal">Send Message</span>
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>
                </Container>
            </Section>
            
            
      </ContactBackground>
    </>
  );
}