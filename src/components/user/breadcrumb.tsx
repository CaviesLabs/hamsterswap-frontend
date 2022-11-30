import { FC } from "react";
import { LayoutSection } from "@/src/components/layout-section";
import { BreadCrumb } from "@/src/components/bread-crumb";
import { BreadcrumbProps } from "@/src/components/user/types";

const Breadcrumb: FC<BreadcrumbProps> = (props) => {
  const { title } = props;
  return (
    <div className="cover-container bg-purpleBg">
      <LayoutSection className="!min-h-[350px]">
        <BreadCrumb data={["Home", title]} />
        <div className="mt-[20px] block md:flex">
          <p className="text-[32px]">{title}</p>
        </div>
      </LayoutSection>
    </div>
  );
};

export default Breadcrumb;
