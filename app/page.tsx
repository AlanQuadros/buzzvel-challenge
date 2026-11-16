import Image from "next/image";
import { Header } from "@/components/header";
import { ActionButton, SiteExperience } from "@/components/experience";
import { ContactForm } from "@/components/contact-form";
import { Arrow, AvatarStack, Eyebrow } from "@/components/ui";
import {
  categories,
  courses,
  stats,
  steps,
  type InformationKey,
} from "@/lib/content";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Courses", href: "#courses" },
      { label: "Categories", href: "#courses" },
      { label: "Instructors", href: "#community" },
      { label: "For Teams", href: "#contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#how-it-works" },
      { label: "Careers", info: "Careers" },
      { label: "Journal", info: "Journal" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", info: "Help Center" },
      { label: "Contact", href: "#contact" },
      { label: "Terms", info: "Terms" },
      { label: "Privacy", info: "Privacy" },
    ],
  },
];

function Hero() {
  return (
    <section className="hero section-cream" aria-labelledby="hero-title">
      <div className="page-container hero-grid">
        <div className="hero-copy">
          <Eyebrow>Learn at your own pace</Eyebrow>
          <h1 id="hero-title">Build skills that actually move you forward.</h1>
          <p className="hero-description">
            Practical courses taught by people who do the work every day. Learn
            design, technology, business and more — one focused lesson at a
            time.
          </p>
          <div className="button-row hero-buttons">
            <a className="button button-primary" href="#courses">
              Explore courses
            </a>
            <a className="button button-secondary" href="#how-it-works">
              See how it works
            </a>
          </div>
          <div className="trusted-row">
            <AvatarStack />
            <p>
              <strong>Trusted by 24,000+</strong> learners
            </p>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-peach" aria-hidden="true" />
          <div className="hero-circle" aria-hidden="true" />
          <div className="hero-photo">
            <Image
              src="/images/hero.jpg"
              alt="A learner with glasses taking notes while studying at her laptop"
              fill
              sizes="(max-width: 767px) calc(100vw - 56px), (max-width: 1199px) 42vw, 500px"
              preload
              className="object-cover"
            />
          </div>
          <div className="course-badge">
            <strong>120+</strong>
            <span>expert-led courses</span>
          </div>
          <div className="rating-badge">
            <span className="stars" aria-label="5 out of 5 stars">
              ★★★★★
            </span>
            <span>4.9 avg rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section
      id="courses"
      className="section-white section-pad categories-section"
      aria-labelledby="categories-title"
    >
      <div className="page-container">
        <div className="section-heading categories-heading">
          <Eyebrow>Find your next skill</Eyebrow>
          <h2 id="categories-title">Learn something worth knowing.</h2>
          <p className="lead">
            Short, practical courses designed around skills you can put to work
            immediately.
          </p>
        </div>
        <div className="category-grid grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {categories.map((category) => (
            <article className="category-card" key={category.id}>
              <span className="category-number">{category.number}</span>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <ActionButton
                className="text-link"
                action={{ kind: "catalog", category: category.id }}
                aria-label={`Explore ${category.title} courses`}
              >
                Explore <Arrow />
              </ActionButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCourse() {
  const course = courses[0];
  return (
    <section
      id="featured-course"
      className="featured-section section-pad"
      aria-labelledby="featured-title"
    >
      <div className="page-container featured-grid grid items-center gap-10 md:grid-cols-2 lg:gap-[60px]">
        <div className="featured-visual">
          <Image
            className="course-photo object-cover"
            src="/images/course.jpg"
            alt="A product designer exploring materials and sketching ideas at a workbench"
            fill
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 44vw, 538px"
          />
          <span className="featured-label">Featured course</span>
        </div>
        <div className="featured-copy">
          <Eyebrow>Most popular this month</Eyebrow>
          <h2 id="featured-title">{course.title}</h2>
          <p className="featured-description">{course.description}</p>
          <p className="instructor">with {course.instructor}</p>
          <ul className="course-tags" aria-label="Course details">
            <li>{course.lessons.length} lessons</li>
            <li>{course.duration}</li>
            <li>{course.level}</li>
          </ul>
          <div className="button-row featured-buttons">
            <ActionButton
              className="button button-yellow"
              action={{ kind: "course", id: course.id }}
            >
              View course
            </ActionButton>
            <ActionButton className="text-link" action={{ kind: "catalog" }}>
              Browse all courses <Arrow />
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section-cream section-pad how-section"
      aria-labelledby="how-title"
    >
      <div className="page-container">
        <div className="section-heading text-center">
          <Eyebrow>How Luma works</Eyebrow>
          <h2 id="how-title">Less browsing. More learning.</h2>
        </div>
        <ol className="steps-grid grid grid-cols-1 md:grid-cols-3">
          {steps.map((step) => (
            <li className="step" key={step.number}>
              <div
                className={`step-shape shape-${step.shape}`}
                aria-hidden="true"
              >
                <span />
              </div>
              <p className="step-number">Step {step.number}</p>
              <h3>{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section
      className="section-white section-pad testimonial-section"
      aria-label="What our learners say"
    >
      <div className="page-container testimonial-grid">
        <figure className="testimonial">
          <span className="quote-mark" aria-hidden="true">
            &quot;
          </span>
          <blockquote>
            The lessons are short enough to fit into my week, but detailed
            enough that I actually leave with something I can use.
          </blockquote>
          <figcaption>
            <Image
              src="/images/alex-morgan.jpg"
              alt="Alex Morgan"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <strong>Alex Morgan</strong>
              <span>Product Manager</span>
            </div>
          </figcaption>
        </figure>
        <dl className="stats">
          {stats.map((stat) => (
            <div key={stat.value}>
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section
      id="community"
      className="section-cream section-pad community-section"
      aria-labelledby="community-title"
    >
      <div className="page-container community-grid grid items-center gap-10 md:grid-cols-2 lg:gap-[60px]">
        <div className="section-heading">
          <Eyebrow>The people</Eyebrow>
          <h2 id="community-title">
            Meet international students &amp; teachers
          </h2>
          <p className="lead">
            Morbi sit egestas dignissim pharetra, sed amet. Tempus justo
            senectus risus ac vel, velit, nunc. Eget commodo eget in aliquam
            facilisi facilisi nec magna hendrerit. Placerat ipsum sit tellus
            urna, faucibus aenean lorem faucibus integer.
          </p>
          <ActionButton
            className="button button-secondary community-button"
            action={{ kind: "people" }}
          >
            Explore teachers and students
          </ActionButton>
        </div>
        <Image
          src="/images/community.png"
          alt="A collage of international students and teachers studying, collaborating, and learning online"
          width={535}
          height={530}
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 44vw, 530px"
          className="community-image"
        />
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="section-white section-pad contact-section"
      aria-labelledby="contact-title"
    >
      <div className="page-container contact-grid">
        <div className="contact-info section-heading">
          <Eyebrow>Contact</Eyebrow>
          <h2 id="contact-title">Get in touch</h2>
          <p className="lead">
            Have a question? We’re here to help. Whether you’re looking for the
            right course, learning with your team or interested in teaching with
            Luma, we’d love to hear from you.
          </p>
          <div className="contact-items">
            <div className="contact-item">
              <div className="contact-icon">
                <Image
                  src="/images/message.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p>Email</p>
                <a href="mailto:contact@luma.com">contact@luma.com</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <Image src="/images/clock.svg" alt="" width={20} height={20} />
              </div>
              <div>
                <p>Response Time</p>
                <span>Up to 24 hours on business days</span>
              </div>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta section-pad" aria-labelledby="cta-title">
      <div className="cta-decoration" aria-hidden="true">
        <i className="deco-ring ring-one" />
        <i className="deco-ring ring-two" />
        <i className="deco-ring ring-three" />
        <i className="deco-square square-one" />
        <i className="deco-square square-three" />
        <i className="deco-circle" />
        <Image
          className="deco-art deco-b"
          src="/images/deco-b.svg"
          alt=""
          width={102}
          height={102}
        />
        <Image
          className="deco-art deco-cube"
          src="/images/deco-cube.svg"
          alt=""
          width={160}
          height={160}
        />
        <Image
          className="deco-art deco-outline"
          src="/images/deco-outline.svg"
          alt=""
          width={67}
          height={67}
        />
        <Image
          className="deco-art deco-chat"
          src="/images/deco-chat.svg"
          alt=""
          width={32}
          height={32}
        />
        <Image
          className="deco-art deco-sun"
          src="/images/deco-sun.svg"
          alt=""
          width={62}
          height={62}
        />
        <Image
          className="deco-art deco-doors"
          src="/images/deco-doors.svg"
          alt=""
          width={48}
          height={48}
        />
      </div>
      <div className="page-container cta-content text-center">
        <AvatarStack count={4} />
        <h2 id="cta-title">What will you learn next?</h2>
        <p>Start with one course. Build from there.</p>
        <div className="button-row justify-center">
          <ActionButton
            className="button button-primary"
            action={{ kind: "catalog" }}
          >
            Explore all courses
          </ActionButton>
          <ActionButton
            className="button button-secondary"
            action={{ kind: "join" }}
          >
            Join Luma
          </ActionButton>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="wordmark" href="#top" aria-label="Luma home">
              luma.
            </a>
            <p>Practical learning for curious people.</p>
          </div>
          <div className="footer-navigation">
            {footerGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2>{group.title}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {"href" in link ? (
                        <a href={link.href}>{link.label}</a>
                      ) : (
                        <ActionButton
                          action={{
                            kind: "info",
                            key: link.info as InformationKey,
                          }}
                        >
                          {link.label}
                        </ActionButton>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <p className="copyright">© 2026 Luma Learning</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <SiteExperience>
      <div id="top">
        <Header />
        <main id="main-content">
          <Hero />
          <Categories />
          <FeaturedCourse />
          <HowItWorks />
          <Testimonial />
          <Community />
          <Contact />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </SiteExperience>
  );
}
