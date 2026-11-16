"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  categories,
  courses,
  information,
  type CategoryId,
  type Course,
  type InformationKey,
} from "@/lib/content";
import { Dialog } from "./dialog";
import { Arrow } from "./ui";

export type Action =
  | { kind: "catalog"; category?: CategoryId }
  | { kind: "course"; id: string }
  | { kind: "join" }
  | { kind: "login" }
  | { kind: "people" }
  | { kind: "info"; key: InformationKey };

const ExperienceContext = createContext<
  ((action: Action, trigger: HTMLButtonElement) => void) | null
>(null);

export function ActionButton({
  action,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  action: Action;
  children: ReactNode;
}) {
  const open = useContext(ExperienceContext);
  return (
    <button
      {...props}
      type="button"
      onClick={(event) => open?.(action, event.currentTarget)}
    >
      {children}
    </button>
  );
}

function Catalog({
  category,
  onSelect,
}: {
  category?: CategoryId;
  onSelect: (course: Course) => void;
}) {
  const [filter, setFilter] = useState<CategoryId | "all">(category ?? "all");
  const filteredCourses = courses.filter(
    (course) => filter === "all" || course.category === filter,
  );
  return (
    <>
      <p className="dialog-intro">
        A little curiosity can take you a long way. Find your next practical
        skill.
      </p>
      <div
        className="catalog-filters"
        role="group"
        aria-label="Filter courses by category"
      >
        <button
          type="button"
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All courses
        </button>
        {categories.map((item) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {filteredCourses.length}{" "}
        {filteredCourses.length === 1 ? "course" : "courses"} found
      </p>
      <div className="catalog-grid">
        {filteredCourses.map((course) => (
          <article key={course.id} className="catalog-card">
            <span className="eyebrow">
              {categories.find((item) => item.id === course.category)?.title}
            </span>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <span className="course-meta">
              {course.lessons.length} lessons · {course.duration} ·{" "}
              {course.level}
            </span>
            <button
              type="button"
              className="text-link"
              onClick={() => onSelect(course)}
            >
              View course <Arrow />
            </button>
          </article>
        ))}
      </div>
    </>
  );
}

function JoinForm() {
  const [name, setName] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setName(String(data.get("name")).trim());
  }
  return name ? (
    <div className="join-success" role="status">
      <span className="success-mark" aria-hidden="true">
        ✓
      </span>
      <h3>You’re in, {name}.</h3>
      <p>
        Your demo profile is ready. Explore a course to take your first step.
      </p>
    </div>
  ) : (
    <form className="join-form" onSubmit={submit}>
      <p className="dialog-intro">
        Start with curiosity. Build a skill you can use. Try the Luma experience
        with a local demo profile.
      </p>
      <div className="field">
        <label htmlFor="join-name">Your name</label>
        <input
          id="join-name"
          name="name"
          autoComplete="given-name"
          required
          minLength={2}
          maxLength={100}
          placeholder="Your name"
        />
      </div>
      <div className="field">
        <label htmlFor="join-email">Email</label>
        <input
          id="join-email"
          name="email"
          autoComplete="email"
          required
          type="email"
          maxLength={254}
          placeholder="you@example.com"
        />
      </div>
      <button className="button button-primary w-full">
        Create demo profile
      </button>
      <p className="demo-note">
        Demo only. No account is created and no details are sent.
      </p>
    </form>
  );
}

export function SiteExperience({ children }: { children: ReactNode }) {
  const [action, setAction] = useState<Action | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [demoLoggedIn, setDemoLoggedIn] = useState(false);
  const open = (nextAction: Action, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setAction(nextAction);
  };
  const close = () => {
    setAction(null);
    window.requestAnimationFrame(() =>
      triggerRef.current?.focus({ preventScroll: true }),
    );
  };
  const selectedCourse =
    action?.kind === "course"
      ? courses.find((course) => course.id === action.id)
      : undefined;
  const info = action?.kind === "info" ? information[action.key] : undefined;

  return (
    <ExperienceContext.Provider value={open}>
      {children}
      {action?.kind === "catalog" && (
        <Dialog
          title="Find your next course."
          onClose={close}
          className="catalog-dialog"
        >
          <Catalog
            key={action.category ?? "all"}
            category={action.category}
            onSelect={(course) => setAction({ kind: "course", id: course.id })}
          />
        </Dialog>
      )}
      {selectedCourse && (
        <Dialog title={selectedCourse.title} onClose={close}>
          <button
            type="button"
            className="back-link"
            onClick={() =>
              setAction({ kind: "catalog", category: selectedCourse.category })
            }
          >
            ← Back to courses
          </button>
          <p className="dialog-intro">{selectedCourse.description}</p>
          <p>with {selectedCourse.instructor}</p>
          <p className="course-meta">
            {selectedCourse.lessons.length} lessons · {selectedCourse.duration}{" "}
            · {selectedCourse.level}
          </p>
          <h3 className="lesson-heading">What you’ll learn</h3>
          <ol className="lesson-list">
            {selectedCourse.lessons.map((lesson, index) => (
              <li key={lesson}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {lesson}
              </li>
            ))}
          </ol>
          {enrolled.includes(selectedCourse.id) ? (
            <p className="enrollment-status" role="status">
              ✓ Added to your demo learning list.
            </p>
          ) : (
            <button
              className="button button-primary w-full"
              type="button"
              onClick={() =>
                setEnrolled((current) => [...current, selectedCourse.id])
              }
            >
              Start this course
            </button>
          )}
          <p className="demo-note">
            Sample course. Enrollment is kept for this browser session; lessons
            are previews.
          </p>
        </Dialog>
      )}
      {action?.kind === "join" && (
        <Dialog title="A new skill starts here." onClose={close}>
          <JoinForm />
        </Dialog>
      )}
      {action?.kind === "login" && (
        <Dialog
          title={demoLoggedIn ? "Your learning space." : "Welcome back."}
          onClose={close}
        >
          {demoLoggedIn ? (
            <>
              <p className="dialog-intro">
                Make a little room for learning today.
              </p>
              {enrolled.length ? (
                <ul className="learning-list">
                  {enrolled.map((id) => {
                    const course = courses.find((item) => item.id === id)!;
                    return (
                      <li key={id}>
                        <button
                          type="button"
                          onClick={() => setAction({ kind: "course", id })}
                        >
                          {course.title}
                          <Arrow />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>
                  You haven’t added a course yet. Find something you’re curious
                  about.
                </p>
              )}
              <button
                type="button"
                className="button button-primary"
                onClick={() => setAction({ kind: "catalog" })}
              >
                Explore courses
              </button>
              <button
                type="button"
                className="back-link ml-4"
                onClick={() => setDemoLoggedIn(false)}
              >
                Leave demo profile
              </button>
            </>
          ) : (
            <>
              <p className="dialog-intro">
                Take a look around your learning space with a demo profile. No
                password or account needed.
              </p>
              <button
                className="button button-primary"
                type="button"
                onClick={() => setDemoLoggedIn(true)}
              >
                Continue as a demo learner
              </button>
            </>
          )}
        </Dialog>
      )}
      {action?.kind === "people" && (
        <Dialog title="Good people. Shared curiosity." onClose={close}>
          <p className="dialog-intro">
            Learn from people who do the work, and find a community that helps
            you keep going.
          </p>
          <div className="people-list">
            {courses.map((course) => (
              <article key={course.id}>
                <span className="eyebrow">
                  {
                    categories.find((item) => item.id === course.category)
                      ?.title
                  }
                </span>
                <h3>{course.instructor.split(" · ")[0]}</h3>
                <p>{course.instructor.split(" · ")[1]}</p>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setAction({ kind: "course", id: course.id })}
                >
                  Explore their course <Arrow />
                </button>
              </article>
            ))}
          </div>
          <p className="demo-note">
            Sample instructors for this front-end demonstration.
          </p>
        </Dialog>
      )}
      {info && (
        <Dialog title={info.title} onClose={close}>
          <p className="dialog-intro">{info.body}</p>
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              close();
              document
                .getElementById("contact")
                ?.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                });
            }}
          >
            Get in touch
          </button>
        </Dialog>
      )}
    </ExperienceContext.Provider>
  );
}
