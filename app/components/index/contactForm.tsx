import { Form } from "@remix-run/react";
import { ContactFormData } from "~/.server/actions/index/contactForm";

interface Props {
  actionData: ContactFormData | undefined;
}

export default function ContactForm(props: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="text-2xl">Form example</div>
      <Form method="post" preventScrollReset className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="font-semibold text-xl">
              Name: *
            </label>
            <input name="name" type="text" required className="text-xl w-full border-2 border-black" />
          </div>
          <button type="submit" className="text-xl font-semibold text-center underline">
            Send
          </button>
          {props.actionData?.ok && <div className="text-xl">{props.actionData.message.message}</div>}
          {props.actionData?.ok === false && <div className="text-xl text-[#ff3333]">{props.actionData.message}</div>}
        </div>
      </Form>
    </div>
  );
}
