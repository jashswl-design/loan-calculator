function calculateLoan(principal, annualRate, years) {
  if (principal <= 0 || years <= 0 || annualRate < 0) {
    throw new Error("Invalid input values");
  }

  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;

  let emi;
  if (monthlyRate === 0) {
    emi = principal / months;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    emi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  return {
    emi: Number(emi.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    totalPayment: Number(totalPayment.toFixed(2)),
  };
}

// Browser UI binding
if (typeof document !== "undefined") {
  const calcBtn = document.getElementById("calc-btn");
  if (calcBtn) {
    const updateUI = () => {
      const amount = parseFloat(document.getElementById("amount").value);
      const rate = parseFloat(document.getElementById("rate").value);
      const years = parseFloat(document.getElementById("years").value);

      try {
        const result = calculateLoan(amount, rate, years);
        document.getElementById("emi-output").textContent = `₹${result.emi.toLocaleString()}`;
        document.getElementById("interest-output").textContent = `₹${result.totalInterest.toLocaleString()}`;
        document.getElementById("total-output").textContent = `₹${result.totalPayment.toLocaleString()}`;
      } catch (err) {
        alert("Please enter valid positive numbers.");
      }
    };

    calcBtn.addEventListener("click", updateUI);
    updateUI(); // Calculate on page load
  }
}

// Export for Node.js automated testing
if (typeof module !== "undefined") {
  module.exports = { calculateLoan };
}