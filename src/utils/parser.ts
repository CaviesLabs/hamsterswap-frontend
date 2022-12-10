/** @dev Export date arrays/ */
export const TIME_ARRAYS = Array.from(Array(24).keys())
  .map((item) => {
    const _fPlexig = item >= 10 ? "" : "0";
    return [`${_fPlexig}${item}:00`, `${_fPlexig}${item}:30`];
  })
  .flat(1);

export const completedOrderPercent = (completedOrders = 0, orders = 0) => {
  return ((completedOrders * 100) / (orders || 1)).toFixed(2);
};
