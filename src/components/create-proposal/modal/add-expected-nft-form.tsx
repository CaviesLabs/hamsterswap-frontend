import Select from "@/src/components/select";
import { Input } from "antd";
import { allowNTFCollection } from "@/src/entities/platform-config.entity";
import { useMemo, useState } from "react";
import { useMain } from "@/src/hooks/pages/main";
import { ChainId } from "@/src/entities/chain.entity";

type FormProps = {
  allowNTFCollections: allowNTFCollection[];
  collection: string[];
  nftId: string;
  tokenId: string;
  setCollection: (v: string[]) => void;
  setNftId: (v: string) => void;
  setTokenId: (v: string) => void;
};

export const AddExpectedNftForm = (props: FormProps) => {
  const [search, setSearch] = useState<string>("");
  const { chainId } = useMain();
  const {
    allowNTFCollections,
    collection,
    setCollection,
    setNftId,
    setTokenId,
  } = props;

  const allowNTFCollectionsMemo = useMemo(() => {
    return allowNTFCollections
      .filter(
        (_) => !search || _.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((item) => ({
        label: item.name,
        value: item.addresses?.[0],
        image: item.icon,
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
        values={collection}
        onSearch={(value) => setSearch(value)}
      />

      <p className="mt-6 text-dark60 text-lg">
        NFT ID <span className="text-red-500">*</span>
      </p>
      {chainId === ChainId.solana && (
        <Input
          size="large"
          className="rounded-2xl p-3 mt-2"
          placeholder="Enter contract address"
          onChange={(e) => setNftId(e.target.value)}
        />
      )}
      {chainId !== ChainId.solana && (
        <Input
          size="large"
          className="rounded-2xl p-3 mt-2"
          placeholder="Enter Token Id"
          onChange={(e) => setTokenId(e.target.value)}
        />
      )}
    </>
  );
};
