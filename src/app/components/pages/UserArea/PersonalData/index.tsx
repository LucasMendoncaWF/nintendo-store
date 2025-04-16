import { useEffect, useState } from 'react';

import SelectWithSearch from 'app/components/shared/SelectWithSearch';
import { useGetCountries } from 'app/services/countries';
import { useUserStore } from 'app/stores/userStore';

import './personalData.scss';

export default function PersonalDataForm() {
  const { userData } = useUserStore();
  const [name, setName] = useState('');
  const [country, setCountry] = useState<string | undefined>('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const date = new Date();
  date.setFullYear(date.getFullYear() - 5);
  const maxDate = date.toISOString().split('T')[0];

  const firstDate = new Date();
  firstDate.setFullYear(date.getFullYear() - 100);
  const minDate = firstDate.toISOString().split('T')[0];

  const { data: countries, isLoading, isError } = useGetCountries();

  useEffect(() => {
    userData?.name && setName(`${userData.name} ${userData.lastName}`);
    userData?.country && setCountry(userData.country);
    setBirthday(userData?.birthday_stamp || maxDate);
  }, [userData, maxDate]);

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmitForm}
      className="personal-data d-flex wrap space-between"
    >
      <div className="personal-data__field">
        <label htmlFor="name" className="personal-data__label">
          Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          className="primary-input personal-data__input"
        />
      </div>

      <div className="personal-data__field">
        <label className="personal-data__label">Birthday</label>
        <input
          id="birthday"
          min={minDate}
          max={maxDate}
          type="date"
          aria-label="Date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          name="birthday"
          className="primary-input personal-data__input"
        />
      </div>

      <div className="personal-data__field">
        <label htmlFor="country-field" className="personal-data__label">
          Country
        </label>
        <SelectWithSearch
          values={countries?.map((currCountry) => {
            return {
              name: currCountry?.name?.common,
              value: currCountry?.name?.common,
            };
          })}
          isLoading={isLoading}
          isError={isError}
          inputValue={country}
          onChange={(value) => setCountry(value)}
          name="country-field"
        />
      </div>

      <div className="personal-data__field">
        <label htmlFor="password" className="personal-data__label">
          Password
        </label>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          className="primary-input personal-data__input"
          type="password"
          placeholder="Old password"
        />
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="primary-input personal-data__input"
          type="password"
          placeholder="New password"
        />
      </div>

      <button disabled className="primary-button" type="submit">
        Save
      </button>
      <button
        disabled
        className="personal-data__deactivate secondary-button"
        type="button"
      >
        Deactivate account
      </button>
    </form>
  );
}
