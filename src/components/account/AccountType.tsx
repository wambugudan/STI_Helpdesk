import { useUser } from "@clerk/nextjs";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { db } from "@/config/firebase";

interface Props {
  code: number;
}

export default function SignIn({ code }: Props) {
  const [isToggledOn, setToggle] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const newLocal =
    "focus:shadow-outline mt-10 flex w-full items-center justify-center rounded-lg bg-slate-300 py-4 font-semibold tracking-wide text-slate-100";

  const newLocal2 =
    "focus:shadow-outline mt-10 flex w-full items-center justify-center rounded-lg bg-slate-800 py-4 font-semibold tracking-wide text-slate-50 transition-all duration-300 ease-in-out hover:bg-slate-900 focus:outline-none";

  const [data, setData] = useState({
    accountType: "",
  });

  const { user } = useUser();
  // console.log({ user });
  const router = useRouter();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const savetoDb = async (e: any) => {
    setSubmitted(true);
    e.preventDefault();
    if (user) {
      if (code === 500) {
        try {
          await setDoc(doc(db, "users", user?.id), {
            accountType: data.accountType,
            name: `${user?.firstName} ${user?.lastName}`,
            email: user?.primaryEmailAddress?.emailAddress,
            profileUrl: user?.profileImageUrl,
            username: user?.username,
          });
          const response = await user.update({
            unsafeMetadata: { data },
          });
          if (response) {
            router.push("/");
          }
        } catch (err) {
          /* empty */
        }
      } else {
        try {
          const referenceData = doc(db, "users", user?.id);
          await updateDoc(referenceData, {
            accountType: data.accountType,
            name: `${user?.firstName} ${user?.lastName}`,
            email: user?.primaryEmailAddress?.emailAddress,
            profileUrl: user?.profileImageUrl,
            username: user?.username,
          });
          const response = await user.update({
            unsafeMetadata: { data },
          });
          if (response) {
            router.push("/");
          }
        } catch (err) {
          /* empty */
        }
      }
    }
  };

  return (
    <div className="">
      <a href="#">
        <img src="/favicon.ico" alt="icon" className="mx-auto h-12" />
      </a>
      <div className="mt-12 flex flex-col items-center">
        <h1 className="text-2xl font-extrabold xl:text-3xl">
          Choose Account Type
        </h1>
        <div className="mt-8 w-full flex-1">
          <form className="mx-auto max-w-xl" onSubmit={savetoDb}>
            <h3 className="mb-5 flex justify-center text-lg font-medium text-gray-600">
              This will help us setup your account type
            </h3>
            <ul className="mt-10 grid w-full gap-6 md:grid-cols-2">
              <li>
                <input
                  type="radio"
                  id="expert"
                  name="expert"
                  value="expert"
                  className="peer hidden"
                  onChange={(e: any) => {
                    setData({ ...data, accountType: e.target.value });
                    setToggle(true);
                  }}
                />
                <label
                  htmlFor="expert"
                  className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-slate-300 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-slate-800 peer-checked:bg-gray-100 peer-checked:text-slate-800"
                >
                  <div className="block">
                    <div className="w-full text-base">I am an</div>
                    <div className="w-full text-lg font-semibold">Expert</div>
                  </div>
                  <svg
                    aria-hidden="true"
                    className="ml-3 h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="counselor"
                  name="sgc"
                  value="SGC Member"
                  className="peer hidden"
                  onChange={(e: any) => {
                    setData({ ...data, accountType: e.target.value });
                    setToggle(true);
                  }}
                />
                <label
                  htmlFor="counselor"
                  className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-slate-300 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-slate-800 peer-checked:bg-gray-100 peer-checked:text-slate-800"
                >
                  <div className="block">
                    <div className="w-full text-base">I am an</div>
                    <div className="w-full text-lg font-semibold">
                      SGC Member
                    </div>
                  </div>
                  <svg
                    aria-hidden="true"
                    className="ml-3 h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </label>
              </li>
            </ul>

            <button
              type="submit"
              className={
                isToggledOn ? (submitted ? newLocal : newLocal2) : newLocal
              }
              disabled={!isToggledOn}
            >
              <svg
                aria-hidden="true"
                role="status"
                className={classNames(
                  submitted ? "block" : "hidden",
                  "mr-3 h-5 w-5 animate-spin text-white"
                )}
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              <span className="ml-3">Continue to Dashboard</span>
            </button>

            <p className="mt-6 text-center text-xs text-gray-600">
              I agree to abide by STI Policy Helpdesk&apos;s{" "}
              <Link href="#" className="border-b border-dotted border-gray-500">
                Terms of Service
              </Link>{" "}
              and its{" "}
              <Link href="#" className="border-b border-dotted border-gray-500">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
