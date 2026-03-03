import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('navigation-buttons')
export class NavigationButtons extends LitElement {
  @property({ type: Boolean }) isPreviousDisabled = false;
  @property({ type: Boolean }) isContinueDisabled = false;
  @property({ type: Number }) sectionsLength = 0;

  static styles = css`
    /* BC Gov Design System Color Tokens */
    :host {
      --bcgov-blue: #003366;
      --bcgov-blue-70: #1a5a96;
      --bcgov-white: #ffffff;
      --bcgov-focus: #3399ff;
      --bcgov-disabled: #757575;
      --bcgov-secondary-hover: #edebe9;
    }

    .navigation-card {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-bottom: 1rem;
      align-items: center;
      padding: 1rem;
      background: var(--sl-color-neutral-0);
      border: 1px solid var(--sl-color-neutral-200);
      border-radius: var(--sl-border-radius-medium);
      box-shadow: var(--sl-shadow-x-small);
    }

    /* BC Gov Primary Button - Continue */
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

    /* BC Gov Secondary Button - Previous */
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

    /* BC Gov Text Button - Skip */
    sl-button[variant="text"]::part(base) {
      color: var(--bcgov-blue-70);
    }

    sl-button[variant="text"]:hover::part(base) {
      color: var(--bcgov-blue);
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .navigation-card {
        flex-direction: column;
        gap: 0.5rem;
      }

      sl-button {
        width: 100%;
      }
    }
  `;

  private handlePrevious() {
    this.dispatchEvent(new CustomEvent('previous-clicked', {
      bubbles: true,
      composed: true
    }));
  }

  private handleSkip() {
    this.dispatchEvent(new CustomEvent('skip-clicked', {
      bubbles: true,
      composed: true,
      detail: { sectionIndex: this.sectionsLength - 1 }
    }));
  }

  private handleContinue() {
    this.dispatchEvent(new CustomEvent('continue-clicked', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="navigation-card">
        <sl-button
          variant="primary"
          size="large"
          @click=${this.handleSkip}
        >
          Next Unanswered Question
        </sl-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'navigation-buttons': NavigationButtons;
  }
}
