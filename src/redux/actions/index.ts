export const UPDT_USER_EMAIL = 'UPDT_USER_EMAIL';

export const userAction = (userEmail: string) => {
  return {
    type: UPDT_USER_EMAIL,
    payload: userEmail,
  };
};
