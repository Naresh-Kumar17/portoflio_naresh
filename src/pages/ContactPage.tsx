import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, CheckCircle2, AlertCircle, MapPin, ExternalLink } from 'lucide-react';
import { ScrollReveal, StaggerItem } from '../components/ScrollReveal';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { TextReveal } from '../components/TextReveal';
import { useI18n } from '../contexts/I18nContext';
import { profile } from '../data/profile';
import { sanitizeText, sanitizeHeader, validateEmail, checkRateLimit } from '../utils/security';
import './ContactPage.css';

export function ContactPage() {
  const { t } = useI18n();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Hidden bot trap field
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 1. Honeypot check: If a bot filled out the hidden field, drop quietly
    if (formState.honeypot) {
      setStatus('success');
      return;
    }

    // 2. Client-side rate limiting: Max 3 submissions per minute
    const rateCheck = checkRateLimit('contact_form', 3, 60000);
    if (!rateCheck.allowed) {
      setStatus('error');
      setErrorMessage(`Rate limit reached. Please wait ${rateCheck.remainingCooldownSec}s before sending another message.`);
      return;
    }

    // 3. Required fields validation
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // 4. Strict email format validation
    const emailResult = validateEmail(formState.email);
    if (!emailResult.isValid) {
      setStatus('error');
      setErrorMessage('Please enter a valid, well-formed email address.');
      return;
    }

    // 5. Input sanitization & bounds enforcement (prepared for backend webhook or API dispatch)
    const _sanitizedPayload = {
      name: sanitizeText(formState.name, 100),
      email: emailResult.sanitized,
      subject: sanitizeHeader(formState.subject || 'Portfolio Inquiry', 150),
      message: sanitizeText(formState.message, 3000),
    };
    void _sanitizedPayload;

    setStatus('submitting');

    // Simulate honest submission with sanitized values
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '', honeypot: '' });
    }, 1000);
  };

  const mailtoHref = `mailto:${profile.contact.email || 'your-email@example.com'}?subject=${encodeURIComponent(
    sanitizeHeader(formState.subject) || 'Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    `Hello ${profile.name},\n\n${sanitizeText(formState.message, 2000)}\n\nFrom: ${sanitizeText(formState.name, 100)} (${validateEmail(formState.email).sanitized})`
  )}`;

  return (
    <main className="page contact-page">
      <div className="container">
        <ScrollReveal variant="blur">
          <div className="section__header">
            <span className="section__label">{t('contact.title')}</span>
            <TextReveal text={t('contact.subtitle')} as="h1" className="section__title" />
            <motion.p
              className="section__subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 120, damping: 18 }}
            >
              Have a question about my projects, research interests, or collaboration opportunities? Feel free to reach out.
            </motion.p>
          </div>
        </ScrollReveal>

        <div className="contact-grid">
          {/* Info Card */}
          <ScrollReveal delay={100} variant="slide" direction="left">
            <div className="contact-info-card card">
              <h2 className="contact-info__title">Let's Connect</h2>
              <p className="contact-info__desc">
                I'm always open to discussing data science challenges, university projects, open source initiatives, and internship opportunities.
              </p>

              <ScrollReveal staggerChildren={80} className="contact-detail-items">
                <StaggerItem direction="left">
                  <motion.div
                    className="contact-detail-item"
                    whileHover={{ x: 6, backgroundColor: 'var(--bg-tertiary)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className="contact-detail-icon"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                    >
                      <MapPin size={20} />
                    </motion.div>
                    <div>
                      <span className="contact-detail-label">Location</span>
                      <p className="contact-detail-val">
                        FAST-NUCES Karachi, Shah Latif Town, Karachi, Pakistan
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>

                <StaggerItem direction="left">
                  <motion.div
                    className="contact-detail-item"
                    whileHover={{ x: 6, backgroundColor: 'var(--bg-tertiary)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className="contact-detail-icon"
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                    >
                      <Mail size={20} />
                    </motion.div>
                    <div>
                      <span className="contact-detail-label">Direct Email</span>
                      {profile.contact.email ? (
                        <a href={`mailto:${profile.contact.email}`} className="contact-detail-val contact-link">
                          {profile.contact.email}
                        </a>
                      ) : (
                        <p className="contact-detail-val text-muted">
                          Configurable in src/data/profile.ts
                        </p>
                      )}
                    </div>
                  </motion.div>
                </StaggerItem>
              </ScrollReveal>

              {/* Social Channels */}
              <div className="contact-socials">
                <span className="contact-socials__title">Professional Profiles</span>
                <div className="contact-socials__links">
                  {profile.contact.github && (
                    <motion.a
                      href={profile.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-btn"
                      whileHover={{ scale: 1.08, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <GithubIcon size={18} />
                      <span>GitHub</span>
                    </motion.a>
                  )}
                  {profile.contact.linkedin && (
                    <motion.a
                      href={profile.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-btn"
                      whileHover={{ scale: 1.08, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <LinkedinIcon size={18} />
                      <span>LinkedIn</span>
                    </motion.a>
                  )}
                  <motion.a
                    href="https://nu.edu.pk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-btn"
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <ExternalLink size={18} />
                    <span>FAST-NUCES Portal</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal delay={150} variant="slide" direction="right">
            <div className="contact-form-wrap card">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    className="contact-success-state"
                  >
                    <motion.div
                      className="contact-success-icon"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.2 }}
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>
                    <motion.h3
                      className="contact-success-title"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Message Received!
                    </motion.h3>
                    <motion.p
                      className="contact-success-desc"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </motion.p>
                    <motion.button
                      type="button"
                      className="btn btn--outline"
                      onClick={() => setStatus('idle')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="contact-form"
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div
                          className="contact-alert alert alert--error"
                          role="alert"
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        >
                          <AlertCircle size={18} />
                          <span>{errorMessage || t('contact.error')}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Anti-bot Honeypot field (hidden from legitimate users) */}
                    <div style={{ position: 'absolute', opacity: 0, zIndex: -1, width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                      <label htmlFor="hp_field">Do not fill this field</label>
                      <input
                        id="hp_field"
                        type="text"
                        name="hp_field"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formState.honeypot}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, honeypot: e.target.value })}
                      />
                    </div>

                    {[
                      { id: 'contact-name', label: t('contact.name'), type: 'text', required: true, placeholder: 'Jane Doe', field: 'name' as const, maxLength: 100 },
                      { id: 'contact-email', label: t('contact.email'), type: 'email', required: true, placeholder: 'jane@example.com', field: 'email' as const, maxLength: 100 },
                      { id: 'contact-subject', label: 'Subject', type: 'text', required: false, placeholder: 'Project inquiry or question', field: 'subject' as const, maxLength: 150 },
                    ].map((input, idx) => (
                      <motion.div
                        key={input.id}
                        className="form-group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 150,
                          damping: 18,
                          delay: idx * 0.08,
                        }}
                      >
                        <label htmlFor={input.id} className="form-label">
                          {input.label} {input.required && <span className="text-error">*</span>}
                        </label>
                        <motion.input
                          id={input.id}
                          type={input.type}
                          required={input.required}
                          maxLength={input.maxLength}
                          placeholder={input.placeholder}
                          value={formState[input.field]}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, [input.field]: e.target.value })}
                          className="form-input"
                          whileFocus={{ boxShadow: '0 0 0 2px var(--accent-primary), 0 0 20px rgba(139,92,246,0.1)' }}
                        />
                      </motion.div>
                    ))}

                    <motion.div
                      className="form-group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 150,
                        damping: 18,
                        delay: 0.24,
                      }}
                    >
                      <label htmlFor="contact-message" className="form-label">
                        {t('contact.message')} <span className="text-error">*</span>
                      </label>
                      <motion.textarea
                        id="contact-message"
                        required
                        rows={5}
                        maxLength={3000}
                        placeholder="Write your message here..."
                        value={formState.message}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormState({ ...formState, message: e.target.value })}
                        className="form-input form-textarea"
                        whileFocus={{ boxShadow: '0 0 0 2px var(--accent-primary), 0 0 20px rgba(139,92,246,0.1)' }}
                      />
                    </motion.div>

                    <motion.div
                      className="form-submit-row"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.32 }}
                    >
                      <motion.button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="btn btn--primary"
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        {status === 'submitting' ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Send size={16} />
                          </motion.div>
                        ) : (
                          <Send size={16} />
                        )}
                        <span>{status === 'submitting' ? t('contact.sending') : t('contact.send')}</span>
                      </motion.button>

                      <a href={mailtoHref} className="contact-fallback-link">
                        {t('contact.emailFallback')}
                      </a>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
