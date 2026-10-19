/**
 * Security & Sanitization Utilities
 * 
 * Provides defensive protections against Cross-Site Scripting (XSS),
 * Header/CRLF Injection, Buffer Overflow, and Automated Spam Flooding.
 */

/**
 * Escapes potentially dangerous characters to prevent HTML/XSS injection.
 */
export function sanitizeText(input: string, maxLength = 2000): string {
  if (typeof input !== 'string') return '';
  
  // Truncate to maximum permissible length to prevent memory/payload attacks
  const truncated = input.slice(0, maxLength);

  // Remove null bytes and non-printable control characters safely
  // eslint-disable-next-line no-control-regex
  const cleaned = truncated.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Escape HTML entities to prevent script injection when rendered or echoed
  return cleaned
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Strips carriage returns and newlines to prevent email CRLF / header injection.
 */
export function sanitizeHeader(input: string, maxLength = 120): string {
  if (typeof input !== 'string') return '';
  return input
    .slice(0, maxLength)
    .replace(/[\r\n\t]/g, ' ')
    .replace(/[<>'"&]/g, '')
    .trim();
}

/**
 * Validates and sanitizes email address according to RFC-compatible defensive patterns.
 */
export function validateEmail(email: string): { isValid: boolean; sanitized: string } {
  if (typeof email !== 'string') return { isValid: false, sanitized: '' };

  const trimmed = email.trim().toLowerCase().slice(0, 100);

  // Strict email regex: disallow control characters, angle brackets, quotes, spaces
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const isValid = emailRegex.test(trimmed);
  return {
    isValid,
    sanitized: trimmed.replace(/[<>"'`;]/g, ''),
  };
}

/**
 * Client-Side Rate Limiter using Web Storage.
 * Restricts spam bursts and rapid automated bot requests.
 * 
 * @param actionKey Unique identifier for the action (e.g. 'contact_form')
 * @param maxRequests Maximum allowable submissions in window
 * @param windowMs Time window in milliseconds (default: 60,000 ms = 1 min)
 */
export function checkRateLimit(
  actionKey: string,
  maxRequests = 3,
  windowMs = 60000
): { allowed: boolean; remainingCooldownSec: number } {
  const storageKey = `sec_rl_${actionKey}`;
  const now = Date.now();

  try {
    const raw = localStorage.getItem(storageKey);
    const timestamps: number[] = raw ? JSON.parse(raw) : [];

    // Filter out timestamps outside the active window
    const validTimestamps = timestamps.filter((time) => now - time < windowMs);

    if (validTimestamps.length >= maxRequests) {
      const oldestInWindow = validTimestamps[0];
      const remainingCooldownSec = Math.ceil((windowMs - (now - oldestInWindow)) / 1000);
      return { allowed: false, remainingCooldownSec };
    }

    // Record this attempt
    validTimestamps.push(now);
    localStorage.setItem(storageKey, JSON.stringify(validTimestamps));
    return { allowed: true, remainingCooldownSec: 0 };
  } catch {
    // If localStorage is unavailable or blocked, default safely
    return { allowed: true, remainingCooldownSec: 0 };
  }
}
