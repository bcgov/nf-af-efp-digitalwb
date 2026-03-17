import '@shoelace-style/shoelace/dist/components/details/details.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import { LitElement } from 'lit';
import './NavigationButtons';
import './RatingQuestion';
import './EFPBreadcrumbs';
import './WorkbookSignOffButtons';
import './ActionPlanTable';
import './ProgressHeader';
import './NavigationSidebar';
import './QuestionRenderer';
import './WorkbookSearchDialog';
interface EFPActiveContent {
    title: string;
    content: string;
}
export declare class EFPEntryForm extends LitElement {
    private services;
    currentSectionIndex: number;
    currentStepIndex: number;
    nestedChapterStructure: any[];
    workbookResponses: any[];
    isLoadingResponses: boolean;
    questionnaireStoreLoaded: boolean;
    questionsAndResponsesLoaded: boolean;
    workbookLocked: boolean;
    showValidationAlert: boolean;
    hasTriedToSubmit: boolean;
    incompleteChapters: Array<{
        chapterId: string;
        chapterName: string;
        totalQuestions: number;
        answeredQuestions: number;
    }>;
    responseUpdateCounter: number;
    currentCompletionPercentage: number;
    /**
     * Controls whether the form uses full-width layout (true) or narrow/constrained layout (false).
     * Set to true to expand the form to use the entire window width.
     * Set to false to use the default narrow layout constrained by parent containers.
     */
    fullWidthLayout: boolean;
    private isNavigating;
    private pendingURLNavigation;
    private hasAppliedURLNavigation;
    private myActionPlanPortalPageLoaded;
    activeContent: EFPActiveContent;
    tabGroupEl: HTMLElement & {
        show: (tabName: string) => void;
    };
    actionPlanTableEl: HTMLElement & {
        openCreateDialogWithSelection: (chapterId: string, questionId: string) => void;
        getActionPlanCountForQuestion: (questionId: string) => number;
        getActionPlansForQuestion: (questionId: string) => any[];
        openViewActionsDialog: (questionId: string) => void;
    };
    searchDialogEl: HTMLElement & {
        show: () => void;
        hide: () => void;
    };
    constructor();
    connectedCallback(): void;
    /**
     * Updates the layout mode based on the fullWidthLayout property.
     * Call this when the property changes to switch between layouts.
     */
    private updateLayoutMode;
    /**
     * Applies full-width layout by modifying parent container styles.
     * This breaks out of Bootstrap/portal container constraints.
     */
    private applyFullWidthLayout;
    /**
     * Removes full-width layout and restores default narrow layout.
     */
    private removeFullWidthLayout;
    /**
     * Sets or clears inline styles on parent container elements.
     * @param fullWidth - If true, applies full-width styles; if false, clears them.
     */
    private setParentContainerStyles;
    private handleServiceResponseSaved;
    private handleServiceResponseChanged;
    private handleServiceSaveStatusChanged;
    private handleServiceMultilineStatusChanged;
    private handleServiceChapterSkippedChanged;
    private handleServiceWorkbookStateChanged;
    private handleServiceNavigationChanged;
    private handleStatsUpdated;
    disconnectedCallback(): void;
    private handleSignOffChanged;
    private handleActionPlansUpdated;
    private handleGlobalKeyDown;
    private handleLayoutToggle;
    private handlePopState;
    private openSearchDialog;
    private handleSearchNavigate;
    private updateQuestionnaireStoreStatus;
    private applyPendingURLNavigation;
    private handleStoreStateChange;
    private refreshActiveContentForMyActionPlan;
    private setupQuestionnaireStoreWatcher;
    private isWorkbookLocked;
    private getPASigned;
    private getProducerSigned;
    private updateWorkbookLockStatus;
    private refreshWorkbookData;
    private canAccessReviewAndSubmit;
    private showIncompleteQuestionsAlert;
    private hideValidationAlert;
    static styles: import("lit").CSSResult;
    private get sections();
    private renderQuestion;
    private handleMultiselectChangedEvent;
    private handleMultilineTextInputEvent;
    private handleForceSaveEvent;
    private handleAddNoteToActionPlanEvent;
    private handleViewExistingActionsEvent;
    private renderSectionNotApplicableCheckbox;
    private renderLockIcon;
    private isChapterSkipped;
    private isQuestionDisabled;
    private _isChapterSkippedById;
    private isSkippingPrevented;
    private getCurrentChapterId;
    private getQuestionsForCurrentChapter;
    private handleChapterSkippedChange;
    private renderSubchapter;
    private renderContainerSubchapter;
    private renderSubSubchapter;
    private renderChapter;
    private renderContainerChapter;
    private renderMainContent;
    private getSectionBItemsFromStore;
    private getSectionCItemsFromPortalPage;
    private getCompletionContext;
    private getCompletionFromStore;
    private getSectionCompletionFromStore;
    private getSectionSkippedFromStore;
    updateNestedChapterStructure(nestedStructure: any[]): void;
    private get completionPercent();
    private getNavigationContext;
    private applyNavigationResult;
    private goToNext;
    private _findNextRequiredStep;
    private handleNavigationPrevious;
    private handleNavigationSkip;
    private handleNavigationContinue;
    private get isContinueButtonDisabled();
    private get isOnTermsAndConditionsPage();
    private handleSectionChange;
    private handleRatingChanged;
    private getActionPlanCount;
    private handleAddNoteToActionPlan;
    private handleViewExistingActions;
    private handleMultiselectChange;
    private handleMultilineTextInput;
    private handleForceSave;
    private scrollContentToTop;
    private handleItemClick;
    private updateNavigationState;
    private goToPrevious;
    private get flatSteps();
    private initializeToFirstSelectableStep;
    private handleBreadcrumbNavigation;
    private navigateToHome;
    private navigateToSection;
    private navigateToHierarchyItem;
    private renderItems;
    private _hasIncompletePreventSkippingChildren;
    private getSkippedFromStore;
    private getIncompleteFromStore;
    /**
     * Mark a chapter (and optionally its parents) as visited.
     * This is used for chapters without questions to determine their completion status.
     */
    private markChapterAsVisited;
    /**
     * Check if a chapter or any of its subchapters have been visited.
     * Also checks if any sibling has been interacted with (skipped or has responses),
     * which indicates the parent was visited at some point.
     * Used to determine whether to show edit or complete icon for chapters without questions.
     */
    private getVisitedFromStore;
    /**
     * Check if a chapter has been interacted with (has any questions skipped or answered).
     * This is used to determine if siblings of a no-question chapter have been touched,
     * indicating the parent was visited.
     */
    private hasChapterBeenInteractedWith;
    updated(changedProps: Map<string, unknown>): void;
    firstUpdated(): void;
    willUpdate(changedProps: Map<string, unknown>): void;
    private loadWorkbookResponses;
    private syncFromPOWERPOD;
    private updateCompletionAndNavigation;
    private updateSectionCompletionStatus;
    private updateSectionItemsFromQuestionnaireStore;
    private updateSectionItemsFromStore;
    private updateSectionItemsCompletion;
    private getAllLeafItems;
    getResponseForQuestion(questionId: string): any | null;
    getQuestionForQuestion(questionId: string): any | null;
    getQuestionAndResponse(questionId: string): {
        question: any | null;
        response: any | null;
    };
    renderResponseInfo(questionId: string): string;
    renderResponsesSummary(): string;
    private getSectionCompletionMap;
    private getSectionSkippedMap;
    private handleSidebarSectionChange;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
