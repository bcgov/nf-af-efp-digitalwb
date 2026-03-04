// Minimal type definitions for module independence
export interface EFPStep {
  label: string;
  content: string;
  complete?: boolean;
  sectionIndex: number;
  chapterData?: any;
  subchapterData?: any;
  isContainer?: boolean;
  hideSkipChapterCheckbox?: boolean; // If true, the "This section does not apply" checkbox will be hidden
}

export interface EFPActiveContent {
  title: string;
  content: string;
}

export interface EFPSectionItem {
  label: string;
  content?: string;
  complete?: boolean;
  items?: EFPSectionItem[];
  title?: string;
  disableExpand?: boolean; // If true, item will not be expandable even if it has items
  chapterId?: string; // Chapter ID for checking incomplete questions
  chapterData?: any; // Chapter data with questions and subchapters
  subchapterData?: any; // Subchapter data with questions
}

export class EFPRenderUtils {
  static renderMainContent(
    currentSectionIndex: number,
    flatSteps: EFPStep[],
    currentStepIndex: number,
    activeContent: EFPActiveContent,
    html: any,
    unsafeHTML: any,
    renderSubchapter: (subchapterData: any) => any,
    renderChapter: (chapterData: any) => any,
    renderContainerSubchapter: (subchapterData: any) => any,
    renderContainerChapter: (chapterData: any) => any
  ): any {
    // Check if we're in My Workbook (first section) and have a chapter to render
    if (currentSectionIndex === 0) {
      // My Workbook is index 0
      const currentStep = flatSteps[currentStepIndex];

      // Check if it's a container item (should not be selectable)
      if (currentStep && 'isContainer' in currentStep && currentStep.isContainer) {
/*         return html`
          <div class="container-message">
            <h3>Please select a specific chapter section from the navigation</h3>
            <p>This is a chapter container. Click on one of the specific sections in the navigation to view its content.</p>
          </div>
        `; */
        if (currentStep && 'subchapterData' in currentStep) {
          return renderContainerSubchapter(currentStep.subchapterData);
        }
        // Check if it's a main chapter
        else if (currentStep && 'chapterData' in currentStep) {
          return renderContainerChapter(currentStep.chapterData);
        }
      }
      // Check if it's a subchapter
      else if (currentStep && 'subchapterData' in currentStep) {
        return renderSubchapter(currentStep.subchapterData);
      }
      // Check if it's a main chapter
      else if (currentStep && 'chapterData' in currentStep) {
        return renderChapter(currentStep.chapterData);
      }
    }

    // Default content rendering
    return html`<div>${unsafeHTML(activeContent.content)}</div>`;
  }

  /**
   * Check if an item has any questions (directly or in nested subchapters)
   */
  private static hasQuestions(item: EFPSectionItem): boolean {
    // Check direct questions on chapter or subchapter data
    const chapterQuestions = item.chapterData?.questions?.length || 0;
    const subchapterQuestions = item.subchapterData?.questions?.length || 0;

    if (chapterQuestions > 0 || subchapterQuestions > 0) {
      return true;
    }

    // Check nested subchapters in chapter data
    if (item.chapterData?.subchapters) {
      for (const sub of item.chapterData.subchapters) {
        if (sub.questions?.length > 0) {
          return true;
        }
        // Check nested subchapters recursively
        if (sub.subchapters) {
          for (const nestedSub of sub.subchapters) {
            if (nestedSub.questions?.length > 0) {
              return true;
            }
          }
        }
      }
    }

    // Check nested subchapters in subchapter data
    if (item.subchapterData?.subchapters) {
      for (const sub of item.subchapterData.subchapters) {
        if (sub.questions?.length > 0) {
          return true;
        }
      }
    }

    // Check nested items
    if (item.items) {
      for (const childItem of item.items) {
        if (EFPRenderUtils.hasQuestions(childItem)) {
          return true;
        }
      }
    }

    return false;
  }

