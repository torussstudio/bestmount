import { useEffect } from "react";
import Header from "../components/Header";
import Materials from "../components/Materials";
import CTA from "../components/CTA";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import PrimaryButton from "../components/layout/PrimaryButton";
import Seperator from "../components/layout/seperator";
import HashLink from "../components/HashLink";

const HomeBackground = ({ children }) => (
  <div className="relative">
    <div
      className="
        absolute inset-0
        bg-[url('/home-bg.webp')]
        bg-cover bg-[position:45%_10%] md:bg-center bg-no-repeat
      "
    />
    <div className="absolute inset-0 bg-black/0" /> 
    <div className="relative z-10">{children}</div>
  </div>
);

export default function Home() {
  return (
    <>
      <HomeBackground>
        <Header />
        
        {/* Hero section */}
        <Section className="min-h-[85svh] md:min-h-screen flex items-center pt-24 pb-16 md:py-0 relative overflow-hidden">
          <Container>
            <div className="flex flex-col items-start justify-center w-full max-w-full">
              <h1 className="text-[22px] min-[360px]:text-[26px] min-[400px]:text-3xl sm:text-4xl md:text-6xl leading-[1.1] md:leading-[1.15] font-skoda-expanded text-yellow-400 w-full whitespace-normal break-words pr-2">
                Sustainable Raw Materials, Perfectly Streamlined<sup className="hero-reg">&trade;</sup>.
              </h1>

              <p className="mt-5 md:mt-6 text-[15px] sm:text-base md:text-lg max-w-2xl leading-relaxed">
                Discover sustainable raw materials that integrate functionality,
                value, and responsibility—shaping the present and advancing the future.
              </p>

              <HashLink to="/#materials" offset={100} className="mt-8 md:mt-10 inline-block">
                <PrimaryButton>Explore Our Materials</PrimaryButton>
              </HashLink>
            </div>
          </Container>
        </Section>
        
        <Container>
          <Seperator />
        </Container>
        
        <Materials />
        
        {/* About section */}
        <Section className="min-h-[75vh]">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">
              {/* Left label */}
              <div className="md:col-span-3">
                <span className="text-sm uppercase tracking-wider ">
                  About Us
                </span>
              </div>

              {/* Right content */}
              <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
                <h2 className="text-3xl md:text-4xl font-skoda font-semibold text-yellow-400">
                  From Glass to Growth
                </h2>
                <p className="mt-4">
                  Best Mountain specializes in sourcing, processing and supplying sustainable raw materials for industries worldwide. 
                  Rooted in the strength of glass and glass fiber furnaces, our materials powers ceramics, refractories and other specialty 
                  industrial applications
                </p>
              </div>
              <div className="md:col-span-12 mt-15">
                <p className="text-3xl md:text-7xl font-thin">Sustainable sourcing, reliable supply, and long-term partnerships.</p>
              </div>
            </div>
          </Container>
        </Section>
      </HomeBackground>
      <CTA />
    </>
  );
}