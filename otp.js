

import crypto from 'crypto'
function generateSecureRandomSixDigit() {
    const randomBuffer = crypto.randomBytes(3); // 3 bytes = 24 bits, enough to cover the range 0-999999
    const randomNumber = randomBuffer.readUIntBE(0, 3) % 1000000; // Ensure it's a 6-digit number
    return String(randomNumber).padStart(6, '0'); // Ensure it's always 6 digits, pad with leading zeros if necessary
}
//a varible will store the random number 
let rotp = generateSecureRandomSixDigit();
export default rotp