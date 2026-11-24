const assert = require("assert");
const { calculateLoan } = require("./calculator");

console.log("Running Loan Calculator automated tests...");

// Test 1: Standard loan (₹100,000 at 12% for 1 year -> EMI should be ₹8,884.88)
const test1 = calculateLoan(100000, 12, 1);
assert.strictEqual(test1.emi, 8884.88, `Expected 8884.88, got ${test1.emi}`);
console.log("✔ Test 1 Passed: Standard EMI calculation");

// Test 2: Zero interest loan (₹12,000 at 0% for 1 year -> EMI should be ₹1,000)
const test2 = calculateLoan(12000, 0, 1);
assert.strictEqual(test2.emi, 1000, `Expected 1000, got ${test2.emi}`);
assert.strictEqual(test2.totalInterest, 0, `Expected 0 interest, got ${test2.totalInterest}`);
console.log("✔ Test 2 Passed: Zero-interest loan calculation");

// Test 3: Reject invalid negative input
assert.throws(() => calculateLoan(-5000, 8, 2), /Invalid input/);
console.log("✔ Test 3 Passed: Invalid input rejected");

console.log("All tests passed successfully!");