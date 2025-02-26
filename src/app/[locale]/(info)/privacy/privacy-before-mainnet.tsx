import { ColoredText } from "@/components/ColoredText";
import { ContactUsPrivacyButton } from "@/components/ContactUsPrivacyButton";
import { EXTERNAL_LINKS, Link } from "@/routing";

export default function PrivacyBeforeMainnet() {
  return (
    <>
      <ColoredText variant="purple" className="text-6xl">
        Ink Privacy Notice
      </ColoredText>
      <div>Last Updated: Oct 24, 2024</div>
      <div>
        Welcome to the Ink privacy notice. We appreciate your trust and take
        your privacy seriously. Please read on to understand how we may collect,
        use, disclose and safeguard your personal data.
      </div>

      <ColoredText variant="purple" className="text-4xl">
        1. Definitions and scope
      </ColoredText>
      <div>
        1.1 “Application and device information” includes information about your
        operating system, the browser type, version and plugins you&apos;re
        using, the network you connect to, your IP address, derived location
        information, and marketing identifiers.
      </div>

      <div>
        1.1 “Blockchain data” means publicly available blockchain data,
        including transaction amounts, wallet addresses, timestamps of
        transactions or events, transaction IDs and digital signatures.
      </div>

      <div>
        1.1 “Child” means a person under the age of 18, collectively “Children”.
      </div>

      <div>
        1.1 “Kraken group companies” refers collectively to Payward, Inc. and
        its subsidiaries, including the entities doing business as Kraken and
        Kraken Wallet.
      </div>

      <div>
        1.1 “Ink” means the Ethereum L2 Blockchain provided by Ink Ltd, and
        includes the Ink Testnet.
      </div>

      <div>
        1.1 “Services” means this Ink website, Ink and any other applications,
        tools and features we operate.
      </div>

      <div>1.1 Wallet address means a public blockchain wallet address.</div>

      <div>1.1 “We”, “us” and “our” means Ink Ltd. </div>

      <div>
        1.1 “You” and “your” means the users and developers of our services, and
        also, as applicable, “users” and “developers”.
      </div>

      <div>
        Please note that this privacy notice describes how we process and
        protect your personal data when you use our services, it does not apply
        to any processing which we carry out as a processor on behalf of users
        and developers who explore and use Ink. As we are not responsible for
        and do not control websites, applications, or services operated by third
        parties, including those that allow you to interact with our services,
        we encourage you to review their privacy notices separately.
      </div>

      <ColoredText variant="purple" className="text-4xl">
        2. Information we collect
      </ColoredText>

      <div>
        We collect the following personal data when providing the services:
      </div>

      <div>
        <b>Information you provide</b>
        <ul className="list-disc pl-5 space-y-2">
          <li>Your wallet address</li>

          <li>Blockchain data</li>

          <li>
            Basic user / developer information shared when signing up to receive
            marketing communications including name and contact information
          </li>

          <li>
            Any user / developer submitted information provided through a form,
            for example a feedback, survey, or bug report form
          </li>

          <li>
            Any information exchanged for user / developer support purposes
          </li>
        </ul>
      </div>

      <div>
        <b>Information collected automatically</b>
        <ul className="list-disc pl-5 space-y-2">
          <li>Application and device information</li>
        </ul>
      </div>

      <div>
        <b>Information obtained from third parties and public sources</b>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Blockchain data: We may collect blockchain data from public sources,
            for example by using blockchain explorers.
          </li>

          <li>
            Analytics information: We may collect information about your website
            usage and interactions from third party analytics providers and
            advertising providers. This includes device information, marketing
            identifiers, browser fingerprint, device information, and IP
            address.
          </li>

          <li>
            Error tracking information: We collect error tracking information
            from third party service providers to provide automated error
            monitoring and error management for the services. This improves the
            services and allows users and developers to more effectively and
            consistently interact with the services.
          </li>
        </ul>
      </div>

      <div>
        <b>Information collected at events</b>

        <ul className="list-disc pl-5 space-y-2">
          <li>
            If we host in person events, we may film, photograph or record parts
            of the event for promotional purposes. For example, we may film a
            presenter speaking to an audience that incidentally captures some
            members of that audience. Please speak to staff at the venue if you
            would like further information.
          </li>
        </ul>
      </div>

      <ColoredText variant="purple" className="text-4xl">
        3. How we use your personal data
      </ColoredText>
      <div>
        We may use your personal data for the following purposes or as otherwise
        described at the point of collection. To the extent legitimate interest
        or performance of a contract is not a recognized legal justification in
        your jurisdiction, we rely on consent (express or implied, as
        appropriate) where consent is required.
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">
                Why we process your personal data
              </th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">
                Information used
              </th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold">
                Legal justification
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-900">
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                To provide our services to you in accordance with our&nbsp;
                <Link
                  className="text-blue-500 hover:underline"
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </Link>
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Wallet address, blockchain data
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Contractual necessity
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                To promote the safety, security and integrity of our services
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Name and contact information, information from analytics
                providers
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Contractual necessity
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-900">
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                To troubleshoot the services and manage any errors arising in
                relation to the services
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Error tracking information
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Legitimate interests
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                To send you surveys
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Name and contact information
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Legitimate interests
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-900">
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                To provide you with technical support
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Questions and responses submitted by users and developers for
                support
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Legitimate interests
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-900">
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                To promote and market our business and events
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Live event recordings and photos
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Legitimate interests
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                To send you marketing communications
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Name and contact information
              </td>
              <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                Consent
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ColoredText variant="purple" className="text-4xl">
        4. Disclosure of your personal data
      </ColoredText>

      <div>
        As part of processing your personal data for the purposes set out above,
        we may disclose your personal data to Kraken group companies and to
        third parties. For example, we may disclose your personal data for
        business or other legitimate purposes to our service providers and
        business partners, such as specialist advisors who have been contracted
        to provide us with administrative, financial, legal, tax, compliance,
        insurance, IT, debt-recovery, analytics, research or other services.
      </div>

      <div>
        If we disclose your personal data to service providers and business
        partners, in order to perform the services requested by clients or to
        comply with our legal and regulatory obligations, such providers and
        partners may store your personal data within their own systems. We
        require them to protect the confidentiality of this personal data, and
        comply with all relevant privacy and data protection laws.
      </div>

      <div>
        We may also disclose personal data when it is compelled by law, for
        example to a government agency as a result of a valid court order. We
        may also disclose your data in the event of a prospective merger,
        acquisition, or sale of all or part of our business or assets.
      </div>

      <ColoredText variant="purple" className="text-4xl">
        5. How long we retain your personal data
      </ColoredText>

      <div>
        When personal data is no longer necessary for the purposes for which it
        may lawfully be processed, we will remove any details that will identify
        you, or we will securely destroy the relevant records.
      </div>

      <div>
        We may need to maintain records for a significant period of time after
        you cease being our client for legal or regulatory reasons, for example
        when we need to retain information to help manage a dispute or legal
        claim.
      </div>

      <ColoredText variant="purple" className="text-4xl">
        6. Children&apos;s personal data
      </ColoredText>

      <div>
        Our products and services are not directed to children and we do not
        knowingly collect personal data from children. If we learn that we have
        inadvertently processed personal data from a child, we will take legally
        permissible measures to remove that data from our records.
      </div>

      <div>
        We will require the child user to close his or her account and will not
        allow the use of our products and services.
      </div>

      <ColoredText variant="purple" className="text-4xl">
        7. Where we store your personal data
      </ColoredText>

      <div>
        Our operations are supported by a network of computers, servers, other
        infrastructure and information technology, and third-party service
        providers.
      </div>

      <div>
        We and our third-party service providers and business partners store and
        process your personal data in the European Union, Japan, Australia, the
        United Kingdom, the United States of America and elsewhere in the world.
        Courts, law enforcement and security agencies of these jurisdictions may
        be able to use legal processes to access your personal data.
      </div>

      <ColoredText variant="purple" className="text-4xl">
        8. For UK & EEA clients: Transfers of personal data outside of the
        European Economic Area (EEA) and the United Kingdom (UK)
      </ColoredText>

      <div>
        We may transfer your personal data outside the EEA and UK to other
        Kraken group companies, service providers and business partners.
        Transfers outside of the EEA or the UK (as appropriate) are done in
        accordance with lawful transfer mechanisms.
      </div>

      <div>
        If personal data is transferred to a country which has been found by the
        European Commission to have an essentially equivalent standard of data
        protection to the EEA, then we may rely on an &apos;adequacy
        decision&apos; to transfer that personal data. See&nbsp;
        <a
          href="https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en#:~:text=The%20European%20Commission%20has%20so,Uruguay%20as%20providing%20adequate%20protection."
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          here
        </a>
        &nbsp;for a list of countries with adequacy decisions. If personal data
        is transferred from the EEA or UK to the US, we may rely on
        <a
          href="https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Standard Contractual Clauses
        </a>
        .
      </div>

      <ColoredText variant="purple" className="text-4xl">
        9. Cookies
      </ColoredText>
      <div>
        When you use our products and services or visit our websites, we may
        place tiny data files called cookies, flash cookies, pixel tags, or
        other tracking tools (herein, “cookies”) on your computer or other
        devices used when engaging with us. We use cookies to help us recognize
        you as a user or developer, collect information about your use of our
        products and services, to better customize our services and content for
        you, and to collect information about your computer or other access
        devices to ensure our compliance with our U.S. Bank Secrecy Act, fraud,
        security, sanctions and AML obligations.
      </div>

      <ColoredText variant="purple" className="text-4xl">
        10. Your rights regarding your personal data
      </ColoredText>
      <div>
        The rights that are available to you in relation to the personal data we
        process are outlined below. You may request to exercise these rights
        subject to any limitations provided for under applicable data protection
        laws.
      </div>
      <div>
        <b>Access</b>
        <div>
          You can ask us to confirm whether we are processing your personal data
          and, if so, what information we process. Should you wish to obtain a
          copy of that information, please&nbsp;
          <ContactUsPrivacyButton text="contact us" />
          &nbsp;.
        </div>
      </div>
      <div>
        <b>Rectification</b>
        <div>
          It is important to us that your personal data is up to date. We will
          take all reasonable steps to make sure that your personal data remains
          accurate, complete and up-to-date. Please inform us if your personal
          data changes. If the personal data we hold about you is inaccurate or
          incomplete, you are entitled to have it rectified. If we have
          disclosed your personal data to others, we will let them know about
          the rectification where possible. If you ask us, and if possible and
          lawful to do so, we will also inform you with whom we have shared your
          personal data.
        </div>
        <div>
          You may inform us at any time if your personal details have changed
          by&nbsp;
          <ContactUsPrivacyButton text="contacting us" />. Subject to applicable
          law, we will update your personal data in accordance with your
          instructions. To proceed with such requests, in some cases we may need
          supporting documents from you as proof, i.e. personal data that we are
          required to keep for regulatory or other legal purposes.
        </div>
      </div>
      <div>
        <b>Erasure</b>
        <div>
          You can ask us to delete or remove your personal data in certain
          circumstances. Such requests may be subject to any retention limits we
          are required to comply with in accordance with applicable laws and
          regulations. If we have disclosed your personal data to others, we
          will let them know about the erasure request where possible. If you
          ask us, and if possible and lawful to do so, we will also inform you
          with whom we have shared your personal data.
        </div>
      </div>
      <div>
        <b>Processing restrictions</b>
        <div>
          You can ask us to block or suppress the processing of your personal
          data in certain circumstances such as if you contest the accuracy of
          that personal data or object to us processing it. It will not stop us
          from storing your personal data. If we have disclosed your personal
          data to others, we will let them know about the restriction of
          processing if possible. If you ask us, and if possible and lawful to
          do so, we will also inform you with whom we have shared your personal
          data.
        </div>
      </div>
      <div>
        <b>Data portability</b>
        <div>
          In certain circumstances you may have the right to obtain personal
          data you have provided to us, in a structured, commonly used and
          machine-readable format, and to re-use it elsewhere or ask us to
          transfer this to a third party of your choice, where technically
          feasible.
        </div>
      </div>
      <div>
        <b>Objection</b>
        <div>
          You can ask us to stop processing your personal data, and we will do
          so, if we are:
        </div>

        <ul className="list-disc pl-5 space-y-2">
          <li>
            Relying on our own or someone else&apos;s legitimate interests to
            process your personal data except if we can demonstrate compelling
            legal grounds for the processing or for the establishment, exercise
            or defence of legal claims;
          </li>
          <li>Processing your personal data for direct marketing; or</li>
          <li>
            Processing your personal data for research unless we reasonably
            believe such processing is necessary for the performance of a task
            carried out for reasons of public interest (such as by a regulatory
            or enforcement agency).
          </li>
        </ul>
      </div>
      <div>
        <b>Automated decision-making and profiling</b>
        <div>
          If we have made a decision about you based solely on an automated
          process (e.g. through automatic profiling) that affects your ability
          to access our services or has another significant effect on you, you
          can request not to be subject to such a decision unless we can
          demonstrate to you that such decision is necessary for entering into,
          or the performance of, a contract between you and us. Even if a
          decision is necessary for entering into or performing a contract, you
          may contest the decision and require human intervention. We may not be
          able to offer our products or services to you, if we agree to such a
          request (i.e. end our relationship with you).
        </div>
      </div>
      <div>
        <b>Complaints</b>
        <div>
          You have the right to complain to a competent data protection
          authority. Contact details are set out in Section 13 below. We ask
          that you first contact us to give us an opportunity to address any
          concerns.
        </div>
      </div>
      <div>
        <b>Withdraw consent</b>
        <div>
          You have the right to withdraw consent to processing based on consent
          at any time. Note this will not affect the lawfulness of processing
          based on consent prior to the withdrawal of consent or on grounds
          where consent is not required.
        </div>
      </div>

      <ColoredText variant="purple" className="text-4xl">
        11. Contact information
      </ColoredText>
      <div>
        Any questions, complaints, comments and requests regarding information
        in this privacy notice are welcome and should be addressed to our
        support team, who can triage questions to our Data Protection Officer as
        appropriate.
      </div>
      <div>
        The fastest and easiest way to connect with our support is through our
        Ink Discord community&nbsp;
        <Link
          className="text-blue-500 hover:underline"
          href={EXTERNAL_LINKS.discord}
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </Link>
        .
      </div>
      <div>
        If this is not a feasible path for you, please&nbsp;
        <ContactUsPrivacyButton text="contact us" />
        &nbsp;through our website.
      </div>

      <ColoredText variant="purple" className="text-4xl">
        12. Changes to this privacy notice
      </ColoredText>
      <div>
        Our privacy notice is reviewed regularly in light of new regulations,
        technologies, and any changes to our business operations. Any personal
        data we process will be governed by our most recent privacy notice. We
        will update the “Last updated” date accordingly at the beginning of this
        privacy notice. Please review this privacy notice from time to time. We
        will announce any material changes to this privacy notice on our
        website.
      </div>

      <ColoredText variant="purple" className="text-4xl">
        13. Privacy when using digital assets and blockchains
      </ColoredText>
      <div>
        Your use of digital assets may be recorded on a public blockchain.
        Public blockchains are distributed ledgers, intended to immutably record
        transactions across wide networks of computer systems. Many blockchains
        are open to forensic analysis which can lead to re-identification of
        transacting individuals and the revelation of personal data, especially
        when blockchain data is combined with other data. As blockchains are
        decentralized or third-party networks which are not controlled or
        operated by Ink Ltd, we are not able to erase, modify, or alter personal
        data on such networks.
      </div>

      <ColoredText variant="purple" className="text-4xl">
        14. Data Protection Authorities
      </ColoredText>
      <div>
        If you are not satisfied with our response to your complaint, you have
        the right to submit a complaint to a competent data protection
        authority. Examples of relevant data protection authorities are listed
        below:
      </div>
      <div>
        <b>For residents of Australia:</b>
        <div>
          Office of the Australian Privacy Commissioner
          <br />
          GPO Box 5218,
          <br />
          Sydney, NSW 2001, Australia
          <br />
          <br />
        </div>
        <b>For residents of Bermuda:</b>
        <div>
          The Office of the Privacy Commissioner
          <br />
          4th Floor Maxwell Roberts Building
          <br />
          1 Church Street
          <br />
          Hamilton, HM11
          <br />
          Bermuda
          <br />
          1-441-543-7748
          <br />
          <br />
        </div>
        <b>For residents of Canada:</b>
        <div>
          Office of the Privacy Commissioner of Canada
          <br />
          30, Victoria Street
          <br />
          Gatineau, QC K1A 1H3, Canada
          <br />
          <br />
        </div>
        <b>For residents of the United Kingdom:</b>
        <div>
          The Information Commissioner&apos;s Office
          <br />
          Wycliffe House, Water Ln
          <br />
          Wilmslow SK9 5AF, UK
          <br />
          <br />
        </div>
        <b>For residents of the European Economic Area:</b>
        <div>
          You may complain to your local supervisory authority or to our lead
          supervisory authority the Irish Data Protection Commission:
          <br />
          <br />
          Data Protection Commission
          <br />
          21 Fitzwilliam Square South
          <br />
          Dublin 2<br />
          D02 RD28
          <br />
          Ireland
          <br />
          <br />
        </div>
      </div>
    </>
  );
}
