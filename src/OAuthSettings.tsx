import React, { SyntheticEvent } from 'react';
import { LegacyForms } from '@grafana/ui';
import { DataSourceSettings } from '@grafana/data';
import { MyDataSourceOptions, MySecureJsonData } from './types';

const { FormField, SecretFormField } = LegacyForms;

type Props = {
  value: DataSourceSettings<MyDataSourceOptions>;
  onChange: (value: DataSourceSettings<MyDataSourceOptions>) => void;
};

export const OAuthSettings = (props: Props) => {
  const { value, onChange } = props;

  return (
    <>
      <h3 className="page-heading">OAuth settings</h3>
      <div className="gf-form-group">
        <OAuthDetails value={value} onChange={onChange} />
      </div>
    </>
  );
};

export const OAuthDetails = (props: Props) => {
  const { value, onChange } = props;

  return (
    <>
      <div className="gf-form-group">
        <div className="gf-form-inline">
          <div className="gf-form">
            <FormField
              label="Host"
              width={50}
              value={value.jsonData.oauthUrl}
              onChange={onChangeHandler('oauthUrl', value, onChange)}
              type="string"
              placeholder="https://sso.wargaming.net/adfs/oauth2/token"
            />
          </div>
        </div>

        <div className="gf-form-inline">
          <div className="gf-form">
            <SecretFormField
              label="User"
              width={30}
              onChange={onSecureChangeHandler('oauthUsername', value, onChange)}
              onReset={onSecureResetHandler('oauthUsername', value, onChange)}
              type="string"
              isConfigured={false}
              placeholder="username@wargaming.net"
            />
          </div>
        </div>

        <div className="gf-form-inline">
          <div className="gf-form">
            <SecretFormField
              label="Password"
              width={30}
              type="string"
              placeholder="*********"
              onChange={onSecureChangeHandler('oauthPassword', value, onChange)}
              onReset={onSecureResetHandler('oauthPassword', value, onChange)}
              isConfigured={false}
            />
          </div>
        </div>

        <div className="gf-form-inline">
          <div className="gf-form">
            <SecretFormField
              label="ClientId"
              width={30}
              type="string"
              placeholder="11111111-2222-3333-4444-555555555555"
              onChange={onSecureChangeHandler('oauthClientId', value, onChange)}
              onReset={onSecureResetHandler('oauthClientId', value, onChange)}
              isConfigured={false}
            />
          </div>
        </div>

        <div className="gf-form-inline">
          <div className="gf-form">
            <FormField
              label="Resource"
              width={50}
              value={value.jsonData.oauthResource}
              onChange={onChangeHandler('oauthResource', value, onChange)}
              type="string"
              placeholder="cmdb.wgprod.net"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const onChangeHandler = (key: keyof MyDataSourceOptions, value: Props['value'], onChange: Props['onChange']) => (
  event: SyntheticEvent<HTMLInputElement | HTMLSelectElement>
) => {
  onChange({
    ...value,
    jsonData: {
      ...value.jsonData,
      [key]: event.currentTarget.value,
    },
  });
};

const onSecureChangeHandler = (key: keyof MySecureJsonData, value: Props['value'], onChange: Props['onChange']) => (
  event: SyntheticEvent<HTMLInputElement | HTMLSelectElement>
) => {
  onChange({
    ...value,
    secureJsonData: {
      ...value.secureJsonData,
      [key]: event.currentTarget.value,
    },
  });
};

const onSecureResetHandler = (key: keyof MySecureJsonData, value: Props['value'], onReset: Props['onChange']) => (
  event: SyntheticEvent<HTMLButtonElement, Event>
) => {
  onReset({
    ...value,
    secureJsonFields: {
      ...value.secureJsonFields,
      [key]: false,
    },
    secureJsonData: {
      ...value.secureJsonData,
      [key]: '',
    },
  });
};
