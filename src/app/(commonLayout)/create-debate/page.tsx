import CreateDebateForm from "@/components/modules/createDebate";
import Container from "@/components/shared/Container";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Debate | Debate Forum",
  description:
    "Create a new debate and share your thoughts with the community.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Create Debate | Debate Forum",
    description: "Start a new debate and invite others to participate.",
    url: "https://debate-forum-bay.vercel.app/create-debate",
    siteName: "Debate Forum",
  },
};

const CreateDebatePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Container>
      <div className="my-8 md:my-10 lg:my-12">
        <CreateDebateForm session={session} />
      </div>
    </Container>
  );
};

export default CreateDebatePage;
