import { SiteHeader, SiteFooter } from './SiteLayout';
import { ThemeMode } from '../hooks/useTheme';

interface LegalPageProps {
  onBack: () => void;
  onLogin?: () => void;
  onViewTerms: () => void;
  onViewPrivacy: () => void;
  onViewRefund: () => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}

function LegalPageLayout({ 
  title, 
  lastUpdated, 
  children, 
  onBack,
  onLogin,
  onViewTerms,
  onViewPrivacy,
  onViewRefund,
  themeMode,
  onThemeChange
}: { 
  title: string; 
  lastUpdated: string; 
  children: React.ReactNode; 
  onBack: () => void;
  onLogin?: () => void;
  onViewTerms: () => void;
  onViewPrivacy: () => void;
  onViewRefund: () => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col">
      <SiteHeader onHome={onBack} onLogin={onLogin} />

      {/* Content */}
      <div className="flex-1 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">{title}</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Last Updated: {lastUpdated}</p>
          </div>
          
          <div className="prose prose-lg prose-gray dark:prose-invert max-w-none space-y-12">
            {children}
          </div>
        </div>
      </div>

      <SiteFooter 
        onViewTerms={onViewTerms}
        onViewPrivacy={onViewPrivacy}
        onViewRefund={onViewRefund}
        themeMode={themeMode}
        onThemeChange={onThemeChange}
      />
    </div>
  );
}

export function TermsPage(props: LegalPageProps) {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="December 14, 2025" {...props}>
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Welcome to Whispa ("the Service," "we," "us," or "our"). By accessing, browsing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. These Terms constitute a legally binding agreement between you and Whispa Inc. If you do not agree to these Terms, you must immediately cease all use of the Service.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Eligibility and Access</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          The Service is strictly intended for individuals who are 18 years of age or older. By using the Service, you represent and warrant that:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
          <li>You are at least 18 years of age and capable of forming a binding contract.</li>
          <li>You have not been previously suspended or removed from the Service.</li>
          <li>Your use of the Service is in compliance with all applicable local, state, national, and international laws and regulations.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Prohibited Conduct</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          You agree to use the Service only for lawful purposes. You are strictly prohibited from engaging in any of the following activities:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
          <li><strong>Harassment and Abuse:</strong> Engaging in bullying, hate speech, threats, or any form of harassment against other users.</li>
          <li><strong>Illegal Content:</strong> Uploading, sharing, or soliciting content that is illegal, including but not limited to child sexual abuse material (CSAM), non-consensual sexual content, or content promoting terrorism or violence.</li>
          <li><strong>Impersonation:</strong> Falsely representing yourself as another person, entity, or Whispa representative.</li>
          <li><strong>Spam and Solicitations:</strong> Sending unsolicited advertisements, promotional materials, "junk mail," "spam," or any other form of solicitation.</li>
          <li><strong>Technical Harm:</strong> Distributing viruses, malware, or any other harmful computer code, or attempting to interfere with the proper functioning of the Service.</li>
          <li><strong>Data Mining:</strong> Using automated systems (bots, spiders, scrapers) to access the Service or harvest user data.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Intellectual Property Rights</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          The Service and its original content (excluding user-generated content), features, and functionality are and will remain the exclusive property of Whispa Inc. and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Whispa Inc.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. User-Generated Content</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          By submitting, posting, or displaying content on or through the Service, you grant us a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content in any and all media or distribution methods (now known or later developed). You are solely responsible for your use of the Service and for any content you provide, including compliance with applicable laws, rules, and regulations.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Disclaimer of Warranties</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WHISPA INC. MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, REGARDING THE SERVICE, INCLUDING ANY WARRANTY THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Limitation of Liability</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WHISPA INC., ITS AFFILIATES, AGENTS, DIRECTORS, EMPLOYEES, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, THIS SERVICE.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Governing Law</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
        </p>
      </section>
      
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Contact Information</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          If you have any questions about these Terms, please contact us at legal@whispa.com.
        </p>
      </section>
    </LegalPageLayout>
  );
}

