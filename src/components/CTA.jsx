import Container from "./layout/Container"
import Section from "./layout/Section"
import CtaButton from "./layout/CtaButton"

export default function CTA() {
  return (
    <>
    <Section className="bg-[url('/cta-bg.webp')] bg-cover bg-center bg-no-repeat relative pb-0">
      <Container className="pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">
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
          <div className="md:col-span-9 justify-self-end max-w-[560px]">
            <h2 className="text-3xl md:text-4xl font-skoda font-semibold text-black">
              Let's Build the Better future together
            </h2>
            <p className="mt-4 text-black">
            Looking for sustainable raw materials for your industry? Get in touch with us to discuss your requirements or request a custom quote.
            </p>
            <div className="block lg:hidden mt-5">
            <a href="/BM-SRM-Chart-2026.pdf" target="_blank" download>
              <CtaButton>
                Download Full SRM Chart
              </CtaButton>
              </a>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className="grid grid-cols-12 md:grid-cols-12 gap-y-6 md:gap-x-12 pb-1">
          <div className="col-span-8 md:col-span-6 ">
            <p className="text-xs text-black">
              © Best Mountain. All rights reserved.
            </p>
          </div>
          <div className="col-span-4 md:col-span-6">
            <p className="text-xs text-black text-right">
              Designed by <a href="https://toruss.studio" target="_blank" rel="noopener noreferrer">Toruss</a>
            </p>
          </div>
        </div>
      </Container>
    </Section>
    </>
  )
}