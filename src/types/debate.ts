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

export type DebateDetails = {
  debateId: string;
  debateStatus: "running" | "closed";
  iParticipated: boolean;
  mySide: "Support" | "Oppose" | null;
  endsAt: string;
  winnerSide: "Support" | "Oppose" | "Draw";
  scoreBoard: ScoreBoard[];
  arguments: Argument[];
};

export type Argument = {
  id: string;
  content: string;
  side: "Support" | "Oppose";
  voteCount: number;
  user: {
    name: string;
    email: string;
    image: string | null;
  };
  createdAt: string;
};

export type ScoreBoard = {
  name: string;
  email: string;
  image: string | null;
  totalVotes: number;
  side: "Support" | "Oppose";
};

export type LeaderboardUser = {
  name: string;
  image?: string;
  email: string;
  totalVotes: number;
  debatesParticipated: number;
  position: number;
};
