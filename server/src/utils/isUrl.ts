export default function isURL(str: string) {
  // Regular expression for a URL
  var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  // Test the string against the regular expression
  return urlPattern.test(str);
}
