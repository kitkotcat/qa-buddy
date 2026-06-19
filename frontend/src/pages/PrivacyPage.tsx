import { useLanguage } from "../i18n/LanguageContext";

function PrivacyPage() {
  const { language } = useLanguage();

  const content =
    language === "ru"
      ? {
          badge: "КОНФИДЕНЦИАЛЬНОСТЬ",
          title: "Политика конфиденциальности",
          updated: "Дата обновления: 19 июня 2026 года",

          introTitle: "1. Общая информация",
          intro:
            "QA Cat Buddy — приложение для практики и самопроверки знаний в области тестирования программного обеспечения. Для использования приложения не требуется регистрация или создание учётной записи.",

          dataTitle: "2. Какие данные использует приложение",
          data:
            "Приложение сохраняет выбранный язык, цель подготовки, прогресс тестов, результаты, состояние чек-листов и созданные пользователем материалы локально на устройстве.",

          transmissionTitle: "3. Передача данных",
          transmission:
            "Android-версия QA Cat Buddy не передаёт сохранённый прогресс, настройки и созданные материалы разработчику или третьим лицам. Основные функции приложения доступны без подключения к интернету.",

          personalTitle: "4. Персональные данные",
          personal:
            "Приложение не запрашивает имя, фамилию, номер телефона, адрес электронной почты, дату рождения, местоположение, контакты, фотографии, аудиозаписи или платёжные данные пользователя.",

          permissionsTitle: "5. Разрешения устройства",
          permissions:
            "Приложение не запрашивает доступ к камере, микрофону, контактам, сообщениям, журналу вызовов или геолокации. Фактический перечень технических разрешений проверяется для каждой публикуемой версии приложения.",

          removalTitle: "6. Удаление данных",
          removal:
            "Пользователь может удалить локальные данные через настройки Android, выбрав очистку данных приложения, либо удалить приложение с устройства.",

          childrenTitle: "7. Использование детьми",
          children:
            "Приложение не содержит функций общения между пользователями, рекламы, покупок, азартных игр или контента для взрослых. Приложение не осуществляет целевой сбор данных детей.",

          changesTitle: "8. Изменения политики",
          changes:
            "Политика может обновляться при изменении функций приложения, способов обработки данных или требований законодательства. Актуальная версия публикуется вместе с приложением и на странице проекта.",

          contactTitle: "9. Связь с разработчиком",
          contact:
            "Связаться с разработчиком можно по контактному адресу, указанному в карточке QA Cat Buddy в RuStore.",

          notice:
            "Документ описывает Android-версию QA Cat Buddy v0.3.1. Перед публикацией будет выполнен дополнительный аудит разрешений и сторонних библиотек.",
        }
      : {
          badge: "PRIVACY",
          title: "Privacy Policy",
          updated: "Last updated: June 19, 2026",

          introTitle: "1. General information",
          intro:
            "QA Cat Buddy is an application for software testing practice and knowledge self-assessment. Registration or account creation is not required.",

          dataTitle: "2. Data used by the application",
          data:
            "The application stores the selected language, preparation goal, quiz progress, results, checklist state and user-created materials locally on the device.",

          transmissionTitle: "3. Data transmission",
          transmission:
            "The Android version of QA Cat Buddy does not transmit saved progress, settings or created materials to the developer or third parties. The main features are available without an internet connection.",

          personalTitle: "4. Personal data",
          personal:
            "The application does not request the user's name, phone number, email address, date of birth, location, contacts, photos, audio recordings or payment data.",

          permissionsTitle: "5. Device permissions",
          permissions:
            "The application does not request access to the camera, microphone, contacts, messages, call history or location. The actual list of technical permissions is reviewed for every published version.",

          removalTitle: "6. Data deletion",
          removal:
            "Users can remove local data through Android application settings by clearing the application data, or by uninstalling the application.",

          childrenTitle: "7. Children's use",
          children:
            "The application does not contain user communication, advertising, purchases, gambling or adult content. It does not intentionally collect children's data.",

          changesTitle: "8. Policy changes",
          changes:
            "This policy may be updated when application features, data processing practices or legal requirements change. The current version is published with the application and on the project page.",

          contactTitle: "9. Contact",
          contact:
            "The developer can be contacted through the contact address listed on the QA Cat Buddy page in RuStore.",

          notice:
            "This document describes QA Cat Buddy Android v0.3.1. An additional permission and dependency audit will be completed before publication.",
        };

  const sections = [
    [content.introTitle, content.intro],
    [content.dataTitle, content.data],
    [content.transmissionTitle, content.transmission],
    [content.personalTitle, content.personal],
    [content.permissionsTitle, content.permissions],
    [content.removalTitle, content.removal],
    [content.childrenTitle, content.children],
    [content.changesTitle, content.changes],
    [content.contactTitle, content.contact],
  ];

  return (
    <section className="mx-auto max-w-4xl">
      <div className="mb-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          {content.badge}
        </p>

        <h1 className="text-3xl font-black sm:text-5xl">
          {content.title}
        </h1>

        <p className="mt-4 text-slate-500">
          {content.updated}
        </p>
      </div>

      <div className="grid gap-5">
        {sections.map(([title, text]) => (
          <article
            key={title}
            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-7"
          >
            <h2 className="mb-3 text-xl font-bold sm:text-2xl">
              {title}
            </h2>

            <p className="leading-8 text-slate-300">
              {text}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-7 text-amber-100">
        {content.notice}
      </div>
    </section>
  );
}

export default PrivacyPage;
