import Header from "../components/Header";
import CTA from "../components/CTA";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Seperator from "../components/layout/seperator";
import arrowRight from "../assets/images/arrow-right.png";
import reliabilityIcon from "../assets/images/reliability.png";
import sustainabilityIcon from "../assets/images/sustainability.png";
import valueIcon from "../assets/images/value.png";
import continuityIcon from "../assets/images/continuity.png";

const AboutBackground = ({ children }) => (
    <div className="relative">
      <div
        className="
          absolute inset-0
          bg-[url('/about-bg.webp')]
          bg-cover bg-center bg-no-repeat
        "
      />
      <div className="absolute inset-0 bg-black/0" /> 
      <div className="relative z-10">{children}</div>
    </div>
  );

export default function About() {
  return (
    <>
    <AboutBackground>
      <Header />
        <Section className="min-h-screen flex items-center">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10">
                    {/* Row 1: Heading */}
                    <div className="md:col-span-12">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl text-yellow-400 uppercase font-skoda-expanded leading-[0.95]">
                        Where purpose
                        <br />
                        takes form.
                        </h1>
                    </div>

                    {/* Row 2: Arrow + text, aligned to the right/end */}
                    <div className="col-span-12">
                        <div className="grid grid-cols-12 items-start gap-x-0 md:gap-x-8 md:justify-items-end">
                        <div className="hidden lg:block col-span-2 md:col-start-6 flex justify-end pt-2">
                            <img src={arrowRight} alt="" className="w-15 h-10 object-contain" />
                        </div>

                        <div className="col-span-12 md:col-span-4">
                            <p className="  leading-relaxed pt-4">
                            At Best Mountain, every raw material reflects responsibility, performance,
                            and value. We connect industries with sustainable materials — streamlined
                            for efficiency and built for lasting reliability.
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
        <Section className="min-h-screen">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-start">
                {/* Left images */}
                {/* Left images - 2x2 grid */}
                    <div className="md:col-span-5">
                        <div className="grid grid-cols-2 gap-0 w-full max-w-[450px] aspect-square">
                            {/* Position 1: Top-left - Glass square */}
                            <div className="bg-white/10 border border-white/0 backdrop-blur-md" />
                            
                            {/* Position 2: Top-right - Empty */}
                            <div />
                            
                            {/* Position 3: Bottom-left - Empty */}
                            <div />
                            
                            {/* Position 4: Bottom-right - Glass square */}
                            <div className="bg-white/10 border border-white/0 backdrop-blur-md" />
                        </div>
                    </div>

                {/* Right content */}
                <div className="md:col-span-7 md:pl-10">
                    <span className="text-xs uppercase tracking-[0.25em] ">
                    Our Story
                    </span>

                    <h2 className="mt-5 text-3xl md:text-5xl font-skoda font-semibold text-yellow-400 max-w-xl">
                    Grounded in Origin,
                    <br />
                    Guided by Responsibility
                    </h2>

                    <p className="mt-6 leading-relaxed max-w-md">
                    Our journey began in the world of glass and high-temperature materials.
                    Through decades of sourcing and supply, we've grown into a trusted partner
                    for industries seeking balance between production and sustainability.
                    Each connection we build is rooted in clarity, trust, and long-term value —
                    the very principles that shaped our foundation.
                    </p>
                </div>

                {/* Big quote */}
                <div className="md:col-span-12 pt-10">
                <p className="text-2xl sm:text-4xl md:text-6xl font-thin leading-tight">
                    Rooted in integrity, refined through time, and guided by responsibility.
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
                            <span className="text-sm uppercase tracking-wider ">
                            what we stand for
                            </span>
                        </div>

                        {/* Right content */}
                        <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
                            <h2 className="text-3xl md:text-4xl font-skoda font-normal text-yellow-400">
                            Performance with Purpose
                            </h2>
                            <p className="mt-4">
                             We streamline material supply to help industries operate
                             smarter, cleaner, and more consistently. Our focus remains 
                             on functionality, reliability, and measurable impact — 
                             because the strength of a system lies not in its complexity,
                              but in how seamlessly it works.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-0 w-full mt-15 md:mt-20 mx-auto">
                        {/* Row 1 */}
                        {/* Position 1: Top-left - Reliability */}
                        <div className="relative bg-white/10 backdrop-blur-md flex flex-col items-center justify-center p-8 max-md:p-4 gap-4 aspect-square group">
                            {/* Edge glow - rim light effect */}
                            <div className="absolute inset-0 ring-1 ring-white/30 blur-[0.5px] opacity-60"></div>
                            
                            {/* Hover glow - only appears on hover */}
                            <div className="absolute inset-0 bg-white/5 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            
                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <img src={reliabilityIcon} alt="Reliability" className="w-20 h-20 md:w-32 md:h-32 object-contain" />
                                <span className="text-white text-xl md:text-2xl font-thin">
                                    Reliability
                                </span>
                            </div>
                        </div>
                        
                        {/* Position 2: Top - Empty */}
                        <div className="aspect-square hidden md:block"></div>
                        
                        {/* Position 3: Top - Value */}
                        <div className="relative bg-white/10 backdrop-blur-md flex flex-col items-center justify-center p-8 max-md:p-4 gap-4 aspect-square group">
                            <div className="absolute inset-0 ring-1 ring-white/30 blur-[0.5px] opacity-60"></div>
                            <div className="absolute inset-0 bg-white/5 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <img src={valueIcon} alt="Value" className="w-20 h-20 md:w-32 md:h-32 object-contain" />
                                <span className="text-white text-xl md:text-2xl font-thin">
                                    Value
                                </span>
                            </div>
                        </div>
                        
                        {/* Position 4: Top-right - Empty */}
                        <div className="aspect-square hidden md:block"></div>
                        
                        {/* Row 2 */}
                        {/* Position 1: Bottom-left - Empty */}
                        <div className="aspect-square hidden md:block"></div>
                        
                        {/* Position 2: Bottom - Sustainability */}
                        <div className="relative bg-white/10 backdrop-blur-md flex flex-col items-center justify-center p-8 max-md:p-4 gap-4 aspect-square group">
                            <div className="absolute inset-0 ring-1 ring-white/30 blur-[0.5px] opacity-60"></div>
                            <div className="absolute inset-0 bg-white/5 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <img src={sustainabilityIcon} alt="Sustainability" className="w-20 h-20 md:w-32 md:h-32 object-contain" />
                                <span className="text-white text-xl md:text-2xl font-thin">
                                    Sustainability
                                </span>
                            </div>
                        </div>
                        
                        {/* Position 3: Bottom - Empty */}
                        <div className="aspect-square hidden md:block"></div>
                        
                        {/* Position 4: Bottom-right - Continuity */}
                        <div className="relative bg-white/10 backdrop-blur-md flex flex-col items-center justify-center p-8 max-md:p-4 gap-4 aspect-square group">
                            <div className="absolute inset-0 ring-1 ring-white/30 blur-[0.5px] opacity-60"></div>
                            <div className="absolute inset-0 bg-white/5 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <img src={continuityIcon} alt="Continuity" className="w-20 h-20 md:w-32 md:h-32 object-contain" />
                                <span className="text-white text-xl md:text-2xl font-thin">
                                    Continuity
                                </span>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
            <Section className="min-h-screen">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">
                        <div className="md:col-span-8 pt-0 md:pt-28">
                            <span className="text-xs uppercase tracking-widest">
                                Our Philosophy
                            </span>

                            <h2 className="mt-5 text-3xl md:text-5xl font-skoda font-semibold text-yellow-400 max-w-xl">
                                Streamlined Systems.
                                <br />
                                Sustainable Results.
                            </h2>

                            <p className="mt-6 leading-relaxed max-w-md">
                                Every process we follow — from sourcing to supply is designed to stay transparent and purposeful.
                                By combining material expertise with sustainable thinking, we support industries in creating progress that endures beyond production cycles.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>
      </AboutBackground>
      <CTA />
    </>
  );
}