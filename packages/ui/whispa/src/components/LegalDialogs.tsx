import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface LegalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TermsDialog({ open, onOpenChange }: LegalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800" aria-describedby="terms-description">
        <DialogHeader className="p-6 pb-2 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <DialogTitle className="text-2xl font-bold">Terms of Service</DialogTitle>
          <DialogDescription id="terms-description">
            Last updated: December 14, 2025
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">1. Acceptance of Terms</h3>
            <p>
              By accessing and using Whispa ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">2. Eligibility</h3>
            <p>
              You must be at least 18 years old to use the Service. By using the Service, you represent and warrant that you are at least 18 years of age.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">3. User Conduct</h3>
            <p>
              You agree not to use the Service for any unlawful purpose or in any way that interrupts, damages, or impairs the service. Prohibited conduct includes, but is not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Harassment, bullying, or threatening behavior.</li>
              <li>Sharing illegal content or content that promotes illegal acts.</li>
              <li>Spamming or sending unsolicited promotional material.</li>
              <li>Impersonating others or misrepresenting your identity.</li>
              <li>Attempting to bypass security measures.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">4. Content and Moderation</h3>
            <p>
              We do not claim ownership of content you share, but you grant us a license to transmit it. We reserve the right to terminate access for users who violate these terms. We are not responsible for content shared by users.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">5. Disclaimer of Warranties</h3>
            <p>
              The Service is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted or error-free.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">6. Limitation of Liability</h3>
            <p>
              In no event shall Whispa be liable for any indirect, incidental, special, consequential or punitive damages arising out of or related to your use of the Service.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">7. Changes to Terms</h3>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the Service constitutes acceptance of the modified terms.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function PrivacyDialog({ open, onOpenChange }: LegalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800" aria-describedby="privacy-description">
        <DialogHeader className="p-6 pb-2 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <DialogTitle className="text-2xl font-bold">Privacy Policy</DialogTitle>
          <DialogDescription id="privacy-description">
            Last updated: December 14, 2025
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">1. Information We Collect</h3>
            <p>
              We prioritize your anonymity. We collect the minimum amount of information necessary to operate the Service:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Connection metadata (time, duration of chats).</li>
              <li>Temporary chat logs for moderation purposes (deleted automatically after a short period).</li>
              <li>Preferences you save locally (theme, sound settings).</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">2. How We Use Information</h3>
            <p>
              We use the information to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Connect you with other users.</li>
              <li>Maintain and improve the Service.</li>
              <li>Enforce our Terms of Service and prevent abuse.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">3. Data Sharing</h3>
            <p>
              We do not sell your personal data. We may share information with law enforcement if required by law or to protect the safety of our users.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">4. Cookies and Local Storage</h3>
            <p>
              We use local storage on your device to remember your preferences (e.g., dark mode, sound settings) and to maintain your session state.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">5. Security</h3>
            <p>
              We implement reasonable security measures to protect your data. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">6. Third-Party Links</h3>
            <p>
              The Service may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">7. Children's Privacy</h3>
            <p>
              The Service is not intended for children under 18. We do not knowingly collect personal information from children.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function RefundDialog({ open, onOpenChange }: LegalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800" aria-describedby="refund-description">
        <DialogHeader className="p-6 pb-2 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <DialogTitle className="text-2xl font-bold">Refund Policy</DialogTitle>
          <DialogDescription id="refund-description">
            Last updated: December 14, 2025
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">1. Free Service</h3>
            <p>
              Whispa is currently provided as a free service. There are no subscription fees or charges for basic usage.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">2. Premium Features</h3>
            <p>
              If we introduce premium paid features in the future, specific refund terms will be provided at the point of purchase.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">3. Donations</h3>
            <p>
              Any donations made to support the development of Whispa are non-refundable.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">4. Contact Us</h3>
            <p>
              If you have any questions about our policies, please contact our support team.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
