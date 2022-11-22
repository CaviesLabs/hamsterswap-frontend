import { FC, useMemo } from "react";

interface FooterItem {
  name: string;
  uri: string;
  newWindow?: boolean | true;
}

interface SocialItem {
  image: string;
  uri: string;
}

const Footer: FC = () => {
  const footers = useMemo<FooterItem[]>(
    () => [
      {
        name: "About Us",
        uri: "https://cavies.notion.site/About-Cavies-72e60c00426b450e8e57ca3ea5acb0d0",
      },
      {
        name: "Blog",
        uri: "https://cavies.notion.site/b4ff0745a92144aaaccf5b052d92b540?v=7891d7724e1349a5943c8a101174af5c",
      },
      {
        name: "Careers",
        uri: "https://cavies.notion.site/Job-Board-320ac7987dc64a53b0d3d3e7c52c5ce7",
      },
      {
        name: "Legal Notice",
        uri: "https://cavies.xyz//legal/legal-notice",
      },
      {
        name: "Privacy Notice",
        uri: "https://cavies.xyz//legal/privacy-notice",
      },
      {
        name: "Media Kit",
        uri: "https://cavies.notion.site/59aa5e24fdb146359cdd3cb9336aef45?v=83eedde046594e689d7fabf8932a7284",
      },
    ],
    []
  );

  const socialItems = useMemo<SocialItem[]>(
    () => [
      {
        image: "/assets/images/twitter.svg",
        uri: "https://twitter.com/CaviesLabs",
      },
    ],
    []
  );

  return (
    <div className="footer pt-[50px]">
      <div className="border-t-[#D2D7DF] dark:border-t-borderColorDark border-t-[1px]">
        <div className="md:px-[40px] px-[20px] lg:max-w-[1180px] lg:mx-auto">
          <div className="flex items-center pt-[20px]">
            <div className="md:float-left logo-wrapper w-[100%] md:w-[60%] lg:w-[70%]">
              <img
                src="https://cavies.xyz/assets/images/logo.png"
                className="w-[75px] md:w-[79.62px] ml-auto mr-auto md:ml-[0px]"
              />
            </div>
            <div className="md:float-right menu-wrapper py-[20px] w-[100%] hidden md:block">
              <ul className="footer-menu w-[100%]">
                {socialItems.map((item, index) => (
                  <li
                    key={`footer-item-${index}`}
                    className="ml-[20px] md:ml-[30px] cursor-pointer float-right"
                    onClick={() => window.open(item.uri)}
                  >
                    <img
                      src={item.image}
                      className="text-[10px] md:text-[16px] w-[15px] h-[15px] md:w-[18px] md:h-[18px]"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex">
            <div className="bottom-menu-wrapper float-left w-[60%] md:w-[27%] lg:w-[60%] hidden md:block">
              <p className="text-footerItemColor dark:text-footerItemColorDark text-[12px] md:text-[14px] mr-[20px] regular-text">
                © 2022 Cavies Ltd.
              </p>
            </div>
            <div className="float-right menu-wrapper w-[100%] md:pt-0 pt-[20px]">
              <ul className="footer-menu w-[100%] flex justify-center flex-wrap md:justify-end">
                {footers.map((item, index) => (
                  <li
                    key={`footer-item-${index}`}
                    className="md:float-right mx-[10px] md:mx-0 md:ml-[30px] cursor-pointer float-left text-center leading-[35px] md:leading-[25px]"
                  >
                    <a
                      target={item.newWindow === false ? "" : "_blank"}
                      href={item.uri}
                      className="text-[14px] md:text-[14px] normal-text text-footerItemColor dark:text-footerItemColorDark normal-text"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="block md:hidden pt-[20px]">
            <div>
              <ul className="footer-menu w-[100%] flex justify-center">
                {socialItems.map((item, index) => (
                  <li
                    key={`footer-item-${index}`}
                    className="mx-[20px] md:ml-[30px] cursor-pointer"
                    onClick={() => window.open(item.uri)}
                  >
                    <img
                      src={item.image}
                      className="w-[18.8px] h-[18.8px] md:w-[18px] md:h-[18px]"
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-[20px]">
              <p className="text-footerItemColor dark:text-footerItemColorDark text-[12px] md:text-[14px] cursor-pointer normal-text text-center">
                © 2022 Cavies Ltd.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
