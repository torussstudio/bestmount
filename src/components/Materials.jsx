import Container from "./layout/Container"
import Section from "./layout/Section"
import DownButton from "./layout/DownButton"
import Seperator from "./layout/seperator"

export default function Materials() {
  return (
    <>
    <div id="materials">
    <Section className="min-h-[70vh]">
      <Container>
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-10"> */}
          
          {/* Categories */}
          {/* <div className="md:col-span-1">
            <h4 className="mb-4 text-sm uppercase text-gray-400">Categories</h4>
            <ul className="space-y-2">
              <li className="text-yellow-400">High Aluminas</li>
              <li className="text-gray-400">Zircon Based</li>
              <li className="text-gray-400">Silicon Carbides</li>
            </ul>
          </div> */}

          {/* Products */}
          {/* <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="border border-white/10 p-6">
                <h5 className="font-bold">FML73L</h5>
                <p className="text-sm text-gray-400">Alpha Beta Alumina</p>
              </div>
            ))}
          </div>

        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">

          {/* Left label */}
          <div className="md:col-span-3">
            <span className="text-sm uppercase tracking-wider">
              Our Materials
            </span>
          </div>

          {/* Right content */}
          <div className="md:col-span-9 justify-self-end max-w-[560px]">
            <h2 className="text-3xl md:text-4xl font-skoda font-semibold text-yellow-400">
              From Furnace to Function
            </h2>
            <p className="mt-4">
              Our curated portfolio of raw materials combines performance, purity,
              and sustainability, supporting high-temperature manufacturing while
              advancing the collective goal of reducing carbon footprints.
            </p>
            <a href="/BM-SRM-Chart-2026.pdf" target="_blank" download>
              <DownButton className="mt-6">
                Download Full SRM Chart
              </DownButton>
            </a>
          </div>

        </div>
      </Container>
    </Section>
    </div>
    <Container>
      <Seperator />
    </Container>
  </>
  )
}
