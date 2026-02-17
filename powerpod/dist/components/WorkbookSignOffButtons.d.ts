/**
 * WorkbookSignOffButtons Component
 *
 * Provides sign-off functionality for PA (Planning Advisor) and Producer roles.
 *
 * DEBUG MODE:
 * For testing purposes, you can enable debug mode to bypass the Draft status requirement
 * and override user roles for testing sign-off functionality.
 *
 * In the browser console, run:
 *   - enableSignOffDebugging()      // Allows sign-off in Draft status
 *   - disableSignOffDebugging()     // Restores normal Draft status requirement
 *   - setSignOffRole('producer')    // Show PA status only (no button)
 *   - setSignOffRole('advisor')     // Show PA status with sign-off button
 *   - setSignOffRole('both')        // Show PA status with sign-off button
 *   - setSignOffRole('none')        // Hide all sign-off UI
 *   - resetSignOffRole()            // Restore actual user roles
 *   - forceClearSignOff()           // Force clear PA sign-off via API (for testing)
 *   - getSignOffDebugStatus()       // Display current debug settings
 */
import { LitElement } from 'lit';
declare global {
    interface Window {
        enableSignOffDebugging: () => void;
        disableSignOffDebugging: () => void;
        setSignOffRole: (role: 'producer' | 'advisor' | 'both' | 'none') => void;
        resetSignOffRole: () => void;
        getSignOffDebugStatus: () => void;
        forceClearSignOff: () => Promise<void>;
    }
}
export declare class WorkbookSignOffButtons extends LitElement {
    private paSigned;
    private producerSigned;
    private isLoading;
    private showPAButton;
    private showProducerButton;
    private showPAStatus;
    private workbookStatus;
    static styles: import("lit").CSSResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleWorkbookDataRefreshed;
    private checkUserRoles;
    private loadSignOffData;
    /**
     * Check if PA sign-off button should be enabled
     * Enable sign-off only when:
     * - Workbook in Assigned status OR Producer Signed status (meaning Producer has signed)
     *
     * Disable sign-off for:
     * - Workbook in Draft status (unless debug mode is enabled)
     * - PA Signed (for the PA - they already signed)
     * - Workbook in Completed status
     * - Workbook in Expired status
     */
    private canPASignOff;
    private handlePASignOff;
    private handleSignOff;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'workbook-sign-off-buttons': WorkbookSignOffButtons;
    }
}
