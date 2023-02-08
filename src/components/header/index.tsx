import { FC, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useWalletKit } from "@gokiprotocol/walletkit";
import { useConnectedWallet } from "@saberhq/use-solana";
import { Button } from "@hamsterbox/ui-kit";
import { PURPLE_HEADER_PAGES } from "@/src/utils";
import classnames from "classnames";
import styles from "./index.module.scss";
import UserProfile from "@/src/components/header/user-profile";
import { useMain } from "@/src/hooks/pages/main";
import { HamsterboxIcon } from "@/src/components/icons";
import styled from "@emotion/styled";

interface MenuItem {
  title: string;
  href: string;
  button?: boolean | false;
}

const Header: FC = () => {
  const [curSlug, setCurSlug] = useState<string>("#about-us");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { hProfile } = useMain();

  /**
   * Check homepage and display logo on dark theme
   * beside, set text color is white
   */
  const isHomepage = router.pathname === "/";

  /**
   * @dev Import GoGi providers.
   */
  const { connect: connectWallet } = useWalletKit();
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
        !header?.classList.contains(className) && setIsScrolled(true);
      } else {
        header?.classList.contains(className) && setIsScrolled(false);
      }
    };
  });

  return (
    <StyledHeader
      className={classnames("app-header fixed z-50 w-full", {
        /**
         * @dev Restrict fill purple background & clear border for specific pages.
         */
        "bg-purpleBg border-b-[0px]": PURPLE_HEADER_PAGES.filter((item) =>
          router.asPath.includes(item)
        ).length,
        "text-white": !isScrolled && isHomepage,
        "scrolled-header shadow-lg": isScrolled,
      })}
      id="app-header"
    >
      <div className="w-full py-[18px] md:py-[25px] flow-root">
        <div className="lg:max-w-[86rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="float-left logo-wrapper md:mt-0 mt-[0px]">
            <a className="cursor-pointer" onClick={() => router.push("/")}>
              <HamsterboxIcon
                className={classnames("w-[95px] md:w-[180px] hamsterbox-icon")}
                color={isScrolled || !isHomepage ? "#07080A" : "white"}
              />
            </a>
          </div>
          <div className="relative flex items-center float-right right-[16px]">
            <div className="float-right relative">
              {!hProfile ? (
                <div className="relative">
                  {" "}
                  <Button
                    className="!px-8"
                    size="small"
                    text="Connect Wallet"
                    onClick={connectWallet}
                  />{" "}
                </div>
              ) : (
                <UserProfile />
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
                {wallet && hProfile && (
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
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  transition: background-color 0.3s ease;
  &.scrolled-header {
    background-color: white;
  }
`;
