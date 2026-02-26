import { css } from 'lit';

export const efpEntryFormStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@bcgov/bc-sans@2.0.0/css/BCSans.css');

  :host {
    font-family: 'BCSans', 'BC Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --chapter-font: 'Roboto Slab', Georgia, serif;
    --body-font: 'BCSans', 'BC Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    /* BC Gov Design System Color Tokens */
    --bcgov-blue: #003366;
    --bcgov-blue-70: #1a5a96;
    --bcgov-white: #ffffff;
    --bcgov-focus: #3399ff;
    --bcgov-disabled: #757575;
    --bcgov-secondary-hover: #edebe9;
    --bcgov-success: #2e8540;
  }

  /* Global font override for all content */
  :host *,
  :host *::before,
  :host *::after {
    font-family: var(--body-font) !important;
  }

  /* Specific overrides for headings */
  :host h1,
  :host h2,
  :host h3,
  :host h4,
  :host h5,
  :host h6 {
    font-family: var(--chapter-font) !important;
  }

  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap; /* Prevent wrapping to keep sidebar and content side-by-side */
    min-height: 100vh;
    height: auto;
    font-family: var(--body-font);
  }

  /* Custom spacing for navigation collapsible containers */
  sl-details {
    margin-bottom: 0.75rem !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  sl-details::part(base) {
    padding: 0.25rem !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  sl-details::part(header) {
    padding: 0.5rem 0.75rem !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  sl-details::part(content) {
    padding: 0.25rem 0.75rem 0.5rem 0.75rem !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  /* Ensure summary text wraps within container */
  sl-details [slot="summary"] {
    width: 100% !important;
    max-width: 100% !important;
  }

  sl-details [slot="summary"] span {
    display: block;
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.4;
  }

  /* Spacing for standalone navigation items after collapsible containers */
  .nav-subchapter-title {
    margin-top: 0.5rem !important;
  }

  .sidebar,
  navigation-sidebar {
    flex: 0 0 30%;
    width: 30%;
    max-width: 30%;
    padding: 1rem;
    border-right: 1px solid var(--sl-color-neutral-200);
    font-family: var(--body-font);
    min-height: 100vh;
    min-width: 0; /* Allow flex item to shrink below content size */
    overflow-x: hidden; /* Prevent horizontal overflow */
    overflow-y: auto; /* Allow vertical scrolling if needed */
    box-sizing: border-box;
  }

  /* Ensure navigation text wraps within sidebar */
  .sidebar sl-details,
  .sidebar .nav-subchapter-title,
  navigation-sidebar sl-details,
  navigation-sidebar .nav-subchapter-title {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .sidebar sl-details [slot="summary"] span,
  .sidebar .nav-subchapter-title,
  navigation-sidebar sl-details [slot="summary"] span,
  navigation-sidebar .nav-subchapter-title {
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .main-content {
    flex: 1 1 74%; /* Grow, shrink, and set base width to 74% */
    padding: 1rem;
    font-family: var(--body-font);
    min-height: 100vh;
    min-width: 0; /* Critical: allows flex item to shrink below content size */
    overflow-x: auto; /* Allow horizontal scrolling if content is too wide */
  }

  @media (max-width: 992px) {
    .container {
      flex-wrap: wrap; /* Allow wrapping on mobile to stack vertically */
    }

    .sidebar,
    navigation-sidebar {
      order: 2;
      flex: 0 0 100%;
      width: 100%;
      max-width: 100%;
      min-height: auto; /* Remove min-height on mobile to eliminate white space */
      overflow: visible; /* Allow overflow on mobile since it's full width */
    }

    .main-content {
      order: 1;
      flex: 0 0 100%;
      min-height: auto; /* Remove min-height on mobile */
    }
  }

  .card {
    border: 1px solid var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: var(--sl-color-neutral-0);
    font-family: var(--body-font);
    min-width: 0; /* Allow card to shrink */
    overflow-wrap: break-word; /* Break long words if needed */
    word-wrap: break-word; /* Legacy support */
  }

  .card-with-lock {
    position: relative;
  }

  .workbook-lock-indicator {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
  }

  .lock-icon {
    font-size: 1.5rem;
    color: var(--sl-color-warning-600);
    cursor: help;
    transition: color 0.2s ease;
  }

  .lock-icon:hover {
    color: var(--sl-color-warning-700);
  }

  .nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  sl-tab::part(base) {
    display: flex;
    align-items: center;
    font-family: var(--body-font);
    font-weight: 500;
  }

  .question-container {
    margin-bottom: 1.5rem;
    padding: 1.25rem;
    border: 1px solid var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-50);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    font-family: var(--body-font);
    transition: all 0.3s ease;
  }

  .question-container.question-disabled {
    opacity: 0.6;
    background-color: var(--sl-color-neutral-100);
    pointer-events: none;
    user-select: none;
  }

  .question-container.question-highlight {
    background-color: var(--sl-color-warning-100);
    border: 2px solid var(--sl-color-warning-500);
    box-shadow: 0 0 0 3px var(--sl-color-warning-200);
    animation: pulse-highlight 0.5s ease-in-out;
  }

  @keyframes pulse-highlight {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
    100% {
      transform: scale(1);
    }
  }

  .question-label {
    font-family: var(--chapter-font);
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    line-height: 1.4;
    color: var(--sl-color-neutral-900);
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    position: relative;
  }

  .question-label-text {
    flex: 1;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  /* Override inline font-size and background-color in question label content (from CKEditor) */
  .question-label-text *,
  .question-label-text span,
  .question-label-text div,
  .question-label-text b,
  .question-label-text strong,
  .question-label-text i,
  .question-label-text em {
    font-size: 16px !important;
    background-color: transparent !important;
  }

  .question-tooltip-icon {
    color: var(--sl-color-neutral-500);
    cursor: help;
    font-size: 1.25rem !important;
    width: 1.25rem !important;
    height: 1.25rem !important;
    min-width: 1.25rem !important;
    min-height: 1.25rem !important;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /* Align with first line of text (line-height 1.4 * font-size 1.1rem) */
    margin-top: calc((1.4 * 1.1rem - 1.25rem) / 2);
  }

  .question-tooltip-icon:hover {
    color: var(--sl-color-primary-600);
  }

  .question-incomplete-icon {
    color: var(--sl-color-danger-600);
    font-size: 1.25rem !important;
    width: 1.25rem !important;
    height: 1.25rem !important;
    min-width: 1.25rem !important;
    min-height: 1.25rem !important;
    flex-shrink: 0;
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /* Align with first line of text (line-height 1.4 * font-size 1.1rem) */
    margin-top: calc((1.4 * 1.1rem - 1.25rem) / 2);
  }

  .question-text {
    margin-bottom: 1rem;
    color: var(--sl-color-neutral-700);
    font-size: 16px !important;
    line-height: 1.6;
    font-family: var(--body-font);
  }

  /* Override any inline font-size and background-color styles in question text content (from CKEditor) */
  .question-text *,
  .question-text span,
  .question-text div,
  .question-text b,
  .question-text strong,
  .question-text i,
  .question-text em {
    font-size: 16px !important;
    background-color: transparent !important;
  }

  .section-not-applicable {
    margin: -1rem -1rem 1rem -1rem;
    padding: 0.75rem 1rem;
    background-color: var(--sl-color-neutral-50);
    border-bottom: 1px solid var(--sl-color-neutral-200);
  }

  .section-not-applicable sl-checkbox {
    font-family: var(--body-font);
    font-size: 0.95rem;
    color: var(--sl-color-neutral-700);
  }

  .chapter-header {
    background: linear-gradient(135deg, var(--sl-color-primary-50) 0%, var(--sl-color-primary-100) 100%);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: var(--sl-border-radius-medium);
    border-left: 4px solid var(--sl-color-primary-600);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }

  .chapter-header img {
    max-width: 100%;
    height: auto;
  }

  .chapter-header h3 {
    font-family: var(--chapter-font);
    font-weight: 700;
    font-size: 1.75rem;
    color: var(--sl-color-primary-900);
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.025em;
  }

  .subchapter-header {
    background: linear-gradient(135deg, var(--sl-color-neutral-100) 0%, var(--sl-color-neutral-150) 100%);
    padding: 1rem;
    margin: 1.5rem 0;
    border-radius: var(--sl-border-radius-small);
    border-left: 3px solid var(--sl-color-neutral-500);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  }

  .subchapter-header h4 {
    font-family: var(--chapter-font);
    font-weight: 600;
    font-size: 1.35rem;
    color: var(--sl-color-neutral-800);
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.015em;
  }

  .sub-subchapter-header {
    background: linear-gradient(135deg, var(--sl-color-neutral-50) 0%, var(--sl-color-neutral-100) 100%);
    padding: 0.75rem;
    margin: 1rem 0 1rem 1rem;
    border-radius: var(--sl-border-radius-small);
    border-left: 2px solid var(--sl-color-neutral-400);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  }

  .sub-subchapter-header h5 {
    font-family: var(--chapter-font);
    font-weight: 500;
    font-size: 1.15rem;
    color: var(--sl-color-neutral-700);
    margin: 0 0 0.5rem 0;
  }

  .container-message {
    background: linear-gradient(135deg, var(--sl-color-neutral-50) 0%, var(--sl-color-neutral-100) 100%);
    padding: 2rem;
    margin: 2rem 0;
    border-radius: var(--sl-border-radius-medium);
    border: 1px solid var(--sl-color-neutral-200);
    text-align: center;
  }

  .container-message h3 {
    font-family: var(--chapter-font);
    font-weight: 600;
    font-size: 1.25rem;
    color: var(--sl-color-neutral-700);
    margin: 0 0 1rem 0;
  }

  .container-message p {
    font-family: var(--body-font);
    color: var(--sl-color-neutral-600);
    margin: 0;
    line-height: 1.5;
  }

  .question-response {
    margin-top: 1rem;
    font-family: var(--body-font);
  }

  /* Add Note to Action Plan button */
  .question-action-plan-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.75rem;
  }

  .add-note-button,
  .view-actions-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    font-family: var(--body-font);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
  }

  .add-note-button {
    background-color: var(--bcgov-blue, #003366);
    color: var(--bcgov-white, #ffffff);
  }

  .view-actions-button {
    background-color: var(--bcgov-blue, #003366);
    color: var(--bcgov-white, #ffffff);
  }

  .add-note-button:hover:not(:disabled) {
    background-color: var(--bcgov-blue-70, #1a5a96);
    transform: translateY(-1px);
  }

  .view-actions-button:hover:not(:disabled) {
    background-color: var(--bcgov-blue-70, #1a5a96);
    transform: translateY(-1px);
  }

  .add-note-button:active:not(:disabled),
  .view-actions-button:active:not(:disabled) {
    transform: translateY(0);
  }

  .add-note-button:disabled,
  .view-actions-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .add-note-button sl-icon,
  .view-actions-button sl-icon {
    font-size: 1.125rem;
  }

  .view-actions-button sl-badge {
    margin-left: 0.25rem;
  }

  .view-actions-button sl-badge::part(base) {
    background-color: var(--bcgov-white, #ffffff);
    color: var(--bcgov-blue-70, #1a5a96);
    font-weight: 600;
  }

  /* Navigation styling */
  .nav-chapter-title {
    font-family: var(--chapter-font);
    font-weight: 600;
    font-size: 1rem;
    color: var(--sl-color-neutral-800);
  }

  .nav-subchapter-title {
    font-family: var(--body-font);
    font-weight: 500;
    font-size: 1rem;
    color: var(--sl-color-neutral-700);
  }

  /* Consistent icon sizing in navigation */
  .nav sl-icon,
  .nav-chapter-title sl-icon,
  .nav-subchapter-title sl-icon,
  sl-details sl-icon {
    font-size: 1rem !important;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  /* Content area typography */
  .chapter-content h3,
  .subchapter-content h3 {
    font-family: var(--chapter-font) !important;
    font-weight: 600;
    color: var(--sl-color-neutral-800);
    margin-bottom: 0.75rem;
  }

  .chapter-content p,
  .subchapter-content p {
    font-family: var(--body-font) !important;
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
  }

  /* Question content styling - override any inherited fonts */
  .main-content,
  .main-content *,
  .main-content p,
  .main-content div,
  .main-content span,
  .main-content label,
  .main-content input,
  .main-content textarea,
  .main-content select {
    font-family: var(--body-font) !important;
  }

  /* Ensure question text uses BC Sans */
  .main-content h1,
  .main-content h2,
  .main-content h3,
  .main-content h4,
  .main-content h5,
  .main-content h6 {
    font-family: var(--body-font) !important;
  }

  /* Radio buttons and form elements */
  .main-content input[type="radio"],
  .main-content input[type="checkbox"],
  .main-content input[type="text"],
  .main-content textarea,
  .main-content select {
    font-family: var(--body-font) !important;
  }

  /* Question labels and text */
  .main-content .question-label,
  .main-content .question-text {
    font-family: var(--body-font) !important;
  }

  /* Override any external stylesheets for question content */
  .main-content [data-question-content],
  .main-content [data-question-content] *,
  .main-content .question-container,
  .main-content .question-container * {
    font-family: var(--body-font) !important;
  }

  /* Specific overrides for common question elements */
  .main-content strong,
  .main-content b,
  .main-content em,
  .main-content i,
  .main-content span,
  .main-content div {
    font-family: inherit !important;
  }

  /* Ensure all content within main-content respects width constraints */
  .main-content > * {
    min-width: 0; /* Allow children to shrink */
    max-width: 100%; /* Don't exceed parent width */
  }

  /* Ensure paragraphs and text elements wrap properly */
  .main-content p,
  .main-content div,
  .main-content span {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  /* Constrain images within content areas to prevent overflow */
  .main-content img,
  .chapter-content img,
  .subchapter-content img,
  .question-text img,
  .question-container img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Multiline text container and status indicator */
  .multiline-text-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .multiline-text-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -0.25rem;
    gap: 1rem;
  }

  .character-counter {
    font-family: var(--body-font);
    font-size: 0.875rem;
    color: var(--sl-color-neutral-600);
    padding: 0.375rem 0.75rem;
    border-radius: var(--sl-border-radius-small);
    background-color: var(--sl-color-neutral-50);
    border: 1px solid var(--sl-color-neutral-200);
  }

  .character-counter.over-limit {
    color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-300);
    font-weight: 600;
  }

  .multiline-text-status {
    display: flex;
    justify-content: flex-end;
  }

  .status-indicator {
    font-family: var(--body-font);
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
    border-radius: var(--sl-border-radius-small);
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  .status-indicator:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .status-indicator:active {
    transform: translateY(0);
  }

  .status-indicator:focus {
    outline: 2px solid var(--sl-color-primary-600);
    outline-offset: 2px;
  }

  .status-draft {
    background-color: var(--sl-color-warning-100);
    color: var(--sl-color-warning-800);
    border: 1px solid var(--sl-color-warning-300);
  }

  .status-draft:hover {
    background-color: var(--sl-color-warning-200);
    border-color: var(--sl-color-warning-400);
  }

  .status-saving {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-700);
    border: 1px solid var(--sl-color-neutral-300);
    cursor: default;
    pointer-events: none;
  }

  .status-saved {
    background-color: var(--sl-color-success-100);
    color: var(--sl-color-success-800);
    border: 1px solid var(--sl-color-success-300);
    cursor: default;
  }

  .status-saved:hover {
    transform: none;
    box-shadow: none;
  }

  /* Save status indicator for all question types */
  .save-status-indicator {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }

  /* Container for rating questions with status indicator */
  .rating-input-container {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* Validation alert styling */
  sl-alert::part(base) {
    font-family: var(--body-font);
  }

  sl-alert ul {
    font-family: var(--body-font);
  }

  sl-alert a {
    font-family: var(--body-font);
    font-weight: 500;
  }

  sl-alert a:hover {
    color: var(--sl-color-primary-700);
    text-decoration: underline;
  }

  /* BC Gov Primary Button */
  sl-button[variant="primary"]::part(base) {
    background-color: var(--bcgov-blue);
    border-color: var(--bcgov-blue);
    color: var(--bcgov-white);
  }

  sl-button[variant="primary"]:hover::part(base) {
    background-color: var(--bcgov-blue-70);
    border-color: var(--bcgov-blue-70);
  }

  sl-button[variant="primary"]:focus-visible::part(base) {
    outline: 3px solid var(--bcgov-focus);
    outline-offset: 2px;
  }

  sl-button[variant="primary"][disabled]::part(base) {
    background-color: var(--bcgov-disabled);
    border-color: var(--bcgov-disabled);
    opacity: 0.65;
  }

  /* BC Gov Secondary Button */
  sl-button[variant="default"]::part(base) {
    background-color: var(--bcgov-white);
    border-color: var(--bcgov-blue-70);
    color: var(--bcgov-blue-70);
  }

  sl-button[variant="default"]:hover::part(base) {
    background-color: var(--bcgov-secondary-hover);
  }

  sl-button[variant="default"]:focus-visible::part(base) {
    outline: 3px solid var(--bcgov-focus);
    outline-offset: 2px;
  }

  sl-button[variant="default"][disabled]::part(base) {
    opacity: 0.65;
  }

  /* BC Gov Text Button */
  sl-button[variant="text"]::part(base) {
    color: var(--bcgov-blue-70);
  }

  sl-button[variant="text"]:hover::part(base) {
    color: var(--bcgov-blue);
    text-decoration: underline;
  }
`;

