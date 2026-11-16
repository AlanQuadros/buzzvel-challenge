"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ResponsiveCopy } from "./ui";

type Field = "name" | "email" | "question";
type FormErrors = Partial<Record<Field, string>>;

const mobileQuery = "(max-width: 767px)";
function subscribeToViewport(callback: () => void) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function ContactForm() {
  const isMobile = useSyncExternalStore(
    subscribeToViewport,
    () => window.matchMedia(mobileQuery).matches,
    () => false,
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedName, setSubmittedName] = useState("");
  const [busy, setBusy] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const question = String(data.get("question") ?? "").trim();
    const nextErrors: FormErrors = {};
    if (name.length < 2)
      nextErrors.name = isMobile
        ? "Informe seu nome completo."
        : "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = isMobile
        ? "Informe um e-mail válido."
        : "Please enter a valid email address.";
    if (question.length < 10)
      nextErrors.question = isMobile
        ? "Escreva pelo menos 10 caracteres."
        : "Please include at least 10 characters.";
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0] as Field | undefined;
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement).focus();
      return;
    }
    setBusy(true);
    // A local demo response: no personal information leaves the browser.
    window.setTimeout(() => {
      setSubmittedName(name);
      setBusy(false);
      form.reset();
      window.requestAnimationFrame(() => successRef.current?.focus());
    }, 400);
  }

  return (
    <div className="contact-card">
      {submittedName ? (
        <div
          ref={successRef}
          tabIndex={-1}
          className="form-success"
          role="status"
        >
          <span className="success-mark" aria-hidden="true">
            ✓
          </span>
          <h3>Thanks, {submittedName}!</h3>
          <p>
            Your message has been recorded in this demo. No email has been sent.
          </p>
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              setSubmittedName("");
              window.requestAnimationFrame(() =>
                formRef.current?.querySelector("input")?.focus(),
              );
            }}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          lang={isMobile ? "pt-BR" : "en"}
          ref={formRef}
          onSubmit={submit}
          noValidate
          aria-labelledby="contact-form-title"
        >
          <h3 id="contact-form-title">Contact us</h3>
          <p className="form-intro">
            <ResponsiveCopy
              english="Fill out the fields and we will get in touch."
              portuguese="Preencha os campos e entraremos em contato."
            />
          </p>
          <div className="form-fields">
            <div className="field">
              <label htmlFor="contact-name">
                <ResponsiveCopy
                  english="Full name"
                  portuguese="Nome completo"
                />
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={isMobile ? "Seu nome" : "Your name"}
                required
                minLength={2}
                maxLength={100}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                onChange={() => {
                  if (errors.name)
                    setErrors((old) => ({ ...old, name: undefined }));
                }}
              />
              {errors.name && (
                <p id="name-error" className="field-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="contact-email">
                <ResponsiveCopy english="Email" portuguese="E-mail" />
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={
                  isMobile ? "seuemail@exemplo.com" : "youremail@example.com"
                }
                required
                maxLength={254}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                onChange={() => {
                  if (errors.email)
                    setErrors((old) => ({ ...old, email: undefined }));
                }}
              />
              {errors.email && (
                <p id="email-error" className="field-error">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="contact-question">
                <ResponsiveCopy
                  english="Your question"
                  portuguese="Sua dúvida"
                />
              </label>
              <textarea
                id="contact-question"
                name="question"
                placeholder={
                  isMobile
                    ? "Conte como podemos ajudar..."
                    : "Tell us how we can help..."
                }
                required
                minLength={10}
                maxLength={3000}
                rows={4}
                aria-invalid={Boolean(errors.question)}
                aria-describedby={
                  errors.question ? "question-error" : undefined
                }
                onChange={() => {
                  if (errors.question)
                    setErrors((old) => ({ ...old, question: undefined }));
                }}
              />
              {errors.question && (
                <p id="question-error" className="field-error">
                  {errors.question}
                </p>
              )}
            </div>
          </div>
          <button
            className="button button-primary w-full"
            type="submit"
            disabled={busy}
            aria-busy={busy}
          >
            {busy ? (
              isMobile ? (
                "Enviando…"
              ) : (
                "Sending…"
              )
            ) : (
              <ResponsiveCopy
                english="Send message"
                portuguese="Enviar mensagem"
              />
            )}
          </button>
        </form>
      )}
    </div>
  );
}
