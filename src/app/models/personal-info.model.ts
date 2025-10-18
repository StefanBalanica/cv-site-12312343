export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  location: string;
  profileImage: string;
  cvUrl: string;
  about: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}
