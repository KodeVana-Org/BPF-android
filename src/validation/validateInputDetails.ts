/////////////////////** VALIDATE EMAIL-PHONE **////////////////////////

export function validateEmailPhone(emailPhone: string) {
  // const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  // const phoneRegex = /^\d{10}$/;
  let result = {
    message: 'Invalid details!',
    success: false,
  };

  if (emailPhone === '') {
    result.message = 'This field is required!';
    result.success = false;
  } else if (emailPhone.length < 5) {
    result.message = 'Should be of min 5 character!';
    result.success = false;
  } else if (emailPhone.length > 75) {
    result.message = 'Should be of max 75 character!';
    result.success = false;
  } else if (/[a-zA-Z]/g.test(emailPhone) || emailPhone.includes('@')) {
    if (
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailPhone) ||
      emailPhone.charAt(0) === '@'
    ) {
      result.message = 'Please enter a valid email address!';
      result.success = false;
    } else {
      result.message = 'Valid email!';
      result.success = true;
      return result;
    }
  } else if (!/^\d{10}$/.test(emailPhone)) {
    result.message = 'Please enter a valid phone number!';
    result.success = false;
  } else {
    result.message = 'Valid phone!';
    result.success = true;
    return result;
  }
  return result;
}

/////////////////////** VALIDATE PASSWORD **////////////////////////

export function validatePassword(password: string) {
  let result = {
    message: 'Invalid details!',
    success: false,
  };

  if (password === '') {
    result.message = 'This field is required!';
    result.success = false;
  } else if (password.length < 7) {
    result.message = 'Should be of min 7 character!';
    result.success = false;
  } else if (password.length > 32) {
    result.message = 'Should be of max 32 character!';
    result.success = false;
  } else {
    result.message = 'Valid password!';
    result.success = true;
    return result;
  }

  return result;
}

/////////////////////** VALIDATE PASSWORD **////////////////////////

export function validateOTP(otp: string) {
  let result = {
    message: 'Invalid details!',
    success: false,
  };

  if (otp === '') {
    result.message = 'OTP is required!';
    result.success = false;
  } else if (otp.length !== 4) {
    result.message = 'OTP should be of 4 digit!';
    result.success = false;
  } else if (!/^\d{4}$/.test(otp)) {
    result.message = 'Invalid OTP!';
    result.success = false;
  } else {
    result.message = 'Valid password!';
    result.success = true;
    return result;
  }

  return result;
}
