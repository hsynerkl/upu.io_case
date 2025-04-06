import { type FC } from "react";
import type { Product } from "@/types/product";
import ProductImage from "@/assets/images/product-img.png";
import { DotsIcon } from "@/assets/icons";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const {
    stock,
    opCode,
    category,
    remainingWork,
    plannedQuantity,
    unplannedQuantity,
    activeTaskTime,
    machine,
  } = product;

  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div className="relative select-none h-[130px] overflow-hidden !min-w-[305px] xl:min-w-[335px] rounded-md p-2.5 gap-2 container-shadow bg-primary-3 flex">
      <div className="gap-2 flex flex-col">
        <img
          src={ProductImage}
          alt="product-image"
          className="w-[68px] h-[48px] rounded-md"
        />

        <div className="w-full text-xs">
          <p className="bg-primary-6 text-center whitespace-nowrap text-white rounded-md px-2 py-1 rounded-b-none">
            İş E. Kalan
          </p>
          <p className="border text-center border-primary-6 rounded-b-md px-2 py-1">
            {formatNumber(remainingWork)}
          </p>
        </div>
      </div>

      <div className="gap-2 mr-6 flex flex-col flex-1 min-w-0">
        <div>
          <p className="text-white truncate font-semibold text-sm mb-1">
            {machine}
          </p>
          <p className="text-primary-2 bg-primary-2/10 font-semibold text-xs px-2 py-1 rounded-md max-w-48 w-full truncate whitespace-nowrap">
            Stok: {stock} / {opCode}
          </p>
        </div>

        <div className="rounded-md border border-primary-6 w-fit flex text-xs">
          <div className="border-r border-r-primary-6">
            <p className="bg-primary-6 text-center whitespace-nowrap text-white px-2 py-1">
              Topl. Planli
            </p>
            <p className="text-center bg-primary-6 px-2 py-1 text-white border-t border-t-primary-6">
              Plansız
            </p>
          </div>

          <div>
            <p className="text-center border-b border-b-primary-6 border-r border-r-primary-6 whitespace-nowrap px-2 py-1">
              {formatNumber(plannedQuantity)}
            </p>
            <p className="text-center px-2 py-1 border-r border-r-primary-6">
              {formatNumber(unplannedQuantity)}
            </p>
          </div>

          <div>
            <p className="text-center border-b border-b-primary-6 whitespace-nowrap px-2 py-1">
              {activeTaskTime || "00:06:12"}
            </p>
            <p className="text-center px-2 py-1">
              {activeTaskTime || "00:06:12"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-1 absolute right-0 top-0 cursor-pointer">
        <DotsIcon className="h-5 w-5 fill-white" />
      </div>

      <div className="absolute right-0 bottom-[105px] flex justify-end items-end">
        <div className="transform -rotate-90 origin-bottom-right">
          <p className="whitespace-nowrap text-center bg-primary-6 text-white text-[10px] rounded-tr-md rounded-tl-md font-light px-1 py-0.5 w-[110px]">
            {category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
