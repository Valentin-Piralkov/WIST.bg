import parsePhoneNumberFromString from "libphonenumber-js";

/**
 * Checks if the phone number is valid
 * @param tel phone number
 * @returns true if the phone number is valid
 */
export const isValidPhoneNumber = async (tel: string) => {
  try {
    // Parse the phone number (works for all countries and 0)
    const parsed_tel = parsePhoneNumberFromString(tel);
    if (!parsed_tel) {
      return false;
    }
    if (parsed_tel.isValid()) {
      // Check if the phone number is valid based on country code
      return true;
    }
    if (parsed_tel.nationalNumber.length === 9) {
      // Check if the phone number is valid without country code
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Checks if a password is valid:
 * - at least 8 characters
 * - at least 1 uppercase and lowercase letter
 * - at least 1 number
 * @param password input password
 * @returns true if the password is valid
 */

export const isValidPassword = (password: string) => {
  if (password.length < 8) {
    return false;
  }

  let has_number = false;
  let has_uppercase = false;
  let has_lowercase = false;
  for (let i = 0; i < password.length; i++) {
    const char = password.charAt(i);
    if (char >= "0" && char <= "9") {
      has_number = true;
    } else if (char >= "a" && char <= "z") {
      has_lowercase = true;
    } else if (char >= "A" && char <= "Z") {
      has_uppercase = true;
    }
  }

  if (!has_number || !has_uppercase || !has_lowercase) {
    return false;
  }

  return true;
};
