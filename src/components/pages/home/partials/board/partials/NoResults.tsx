import { LogoIcon } from "@/assets/icons";

const NoResults = () => {
  return (
    <div className="flex text-xs text-primary-5 flex-col items-center justify-center py-8 px-4 bg-primary-3 container-shadow rounded-md">
      <LogoIcon className="fill-white h-14 w-14" />

      <h4 className="text-sm font-medium mb-2">Sonuç bulunamadı</h4>

      <div className="mt-2">
        <ul className="list-disc pl-5 space-y-1">
          <li>Farklı bir kategori seçmeyi deneyin.</li>
          <li>Arama terimlerinizi değiştirin veya temizleyin.</li>
        </ul>
      </div>
    </div>
  );
};

export default NoResults;
