import { ColoredText } from "@/components/ColoredText";
import { containerClasses } from "@/components/styles/container";
import { EXTERNAL_LINKS, Link } from "@/routing";

/**

I exported the Google doc as HTML, copied the relevant sections here, and then used Cursor change the stuff to make sense.

Here is the prompt that I used (change the examples if needed):


 Do the following:

 1. Find which class is a bold element, and keep a "font-bold" class for those elements. An example is "Arbitration Agreement"
 2. Find which class is an underline element, and keep an "underline" class for those elements. An example is "Informal Process First"
 3. Not text should be deleted, but remove empty things, inline styles, and classes that do nothing.
 4. Change <a> elements to Link elements and update the google links to be relative paths
 5. Change lists to ul and li with 'className="list-disc pl-5 space-y-2"'
 6. Change single list ol + li into a ColoredText component with 'variant="purple"' and the text-2xl or text-4xl class depending on the heading level. For instance, numbered items should have text-4xl. Use text-6xl for the main header. If the elements needs to be bold, add "font-bold" to the class as well.
 7. Change mailto:legal to EXTERNAL_LINKS.legal and a Link component
 8. All links should have classes "text-blue-500 hover:underline" and 'target="_blank' and 'rel="noopener noreferrer"'
 9. Wrap the whole thing in  <div className="flex flex-col gap-16 mb-24"><div className={containerClasses()}>
 10. In the text, change the ' character with "&apos;", the " character with "&quot;"

 */

export default function TrainingGroundRules() {
  return (
    <div className="flex flex-col gap-16 mb-24">
      <div className={containerClasses()}>
        <ColoredText variant="purple" className="text-6xl">
          INK WIZARDING ACADEMY - OFFICIAL RULES
        </ColoredText>

        <p>
          BY PARTICIPATING IN THE ACADEMY, YOU AGREE TO THESE OFFICIAL RULES AND
          THE{" "}
          <Link
            href="/terms"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            INKONCHAIN.COM TERMS OF SERVICE
          </Link>
          , WHICH FORM A CONTRACT. READ THEM CAREFULLY BEFORE ENTERING.
          PURCHASE, PAYMENT, OR FUNDING WILL NOT INCREASE YOUR CHANCES OF
          WINNING.
        </p>

        <p>
          Ink&apos;s Wizarding Academy (&quot;Academy&quot;) is run by Ink
          Foundation, a Cayman Islands foundation company at CO Services Cayman
          Limited, PO Box 10008, Willow House, Cricket Square, Grand Cayman
          KY1-1001, Cayman Islands (&quot;Ink&quot;).
        </p>

        <ColoredText variant="purple" className="text-4xl">
          1. Eligibility to Participate in the Academy
        </ColoredText>

        <p>
          You are eligible to participate in the Academy if, at the time of
          entry and during the Academy, you:
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>Reside in the Eligible Areas identified above;</li>
          <li>Agree to the Inkonchain.com Terms of Service;</li>
          <li>
            Agree to these Rules and meet and comply with any and all applicable
            requirements herein;
          </li>
          <li>
            Are not otherwise ineligible to participate under the Inkonchain.com
            Terms of Service, these Rules, or applicable law.
          </li>
        </ul>

        <p>
          By submitting participating in the Academy, you represent and warrant
          that you meet, and will continue to meet throughout the Academy
          Session, each of the above criteria and are eligible to participate in
          the Academy.
        </p>

        <ColoredText variant="purple" className="text-4xl">
          2. Disqualification
        </ColoredText>

        <p>
          Ink reserves the right to disqualify you if Ink determines, in its
          sole discretion, that you have (A) violated these Rules, including the
          Inkonchain.com Terms of Service or applicable law.
        </p>

        <ColoredText variant="purple" className="text-4xl">
          3. Daap Cosponsors
        </ColoredText>

        <p>
          In the event that an Academy Session is co-sponsored by a Dapp, such
          co-sponsorship does not constitute an endorsement of the Dapp, its
          personnel, or its products or services by Ink. Further, the Daap
          cosponsor will be solely responsible and liable for the determination
          and notification of winners and providing any prizes. As a result, you
          acknowledge and agree that Ink makes no representations or warranties,
          express or implied, regarding any prize and will not be liable for any
          claims, damages, losses, or injuries arising out of or related to the
          receipt, use, or misuse of any prize provided by the Dapp cosponsor.
          Any issues or disputes regarding the prizes must be resolved directly
          with the Dapp cosponsor.
        </p>

        <ColoredText variant="purple" className="text-4xl">
          4. Notification of Winner
        </ColoredText>

        <p>
          If a task requires submission of content for judgment, each
          participant is limited to submitting one eligible entry. Multiple
          submissions will not be considered. Each submission will be judged by
          Ink or the Daap co-sponsor, in its sole discretion, in accordance with
          the judging criteria announced for that task. In the event no criteria
          is mentioned, judging will be based on originality and creativity
          (equally weighted) to determine the winning submission.
        </p>

        <p>
          The winner will be notified via any means of communication provided by
          the participant, which may include direct message on social media
          accounts and email. The winner will be required to provide sufficient
          information to deliver any prize awarded. The recipient of any prize
          acknowledges and agrees that they may be required to submit additional
          documentation to be eligible to receive a prize. Upon confirmation of
          the winner&apos;s compliance with these Rules, the prize will be made
          available to the winner. In the event that a winner cannot be
          contacted, fails to respond within 48 hours of any communication,
          refuses the prize, or fails to provide any information or
          documentation requested by Ink, the winner may be disqualified by Ink
          without further notice and an alternate winner selected.
        </p>

        <ColoredText variant="purple" className="text-4xl">
          5. Consents and Approvals
        </ColoredText>

        <p>
          By entering the Academy, you agree that any content and any other
          information submitted by you or collected by Ink in connection with
          the Academy may be used by Ink, including their affiliated business
          entities. Further, you consent to and opt-in to any communications,
          including marketing communications, from Ink. You give consent for Ink
          and its agents to obtain and deliver your name, address and other
          information to third parties for the purpose of administering this
          Academy and complying with applicable laws, regulations, and rules.
          YOU FURTHER ACKNOWLEDGE THAT IF YOU ARE A WINNER, YOUR IDENTIFYING
          INFORMATION, INCLUDING BUT NOT LIMITED TO YOUR NAME AND ADDRESS, MAY
          BE DISCLOSED TO THIRD PARTIES TO FACILITATE THE PROMOTION AND COMPLY
          WITH APPLICABLE LAW, TAX, AND REPORTING REQUIREMENTS. Except as
          otherwise contemplated in these Rules, Ink will use personal
          information collected in connection with the Academy in accordance
          with its online privacy policy located at{" "}
          <Link
            href="/privacy"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://inkonchain.com/privacy
          </Link>
          .
        </p>

        <ColoredText variant="purple" className="text-4xl">
          6. Disclaimers
        </ColoredText>

        <p>
          Ink is not responsible for any changes or unavailability of your
          internet or any other interference with your ability to access or
          otherwise participate in the Academy, including your ability to timely
          enter, receive notices, or communicate with Ink. Without limiting any
          other provision in these Rules, Ink and Ink Related Parties are not
          responsible or liable for any damage or loss by reason of any acts of
          God, equipment failure, terrorist acts, earthquake, war, fire, flood,
          epidemic, explosion, unusually severe weather, embargo, labor dispute,
          transportation interruption of any kind, civil disturbance, or any
          governmental, federal, state or local government authority action, or
          any other cause, whether or not specifically mentioned above.
        </p>

        <ColoredText variant="purple" className="text-4xl">
          7. Limitation of Liability, Disputes, and Governing Law
        </ColoredText>

        <p>
          By participating in the Academy, you agree to and hereby do release
          and hold harmless Ink and its related parties from any damage, injury,
          death, loss, claim, action, demand, or other liability (collectively,
          &quot;Claims&quot;) that may arise from your acceptance, possession
          and/or use of any prize or your participation in this Academy,
          regardless of whether such Claims, or knowledge of the facts
          constituting such Claims, exist at the time of entry or arise at any
          time thereafter.
        </p>

        <p>
          BY PARTICIPATING IN THE PROMOTION, YOU AGREE THAT TO THE EXTENT
          PERMITTED BY APPLICABLE LAW: (1) ANY AND ALL DISPUTES, CLAIMS AND
          CAUSES OF ACTION THAT CANNOT BE RESOLVED BETWEEN YOU AND Ink, OR THE
          Ink RELATED PARTIES ARISING OUT OF OR CONNECTED WITH THE PROMOTION
          WILL BE RESOLVED INDIVIDUALLY, WITHOUT RESORT TO ANY FORM OF CLASS
          ACTION; (2) ANY AND ALL CLAIMS, JUDGMENTS AND AWARDS WILL BE LIMITED
          TO ACTUAL THIRD-PARTY, OUT-OF-POCKET COSTS INCURRED, (IF ANY), NOT TO
          EXCEED TWENTY FIVE DOLLARS ($25.00), BUT IN NO EVENT WILL
          ATTORNEYS&apos; FEES BE AWARDED OR RECOVERABLE; (3) UNDER NO
          CIRCUMSTANCES WILL YOU BE PERMITTED TO OBTAIN ANY AWARD FOR, AND YOU
          HEREBY KNOWINGLY AND EXPRESSLY WAIVE ALL RIGHTS TO SEEK, PUNITIVE,
          INCIDENTAL, CONSEQUENTIAL OR SPECIAL DAMAGES, LOST PROFITS AND/OR ANY
          OTHER DAMAGES, OTHER THAN ACTUAL OUT-OF-POCKET EXPENSES NOT TO EXCEED
          TWENTY FIVE DOLLARS ($25.00), AND/OR ANY RIGHTS TO HAVE DAMAGES
          MULTIPLIED OR OTHERWISE INCREASED; AND (4) YOUR REMEDIES ARE LIMITED
          TO A CLAIM FOR MONEY DAMAGES (IF ANY) AND YOU IRREVOCABLY WAIVE ANY
          RIGHT TO SEEK INJUNCTIVE OR EQUITABLE RELIEF.
        </p>

        <p>
          Any dispute arising under or related hereto (whether for breach of
          contract, tortious conduct or otherwise) will be governed by the laws
          of England and Wales, without reference to its conflicts of law
          principles. By participating in this Academy, you agree that any
          dispute arising from or relating to this Academy shall be determined
          by confidential binding arbitration only in London, England, by and
          under the LCIA rules, and judgment on the award rendered by the
          arbitrator(s) may be entered in any court having jurisdiction thereof.
          Notwithstanding the foregoing, Ink may seek equitable relief in any
          court of competent jurisdiction. If any provision of these rules is
          held to be illegal or unenforceable, such provision shall be limited
          or eliminated to the minimum extent necessary so that these rules
          otherwise remain in full force and effect and enforceable.
        </p>

        <ColoredText variant="purple" className="text-4xl">
          8. General Rules
        </ColoredText>

        <p>
          Ink reserves the right to modify these Rules in any way or at any
          time. Ink reserves the right, in its sole discretion, to cancel or
          suspend this Academy should viruses, bugs or other causes beyond their
          control corrupt the administration, security or proper operation of
          the Participation. In the event of cancellation or suspension, Ink
          shall promptly post a notice on its website to such effect. Failure to
          enforce any provision of these Rules shall not constitute a waiver of
          that provision. Ink&apos;s decisions will be final in all matters
          relating to the Academy. You waive any right to claim ambiguity in the
          Academy or these Rules. The invalidity or unenforceability of any
          provision of these Rules will not affect the validity or
          enforceability of any other provision. If the Academy is not capable
          of running as planned for any reason, Ink reserves the right, in our
          sole discretion, to cancel, modify or suspend the Academy and
          unilaterally select winners from eligible submissions received prior
          to cancellation, modification, or suspension or as otherwise deemed
          fair and appropriate by Ink.
        </p>

        <ColoredText variant="purple" className="text-4xl">
          9. Dispute Resolution by Binding Arbitration
        </ColoredText>

        <p>
          This Dispute Resolution by Binding Arbitration section is referred to
          in the Terms as the &quot;
          <span className="font-bold">Arbitration Agreement</span>&quot;.
        </p>

        <p className="font-bold">
          PLEASE READ THIS ARBITRATION AGREEMENT CAREFULLY BECAUSE IT REQUIRES
          YOU TO ARBITRATE DISPUTES WITH US AND IT LIMITS THE MANNER IN WHICH
          YOU CAN SEEK RELIEF.
        </p>

        <p className="underline">Informal Process First</p>

        <p>
          We are always interested in resolving disputes amicably and
          efficiently, and most concerns can be resolved quickly and to your
          satisfaction by emailing user support at{" "}
          <Link
            href={EXTERNAL_LINKS.legal}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            legal@inkonchain.com
          </Link>
          . However, if such efforts prove unsuccessful, you may send to us, by
          email, a written Notice of Dispute (&quot;
          <span className="font-bold">Notice</span>&quot;). The Notice should be
          sent to{" "}
          <Link
            href={EXTERNAL_LINKS.legal}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            legal@inkonchain.com
          </Link>{" "}
          and must (a) describe the nature and basis of the claim or dispute and
          (b) set forth the specific relief sought. If we and you do not resolve
          the claim or dispute set out in the Notice within sixty (60) calendar
          days from the date of receipt, we or you may commence an arbitration
          proceeding. It is agreed that this dispute resolution procedure is a
          condition precedent which must be satisfied before initiating
          arbitration.
        </p>

        <p className="underline">Arbitration and its Terms</p>

        <p>
          Subject to the informal process outlined in the preceding paragraph,
          you and us agree to arbitrate any dispute arising in connection with
          these Official Rules (including questions related to their validity,
          existence, or termination), except for disputes in which either party
          seeks equitable and other relief for the alleged unlawful use of
          copyrights, trademarks, trade names, logos, trade secrets or patents.
        </p>

        <p>
          The arbitration will be administered in accordance with the Rules of
          the London Court of International Arbitration then in effect (the
          &quot;
          <span className="font-bold">LCIA Rules</span>&quot;). It will be
          conducted in English and the parties will keep the arbitration
          proceedings confidential and not disclose any information regarding
          the arbitration (or any underlying claim or dispute) to any third
          party except as required by law.
        </p>

        <p>
          Other than class procedures and remedies expressly prohibited by this
          Arbitration Agreement, the arbitrator(s) will have the authority to
          provide any remedy or relief that a court of competent jurisdiction
          could award, including injunctive relief. Any decision or award
          rendered by the arbitrator will be final and binding, and may be
          overturned by a court only for very limited reasons. Any judgment may
          be entered in any court of competent jurisdiction.
        </p>

        <p>
          If there is any inconsistency between any term of the LCIA Rules and
          any term of this Arbitration Agreement, the applicable terms of this
          Arbitration Agreement will control unless the arbitrator determines
          that the application of the inconsistent Arbitration Agreement terms
          would not result in a fundamentally fair arbitration. The arbitrator
          must also follow the provisions of these Terms as a court would.
        </p>

        <p className="font-bold">
          It is expressly agreed that any arbitration under these Official Rules
          will take place on an individual basis – class arbitrations and class
          action are not permitted. You understand that by agreeing to these
          Official Rules, you and us are each waiving the right to trial by jury
          or to participate in a class action or class arbitration.
        </p>

        <p className="underline">Costs of Arbitration</p>

        <p>
          Payment of all filing, administration and arbitrator costs and
          expenses will be governed by the LCIA Rules then in effect, except
          that if you demonstrate that any such costs and expenses owed by you
          under those rules would be prohibitively more expensive than a court
          proceeding, then we will pay the amount of any such costs and expenses
          that the arbitrator determines are necessary to prevent the
          arbitration from being prohibitively more expensive than a court
          proceeding.
        </p>

        <p>
          Fees and costs may be awarded as provided pursuant to applicable law.
          The arbitrator may make rulings and resolve disputes as to the payment
          and reimbursement of fees or expenses at any time during the
          proceeding and upon request from either party made within 14 days of
          the arbitrator&apos;s ruling on the merits.
        </p>

        <p className="underline">Batch Arbitration</p>

        <p>
          To increase the efficiency of administration and resolution of
          arbitrations, you and us agree that in the event that there are
          one-hundred (100) or more individual claims of a substantially similar
          nature filed against us by or with the assistance of the same law
          firm, group of law firms, or organizations, then within a thirty (30)
          day period (or as soon as possible thereafter), the LCIA shall (a)
          administer the arbitration demands in batches of one-hundred (100)
          claims per batch (plus, to the extent there are less than one-hundred
          (100) claims left over after the batching described above, a final
          batch consisting of the remaining claims); (b) appoint one arbitrator
          for each batch; and (c) provide for the resolution of each batch as a
          single consolidated arbitration with one set of filing and
          administrative fees due per side per batch, one procedural calendar,
          one hearing (if any) in a place to be determined by the arbitrator,
          and one final award (&quot;
          <span className="font-bold">Batch Arbitration</span>&quot;). All
          parties agree that claims are of a &quot;substantially similar
          nature&quot; if they arise out of or relate to the same event or
          factual scenario and raise the same or similar legal issues and seek
          the same or similar relief. To the extent the parties disagree on the
          application of the Batch Arbitration process, the disagreeing party
          shall advise the LCIA, and the LCIA shall appoint a sole standing
          arbitrator to determine the applicability of the Batch Arbitration
          process (&quot;
          <span className="font-bold">Administrative Arbitrator</span>&quot;).
          In an effort to expedite resolution of any such dispute by the
          Administrative Arbitrator, the parties agree the Administrative
          Arbitrator may set forth such procedures as are necessary to resolve
          any disputes promptly. The Administrative Arbitrator&apos;s fees shall
          be paid by us. You and us agree to cooperate in good faith with the
          LCIA to implement the Batch Arbitration process including the payment
          of single filing and administrative fees for batches of claims, as
          well as any steps to minimize the time and costs of arbitration, which
          may include: (i) the appointment of a discovery special master to
          assist the arbitrator in the resolution of discovery disputes; and
          (ii) the adoption of an expedited calendar of the arbitration
          proceedings. This Batch Arbitration provision shall in no way be
          interpreted as authorizing a class, collective and/or mass arbitration
          or action of any kind, or arbitration involving joint or consolidated
          claims under any circumstances, except as expressly set forth in this
          provision.
        </p>

        <p className="font-bold">
          Waiver of Right to Bring Class Action and Representative Claims; Jury
          Trial Waiver.
        </p>

        <p>
          WE AND YOU EACH AGREE TO WAIVE ANY RIGHT TO A TRIAL BY JURY. ANY CLAIM
          OR DISPUTE WILL BE DETERMINED BY A NEUTRAL ARBITRATOR AS STIPULATED IN
          THIS ARBITRATION AGREEMENT, NOT A JUDGE OR JURY.
        </p>

        <p>
          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, YOU AND US EACH
          AGREE THAT ANY PROCEEDING TO RESOLVE ANY DISPUTE, CLAIM, OR
          CONTROVERSY WILL BE BROUGHT AND CONDUCTED ONLY IN THE RESPECTIVE
          PARTY&apos;S INDIVIDUAL CAPACITY AND NOT AS PART OF ANY CLASS (OR
          PURPORTED CLASS), CONSOLIDATED, MULTIPLE-PLAINTIFF, OR REPRESENTATIVE
          ACTION OR PROCEEDING (&quot;
          <span className="font-bold">CLASS ACTION</span>&quot;).
        </p>

        <p>
          YOU AND US AGREE TO WAIVE THE RIGHT TO PARTICIPATE AS A PLAINTIFF OR
          CLASS MEMBER IN ANY CLASS ACTION. YOU AND US EXPRESSLY WAIVE ANY
          ABILITY TO MAINTAIN A CLASS ACTION IN ANY FORUM.
        </p>

        <p>
          IF THE DISPUTE IS SUBJECT TO ARBITRATION, THE ARBITRATOR WILL NOT HAVE
          THE AUTHORITY TO COMBINE OR AGGREGATE CLAIMS, CONDUCT A CLASS ACTION,
          OR MAKE AN AWARD TO ANY PERSON OR ENTITY NOT A PARTY TO THE
          ARBITRATION. FURTHER, YOU AND US AGREE THAT THE ARBITRATOR MAY NOT
          CONSOLIDATE PROCEEDINGS FOR MORE THAN ONE PERSON&apos;S CLAIMS, AND IT
          MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A CLASS ACTION (OTHER THAN
          THE BATCH ARBITRATION SPECIFIED ABOVE). FOR THE AVOIDANCE OF DOUBT,
          HOWEVER, YOU CAN SEEK PUBLIC INJUNCTIVE RELIEF TO THE EXTENT
          AUTHORIZED BY LAW AND CONSISTENT WITH THE EXCEPTIONS DESCRIBED ABOVE.
        </p>

        <p>
          IF THIS CLASS ACTION WAIVER IS LIMITED, VOIDED, OR FOUND
          UNENFORCEABLE, THEN, UNLESS THE PARTIES MUTUALLY AGREE OTHERWISE, THE
          PARTIES&apos; AGREEMENT TO ARBITRATE SHALL BE NULL AND VOID WITH
          RESPECT TO SUCH PROCEEDING SO LONG AS THE PROCEEDING IS PERMITTED TO
          PROCEED AS A CLASS ACTION. If a court decides that the limitations of
          this paragraph are deemed invalid or unenforceable, any putative
          class, private attorney general, or consolidated or representative
          action must be brought in a court of proper jurisdiction and not in
          arbitration.
        </p>

        <p className="font-bold">Opt-Out</p>

        <p>
          You have the right to opt-out and not be bound by the Arbitration
          Agreement contained in these Terms by sending written notice of your
          decision to opt-out to{" "}
          <Link
            href={EXTERNAL_LINKS.legal}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            legal@inkonchain.com
          </Link>
          . The notice must be sent to us within thirty (30) days of your first
          registering to use the Services or agreeing to these Terms; otherwise
          you shall be bound to arbitrate disputes on a non-class basis in
          accordance with these Terms. If you opt out of only the arbitration
          provisions, and not also the class action waiver, the class action
          waiver still applies. You may not opt out of only the class action
          waiver and not also the arbitration provisions. If you opt-out of
          these arbitration provisions, we also will not be bound by them.
        </p>
      </div>
    </div>
  );
}
