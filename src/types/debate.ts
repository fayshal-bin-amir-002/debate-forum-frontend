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
