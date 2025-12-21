import { Button, Input } from "@heroui/react";
import { type FC, type FormEventHandler, useState } from "react";
import Book from "../svg/Book";
import client from "../api/client";
import { RiMailCheckLine } from "react-icons/ri";

const emailRegex = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
);

const SignUp: FC = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);
  const [showSuccessResponse, setShowSuccessResponse] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    if (!emailRegex.test(email)) return setInvalidForm(true);

    setInvalidForm(false);

    setBusy(true);
    try {
      await client.post("/auth/generate-link", {
        email,
      });

      setShowSuccessResponse(true);
    } catch (error) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  };

  if (showSuccessResponse)
    return (
      <div className="flex-1 flex flex-col items-center justify-center md:p-0 p-4">
        <RiMailCheckLine size={80} className="animate-bounce" />
        <p className="text-lg text-center">
          A confirmation email has been sent! Please check your inbox.
        </p>
        <p className="font-semibold">
          If you're a new user, it may take some time for the email to appear in
          your inbox. Please be patient.
        </p>
      </div>
    );

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-96 border-2 p-5 rounded-md">
        <Book className="w-44 h-44" />
        <h1 className="text-center text-xl font-semibold">
          Books are an endless source of knowledge. Sign up now to explore a
          diverse and rich world of books!
        </h1>

        <form onSubmit={handleSubmit} className="w-full space-y-6 mt-6">
          <Input
            label="Email"
            placeholder="john@email.com"
            variant="bordered"
            isInvalid={invalidForm}
            errorMessage="Invalid email!"
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
              setInvalidForm(false);
            }}
          />
          <Button isLoading={busy} type="submit" className="w-full">
            Send verification code
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
