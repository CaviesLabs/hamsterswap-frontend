import { FC } from "react";
import { useRouter } from "next/router";
import { BreadCrumbProps } from "./types";
import { useTheme } from "next-themes";

export const BreadCrumb: FC<BreadCrumbProps> = (props) => {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <nav className="flex mt-20" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {props.data.map((item, index) => (
          <li
            className="inline-flex items-center"
            key={`bread-crumbs-item-${index}`}
          >
            <a
              onClick={() =>
                index === 0 ? router.push("/") : router.push(router.asPath)
              }
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
            >
              {index === 0 ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.64373 20.7821V17.7152C9.64372 16.9381 10.2757 16.3067 11.0584 16.3018H13.9326C14.7189 16.3018 15.3563 16.9346 15.3563 17.7152V17.7152V20.7732C15.3563 21.4473 15.904 21.9951 16.5829 22H18.5438C19.4596 22.0023 20.3388 21.6428 20.9872 21.0007C21.6356 20.3586 22 19.4868 22 18.5775V9.86585C22 9.13139 21.6721 8.43471 21.1046 7.9635L14.443 2.67427C13.2785 1.74912 11.6154 1.77901 10.4854 2.74538L3.96701 7.9635C3.37274 8.42082 3.01755 9.11956 3 9.86585V18.5686C3 20.4637 4.54738 22 6.45617 22H8.37229C8.69917 22.0023 9.01349 21.8751 9.24547 21.6464C9.47746 21.4178 9.60793 21.1067 9.60792 20.7821H9.64373Z"
                    fill={theme === "dark" ? "white" : "#7886A0"}
                  />
                </svg>
              ) : (
                <svg
                  width="6"
                  height="17"
                  viewBox="0 0 6 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.838 0.812L2.002 16.38H0.742L4.564 0.812H5.838Z"
                    fill="#353C4B"
                  />
                </svg>
              )}
              <span className="regular-text ml-[10px] dark:text-tDark">
                {item}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
