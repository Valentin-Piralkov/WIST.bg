export default function JobOfferSuggestedCard() {
  return (
    <div className="flex flex-row w-full h-36 justify-between items-center bg-white">
      <div className="flex flex-col w-28 h-28 justify-center items-center bg-gray-light"></div>
      <div className="flex flex-col py-2 pl-4 w-2/3 h-full justify-between">
        <div>
          <p className="font-title font-bold text-xl hover:underline">Име на компанията</p>
          <p className="font-title font-bold text-xl hover:underline">Обявена позиция</p>
        </div>
        <div>
          <p className="font-title text-l">Локация</p>
          <p className="font-title text-l">Краен срок</p>
        </div>
      </div>
    </div>
  );
}
