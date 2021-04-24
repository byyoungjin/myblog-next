import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
// To federated sign in from Google
const SignInWithGoogle = () => {
  useEffect(() => {
    const ga =
      window.gapi && window.gapi.auth2
        ? window.gapi.auth2.getAuthInstance()
        : null;

    if (!ga) createScript();
  }, []);

  const signIn = () => {
    const ga = window.gapi.auth2.getAuthInstance();

    ga.signIn().then(
      (googleUser) => {
        console.log(`googleUser`, googleUser);
        getAWSCredentials(googleUser);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getAWSCredentials = async (googleUser) => {
    console.log('gothere');
    const { id_token, expires_at } = googleUser.getAuthResponse();
    console.log(`id_token`, id_token);
    console.log('after auth');
    const profile = googleUser.getBasicProfile();
    let user = {
      email: profile.getEmail(),
      name: profile.getName(),
    };

    const credentials = await Auth.federatedSignIn(
      'google',
      { token: id_token, expires_at },
      user
    );
    console.log('credentials', credentials);
  };

  const createScript = () => {
    // load the Google SDK
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.onload = initGapi;
    document.body.appendChild(script);
  };

  const initGapi = () => {
    // init the Google SDK client
    const g = window.gapi;
    g.load('auth2', function () {
      g.auth2.init({
        client_id:
          '979697303784-q1qbvunqvg0u621tu8h2hangqmji6sc1.apps.googleusercontent.com',

        // authorized scopes
        scope: 'profile email openid',
      });
    });
  };

  return (
    <div style={{ width: 400, height: 400 }}>
      <button style={{ width: 400, height: 400 }} onClick={signIn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignInWithGoogle;