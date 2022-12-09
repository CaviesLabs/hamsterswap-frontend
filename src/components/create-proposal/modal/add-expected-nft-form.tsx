import Select from "@/src/components/select";
import { Input } from "antd";
import { allowNTFCollection } from "@/src/dto/platform-config";
import { useMemo, useState } from "react";

type FormProps = {
  allowNTFCollections: allowNTFCollection[];
  collection: string;
  nftId: string;
  setCollection: (v: string) => void;
  setNftId: (v: string) => void;
};

export const AddExpectedNftForm = (props: FormProps) => {
  const { allowNTFCollections, collection, setCollection, setNftId } = props;
  const [search, setSearch] = useState<string>("");

  const allowNTFCollectionsMemo = useMemo(() => {
    return allowNTFCollections
      .filter(
        (_) => !search || _.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((_) => ({
        label: _.name,
        value: _.id,
        image: _.image,
      }));
  }, [search, allowNTFCollections]);

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
        options={allowNTFCollectionsMemo}
        onChange={(v) => setCollection(v)}
        values={[collection]}
        onSearch={(value) => setSearch(value)}
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
