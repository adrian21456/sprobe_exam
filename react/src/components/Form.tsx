"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import {
  ModForm,
  ModFormButton,
  ModFormCheckboxGroup,
  ModFormComboBox,
  ModFormField,
  ModFormFile,
  ModFormRadioGroup,
  ModFormSelect,
} from "./ui/mods";

const interestData = [
  { label: "Sports", value: "sports" },
  { label: "Music", value: "music" },
  { label: "Coding", value: "coding" },
  { label: "Reading", value: "reading" },
];

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
];

const genderData = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
];

const typeData = [
  {
    label: "SHS",
    value: "SHS",
  },
  {
    label: "JHS",
    value: "JHS",
  },
];

const formSchema = z.object({
  file: z
    .any()
    .refine((files) => files && files.length === 1, {
      message: "File is required",
    })
    .transform((files) => files[0]),
  // file: z.any().refine((files) => files && files.length > 0, {
  //   message: "At least one file is required",
  // }),
  username: z.string(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(10, {
      message: "Password must be not greater than 10 charactes",
    }),
  gender: z.enum(["Male", "Female"], {
    message: "Invalid Gender",
  }),
  type: z.enum(["SHS", "JHS"], {
    message: "Invalid Type",
  }),
  interests: z
    .array(z.enum(["sports", "music", "coding", "reading"]))
    .min(1, { message: "Select at least one interest." }),
  frameworks: z.string(),
});

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      gender: "Male",
      type: "SHS",
      interests: [],
      frameworks: "",
      file: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <ModForm submitEvent={onSubmit} form={form}>
      <ModFormFile name="file" form={form} />
      <ModFormField name="username" form={form} />
      <ModFormField name="password" type="password" form={form} />
      <ModFormSelect name="gender" form={form} optionData={genderData} />
      <ModFormRadioGroup name="type" form={form} optionData={typeData} />
      <ModFormCheckboxGroup
        name="interests"
        form={form}
        optionData={interestData}
      />
      <ModFormComboBox name="frameworks" form={form} optionData={frameworks} />
      <ModFormButton />
    </ModForm>
  );
}
