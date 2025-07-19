import LeaderBoardManagement from "@/components/modules/learder-board";
import Container from "@/components/shared/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard | Debate Forum",
  description:
    "Check out the top debaters and their scores in the Debate Forum.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Leaderboard | Debate Forum",
    description: "See the highest scoring participants in the Debate Forum.",
    url: "https://debate-forum-bay.vercel.app/leaderboard",
    siteName: "Debate Forum",
  },
};

const LeaderBoardPage = () => {
  return (
    <Container>
      <div className="mt-8 md:mt-10 lg:mt-12">
        <LeaderBoardManagement />
      </div>
    </Container>
  );
};

export default LeaderBoardPage;