export function PrivacyPage(props: LegalPageProps) {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="December 14, 2025" {...props}>
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          At Whispa, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines our practices concerning the collection, use, and disclosure of your information when you use our Service. By using the Service, you consent to the data practices described in this policy.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          We believe in data minimization. We only collect information that is strictly necessary for the operation and security of the Service:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
          <li><strong>Technical Data:</strong> IP addresses, browser type, device information, and operating system version. This data is used for diagnostics, security monitoring, and abuse prevention.</li>
          <li><strong>Usage Data:</strong> Information about how you interact with the Service, such as connection duration, feature usage, and timestamp data.</li>
          <li><strong>Temporary Chat Logs:</strong> For safety and moderation purposes, text chat logs may be temporarily retained by our automated systems to detect and prevent violations of our Terms of Service. These logs are automatically deleted after a short retention period unless flagged for investigation.</li>
          <li><strong>Account Information (Optional):</strong> If you choose to authenticate via a third-party provider (e.g., Google), we may collect your name, email address, and profile picture associated with that account.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Use of Information</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          We use the collected information for the following purposes:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
          <li>To provide, operate, and maintain the Service.</li>
          <li>To match you with other users based on preferences and region.</li>
          <li>To improve, personalize, and expand the Service.</li>
          <li>To detect, prevent, and address technical issues, fraud, and abuse.</li>
          <li>To comply with legal obligations and enforce our Terms of Service.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Data Retention</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          We retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. Technical logs are typically retained for 30 days before being permanently deleted. User accounts that remain inactive for 12 months may be subject to deletion.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Data Security</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          We employ enterprise-grade security measures to protect your data, including encryption in transit (TLS/SSL) and at rest. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Your Data Protection Rights (GDPR/CCPA)</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          Depending on your location, you may have certain rights regarding your personal data, including:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
          <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
          <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
          <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
          <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. International Data Transfers</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction. By using the Service, you consent to this transfer.
        </p>
      </section>
      
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Contact Us</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          If you have any questions about this Privacy Policy, please contact our Data Protection Officer at privacy@whispa.com.
        </p>
      </section>
    </LegalPageLayout>
  );
}

export function RefundPage(props: LegalPageProps) {
  return (
    <LegalPageLayout title="Refund Policy" lastUpdated="December 14, 2025" {...props}>
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. General Policy</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Whispa is currently offered as a free-to-use platform. As such, there are typically no transaction fees or costs associated with standard usage of the Service. However, should we introduce premium features, virtual goods, or subscription services in the future, this Refund Policy will govern those transactions.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Premium Subscriptions</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          In the event that you purchase a premium subscription:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
          <li><strong>14-Day Money-Back Guarantee:</strong> We offer a full refund for any initial subscription purchase within 14 days of the transaction date, provided that you have not significantly utilized the premium features (as determined by our reasonable discretion).</li>
          <li><strong>Cancellations:</strong> You may cancel your subscription at any time. Your cancellation will take effect at the end of the current billing period. There are no partial refunds for unused time in the current billing period.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Virtual Goods and Currency</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          All purchases of virtual goods, coins, or other in-app currencies are final and non-refundable, except as required by applicable law. Unused virtual currency has no real-world monetary value and cannot be exchanged for cash.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Chargebacks and Disputes</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          If you believe a charge was made in error, please contact our support team immediately at support@whispa.com before initiating a chargeback with your bank. We reserve the right to suspend or terminate accounts that initiate unwarranted chargebacks.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Donations</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Donations made to Whispa are considered voluntary gifts to support the development and maintenance of the platform. Donations are non-refundable under any circumstances.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Changes to this Policy</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          We reserve the right to modify this Refund Policy at any time. Any changes will be effective immediately upon posting. Your continued use of the Service after any such changes constitutes your acceptance of the new Refund Policy.
        </p>
      </section>
      
      <section>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Contact Support</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          For any billing-related inquiries or refund requests, please reach out to our billing department at billing@whispa.com. Please include your transaction ID and account details to expedite the process.
        </p>
      </section>
    </LegalPageLayout>
  );
}