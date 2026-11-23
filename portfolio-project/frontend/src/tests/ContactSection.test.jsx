import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactSection from '../sections/ContactSection';
import { describe, it, expect, vi } from 'vitest';
import { api } from '../services/api';

vi.mock('../services/api', () => ({
  api: {
    submitContact: vi.fn().mockResolvedValue({ success: true, message: 'Message sent!' })
  }
}));

describe('ContactSection Component', () => {
  it('displays form inputs and validates required fields on empty submit', async () => {
    render(<ContactSection />);

    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitBtn);

    // Should display validation errors
    expect(await screen.findByText(/Please provide your name/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please provide a valid email/i)).toBeInTheDocument();
  });

  it('submits form with valid data and calls api.submitContact', async () => {
    const showToastMock = vi.fn();
    render(<ContactSection onShowToast={showToastMock} />);

    fireEvent.change(screen.getByPlaceholderText(/Sarah Jenkins/i), { target: { value: 'Sarah Jenkins' } });
    fireEvent.change(screen.getByPlaceholderText(/sarah@company.com/i), { target: { value: 'sarah@company.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Internship Inquiry/i), { target: { value: 'Software Engineer Internship' } });
    fireEvent.change(screen.getByPlaceholderText(/Tell me about the role/i), {
      target: { value: 'We would love to interview you for our team next Monday!' }
    });

    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.submitContact).toHaveBeenCalledWith({
        name: 'Sarah Jenkins',
        email: 'sarah@company.com',
        subject: 'Software Engineer Internship',
        message: 'We would love to interview you for our team next Monday!'
      });
    });
  });
});

