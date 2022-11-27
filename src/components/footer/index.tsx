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
        name: "Contact Us",
        uri: "mailto:contact@cavies.xyz",
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
    <div className="footer pt-[50px] pb-[30px]">
      <div className="md:px-[40px] px-[20px] lg:max-w-[1180px] lg:mx-auto">
        <div className="flex items-center pt-[20px] md:flex-col">
          <div className="w-[100%]">
            <div className="mt-[15px] relative md:bottom-[-34px]">
              <img
                src="/assets/images/logo.png"
                className="w-[155px] h-auto  mx-auto"
              />
              <div className="flex mx-auto mt-[14px] justify-center">
                <sup className="top-0 regular-text text-[14px]">by</sup>
                <img
                  src="https://cavies.xyz/assets/images/logo.png"
                  className="w-[110px] h-auto"
                />
              </div>
            </div>
          </div>
          <ul className="footer-menu w-[100%] relative top-[-10px] hidden md:block">
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
        <div className="flex">
          <div className="float-left menu-wrapper w-[100%] md:pt-0 pt-[20px]">
            <ul className="footer-menu w-[100%] flex justify-center flex-wrap md:justify-start">
              {footers.map((item, index) => (
                <li
                  key={`footer-item-${index}`}
                  className="md:float-right mx-[10px] md:mx-0 md:mr-[30px] cursor-pointer float-left text-center leading-[35px] md:leading-[25px]"
                >
                  <a
                    target={item.newWindow === false ? "" : "_blank"}
                    href={item.uri}
                    className="text-[14px] md:text-[14px] normal-text text-footerItemColor dark:text-footerItemColorDark regular-text"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="bottom-menu-wrapper float-right w-[60%] md:w-[27%] lg:w-[60%] hidden md:block md:flex md:justify-end">
            <p className="text-footerItemColor dark:text-footerItemColorDark text-[12px] md:text-[14px] regular-text">
              © 2022 Cavies Ltd.
            </p>
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
  );
};

export default Footer;
