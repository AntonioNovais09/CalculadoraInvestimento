function convertToMontlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

function generateReturnsArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = "monthly",
  monthyContribution = 0,
  returnRate = 0,
  returnTimeFrame = "monthly"
) {
  if (!timeHorizon || !startingAmount) {
    throw new Error(
      " investimento inicial e prazo de investimento devem ser preenchidos com algum valor"
    );
  }

  const finalReturnRate =
    returnTimeFrame === "monthly"
      ? 1 + returnRate / 100
      : convertToMontlyReturnRate(1 + returnRate / 100);

  const finalTimeHorizon =
    timePeriod === "monthly" ? timeHorizon : timeHorizon * 12;

  const referenciInvestimentObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: startingAmount,
  };

  const returnsArray = [referenciInvestimentObject];
  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const totalAmount =
      returnsArray[timeReference - 1].totalAmount * finalReturnRate +
      monthyContribution;

    const interestReturns =
      returnsArray[timeReference - 1].totalAmount * finalReturnRate;

    const investedAmount = startingAmount + monthyContribution * timeReference;
    const totalInterestReturns = totalAmount - investedAmount;
    returnsArray.push({
      investedAmount,
      interestReturns: interestReturns,
      totalInterestReturns,
      month: timeReference,
      totalAmount,
    });
  }

  returnsArray;
}
