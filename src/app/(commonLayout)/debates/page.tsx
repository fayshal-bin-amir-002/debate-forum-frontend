import DebatesPageManagement from "@/components/modules/debates";
import Container from "@/components/shared/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Debates | Debate Forum",
  description:
    "Browse all ongoing and past debates on the Debate Forum. Engage with diverse topics and share your perspective.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Explore Debates | Debate Forum",
    description:
      "Discover and participate in a wide range of debates. Stay informed, join conversations, and voice your opinion.",
    url: "https://debate-forum-bay.vercel.app/debates",
    siteName: "Debate Forum",
  },
};

const DebatesPage = () => {
  return (
    <Container>
      <DebatesPageManagement />
    </Container>
  );
};

export default DebatesPage;
