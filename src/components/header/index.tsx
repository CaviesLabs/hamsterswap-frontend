import { FC, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useWalletKit } from "@gokiprotocol/walletkit";
import { useConnectedWallet, useSolana } from "@saberhq/use-solana";
import { Button } from "@hamsterbox/ui-kit";
import { utilsProvider, PURPLE_HEADER_PAGES } from "@/src/utils";
import classnames from "classnames";
import styles from "./index.module.scss";
interface MenuItem {
  title: string;
  href: string;
  button?: boolean | false;
}

const Header: FC = () => {
  const [curSlug, setCurSlug] = useState<string>("#about-us");
  const router = useRouter();

  /**
   * @dev Import GoGi providers.
   */
  const { connect: connectWallet } = useWalletKit();
  const {} = useSolana();
  const wallet = useConnectedWallet();

  /**
   * @dev Define Menu Data.
   */
  const menuData = useMemo<MenuItem[]>(
    () => [{ title: "Home", href: "/create-proposal", button: true }],
    []
  );

  /**
   * @dev The function to open/close mobile header menu.
   */
  const handleToggleMobileMenu = () => {
    const toggleButton = document.getElementById("mobile-toggle");
    const mobileMemu = document.getElementById("mobile-menu");
    toggleButton?.classList?.toggle(styles.active);
    mobileMemu?.classList?.toggle(styles.active);
  };

  /**
   * @dev The function to call when click menu item.
   * @param {string} slug.
   * @param {string} spacing.
   * @returns {void}
   */
  const handleOnClickMenu = (slug: string, spacing?: number) => {
    const url: string = router.asPath;
    if (url && url !== "/" && !url.startsWith("/#")) {
      return router.push(`/${slug}`);
    }

    setCurSlug(slug);
    const el = document.getElementById(slug?.split("#")[1]);
    if (!el) return;

    /**
     * @description
     * Change location without refresh page
     * */
    history.pushState({}, "", `/${slug}`);

    if (!window.location.href.includes("#")) return;

    // Scroll certain amounts from current position
    window.scrollBy({
      top: el.getBoundingClientRect().top - (spacing || 200),
      left: 0,
      behavior: "smooth",
    });
  };

  /**
   * @description
   * This function is used for checking if current page is home page or not
   * if home page it will automatically focus on fist nav menu
   * else it will be ignore
   */
  const isHomePage = useMemo(
    () => () => {
      const { asPath } = router;
      if (asPath === "/" || asPath.startsWith("/#")) {
        return true;
      }
      return false;
    },
    [router]
  );

  /**
   * @description
   * This function will automatically make bold on menu item when user scroll
   * into the view that item present for
   */
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const ids = ["about-us", "objectives", "hamsterbox"];
      const items = ids.map((id) => document.getElementById(id));
      items.map((item, index: number) => {
        if (
          item?.offsetTop !== undefined &&
          pageYOffset >= item?.offsetTop - 450
        ) {
          setCurSlug(`#${ids[index]}`);
        }

        if (
          index === items.length - 1 &&
          item?.offsetTop !== undefined &&
          pageYOffset + item?.offsetHeight >= item?.offsetTop
        ) {
          setCurSlug(`#${ids[index]}`);
        }
      });
    });
  }, []);

  /**
   * @description
   * This function set current selected section based on the location user are in
   */
  useEffect(() => {
    if (router.asPath.includes("#")) {
      setCurSlug(`#${router.asPath.split("#")[1]}`);
    }
  }, []);

  /**
   * @description
   * This function will focus on header menu item when user scroll into the view
   * which menu-item present for
   */
  useEffect(() => {
    const header = document.getElementById("app-header");
    const className = "scrolled-header";
    window.onscroll = () => {
      if (
        document.body.scrollTop > 120 ||
        document.documentElement.scrollTop > 120
      ) {
        !header?.classList.contains(className) &&
          header?.classList.add("scrolled-header");
      } else {
        header?.classList.contains(className) &&
          header?.classList.remove("scrolled-header");
      }
    };
  }, []);

  return (
    <div
      className={classnames("app-header", {
        /**
         * @dev Restrict fill purple background & clear border for specific pages.
         */
        "bg-purpleBg border-b-[0px]": PURPLE_HEADER_PAGES.filter((item) =>
          router.asPath.includes(item)
        ).length,
      })}
      id="app-header"
    >
      <div className="py-[18px] md:py-[25px] pl-[20px] pr-0  lg:max-w-[1180px] lg:mx-auto flow-root">
        <div className="float-left logo-wrapper md:mt-0 mt-[0px]">
          <a href="/">
            <img
              src="/assets/images/logo.png"
              className="w-[170px] md:w-[250px] dark:hidden mt-[2px] md:mt-0"
            />
            <img
              src="/assets/images/logo-dark.png"
              className="w-[95px] md:w-[149px] hidden dark:block"
            />
          </a>
        </div>
        <div className="relative flex items-center float-right right-[16px]">
          <div className="float-right relative">
            {!wallet ? (
              <div className="relative">
                {" "}
                <Button text="Connect" onClick={connectWallet} />{" "}
              </div>
            ) : (
              <div
                className="relative flex items-center h-full py-[3px] px-[10px] border-solid border-[0px] border-purple rounded-[5px] cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                <img
                  className="w-[20px] md:w-[40px] h-[auto] mr-[10px]"
                  src="https://source.boringavatars.com/beam"
                  alt="Boring avatar"
                />
                <span className="text-[7px] md:text-[14px]">
                  {utilsProvider.makeShort(wallet?.publicKey?.toString(), 3)}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center float-right">
            <div
              className={classnames(
                styles["toggle-button"],
                "block md:hidden ml-[20px]"
              )}
              id="mobile-toggle"
              onClick={handleToggleMobileMenu.bind(this)}
            >
              <span
                className={classnames(
                  styles.bar,
                  styles.top,
                  "bg-strongTitle dark:bg-strongTitleDark"
                )}
              ></span>
              <span
                className={classnames(
                  styles.bar,
                  styles.middle,
                  "bg-strongTitle dark:bg-strongTitleDark"
                )}
              ></span>
              <span
                className={classnames(
                  styles.bar,
                  styles.bottom,
                  "bg-strongTitle dark:bg-strongTitleDark"
                )}
              ></span>
            </div>
          </div>
        </div>
        <div
          className="hidden md:flex float-right memu-wrapper flex items-center md:pr-[40px]"
          style={{ height: "44px" }}
        >
          {
            <ul className="menu-container float-left">
              {wallet && (
                <Button
                  className="!rounded-[100px] after:!rounded-[100px] !px-[20px]"
                  text="Create a Proposal"
                  size="small"
                  onClick={() => router.push("/create-proposal")}
                />
              )}
            </ul>
          }
        </div>
        <div className={classnames(styles["mobile-nav"])}>
          <div
            className={classnames(styles["menu-container"], "pt-[20%]")}
            id="mobile-menu"
          >
            <ul className={styles["mobile-menu"]}>
              {menuData.map((item: any, index: number) => (
                <li key={`mobile-menu-${index}`}>
                  {item.button ? (
                    <Button
                      className="!rounded-[100px] after:!rounded-[100px] !px-[20px] mx-auto"
                      text="Create a Proposal"
                      size="small"
                      onClick={() => router.push(item.href)}
                    />
                  ) : (
                    <a
                      className={classnames("mt-[30px] md:mt-[60px]", {
                        active: item.slug === curSlug,
                      })}
                      onClick={() => {
                        handleOnClickMenu(item.slug, 200);
                        handleToggleMobileMenu();
                      }}
                    >
                      <div className="hidden-layer"></div>
                      <button className="shown-layer">
                        <p className="uppercase text-[16px] md:text-[32px] bold-text">
                          {item.title}
                        </p>
                      </button>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
