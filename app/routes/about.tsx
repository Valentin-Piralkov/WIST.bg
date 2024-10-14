import IndexHeader from "~/components/header";
import IndexFooter from "~/components/footer";
import CompanyOfferSuggested from "~/components/about/companyOffers";
import { l } from "~/.server/loaders/about";
import { useLoaderData } from "@remix-run/react";

export const loader = l;

export default function JobOffer() {
  const data = useLoaderData<typeof loader>();

  const isUserLoggedIn = data.userId ? true : false;

  return (
    <div className="flex flex-col justify-between items-center min-h-[100vh] h-full w-full bg-white">
      <IndexHeader isUserLoggedIn={isUserLoggedIn} profile_slug={data.profile_slug || ""} />
      <div className="flex flex-row w-full px-40 py-12 min-h-[60vh] justify-between items-start gap-20">
        <div className="flex flex-col w-2/3 min-h-[60vh] justify-normal items-start gap-5">
          <div className="flex flex-col w-full h-28 items-start gap-5">
            <h1 className="font-title font-medium text-4xl">WIST - Work and Internships for Students </h1>
            <h3 className="font-title font-normal mb-8 text-2xl text-gray-mid">Услуги за набиране и заетост</h3>
          </div>
          <h3 className="mt-8 font-title font-bold text-2xl">За нас:</h3>
          <p className="font-body font-normal text-xl">
            <span className="font-bold">WIST.bg </span> е онлайн портал, посветен на развитието на студенти и млади хора
            в България. Нашата цел е да улесним техния старт в кариерата, като предоставяме лесен и достъпен начин за
            намиране на работа и професионални възможности.
          </p>
          <p className="font-body font-normal text-xl">
            Основният ни фокус е създаването на <span className="font-bold">Job Boarding платформа</span>, която
            предлага разнообразни възможности за млади хора: почасова работа, стажове, бригади и позиции за започване на
            кариера след завършване на образованието. Стремим се да подпомогнем развитието на младите таланти, като
            осигурим качествени обяви, които съответстват на техните интереси, и се борим срещу нископлатения и нечестен
            труд.
          </p>
          <p className="font-body font-normal text-xl">
            Ние изграждаме общност, която помага на младите хора да открият подходящата за тях позиция, съобразена с
            техните нужди и амбиции.
          </p>
          <hr className="w-full border-gray-light border rounded-md" />
          <h3 className="font-title font-bold text-2xl">За работодатели</h3>
          <p className="font-body font-normal text-xl">
            <span className="font-bold">WIST.bg </span> е платформа, която предоставя на работодателите възможност да
            открият нови таланти и да запълнят нуждите на своите екипи. Ние се стремим да разрешим трудностите при
            намирането на персонал и да осигурим лесен достъп до мотивирани млади хора.
          </p>
          <p className="font-body font-normal text-xl">
            Платформата предлага гъвкави условия и опростена система за публикуване на обяви в категориите почасова
            работа, стажове, бригади и позиции за след завършване. Осигуряваме голям поток от млади хора, които активно
            търсят възможности за развитие. Работодателите могат да разчитат на нашата подкрепа при намирането на
            правилния кандидат.
          </p>
          <p className="font-body font-normal text-xl">
            В <span className="font-bold">WIST.bg </span> изграждаме специализирана система за подбор на мотивирани и
            успешни млади хора, които могат да станат част и от Вашия екип!
          </p>
          <hr className="w-full border-gray-light border rounded-md" />
          <h3 className="font-title font-bold text-2xl">За студенти</h3>
          <p className="font-body font-normal text-xl">
            <span className="font-bold">WIST.bg </span> предлага лесен достъп до различни видове почасова работа,
            стажове, бригади и предложения за работа след завършване. Платформата е проектирана да осигури бързо и
            удобно търсене на желаната позиция.
          </p>
          <p className="font-body font-normal text-xl">
            Можете да филтрирате обявите по различни категории, внимателно подбрани да отговарят на нуждите и
            ежедневието на младите хора. Това прави процеса на търсене лесен и приятен.
          </p>
          <p className="font-body font-normal text-xl">
            Нашата мисия е да направим пътя към професионалното развитие достъпен за всеки млад човек.
          </p>
          <p className="font-body font-normal text-xl">
            <span className="font-bold">Вашето развитие е нашата цел, а Вашата цел е Вашето развитие! </span>
          </p>
        </div>
        <div className="flex flex-col w-1/3 min-h-[60vh] justify-between items-start gap-5">
          <span className="h-28">
            <img src="/uploads/Wist-full.svg" alt="WIST logo" />
          </span>
          <CompanyOfferSuggested />
        </div>
      </div>

      <IndexFooter />
    </div>
  );
}
