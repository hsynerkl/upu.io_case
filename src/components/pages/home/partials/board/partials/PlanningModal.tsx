import { type FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/commons/Modal";
import type { Product } from "@/types/product";
import ProductCard from "@/components/commons/ProductCard";
import Input from "@/components/commons/ui/Input";
import Button from "@/components/commons/ui/Button";

const PlanningSchema = z.object({
  miktar: z.coerce
    .number({
      required_error: "Miktar zorunludur",
      invalid_type_error: "Miktar bir sayı olmalıdır",
    })
    .min(1, { message: "Miktar en az 1 olmalıdır" }),
});

type PlanningFormData = z.infer<typeof PlanningSchema>;

interface PlanningModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onPlan: (miktar: number) => void;
}

const PlanningModal: FC<PlanningModalProps> = ({
  isOpen,
  onClose,
  product,
  onPlan,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanningFormData>({
    resolver: zodResolver(PlanningSchema),
    defaultValues: {
      miktar: undefined,
    },
  });

  if (!product) return null;

  const onSubmit = (data: PlanningFormData) => {
    onPlan(data.miktar);

    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Ürün Planla">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-sm mb-3 text-white">
            Bu ürün bu ekipmanda planlanacaktır. Onaylıyor musunuz?
          </div>

          <ProductCard product={product} />

          <div className="mt-4">
            <Controller
              name="miktar"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="number"
                  label="Miktar"
                  value={value?.toString() || ""}
                  onChange={(e) => {
                    const numValue =
                      e.target.value === ""
                        ? undefined
                        : Number(e.target.value);
                    onChange(numValue);
                  }}
                  className={errors.miktar ? "mb-1" : ""}
                />
              )}
            />
            {errors.miktar && (
              <p className="text-red-500 text-xs mt-1">
                {errors.miktar.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-5 gap-3">
            <Button type="button" onClick={onClose} variant="secondary">
              Vazgeç
            </Button>

            <Button type="submit" variant="primary">
              Planla
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default PlanningModal;
