import { IMaskInput } from 'react-imask';

import familyGroupImage from 'assets/images/mario-family.png';

import './familyGroup.scss';

export default function FamilyGroup() {
  return (
    <div className="family-group">
      <img
        className="family-group__banner"
        src={familyGroupImage}
        alt="mario family"
      />
      <div className="family-group__title">Enter your family code</div>
      <div>
        <IMaskInput
          mask="aaaa aaaa"
          placeholder="CODE 0000"
          required
          className="primary-input family-group__code"
        />
      </div>

      <div className="family-group__subtitle">
        Don't have a code? <br /> Don't worry, you can create one
      </div>
      <button className="primary-button">Create a family group</button>
    </div>
  );
}
