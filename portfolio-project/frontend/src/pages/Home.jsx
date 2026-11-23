import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ServicesSection from '../sections/ServicesSection';
import SkillsSection from '../sections/SkillsSection';
import ProjectsSection from '../sections/ProjectsSection';
import ExperienceSection from '../sections/ExperienceSection';
import EducationSection from '../sections/EducationSection';
import CertificationsSection from '../sections/CertificationsSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import Toast from '../components/Toast';
import { api } from '../services/api';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: 'info' });
    }, 4000);
  };

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const [projRes, skillRes, expRes, eduRes, certRes] = await Promise.allSettled([
          api.getProjects(),
          api.getSkills(),
          api.getExperience(),
          api.getEducation(),
          api.getCertifications()
        ]);

        if (projRes.status === 'fulfilled' && projRes.value?.data) {
          setProjects(projRes.value.data);
        }
        if (skillRes.status === 'fulfilled' && skillRes.value?.data) {
          setSkills(skillRes.value.data);
        }
        if (expRes.status === 'fulfilled' && expRes.value?.data) {
          setExperience(expRes.value.data);
        }
        if (eduRes.status === 'fulfilled' && eduRes.value?.data) {
          setEducation(eduRes.value.data);
        }
        if (certRes.status === 'fulfilled' && certRes.value?.data) {
          setCertifications(certRes.value.data);
        }
      } catch (err) {
        console.error('Error fetching portfolio data from backend:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolioData();
  }, []);

  return (
    <div className="portfolio-app">
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection skills={skills} experience={experience} education={education} />
        <ServicesSection />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experience={experience} />
        <EducationSection education={education} />
        <CertificationsSection certifications={certifications} />
        <ContactSection onShowToast={showToast} />
      </main>

      <Footer />
      <ScrollToTop />

      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'info' })}
        />
      )}
    </div>
  );
}

