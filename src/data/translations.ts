/**
 * ============================================================
 * TRANSLATIONS — English & Urdu
 * ============================================================
 */

export type Locale = 'en' | 'ur';

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',

    'nav.education': 'Education',
    'nav.resume': 'Resume',
    'nav.contact': 'Contact',

    // Hero
    'hero.headline': 'Turning data into decisions.',
    'hero.cta.projects': 'Explore my projects',
    'hero.cta.contact': "Let's connect",

    // About
    'about.title': 'About Me',
    'about.subtitle': 'The person behind the data',

    // Skills
    'skills.title': 'Skills & Technologies',
    'skills.subtitle': 'What I work with',
    'skills.status.learned': 'Learned',
    'skills.status.learning': 'Currently Learning',
    'skills.status.planned': 'Planning to Learn',

    // Projects
    'projects.title': 'Projects',
    'projects.subtitle': 'Building with data',
    'projects.featured': 'Featured Project',
    'projects.viewAll': 'View all projects',
    'projects.viewProject': 'View project',
    'projects.status.completed': 'Completed',
    'projects.status.in-progress': 'In Progress',
    'projects.status.planned': 'Planned',
    'projects.filter.all': 'All',
    'projects.filter.data-analysis': 'Data Analysis',
    'projects.filter.machine-learning': 'Machine Learning',
    'projects.filter.visualization': 'Visualization',
    'projects.related': 'Related Projects',
    'projects.noResults': 'No projects match this filter.',

    // Education
    'education.title': 'Education',
    'education.subtitle': 'My academic journey',



    // Resume
    'resume.title': 'Resume',
    'resume.download': 'Download PDF',
    'resume.notAvailable': 'Resume PDF will be available soon.',

    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': "Let's work together",
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully!',
    'contact.error': 'Failed to send message. Please try the email link below.',
    'contact.emailFallback': 'Or email me directly',

    // Command Palette
    'cmd.placeholder': 'Search or jump to...',
    'cmd.hint': 'Ctrl+K',
    'cmd.noResults': 'No results found.',

    // Theme
    'theme.light': 'Light mode',
    'theme.dark': 'Dark mode',

    // Language
    'lang.en': 'English',
    'lang.ur': 'اردو',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.builtWith': 'Built with curiosity and code.',

    // Misc
    'misc.backToTop': 'Back to top',
  },
  ur: {
    // Navigation
    'nav.home': 'ہوم',
    'nav.about': 'تعارف',
    'nav.skills': 'مہارتیں',
    'nav.projects': 'پروجیکٹس',

    'nav.education': 'تعلیم',
    'nav.resume': 'ریزیومے',
    'nav.contact': 'رابطہ',

    // Hero
    'hero.headline': 'ڈیٹا سے فیصلے تک۔',
    'hero.cta.projects': 'میرے پروجیکٹس دیکھیں',
    'hero.cta.contact': 'رابطہ کریں',

    // About
    'about.title': 'میرے بارے میں',
    'about.subtitle': 'ڈیٹا کے پیچھے کا انسان',

    // Skills
    'skills.title': 'مہارتیں اور ٹیکنالوجیز',
    'skills.subtitle': 'میں کس کے ساتھ کام کرتا ہوں',
    'skills.status.learned': 'سیکھ لی',
    'skills.status.learning': 'ابھی سیکھ رہا ہوں',
    'skills.status.planned': 'سیکھنے کا ارادہ',

    // Projects
    'projects.title': 'پروجیکٹس',
    'projects.subtitle': 'ڈیٹا کے ساتھ تعمیر',
    'projects.featured': 'نمایاں پروجیکٹ',
    'projects.viewAll': 'تمام پروجیکٹس دیکھیں',
    'projects.viewProject': 'پروجیکٹ دیکھیں',
    'projects.status.completed': 'مکمل',
    'projects.status.in-progress': 'جاری',
    'projects.status.planned': 'منصوبہ بند',
    'projects.filter.all': 'سب',
    'projects.filter.data-analysis': 'ڈیٹا تجزیہ',
    'projects.filter.machine-learning': 'مشین لرننگ',
    'projects.filter.visualization': 'ویژولائزیشن',
    'projects.related': 'متعلقہ پروجیکٹس',
    'projects.noResults': 'اس فلٹر سے کوئی پروجیکٹ نہیں ملا۔',

    // Education
    'education.title': 'تعلیم',
    'education.subtitle': 'میرا تعلیمی سفر',



    // Resume
    'resume.title': 'ریزیومے',
    'resume.download': 'پی ڈی ایف ڈاؤنلوڈ کریں',
    'resume.notAvailable': 'ریزیومے پی ڈی ایف جلد دستیاب ہوگا۔',

    // Contact
    'contact.title': 'رابطہ کریں',
    'contact.subtitle': 'آئیں مل کر کام کریں',
    'contact.name': 'آپ کا نام',
    'contact.email': 'آپ کا ای میل',
    'contact.message': 'آپ کا پیغام',
    'contact.send': 'پیغام بھیجیں',
    'contact.sending': 'بھیج رہا ہے...',
    'contact.success': 'پیغام کامیابی سے بھیج دیا گیا!',
    'contact.error': 'پیغام بھیجنے میں ناکامی۔ براہ کرم نیچے ای میل لنک استعمال کریں۔',
    'contact.emailFallback': 'یا مجھے براہ راست ای میل کریں',

    // Command Palette
    'cmd.placeholder': 'تلاش کریں یا جائیں...',
    'cmd.hint': 'Ctrl+K',
    'cmd.noResults': 'کوئی نتیجہ نہیں ملا۔',

    // Theme
    'theme.light': 'لائٹ موڈ',
    'theme.dark': 'ڈارک موڈ',

    // Language
    'lang.en': 'English',
    'lang.ur': 'اردو',

    // Footer
    'footer.rights': 'جملہ حقوق محفوظ ہیں۔',
    'footer.builtWith': 'تجسس اور کوڈ سے بنایا گیا۔',

    // Misc
    'misc.backToTop': 'اوپر جائیں',
  },
};
