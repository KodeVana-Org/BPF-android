import ApiManager from './ApiManager';

// Register new user
interface RegisterData {
  emailPhone: string;
}

export const user_register = async (data: RegisterData): Promise<any> => {
  try {
    const response = await ApiManager.post('user/register', data);
    return response.data;
  } catch (error: any) {
    console.error('Error occurred during user registration:', error.message);
    return error.response.data;
  }
};

// Verify New user registration OTP
interface RegisterOtpData {
  emailPhone: string;
  password: string;
  otp: string;
}

export const verify_register_otp = async (
  data: RegisterOtpData,
): Promise<any> => {
  try {
    const response = await ApiManager.post('user/verify-otp', data);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error occurred during register OTP verification:',
      error.message,
    );
    return error.response.data;
  }
};

// Login user with password
interface PassLoginData {
  emailPhone: string;
  password: string;
}

export const user_login_pass = async (data: PassLoginData): Promise<any> => {
  try {
    const response = await ApiManager.post('user/login', data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

// Login user with otp
interface OTPLoginData {
  emailPhone: string;
}

export const user_login_otp = async (data: OTPLoginData): Promise<any> => {
  try {
    const response = await ApiManager.post('user/login-with-otp', data);
    return response.data;
  } catch (error: any) {
    console.log(
      'Error occurred during login with OTP email verification:',
      error.message,
    );
    return error.response.data;
  }
};

// Verify Login OTP
interface LoginOtpData {
  emailPhone: string;
  otp: string;
}

export const verify_login_otp = async (data: LoginOtpData): Promise<any> => {
  try {
    const response = await ApiManager.post('user/verify-for-login', data);
    return response.data;
  } catch (error: any) {
    console.log('Error occurred during login OTP verification:', error.message);
    return error.response.data;
  }
};

// Forgot Passsword
interface ForgotPassData {
  emailPhone: string;
}

export const user_forgot_pass = async (data: ForgotPassData): Promise<any> => {
  try {
    const response = await ApiManager.post('user/forgot-password', data);
    return response.data;
  } catch (error: any) {
    console.log(
      'Error occurred during forgot password email verification:',
      error.message,
    );
    return error.response.data;
  }
};

// Forgot Passsword verify otp
interface ForgotPassOTPData {
  emailPhone: string;
  otp: string;
}

export const forgot_pass_otp = async (
  data: ForgotPassOTPData,
): Promise<any> => {
  try {
    const response = await ApiManager.post('user/reset-password', data);
    return response.data;
  } catch (error: any) {
    console.log(
      'Error occurred during forgot password otp verification:',
      error.message,
    );
    return error.response.data;
  }
};

// Forgot Passsword set password
interface SetPassData {
  emailPhone: string;
  password: string;
}

export const set_password = async (data: SetPassData): Promise<any> => {
  try {
    const response = await ApiManager.post('user/reset-pass', data);
    return response.data;
  } catch (error: any) {
    console.log('Error occurred during reset password:', error.message);
    return error.response.data;
  }
};

/////////////////** USER TOKEN VERIFICATION **/////////////////
interface UserData {
  headers: any;
}

export const verify_Token = async (data: UserData): Promise<any> => {
  try {
    const response = await ApiManager.get('user/auth', data);
    return response.data;
  } catch (error: any) {
    console.log('Error occurred accessing user details:', error.message);
    return error.response.data;
  }
};

/////////////////** USER TOKEN VERIFICATION **/////////////////
export const get_users = async (): Promise<any> => {
  try {
    const response = await ApiManager.get('admin/all-user');
    return response.data;
  } catch (error: any) {
    console.log('Error occurred accessing all users:', error.message);
    return error.response.data;
  }
};
