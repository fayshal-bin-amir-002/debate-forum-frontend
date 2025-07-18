import HeroSection from "@/components/modules/Home/HeroSection/HeroSection";
import { HowItWorks } from "@/components/modules/Home/HowItWorks/HowItWorks";
import Container from "@/components/shared/Container";

export default function Home() {
  return (
    <Container>
      <HeroSection />
      <HowItWorks />
    </Container>
  );
}
