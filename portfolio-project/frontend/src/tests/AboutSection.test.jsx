import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AboutSection from '../sections/AboutSection';
import { describe, it, expect } from 'vitest';

const mockSkills = [
  { id: 1, name: 'React.js', category: 'Frontend Development', proficiency: 95 }
];

const mockExperience = [
  { id: 1, role: 'Software Engineer Intern', organization: 'CloudWave', start_date: 'May 2024', end_date: 'August 2024', location: 'Remote' }
];

const mockEducation = [
  { id: 1, degree: 'B.Tech CSE', institution: 'NIT', start_year: '2022', end_year: '2026', grade_or_gpa: '8.9' }
];

describe('AboutSection Component with Tabbed Switcher', () => {
  it('renders about section and allows tab switching', async () => {
    render(
      <AboutSection
        skills={mockSkills}
        experience={mockExperience}
        education={mockEducation}
      />
    );

    // Initial tab is skills
    expect(screen.getByText('Skills Overview')).toBeInTheDocument();
    expect(screen.getByText(/React.js \(95%\)/i)).toBeInTheDocument();

    // Click Experience tab
    const expTab = screen.getByText('Experience / Internships');
    fireEvent.click(expTab);
    await waitFor(() => {
      expect(screen.getByText(/Software Engineer Intern/i)).toBeInTheDocument();
    });

    // Click Education tab
    const eduTab = screen.getByText('Education');
    fireEvent.click(eduTab);
    await waitFor(() => {
      expect(screen.getByText('B.Tech CSE')).toBeInTheDocument();
    });
  });
});
