import CreateDebateForm from "@/components/modules/createDebate";
import Container from "@/components/shared/Container";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

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