  static renderItems(
    items: EFPSectionItem[],
    html: any,
    activeContentTitle: string,
    onItemClick: (item: EFPSectionItem) => void,
    renderItems: (items: EFPSectionItem[]) => any,
    getCompletion?: (item: EFPSectionItem) => boolean,
    getSkipped?: (item: EFPSectionItem) => boolean,
    getIncomplete?: (item: EFPSectionItem) => boolean,
    getVisited?: (item: EFPSectionItem) => boolean
  ): any {
    // Pre-compute: check if ANY sibling in this items array has been interacted with
    // (skipped or completed). This indicates the parent level was visited.
    const anySiblingInteracted = items.some((sibling) => {
      const siblingSkipped = getSkipped ? getSkipped(sibling) : false;
      const siblingComplete = getCompletion ? getCompletion(sibling) : false;
      return siblingSkipped || siblingComplete;
    });

    return items.map((item) => {
      const isComplete = getCompletion ? getCompletion(item) : (item.complete || false);
      const isSkipped = getSkipped ? getSkipped(item) : false;
      const hasIncompleteQuestions = getIncomplete ? getIncomplete(item) : false;
      const isVisited = getVisited ? getVisited(item) : false;

      // Check if the item has any questions
      const itemHasQuestions = EFPRenderUtils.hasQuestions(item);

      // For items without questions, also consider them "visited" if any sibling
      // has been skipped or completed (indicates the parent was visited)
      const effectiveIsVisited = isVisited || (!itemHasQuestions && anySiblingInteracted);

      // Determine icon based on state
      // For items WITH questions: skipped > complete > incomplete with unanswered > incomplete
      // For items WITHOUT questions: show edit icon, complete only when visited
      let iconName: string | null = null;
      let iconColor: string = '';
      let useNaIcon = false;

      if (itemHasQuestions) {
        // Standard icon logic for items with questions
        if (isSkipped) {
          useNaIcon = true;
          iconColor = 'var(--sl-color-primary-600)'; // blue - intentional action
        } else if (isComplete) {
          iconName = 'check-circle';
          iconColor = 'var(--sl-color-success-600)'; // green - completed
        } else if (hasIncompleteQuestions) {
          iconName = 'exclamation-circle';
          iconColor = 'var(--sl-color-danger-600)'; // red - has incomplete questions
        } else {
          iconName = 'pencil-square';
          iconColor = 'var(--sl-color-neutral-600)'; // gray - not started/in progress
        }
      } else {
        // For items without questions: show edit icon until visited, then show complete
        if (effectiveIsVisited) {
          iconName = 'check-circle';
          iconColor = 'var(--sl-color-success-600)'; // green - visited/completed
        } else {
          iconName = 'pencil-square';
          iconColor = 'var(--sl-color-neutral-600)'; // gray - not yet visited
        }
      }

      // Determine item capabilities based on content
      const hasContent = item.content && item.content.trim() !== '';
      const hasSubitems = 'items' in item && Array.isArray(item.items) && item.items.length > 0;

      // Check if expansion is disabled
      const isExpandDisabled = item.disableExpand === true;

      // Data URI for the custom "NA" circle SVG icon (Not Applicable)
      const naIconSvg = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7.5" fill="currentColor"/><text x="8" y="8" text-anchor="middle" dominant-baseline="central" fill="white" font-family="Arial,sans-serif" font-size="7.5" font-weight="bold">NA</text></svg>')}`;

      // Helper to render icon conditionally
      const renderIcon = () => {
        if (useNaIcon) {
          return html`
            <sl-icon
              src=${naIconSvg}
              label="Not Applicable"
              style="color: ${iconColor}; font-size: 1.25em; width: 1.25em; height: 1.25em; vertical-align: middle; flex-shrink: 0; position: relative; top: -2px;"
            ></sl-icon>
          `;
        }
        return iconName ? html`
          <sl-icon
            name=${iconName}
            style="color: ${iconColor}"
          ></sl-icon>
        ` : '';
      };

      // If disableExpand is true, render as non-expandable container that clicks first item
      if (isExpandDisabled && hasSubitems) {
        // Get the first item to click when the container is clicked
        const firstItem = item.items![0];
        return html`
          <div
            style="
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 0.75rem 1rem;
              cursor: pointer;
              border: 1px solid var(--sl-color-neutral-200);
              border-radius: var(--sl-border-radius-medium);
              background-color: var(--sl-color-neutral-0);
              margin-bottom: 0.75rem;
              ${activeContentTitle === firstItem.label
                ? 'font-weight: 600; background-color: var(--sl-color-primary-50); color: var(--sl-color-primary-800);'
                : 'font-weight: 500;'}
            "
            @click=${() => onItemClick(firstItem)}
          >
            ${renderIcon()}
            <span>${item.title || item.label}</span>
          </div>
        `;
      }

      if (hasContent && hasSubitems) {
        // BOTH clickable AND expandable - render in one line with sl-details
        return html`
          <sl-details data-container-title="${item.title || item.label}">
            <div
              slot="summary"
              style="display: flex; align-items: center; gap: 8px; cursor: pointer; ${activeContentTitle === item.label
                ? 'font-weight: 600; background-color: var(--sl-color-primary-50); color: var(--sl-color-primary-800);'
                : 'font-weight: 500;'}"
              @click=${(e: Event) => {
                // Prevent expansion when clicking the title for navigation
                e.stopPropagation();
                onItemClick(item);
              }}
            >
              ${renderIcon()}
              <span>${item.title || item.label}</span>
            </div>
            ${EFPRenderUtils.renderItems(item.items || [], html, activeContentTitle, onItemClick, renderItems, getCompletion, getSkipped, getIncomplete, getVisited)}
          </sl-details>
        `;
      } else if (hasSubitems) {
        // Only expandable - pure container
        return html`
          <sl-details data-container-title="${item.title || item.label}">
            <div slot="summary" style="display: flex; align-items: center; gap: 8px;">
              ${renderIcon()}
              <span>${item.title || item.label}</span>
            </div>
            ${EFPRenderUtils.renderItems(item.items || [], html, activeContentTitle, onItemClick, renderItems, getCompletion, getSkipped, getIncomplete, getVisited)}
          </sl-details>
        `;
      } else {
        // Only clickable - simple item
        return html`
          <div
            class="nav-subchapter-title"
            style=${activeContentTitle === item.label
              ? 'font-weight: 600; background-color: var(--sl-color-primary-50); color: var(--sl-color-primary-800);'
              : 'font-weight: 500;'}
            @click=${() => onItemClick(item)}
          >
            ${renderIcon()}
            ${item.label}
          </div>
        `;
      }
    });
  }
}

