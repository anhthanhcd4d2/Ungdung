const SIGN_IN = "login/use";

const loginUse = (data: object) => {
  return {
    type: SIGN_IN,
    payload: data,
  };
};
export { loginUse, SIGN_IN };
