/** @dev Export date arrays/ */
export const TIME_ARRAYS = Array.from(Array(12).keys())
  .map((item) => {
    const _fPlexig = item >= 10 ? "" : "0";
    return [`${_fPlexig}${item}:00`, `${_fPlexig}${item}:00`];
  })
  .flat(1);
