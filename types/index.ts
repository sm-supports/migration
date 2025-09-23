export interface Project {
  id: number;
  title: string;
  description: string;
  category?: string;
  technologies?: string[];
  tags?: string[];
  image: string;
  video: string;
  rating?: number;
  href: string;
}

export interface MeetingData {
  name: string;
  email: string;
  company?: string;
  message: string;
  date: Date;
  timeSlot: string;
  timezone?: string;
}
