export const validateRegisterInput = (
  name?: string,
  email?: string,
  password?: string
) => {
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return "Name, email, and password are required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
};

export const validateLoginInput = (email?: string, password?: string) => {
  if (!email?.trim() || !password?.trim()) {
    return "Email and password are required";
  }

  return null;
};
