import * as React from 'react';
import { NavArrowDown, Xmark } from 'iconoir-react';
import { cn } from '../utils';
import { focusRing } from '../styles';

// Spec: DESIGN.md `input-default` / `input-focus` / `input-error`
//   bg surface-card-light, text body-md, rounded-full (single-line), padding
//   10px 16px, 1px border-light, placeholder text-muted. Focus: sage-dark border
//   + soft sage ring. Error: status-error border.
//
// Building blocks for forms (contact / request-access):
//   <Field label="Work email" required><TextInput type="email" name="email" /></Field>
//   <Field label="Goal"><TextArea rows={5} /></Field>
//   <Field label="Organization type"><Select options={[...]} /></Field>
//   <Field label="Invite colleagues"><EmailListInput name="colleagues" /></Field>
//   <CheckboxGroup label="Interests" name="interests" options={[...]} />
//
// Multi-line controls (TextArea) use rounded-lg — `rounded-full` is for single-line
// pill inputs only (ARCHITECTURE.md).

const controlBase = cn(
  'w-full bg-surface-card-light text-body-md text-text-primary',
  'border border-border-light placeholder:text-text-muted',
  'transition-[border-color,box-shadow] duration-base ease-standard',
  'focus:outline-none focus:border-sage-dark focus:ring-4 focus:ring-sage-dark/10',
  'aria-[invalid=true]:border-status-error',
  'disabled:opacity-60 disabled:cursor-not-allowed',
);

// ── Field ─────────────────────────────────────────────────────────────────────

export interface FieldProps {
  label: React.ReactNode;
  /** Shows a required marker after the label. */
  required?: boolean;
  /** Helper text (e.g. "Please use your work email address."). */
  hint?: React.ReactNode;
  /** Where the hint sits: under the control (default, keeps side-by-side inputs
   *  aligned) or above it (for longer context that should be read first). */
  hintPosition?: 'below' | 'above';
  /** Error message — replaces nothing, shown under the control in status-error. */
  error?: React.ReactNode;
  /** The control. Its id / aria attributes are wired automatically. */
  children: React.ReactElement;
  className?: string;
}

export const Field = ({ label, required, hint, hintPosition = 'below', error, children, className }: FieldProps) => {
  const id = React.useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const control = React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    id,
    required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': [hintId, errorId].filter(Boolean).join(' ') || undefined,
  });
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <label htmlFor={id} className="text-body-sm text-text-primary">
        {label}
        {required && <span className="text-status-error" aria-hidden="true"> *</span>}
      </label>
      {hint && hintPosition === 'above' && <p id={hintId} className="text-body-sm text-text-secondary -mt-2">{hint}</p>}
      {control}
      {hint && hintPosition === 'below' && <p id={hintId} className="text-body-sm text-text-secondary">{hint}</p>}
      {error && <p id={errorId} className="text-body-sm text-status-error">{error}</p>}
    </div>
  );
};

// ── TextInput ─────────────────────────────────────────────────────────────────

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, type = 'text', ...rest }, ref) => (
    <input ref={ref} type={type} className={cn(controlBase, 'h-44 rounded-full px-16', className)} {...rest} />
  ),
);
TextInput.displayName = 'TextInput';

// ── TextArea ──────────────────────────────────────────────────────────────────

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, rows = 5, ...rest }, ref) => (
    <textarea ref={ref} rows={rows} className={cn(controlBase, 'rounded-lg px-16 py-10 resize-y', className)} {...rest} />
  ),
);
TextArea.displayName = 'TextArea';

// ── Select ────────────────────────────────────────────────────────────────────
// Native <select> (keyboard + mobile pickers for free), styled as a pill input.

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  /** Optional first, empty option (e.g. "Select…"). */
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, ...rest }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(controlBase, 'h-44 rounded-full pl-16 pr-44 appearance-none cursor-pointer', className)}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <NavArrowDown
        width={16}
        height={16}
        strokeWidth={1.5}
        aria-hidden="true"
        className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 text-text-secondary"
      />
    </div>
  ),
);
Select.displayName = 'Select';

// ── Checkbox / CheckboxGroup ──────────────────────────────────────────────────

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...rest }, ref) => (
    <label className={cn('inline-flex items-center gap-10 text-body-md text-text-primary cursor-pointer', className)}>
      <input
        ref={ref}
        type="checkbox"
        className={cn('h-18 w-18 shrink-0 cursor-pointer rounded-md accent-sage-dark', focusRing)}
        {...rest}
      />
      {label}
    </label>
  ),
);
Checkbox.displayName = 'Checkbox';

export interface CheckboxGroupProps {
  label: React.ReactNode;
  name: string;
  options: SelectOption[];
  hint?: React.ReactNode;
  className?: string;
}

export const CheckboxGroup = ({ label, name, options, hint, className }: CheckboxGroupProps) => (
  <fieldset className={cn('flex flex-col gap-6 border-0 p-0 m-0', className)}>
    <legend className="text-body-sm text-text-primary mb-6">{label}</legend>
    {hint && <p className="text-body-sm text-text-secondary -mt-2">{hint}</p>}
    <div className="flex flex-col gap-10">
      {options.map((o) => (
        <Checkbox key={o.value} name={name} value={o.value} label={o.label} />
      ))}
    </div>
  </fieldset>
);

