import Container from "./layout/Container"
import Section from "./layout/Section"
import CtaButton from "./layout/CtaButton"

export default function CTA() {
  return (
    <>
    <Section className="bg-[url('/cta-bg.webp')] bg-cover bg-center bg-no-repeat relative pb-0">
      <Container className="pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-y-6 md:gap-x-12">
          {/* Left label */}
          <div className="md:col-span-3 flex flex-col justify-between items-start h-full">
            <span className="text-sm uppercase tracking-wider text-black">
              Get in touch
            </span>
            <div  className="hidden lg:block">
            <a href="/BestMountain-SRM-Chart-2026.pdf" target="_blank" download>
              <CtaButton>
                Download Full SRM Chart
              </CtaButton>
              </a>
            </div>
          </div>

          {/* Right content */}
          <div className="md:col-span-9 md:justify-self-end max-w-[560px] px-2 md:px-0">
            <h2 className="text-[30px] sm:text-3xl lg:text-4xl font-skoda font-semibold text-black leading-[1.15] md:leading-tight text-balance md:text-wrap pr-4 md:pr-0">
              Let's Build the Better future together
            </h2>
            <p className="mt-6 md:mt-4 text-[15px] sm:text-base text-black leading-relaxed max-w-[95%] md:max-w-none">
            Looking for sustainable raw materials for your industry? Get in touch with us to discuss your requirements or request a custom quote.
            </p>
            <div className="block lg:hidden mt-10 md:mt-8 text-left">
            <a href="/BM-SRM-Chart-2026.pdf" target="_blank" download className="inline-block">
              <CtaButton>
                Download Full SRM Chart
              </CtaButton>
              </a>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col-reverse justify-center items-center text-center md:flex-row md:justify-between md:text-left gap-y-3 pb-8 md:pb-6 mt-10 md:mt-4 border-t border-black/10 pt-6">
          <p className="text-[11px] sm:text-xs text-black/70">
            © Best Mountain. All rights reserved.
          </p>
          <p className="text-[11px] sm:text-xs text-black/70">
            Designed by <a href="https://toruss.studio" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-black transition-colors">Toruss</a>
          </p>
        </div>
      </Container>
    </Section>
    </>
  )
}