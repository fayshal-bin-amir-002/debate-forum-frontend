export interface IDebate {
  id: string;
  title: string;
  authorName: string;
  authorEmail: string;
  authorImage: string | null;
  category: string;
  duration: number;
  tags: string[];
  voteCount: number;
  status: "Running" | "Ended";
}

export type DebateDetailsRunning = {
  debateStatus: "running";
  iParticipated: boolean;
  mySide: "Support" | "Oppose" | null;
  endsAt: string;
  arguments: {
    id: string;
    content: string;
    side: "Support" | "Oppose";
    voteCount: number;
    user: {
      name: string;
      email: string;
      image: string | null;
    };
  }[];
};

export type DebateDetailsClosed = {
  debateStatus: "closed";
  iParticipated: boolean;
  mySide: "Support" | "Oppose" | null;
  winnerSide: "Support" | "Oppose" | "Draw";
  scoreBoard: {
    name: string;
    email: string;
    image: string | null;
    totalVotes: number;
  }[];
};

export type DebateDetails = DebateDetailsRunning | DebateDetailsClosed;
