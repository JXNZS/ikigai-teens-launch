export type VideoItem = {
  title: string;
  youtubeUrl: string;
  episode: number;
};

export const videos: VideoItem[] = [
  { title: "12 Life Changing Lessons from Ray Dalio's Book for Teens", youtubeUrl: "https://youtu.be/PwrJGFv8oeo?si=xQRAJQnUdWOQqVmq", episode: 1 },
  { title: "12 Principles for teenagers from the book PRINCIPLES by Ray Dalio - Part 2", youtubeUrl: "https://youtu.be/2rxZhtrpweE?si=GQEEss344vFfbSKD", episode: 2 },
  { title: "Why Parents MATTER Most During Teenage Years", youtubeUrl: "https://youtu.be/sTM-BV_fEAI?si=9Xgc8NVBj58Cxzg7", episode: 3 },
  { title: "Why Your Teen Doesn't Think Like You (Yet!) Hosted by Irene Arathi", youtubeUrl: "https://youtu.be/XSNZpwD_c9g?si=Q1XYx0U8xcA8mSRd", episode: 4 },
  { title: "The #1 Reason Your Teen's Social Media Use Is Ruining Their Life", youtubeUrl: "https://youtu.be/dGFtDvGTKt4?si=89_Bj3Yz-qsPoc_0", episode: 5 },
  { title: "The Silent Struggles: Helping Teens Navigate Anxiety, Stress & Self-Esteem", youtubeUrl: "https://youtu.be/vSaAOwzaop8?si=BYoiD82O7ZVN4l4A", episode: 6 },
  { title: "Identity, Belonging & Peer Pressure: How Parents Can Help Teens Stay True to Themselves", youtubeUrl: "https://youtu.be/GW1wz68pcC8?si=lV9z7GSeTGzSCHOe", episode: 7 },
  { title: "Why Teens Stop Talking: The Power of Listening to Reconnect and Rebuild Trust", youtubeUrl: "https://youtu.be/yqe2nFh00hk?si=1JFymUCiYJY6oRzp", episode: 8 },
  { title: "Mistakes, Failures, and Second Chances: Helping Teens Turn Setbacks into Strengths", youtubeUrl: "https://youtu.be/p054fZtEQO0?si=HuGI-yWEGucv4ngK", episode: 9 },
  { title: "Building Teen Confidence & Resilience | How Parents Can Help Teens Grow Stronger After Failure", youtubeUrl: "https://youtu.be/m09ily-jMx8?si=1ZhXZm2O1UKMZFrA", episode: 10 },
  { title: "Parent Self-Check: Am I Helping or Hindering? | Ikigai Teen Podcast with Irene Arathi", youtubeUrl: "https://youtu.be/sc6FyLkca0E?si=1Q94bhDxgTK13mMn", episode: 11 },
  { title: "From Awareness to Action: The Conscious Parenting Roadmap With Ikigai Teen", youtubeUrl: "https://youtu.be/Tx9wTEdtEiE?si=IzqUEE8WYF79hpis", episode: 12 },
];

export const getYoutubeThumbnail = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
  const id = match?.[1];
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
};
