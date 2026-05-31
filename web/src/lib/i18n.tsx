import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'ru'; // ru = Roman Urdu (WhatsApp style)

/**
 * Copy lives here in both languages. Rules we follow:
 *  - no em dashes or en dashes anywhere
 *  - plain, warm, human words (no "seamless", "unleash", "elevate")
 *  - the course is self-paced: start anytime, no deadlines, no cohorts
 *  - audience is complete beginners in Sahiwal, students and job seekers
 */
const dict = {
  // Nav
  'nav.courses': { en: 'Courses', ru: 'Courses' },
  'nav.how': { en: 'How it works', ru: 'Kaise chalta hai' },
  'nav.why': { en: 'Why us', ru: 'Hum kyun' },
  'nav.stories': { en: 'Stories', ru: 'Kahaniyan' },
  'nav.signin': { en: 'Open course', ru: 'Course kholo' },
  'nav.start': { en: 'Start free', ru: 'Free shuru karo' },

  // Preloader
  'load.tagline': { en: 'Free courses, made in Sahiwal', ru: 'Free courses, Sahiwal se' },

  // Hero
  'hero.badge': {
    en: 'Free forever. Start anytime.',
    ru: 'Hamesha free. Jab marzi shuru karo.',
  },
  'hero.h1a': { en: 'Start your', ru: 'Apna tech' },
  'hero.h1flourish': { en: 'journey', ru: 'safar' },
  'hero.h1b': { en: 'into tech', ru: 'shuru karo' },
  'hero.sub': {
    en: 'Free, self-paced online courses for complete beginners. Learn whenever you have time, in English and Roman Urdu.',
    ru: 'Naye logon ke liye free online courses, apni speed se. Jab waqt mile tab seekho, English aur Roman Urdu mein.',
  },
  'hero.cta1': { en: "Get started, it's free", ru: 'Shuru karo, ye free hai' },

  // Marquee
  'marquee.label': { en: 'What you will learn', ru: 'Tum kya seekho ge' },

  // Courses
  'courses.kicker': { en: 'One course open, one in progress', ru: 'Aik course open, aik tayyar ho raha hai' },
  'courses.h2a': { en: 'Start with something', ru: 'Shuru karo kisi' },
  'courses.h2flourish': { en: 'small', ru: 'chhoti' },
  'courses.h2b': { en: ', finish with something real.', ru: ' cheez se, banao kuch asli.' },
  'courses.lead': {
    en: 'Every course is broken into small modules you can finish in one sitting. You build real things you can show to family, friends, or a first client.',
    ru: 'Har course chote modules mein hai jo ek hi baar mein khatam ho jate hain. Tum asli cheezen banao ge jo ghar walon, doston ya pehle client ko dikha sako.',
  },
  'courses.c1.track': { en: 'Track 01 · Code', ru: 'Track 01 · Code' },
  'courses.c1.lead': { en: 'Front-End', ru: 'Front-End' },
  'courses.c1.flourish': { en: 'magic', ru: 'magic' },
  'courses.c1.tag': {
    en: 'HTML, CSS, JavaScript and a little React. From your first heading to a portfolio you can post.',
    ru: 'HTML, CSS, JavaScript aur thora sa React. Pehle heading se le kar aik portfolio tak jo tum post kar sako.',
  },
  'courses.c2.track': { en: 'Track 02 · Visual', ru: 'Track 02 · Visual' },
  'courses.c2.lead': { en: 'Design', ru: 'Design' },
  'courses.c2.flourish': { en: 'studio', ru: 'studio' },
  'courses.c2.tag': {
    en: 'Graphic design and UI/UX with Figma. The track is being polished before public release.',
    ru: 'Figma ke sath graphic design aur UI/UX. Yeh track public release se pehle polish ho raha hai.',
  },
  'courses.c2.status': { en: 'Coming soon', ru: 'Jald aa raha hai' },
  'courses.meta.selfpaced': { en: 'Self-paced', ru: 'Self-paced' },
  'courses.meta.free': { en: 'Free', ru: 'Free' },
  'courses.c1.modules': { en: '24 modules', ru: '24 modules' },
  'courses.c2.modules': { en: '4 chapters drafted', ru: '4 chapters draft hain' },
  'courses.card.beginners': { en: 'For absolute beginners', ru: 'Bilkul naye logon ke liye' },
  'courses.card.anytime': { en: 'Start anytime', ru: 'Jab marzi shuru karo' },
  'courses.card.explore': { en: 'Open this course', ru: 'Yeh course kholo' },
  'courses.card.preview': { en: 'View status', ru: 'Status dekho' },
  'courses.more.title': { en: 'More courses on the way', ru: 'Aur courses aa rahe hain' },
  'courses.more.body': {
    en: 'We keep adding new beginner courses over time. Tell us what you want to learn next.',
    ru: 'Hum naye beginner courses add karte rahenge. Batao agla kya seekhna hai.',
  },
  'courses.more.cta': { en: 'Suggest a course', ru: 'Course suggest karo' },

  // Perks
  'perk.cert': { en: 'Completion certificate', ru: 'Completion certificate' },
  'perk.streak': { en: 'Track your progress', ru: 'Apni progress dekho' },
  'perk.whatsapp': { en: 'WhatsApp study group', ru: 'WhatsApp study group' },
  'perk.showcase': { en: 'Top student showcase', ru: 'Behtreen kaam ki showcase' },

  // How it works
  'how.kicker': { en: 'How it works', ru: 'Kaise chalta hai' },
  'how.h2': { en: 'Four small steps. No pressure, no clock.', ru: 'Char chote steps. Na pressure, na clock.' },
  'how.lead': {
    en: 'Sign up in two minutes, then move at your own speed. Today, next week, or at 2am, the lessons wait for you. When you get stuck, and everyone does, we are on WhatsApp.',
    ru: 'Do minute mein sign up karo, phir apni speed se chalo. Aaj, agle hafte, ya raat 2 baje, lessons tumhara intezar karte hain. Jab atak jao, aur sab atakte hain, hum WhatsApp par hain.',
  },
  'how.s1.t': { en: 'Sign up free', ru: 'Free sign up' },
  'how.s1.b': {
    en: 'One short form. Your name, phone, and the course you want. No card, no test.',
    ru: 'Aik chota form. Naam, phone, aur jo course chahiye. Na card, na test.',
  },
  'how.s2.t': { en: 'Learn and build', ru: 'Seekho aur banao' },
  'how.s2.b': {
    en: 'Short lessons with code you can copy and break. Pause and replay as many times as you need.',
    ru: 'Chote lessons, code jo copy karke tor sako. Jitni baar chaho ruk kar dobara dekho.',
  },
  'how.s3.t': { en: 'Ask for help', ru: 'Madad mango' },
  'how.s3.b': {
    en: 'Stuck on something? Drop a message in the WhatsApp group and a mentor replies, usually the same day.',
    ru: 'Kahin atak gaye? WhatsApp group mein message daalo, mentor jawab dega, aksar usi din.',
  },
  'how.s4.t': { en: 'Ship your project', ru: 'Apna project banao' },
  'how.s4.b': {
    en: 'Finish the last module, build the final project, and get a real certificate plus a spot in our showcase.',
    ru: 'Aakhri module khatam karo, final project banao, aur asli certificate plus showcase mein jagah lo.',
  },

  // Why us
  'why.kicker': { en: 'Why Bano Qabil Sahiwal', ru: 'Bano Qabil Sahiwal kyun' },
  'why.h2a': { en: 'Built for people who were', ru: 'Un logon ke liye jinhe' },
  'why.h2flourish': { en: 'told', ru: 'kaha gaya' },
  'why.h2b': { en: "they couldn't.", ru: 'tum se na ho ga.' },
  'why.lead': {
    en: 'Most online courses assume you already speak the language of the internet. We do not. We start from zero, and we mean zero.',
    ru: 'Zyada tar online courses samajhte hain ke tumhe internet ki zaban aati hai. Hum nahi. Hum zero se shuru karte hain, sach mein zero se.',
  },
  'why.c1.t': { en: 'Free, forever', ru: 'Hamesha free' },
  'why.c1.b': {
    en: 'No paid tier, no upsell, no premium. As long as our local sponsors show up, we keep teaching. That is the deal.',
    ru: 'Na koi paid plan, na upsell, na premium. Jab tak local sponsors sath hain, hum parhate rahenge. Bas yehi deal hai.',
  },
  'why.c2.t': { en: 'Patient with beginners', ru: 'Naye seekhne walon ke sath naram' },
  'why.c2.b': {
    en: 'Lessons assume nothing. If a word is new, we explain it. Fall behind? You cannot, there is no schedule to fall behind on.',
    ru: 'Lessons kuch farz nahi karte. Naya lafz aaye to samjhate hain. Peeche reh jao ge? Nahi, koi schedule hi nahi jis se peeche raho.',
  },
  'why.c3.t': { en: 'English and Roman Urdu', ru: 'English aur Roman Urdu' },
  'why.c3.b': {
    en: 'Every lesson comes in plain English and the Roman Urdu you already type on WhatsApp. Pick whatever is easier today.',
    ru: 'Har lesson saaf English aur wohi Roman Urdu mein jo tum WhatsApp par likhte ho. Jo aaj asaan lage wohi chuno.',
  },

  // Lesson preview
  'lesson.intro': { en: 'See a real lesson before you sign up', ru: 'Sign up se pehle aik asli lesson dekho' },
  'lesson.chapter': { en: 'Front-End · Module 2', ru: 'Front-End · Module 2' },
  'lesson.title': { en: 'Lesson 03: Your first button', ru: 'Lesson 03: Tumhara pehla button' },
  'lesson.progress': { en: '3 of 6 done', ru: '6 mein se 3 ho gaye' },
  'lesson.today': { en: "today's lesson", ru: 'aaj ka lesson' },
  'lesson.body': {
    en: 'A button is just a rectangle that does something when you tap it. Let us make one, then break it on purpose to see what changes.',
    ru: 'Button bas aik rectangle hai jo tap karne par kuch karta hai. Chalo aik banate hain, phir jaan boojh kar torte hain taake pata chale kya badalta hai.',
  },
  'lesson.tip.t': { en: 'Tip from your mentor', ru: 'Mentor ki tip' },
  'lesson.tip.b': {
    en: 'Change the colour to your favourite, then refresh. That small rush you feel is exactly why we do this.',
    ru: 'Color apni pasand ka karo, phir refresh karo. Wo chhoti si khushi jo mehsoos hoti hai, bas isi liye hum yeh karte hain.',
  },
  'lesson.note.t': { en: 'Remember', ru: 'Yaad rakho' },
  'lesson.note.b': {
    en: 'If something does not make sense, do not stop. Ask in our WhatsApp group, we are right there.',
    ru: 'Agar kuch samajh na aaye to ruko mat. WhatsApp group mein poocho, hum wahin maujood hain.',
  },
  'lesson.complete': { en: 'Mark lesson complete', ru: 'Lesson complete karo' },
  'lesson.notdone': { en: 'Not finished yet', ru: 'Abhi khatam nahi hua' },
  'lesson.minutes': { en: '12 min', ru: '12 min' },

  // Help widget
  'help.title': { en: 'Stuck? That is normal.', ru: 'Atak gaye? Yeh normal hai.' },
  'help.body': {
    en: 'Everyone gets stuck. Ask in the group and a mentor or a fellow student answers, often within the hour.',
    ru: 'Sab atakte hain. Group mein poocho, koi mentor ya saathi student jawab dega, aksar aik ghante mein.',
  },
  'help.cta': { en: 'Ask by email', ru: 'Email se poocho' },

  // Testimonial
  'story.quotea': { en: 'I had never touched a laptop before this. A few months later I built my dad a shop', ru: 'Is se pehle maine kabhi laptop ko haath nahi lagaya tha. Kuch mahine baad maine apne abbu ki dukaan ki' },
  'story.flourish': { en: 'website', ru: 'website' },
  'story.quoteb': { en: ', and he showed it to every cousin in Punjab.', ru: ' banai, aur unhon ne har cousin ko Punjab bhar mein dikhaya.' },
  'story.name': { en: 'Ayesha R.', ru: 'Ayesha R.' },
  'story.place': { en: 'Student · Sahiwal', ru: 'Student · Sahiwal' },

  // Final CTA
  'cta.kicker': { en: 'Admissions are always open', ru: 'Admission hamesha open hai' },
  'cta.h2a': { en: 'Ready to', ru: 'Shuru karne' },
  'cta.h2flourish': { en: 'start?', ru: 'ke liye tayyar?' },
  'cta.body': {
    en: 'The front-end course is open now. Start with the first module, then move at your own speed.',
    ru: 'Front-end course abhi open hai. Pehle module se shuru karo, phir apni speed se aage barho.',
  },
  'cta.placeholder': { en: 'your@email.com', ru: 'your@email.com' },
  'cta.submit': { en: 'Open Front-End course', ru: 'Front-End course kholo' },
  'cta.done': { en: 'Course opened.', ru: 'Course khul gaya.' },
  'cta.fineprint': { en: 'No account needed for the public course.', ru: 'Public course ke liye account ki zaroorat nahi.' },
  'cta.secondary': { en: 'See the courses first', ru: 'Pehle courses dekho' },

  // Footer
  'footer.about': {
    en: 'Free, beginner-first, self-paced courses in web development and design. Built in Sahiwal, open to all of Pakistan.',
    ru: 'Free, beginner-first, self-paced courses web development aur design ke. Sahiwal mein bani, pure Pakistan ke liye khuli.',
  },
  'footer.made': { en: '© 2026 · Made in Sahiwal', ru: '© 2026 · Sahiwal mein bani' },
} as const;

export type Key = keyof typeof dict;

const LangCtx = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: Key) => string;
}>({ lang: 'en', setLang: () => {}, t: (k) => dict[k].en });

function read(): Lang {
  return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    typeof document === 'undefined' ? 'en' : read()
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', lang);
    try {
      localStorage.setItem('bqs-lang', lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const t = useCallback((k: Key) => dict[k][lang], [lang]);

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
