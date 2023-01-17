/** @dev Export date arrays/ */
export const TIME_ARRAYS = Array.from(Array(24).keys())
  .map((item) => {
    const _fPlexig = item >= 10 ? "" : "0";
    return Array.from(Array(12).keys()).map((minute) => {
      const parseMinute = minute * 5;
      const _mPlexig = parseMinute >= 10 ? "" : "0";
      return `${_fPlexig}${item}:${_mPlexig}${parseMinute}`;
    });
  })
  .flat(1);

export const completedOrderPercent = (completedOrders = 0, orders = 0) => {
  return ((completedOrders * 100) / (orders || 1)).toFixed(2);
};

export const solAmount = (amount: string | number, decimal: number) => {
  return parseInt(amount.toString()) / Math.pow(10, decimal);
};
