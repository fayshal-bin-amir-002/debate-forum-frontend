import DebateManagement from "@/components/modules/debate-details";
import Container from "@/components/shared/Container";
import { authOptions } from "@/utils/authOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Debate Details | Debate Forum",
  description:
    "View detailed information and arguments of the selected debate.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Debate Details | Debate Forum",
    description:
      "Explore arguments and participate in the debate on Debate Forum.",
    url: "https://debate-forum-bay.vercel.app/debates",
    siteName: "Debate Forum",
  },
};

const DebateDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  return (
    <Container>
      <div className="mt-8 md:mt-10 lg:mt-12">
        <DebateManagement id={id} session={session} />
      </div>
    </Container>
  );
};

export default DebateDetailsPage;
