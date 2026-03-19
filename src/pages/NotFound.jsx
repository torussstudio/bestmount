import Header from "../components/Header";
import CTA from "../components/CTA";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import PrimaryButton from "../components/layout/PrimaryButton";

const PageBackground = ({ children }) => (
  <div className="relative">
    <div
      className="
        absolute inset-0
        bg-[url('/home-bg.webp')]
        bg-cover bg-center bg-no-repeat
      "
    />
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative z-10">{children}</div>
  </div>
);

export default function NotFound() {
  return (
    <>
      <PageBackground>
        <Header />

        <Section className="min-h-screen flex items-center">
          <Container>
            <div className="max-w-2xl">
              <span className="text-sm uppercase tracking-wider block mb-6">
                Error
              </span>

              <h1 className="text-[8rem] md:text-[12rem] font-skoda-expanded text-yellow-400 leading-none">
                404
              </h1>

              <h2 className="text-2xl md:text-4xl font-skoda font-semibold mt-4">
                Page Not Found
              </h2>

              <p className="mt-6 max-w-lg">
                The page you're looking for doesn't exist or has been moved.
                Let's get you back on track.
              </p>

              <div className="mt-10">
                <PrimaryButton to="/">Back to Home</PrimaryButton>
              </div>
            </div>
          </Container>
        </Section>
      </PageBackground>

      <CTA />
    </>
  );
}
