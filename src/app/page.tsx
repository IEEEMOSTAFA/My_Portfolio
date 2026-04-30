import AboutSection from "@/components/sections/AboutSection"
import ContactSection from "@/components/sections/ContactSection"
import HeroSection from "@/components/sections/HeroSection"
import MyResume from "@/components/sections/MyResume"
import ProjectsSection from "@/components/sections/ProjectsSection"

export default function HomePage() {
  return (
    <div>
      <HeroSection></HeroSection>
      <AboutSection></AboutSection>
      <ProjectsSection></ProjectsSection>
      <MyResume></MyResume>
      <ContactSection></ContactSection>
     
    </div>
  );
}