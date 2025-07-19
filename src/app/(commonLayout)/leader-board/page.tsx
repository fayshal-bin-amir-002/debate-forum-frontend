import LeaderBoardManagement from "@/components/modules/learder-board";
import Container from "@/components/shared/Container";

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
