import DebateManagement from "@/components/modules/debate-details";
import Container from "@/components/shared/Container";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

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
