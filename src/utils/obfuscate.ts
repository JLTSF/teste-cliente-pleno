export function obfuscateEmail(email: string) {
  const emailAddress = email.split('@')[0];
  const obfuscatedEmailAddress = emailAddress.replace(/.*/g, '*');
  return `${emailAddress.slice(0, 3)}${obfuscatedEmailAddress}@${
    email.split('@')[1]
  }`;
}
