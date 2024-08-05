# remix-tailwind-template


## features
the purpose of this repo is to have a standardised template to use for different projects. here's it's features:
- tailwind
- server-side mutations (via `~/app/.server/actions/`)
- server-side rendering and data fetching (via `~/app/.server/loaders/`)
- automatic opengraph generation
- internationalization (pre-written hooks, i18next setup, etc.)


## database
notably, the only thing missing is a database. if you need help setting one up, text boris on discord. recommendations are prisma or drizzle, both with sqlite.

if you need a client editable database (content management system), use strapi. again, text boris to help you set it up.


## running
1. `npm install`
2. `npm run dev` (access on [http://localhost:5137](http://localhost:5137), uses `.env`)

voila!


## building
1. `npm run build`
2. `npm run build` (also runs linter as a pre-build step)
3. `npm run start` (uses `.env.prod`)


## prereq. knowledge
here's a list of all the things you need to roughly be aware of to use this repo and understand all the code inside (assuming you know react and typescript):
- [server side data loading](https://remix.run/docs/en/main/guides/data-loading)
- [server side data mutations](https://remix.run/docs/en/main/route/action)
- [managing state with search params](https://remix.run/docs/en/main/hooks/use-search-params)
- [internationalization](https://remix.run/blog/remix-i18n)
- [tailwind](https://tailwindcss.com/docs/utility-first)
- [writing custom react hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [filesystem-based routing](https://remix.run/docs/en/main/discussion/routes)


## project structure
- `app`: code
    - `.server`: contains all the code that runs only on the server
        - `actions`: functions that modify state on the backend
        - `loaders`: functions that get data from the backend
    - `components`: reusable react components
        - `[route_name]`: if a route becomes too big, move components into its own folder here
    - `lib`: reusable functions
    - `routes`: contains all the routes (pages) of the app
    - `styles`: css files, try to keep this to a minimum and use tailwind as much as possible
    - `types`: types that are used throughout the application by actions, loaders, etc.
- `public`: static files
    - `locale`: json files with the translations for all text on the website


## explanations of select features (w/ examples)
### i18n (internationalization)
a lot of websites/webapp's we make need to be bi- or even tri-lingual. this is why we need a somewhat robust implementation of internationalization.

the first step is to set up what language's you'll support. this is done in `app/i18n.ts`:
```ts
export type LOCALE = "bg" | "en";
export const SUPPORTED_LOCALES: LOCALE[] = ["bg", "en"];
export const DEFAULT_LOCALE: LOCALE = "bg";

export default {
  supportedLngs: SUPPORTED_LOCALES,
  fallbackLng: DEFAULT_LOCALE,
  defaultNS: "common",
  react: { useSuspense: false }
};
```

then, the current locale is kept track of via the `lang` search param. for example: `http://localhost:5173/about-us?lang=bg`. if the param is not present, the default is assumed.

there's utility hooks you can use to interact with all this:
```tsx
import { useSwitchLanguage } from "~/hooks/useSwitchLanguage";
import { SUPPORTED_LOCALES } from "~/i18n";

export default function Example() {
  const switchLanguage = useSwitchLanguage();

    return (
        <div className="flex flex-row items-center justify-center gap-4 select-none">
            {SUPPORTED_LOCALES.map((x) => (
                <div key={`locale-picker-${x}`} className="underline cursor-pointer" onClick={() => switchLanguage(x)}>
                    {x}
                </div>
            ))}
        </div>
    );
}
```

the translations themselves are set in `public/locale/[locale]/common.json`:
```json
// public/locale/en/common.json
{
  "hi": "Hello!"
}
```
```json
// public/locale/bg/common.json
{
  "hi": "Здрасти!"
}
```

then, you can use the json's like so. this will render differently based on the chosen locale:
```ts
import { useTranslation } from "react-i18next";

export default function Example() {
    const {t} = useTranslation();

    return <div>{t("hi")}</div>;
}
```

if you have so much text, that you need more json files to stay organized, that's your cue to use a cms. text boris about it.


### server data loading
you can get data on the server-side through loaders. here's an example of a server-side loader that takes data from the search params and returns the uppercase version:
```ts
// app/.server/loaders/_index.ts

import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getLocale } from "../getLocale";

export async function l({ request }: LoaderFunctionArgs) {
    const locale = await getLocale(request);

    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    let message = "";
    if (searchParams.has("message")) {
        message = (searchParams.get("message") as string).toUpperCase();
    }

    return json({
        locale,
        appURL: process.env.APP_URL,
        message
    });
}
```

this is an oversimplified example. you can do much more here: call apis, fetch from database, etc.

also, notice how we have to manually pass any environment variables to the client-side code here, as it does not have access to `process.env` for security reasons.

here's how you can access the data. import the loader, export it from the route, and then use the `useLoaderData` hook to get it:
```tsx
// app/routes/_index.tsx
import { l } from "~/.server/loaders/_index";
import { useLoaderData } from "@remix-run/react";

export const loader = l;

export default function Index() {
    const data = useLoaderData<typeof loader>();

    return (<div>{data.message}</div>);
}
```


### server data mutation
you can change data on the server through mutations. here's an example which writes a message to the database:
```tsx
import { ActionFunctionArgs, json } from "@remix-run/node";

export type ContactFormData =
    | {
        ok: false;
        message: string;
    } | {
        ok: true;
    };
   
export async function contactFormAction({ request }: ActionFunctionArgs) {
    const body = await request.formData();
    const name = body.get("name");

    if (!name) {
        return json<ContactFormData>({
            ok: false,
            message: "Please, input all required fields."
        });
    }

    await prisma.messages.create({message: `New message from ${name}`});

    return json<ContactFormData>({
        ok: true,
    });
}
```

Note that the `prisma` call is for demo purposes only. there's no db set up on the template.

Here's how you'd call this:
```tsx
// app/routes/contact-form.tsx

import { useActionData } from "@remix-run/react";
import { contactFormAction } from "~/.server/actions/index/contactForm";
import { Form } from "@remix-run/react";

export const action = contactFormAction;

export default function ContactForm() {
    const actionData = useActionData<typeof action>();

    return (
        <Form method="post" preventScrollReset>
            <label htmlFor="name">
                Name: *
            </label>
            <input name="name" type="text" required/>
            <button type="submit">
                Send
            </button>
            {actionData?.ok === false && <div>{props.actionData.message}</div>}
      </Form>
    );
}
```
