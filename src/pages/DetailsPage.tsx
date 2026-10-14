import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "../components/SiteHeader/SiteHeader";
import { useQuiz } from "../context/QuizContext";
import { privacyNotice } from "../data/privacyNotice";
import {
  validateParticipant,
  type ParticipantErrors,
  type ParticipantField,
  type ParticipantFormValues,
} from "../lib/participant";

const TEXT_FIELDS: {
  field: ParticipantField;
  type: "text" | "email";
  autoComplete: string;
}[] = [
  { field: "name", type: "text", autoComplete: "name" },
  { field: "company", type: "text", autoComplete: "organization" },
  { field: "email", type: "email", autoComplete: "email" },
];

const FIELD_ORDER = [
  "name",
  "company",
  "email",
  "personalDataConsent",
] as const;

const emptyValues: ParticipantFormValues = {
  name: "",
  company: "",
  email: "",
  personalDataConsent: false,
  marketingOptIn: false,
};

export function DetailsPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const [values, setValues] = useState<ParticipantFormValues>(
    () => state.participant ?? emptyValues,
  );
  const [errors, setErrors] = useState<ParticipantErrors>({});

  const update = <K extends keyof ParticipantFormValues>(
    key: K,
    value: ParticipantFormValues[K],
  ) => setValues((current) => ({ ...current, [key]: value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateParticipant(values);
    if (!validation.ok) {
      setErrors(validation.errors);
      const firstInvalid = FIELD_ORDER.find((key) => validation.errors[key]);
      const element = firstInvalid
        ? event.currentTarget.elements.namedItem(firstInvalid)
        : null;
      if (element instanceof HTMLElement) element.focus();
      return;
    }
    setErrors({});
    dispatch({ type: "register", participant: validation.participant });
    navigate("/quiz");
    window.scrollTo?.(0, 0);
  };

  const describedBy = (key: (typeof FIELD_ORDER)[number]) =>
    errors[key] ? `${key}-error` : undefined;

  return (
    <div className="page page--details">
      <SiteHeader />
      <main id="main-content" className="details-shell">
        <h1 className="details-title">{privacyNotice.heading}</h1>
        <p className="details-intro">{privacyNotice.introduction}</p>
        <form className="details-form" onSubmit={submit} noValidate>
          {TEXT_FIELDS.map(({ field, type, autoComplete }) => (
            <div className="form-field" key={field}>
              <label htmlFor={field}>{privacyNotice.fields[field]}</label>
              <input
                id={field}
                name={field}
                type={type}
                autoComplete={autoComplete}
                inputMode={type === "email" ? "email" : undefined}
                required
                value={values[field]}
                onChange={(event) => update(field, event.target.value)}
                aria-invalid={errors[field] ? true : undefined}
                aria-describedby={describedBy(field)}
              />
              {errors[field] && (
                <p className="form-error" id={`${field}-error`}>
                  {privacyNotice.errors[errors[field]]}
                </p>
              )}
            </div>
          ))}

          <p className="privacy-notice">{privacyNotice.notice}</p>

          <div className="form-check">
            <input
              id="personalDataConsent"
              name="personalDataConsent"
              type="checkbox"
              required
              checked={values.personalDataConsent}
              onChange={(event) =>
                update("personalDataConsent", event.target.checked)
              }
              aria-invalid={errors.personalDataConsent ? true : undefined}
              aria-describedby={describedBy("personalDataConsent")}
            />
            <label htmlFor="personalDataConsent">
              {privacyNotice.personalDataConsent}
            </label>
            {errors.personalDataConsent && (
              <p className="form-error" id="personalDataConsent-error">
                {privacyNotice.errors[errors.personalDataConsent]}
              </p>
            )}
          </div>

          <div className="form-check">
            <input
              id="marketingOptIn"
              name="marketingOptIn"
              type="checkbox"
              checked={values.marketingOptIn}
              onChange={(event) =>
                update("marketingOptIn", event.target.checked)
              }
            />
            <label htmlFor="marketingOptIn">
              {privacyNotice.marketingOptIn}
            </label>
          </div>

          <button type="submit" className="button details-submit">
            {privacyNotice.submit}
            <span aria-hidden="true"> →</span>
          </button>
        </form>
      </main>
    </div>
  );
}
