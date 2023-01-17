import { encode } from "bs58";
class UtilsProvider {
  /**
   * Will gracefuly scroll the page
   * This function will scroll the page using
   * an `ease-in-out` effect.
   *
   * You can use it to scroll to a given element, as well.
   * To do so, pass the element instead of a number as the position.
   * Optionally, you can pass a `queryString` for an element selector.
   *
   * The default duration is half a second (500ms)
   *
   * This function returns a Promise that resolves as soon
   * as it has finished scrolling. If a selector is passed and
   * the element is not present in the page, it will reject.
   *
   * EXAMPLES:
   *
   * ```js
   * window.scrollPageTo('#some-section', 2000);
   * window.scrollPageTo(document.getElementById('some-section'), 1000);
   * window.scrollPageTo(500); // will scroll to 500px in 500ms
   * ```
   *
   * @returns {Promise}
   * @param {HTMLElement|Number|Selector} Target
   * @param {Number} Duration [default=500]
   *
   *
   */
  public scrollTo(element: HTMLElement, to: number, duration: number) {
    const start = element.scrollTop,
      change = to - start,
      startDate = +new Date(),
      easeInOutQuad = function (t: any, b: any, c: any, d: any) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      },
      animateScroll = function () {
        const currentDate = +new Date();
        const currentTime = currentDate - startDate;
        element.scrollTop = parseInt(
          easeInOutQuad(currentTime, start, change, duration)
        );
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          element.scrollTop = to;
        }
      };
    animateScroll();
  }
  /**
   * The function to randomize a string based on base58 hash algorithm
   */
  public randomize(): string {
    const seed = new Date().getUTCMilliseconds().toString();
    return encode(new TextEncoder().encode(seed));
  }

  /**
   * The function to provide interval operation with setTimeout behind the scene.
   * @param handler
   * @param msec
   */
  public withInterval(handler: () => void | Promise<void>, msec: number) {
    /**
     * Stopped flag
     */
    let isStopped = false;

    /**
     * Construct handler
     */
    const timeOutHandler = () => {
      setTimeout(async () => {
        if (isStopped) return;

        await handler();
        await timeOutHandler();
      }, msec);
    };

    /**
     * Trigger handler
     */
    timeOutHandler();

    /**
     * The stop handler
     */
    return () => {
      isStopped = true;
    };
  }

  /**
   * The function to provide a wrapper to return null if the process duration exceeds a certain msec.
   * @param handler
   * @param msec
   */
  public withTimeout<Result>(
    handler: () => Result | Promise<Result>,
    msec: number
  ): Promise<Result | null> {
    return new Promise(async (resolve, reject) => {
      /**
       * Assign a random value to make sure it's unique
       */
      const randomizedValue = this.randomize();
      let result: Result | string = randomizedValue;

      /**
       * Make a setTimeout to resolve the value
       */
      setTimeout(() => {
        /**
         * Compare the result to randomized value and return null.
         */
        if (result === randomizedValue) {
          console.log(
            `Process exceeded ${msec} ms and returned null. Process: ${handler}`
          );
          return resolve(null);
        }
      }, msec);

      try {
        /**
         * Assign the expected returned value
         */
        result = await handler();
        return resolve(result);
      } catch (e) {
        /**
         * Re-assign as rather other value than randomized value
         */
        result = "";
        /**
         * If any errors occur, reserve the errors
         */
        return reject(e);
      }
    });
  }

  /**
   * @description Short text
   * @param value
   * @param size
   */
  public makeShort(value = "", size: number) {
    const arr = value.split("");
    if (arr.length > size) {
      return (
        arr.splice(0, size).join("") +
        "..." +
        arr.splice(arr.length - size, size).join("")
      );
    }
    return arr.splice(0, size).join("");
  }

  /**
   * @dev The function to format long number to short text
   * @var {number} num
   * @var {number} digits
   */
  static formatLongNumber(num: number) {
    if (num <= 1000) {
      return num.toString();
    }

    let counter = 0;
    let arr = num.toString().split("");
    const idxDecimal = arr.indexOf(".");
    const decimalArr = arr.slice(idxDecimal, arr.length);
    arr = arr.slice(0, idxDecimal > 0 ? idxDecimal : arr.length).reverse();
    arr = arr.map((c, index) => {
      counter += 1;
      if (counter === 3 && index < arr.length - 1) {
        counter = 0;
        return "," + c;
      }
      return c;
    });

    return arr
      .reverse()
      .concat(idxDecimal > 0 ? decimalArr : [])
      .join("");
  }
}

export default UtilsProvider;

export const utilsProvider = new UtilsProvider();
