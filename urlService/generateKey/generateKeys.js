// Import the generateKeys function from the same file or module if it's in another file
// Remove the redundant definition and ensure the proper use of ES modules
export function generateKeys(keyLength) {
  const characters = ["A", "B", "c", "d", "3", "4"];
  const result = [];

  function helper(currentKey) {
    if (currentKey.length === keyLength) {
      result.push(currentKey);
      return;
    }

    for (const char of characters) {
      helper(currentKey + char);
    }
  }

  helper("");
  return result;
}
