import React from 'react';
import { useNavigate } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';

export default function SignInPage({ currentUser, changeUserFunction }) {
  const auth = getAuth();
  const navigate = useNavigate(); 
  const firebaseUIConfig = {
    signInOptions: [
      { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
      GoogleAuthProvider.PROVIDER_ID,
    ],
    signInFlow: 'popup',
    credentialHelper: 'none',
    callbacks: { 
      signInSuccessWithAuthResult: (authResult) => {
        const user = authResult.user;
        changeUserFunction({ userId: user.uid, userName: user.displayName, userImg: user.photoURL });
        navigate('/');
        return false;
      },
    },
  };

  return (
    <div className="card bg-light">
      <div className="container card-body">
        <p className="lead text-center">Sign in to your account:</p>
        <StyledFirebaseAuth 
          firebaseAuth={auth} 
          uiConfig={firebaseUIConfig} 
        />
      </div>
    </div>
  );
}
