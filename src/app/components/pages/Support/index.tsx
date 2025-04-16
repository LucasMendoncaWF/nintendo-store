import Accordion from './Accordion';
import ContactForm from './ContactForm';
import './support.scss';

export default function Support() {
  return (
    <div className="support-page d-flex space-between">
      <div className="faq support-page__container">
        <span className="support-page__title">Frequently asked questions</span>
        <div className="support-page__content">
          <Accordion title="Where can I buy a Nintendo Switch?">
            You can buy a nintendo switch in any game store near you, or on a
            trusted e-commerce, like Amazon.
          </Accordion>
          <Accordion title="How do I earn coins?">
            Maecenas velit lorem, pellentesque sit amet suscipit sed, pretium
            vel magna. Fusce non metus vel sem rhoncus dictum.
          </Accordion>
          <Accordion title="I Can't access my account">
            Curabitur vehicula risus et justo cursus, vitae dignissim augue
            vestibulum. Sed malesuada luctus nisl vitae molestie. Quisque quis
            convallis purus, id consectetur ante.
          </Accordion>
          <Accordion title="How can I develop games to Nintendo Switch?">
            Vivamus urna leo, hendrerit in purus malesuada, suscipit sagittis
            elit. Integer ante magna, bibendum quis libero at, elementum ornare
            erat. Donec eu tincidunt nisl.
          </Accordion>
          <Accordion title="Problems with payment">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices
            ex fringilla velit placerat, non tincidunt sapien maximus. Nam
            viverra dui id ante lacinia venenatis
          </Accordion>
        </div>
      </div>
      <div className="support-page__container">
        <span className="support-page__title">Send us a message!</span>
        <ContactForm />
      </div>
    </div>
  );
}