// ── EmailListInput ────────────────────────────────────────────────────────────
// Type an email and press Enter — or type/paste a comma, semicolon or space, or
// leave the field — to add it as a removable chip; Backspace on an empty field
// removes the last one. Each address is submitted as a hidden <input name={name}>
// so FormData.getAll(name) returns the list. Invalid text stays in the field with
// an inline message.

// No whitespace, separators or brackets anywhere in an address.
const EMAIL_RE = /^[^\s@,;<>()]+@[^\s@,;<>()]+\.[^\s@,;<>()]+$/;
const SEPARATORS = /[\s,;]+/;

export interface EmailListInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'defaultValue' | 'onChange'> {
  /** Form field name for the submitted addresses. */
  name: string;
  /** Maximum number of addresses (default 10). */
  max?: number;
  /** Initial addresses. */
  defaultEmails?: string[];
  /** Called whenever the list changes. */
  onEmailsChange?: (emails: string[]) => void;
}

export const EmailListInput = React.forwardRef<HTMLInputElement, EmailListInputProps>(
  ({ className, name, max = 10, defaultEmails = [], onEmailsChange, placeholder = 'Type an email and press Enter', id, ...rest }, ref) => {
    const [emails, setEmails] = React.useState<string[]>(defaultEmails);
    const [draft, setDraft] = React.useState('');
    const [problem, setProblem] = React.useState<string | null>(null);
    const problemId = React.useId();
    const full = emails.length >= max;

    /** Adds complete addresses; returns the ones that couldn't be added. */
    const add = (parts: string[]) => {
      const next = [...emails];
      const invalid: string[] = [];
      let overflow = false;
      for (const raw of parts) {
        const value = raw.trim().toLowerCase();
        if (!value) continue;
        if (!EMAIL_RE.test(value)) invalid.push(raw.trim());
        else if (next.includes(value)) continue;
        else if (next.length >= max) overflow = true;
        else next.push(value);
      }
      if (next.length !== emails.length) {
        setEmails(next);
        onEmailsChange?.(next);
      }
      setProblem(
        invalid.length
          ? `${invalid.map((v) => `“${v}”`).join(', ')} ${invalid.length > 1 ? 'aren’t valid email addresses' : 'isn’t a valid email address'}.`
          : overflow ? `You can add up to ${max} colleagues.` : null,
      );
      return invalid;
    };

    /** Adds whatever is typed (Enter / blur). Invalid text stays for editing. */
    const commit = () => {
      if (!draft.trim()) return;
      const invalid = add(draft.split(SEPARATORS));
      setDraft(invalid.join(', '));
    };

    const onTextChange = (value: string) => {
      if (SEPARATORS.test(value)) {
        // Everything before the last separator is complete; keep the rest typing.
        const parts = value.split(SEPARATORS);
        const rest = parts.pop() ?? '';
        const invalid = add(parts);
        setDraft([...invalid, rest].filter(Boolean).join(', ') + (invalid.length && !rest ? ', ' : ''));
      } else {
        setDraft(value);
        if (problem) setProblem(null);
      }
    };

    const remove = (email: string) => {
      const next = emails.filter((e) => e !== email);
      setEmails(next);
      onEmailsChange?.(next);
    };

    const describedBy = [rest['aria-describedby'], problem ? problemId : undefined].filter(Boolean).join(' ') || undefined;

    return (
      <div className={cn('flex flex-col gap-6', className)}>
        <div
          className={cn(
            'flex w-full flex-wrap items-center gap-6 rounded-lg border bg-surface-card-light px-12 py-6 min-h-44',
            'transition-[border-color,box-shadow] duration-base ease-standard',
            'focus-within:border-sage-dark focus-within:ring-4 focus-within:ring-sage-dark/10',
            problem || rest['aria-invalid'] ? 'border-status-error' : 'border-border-light',
          )}
        >
          {emails.map((email) => (
            <span key={email} className="inline-flex h-28 max-w-full items-center gap-4 rounded-full bg-tierra-200 pl-12 pr-6 text-body-sm text-text-primary">
              <span className="truncate">{email}</span>
              <button
                type="button"
                onClick={() => remove(email)}
                aria-label={`Remove ${email}`}
                className={cn('inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full hover:bg-tierra-500/30', focusRing)}
              >
                <Xmark width={14} height={14} strokeWidth={1.5} aria-hidden="true" />
              </button>
              <input type="hidden" name={name} value={email} />
            </span>
          ))}
          <input
            ref={ref}
            id={id}
            type="text"
            inputMode="email"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            value={draft}
            disabled={full}
            placeholder={full ? `Up to ${max} colleagues` : emails.length ? 'Add another' : placeholder}
            onChange={(e) => onTextChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // add the address instead of submitting the form
                commit();
              } else if (e.key === 'Backspace' && !draft && emails.length) {
                remove(emails[emails.length - 1]);
              }
            }}
            onBlur={commit}
            {...rest}
            aria-describedby={describedBy}
            aria-invalid={problem ? true : rest['aria-invalid']}
            className="h-32 basis-1/3 grow bg-transparent text-body-md text-text-primary placeholder:text-text-muted focus:outline-none disabled:cursor-not-allowed"
          />
        </div>
        {problem && <p id={problemId} className="text-body-sm text-status-error">{problem}</p>}
      </div>
    );
  },
);
EmailListInput.displayName = 'EmailListInput';
