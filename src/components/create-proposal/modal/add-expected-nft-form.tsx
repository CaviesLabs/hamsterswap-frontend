import Select from "@/src/components/select";
import { Input } from "antd";
import { allowNTFCollection } from "@/src/dto/platform-config";

type FormProps = {
  allowNTFCollections: allowNTFCollection[];
  collection: string;
  nftId: string;
  setCollection: (v: string) => void;
  setNftId: (v: string) => void;
};

export const AddExpectedNftForm = (props: FormProps) => {
  const { allowNTFCollections, collection, setCollection, setNftId } = props;

  return (
    <>
      <p className="text-dark60 text-lg">
        NFT Collection <span className="text-red-500">*</span>
      </p>
      <Select
        showSearch
        searchPlaceholder="Search NFT Collection name"
        className="rounded-3xl p-3"
        placeholder="Search for NFT, collection"
        options={allowNTFCollections.map((_) => ({
          label: _.name,
          value: _.id,
          image: _.image,
        }))}
        onChange={(v) => setCollection(v)}
        values={[collection]}
      />

      <p className="mt-6 text-dark60 text-lg">
        NFT ID <span className="text-red-500">*</span>
      </p>
      <Input
        size="large"
        className="rounded-2xl p-3 mt-2"
        placeholder="Enter NFT ID"
        onChange={(e) => setNftId(e.target.value)}
      />
    </>
  );
};
