"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDateYMD, pluralize, proper } from "@/lib/helpers";
import { Files, Pencil, PlusCircle, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import {
  ModActionModal,
  ModAddEditEvent,
  ModDeleteEvent,
  ModDeleteModal,
  ModFetchEvent,
  ModForm,
  ModFormButton,
  ModFormField,
  ModFormSelect,
  ModFormWizard,
  ModTable,
  ModTableAction,
  ModTableHeader,
} from "@/components/ui/mods";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter, useSearchParams } from "next/navigation";

const entity = "employee";
const pk_column = `${entity}_id`;
const properName = proper(entity);
const properNameLowercase = properName.toLowerCase();
const plural = proper(pluralize(entity));
const pluralLowercase = plural.toLowerCase();
const addApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/employee`;
const editApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/employee`;
const deleteApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/employee`;
const searchApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/employee/search`;
let action = "Add";
let editFields = [{}];
let current_id: any = null;
let foreign_key: any = null; //(Set to null when not specified)
let foreign_key_value: any = null; //Observe Type (Set to null when not specified)
let router: any;

export default function HomePage() {
  const [openActionModal, setOpenActionModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const isMobile = useIsMobile();
  router = useRouter();

  const searchParams = useSearchParams();
  foreign_key = searchParams.get("foreign_key");
  foreign_key_value = searchParams.get("foreign_key_value");
  foreign_key_value = parseInt(foreign_key_value);

  const menus = [
    {
      label: "Files",
      icon: <Files />,
      event: (row: any) => {
        const params = new URLSearchParams({
          foreign_key: "employee_id",
          foreign_key_value: row.employee_id,
        });
        router.push(`/dashboard/employee_file?${params.toString()}`);
      },
    },
    {
      label: "Edit",
      icon: <Pencil />,
      event: (row: any) => {
        action = "Edit";
        editFields = row;
        current_id = row[pk_column];
        setOpenActionModal(true);
      },
    },
    {
      label: "Delete",
      icon: <Trash2Icon />,
      event: (row: any) => {
        action = "Delete";
        current_id = row[pk_column];
        setOpenDeleteModal(true);
      },
    },
  ];

  const columns = [
    ...ModTableAction({
      menus: menus,
    }),
    ...ModTableHeader({
      id: "firstname",
    }),
    ...ModTableHeader({
      id: "middlename",
    }),
    ...ModTableHeader({
      id: "lastname",
    }),
    ...ModTableHeader({
      id: "department_department_name",
      label: "Department Name",
    }),
    ...ModTableHeader({
      id: "gender",
    }),
    ...ModTableHeader({
      id: "birthdate",
      type: "date",
    }),
    ...ModTableHeader({
      id: "address",
    }),
  ];

  useEffect(() => {
    fetchTableData(setTableData);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 p-8">
      <div className="flex justify-between align-middle gap-2">
        <div>
          <div className="text-3xl font-bold capitalize">{plural}</div>
          <div className="text-sm font-light">
            Showing the list of {pluralLowercase}.
          </div>
        </div>
        <div>
          <Button
            onClick={() => {
              setOpenActionModal(true);
              action = "Add";
            }}
          >
            <PlusCircle /> New {!isMobile && properName}
          </Button>
        </div>
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg h-fit">
        <ModTable data={tableData} columns={columns} />
      </div>
      <div>
        <ModActionModal
          openActionModal={openActionModal}
          setOpenActionModal={setOpenActionModal}
          name={entity}
        >
          <Form
            setTableData={setTableData}
            setOpenActionModal={setOpenActionModal}
          />
        </ModActionModal>

        <ModDeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          deleteEvent={() => deleteEvent(setOpenDeleteModal, setTableData)}
          name={entity}
        />
      </div>
    </div>
  );
}

function Form({ setTableData, setOpenActionModal }: any) {
  const submitEvent = (values: any) => {
    submitForm(values, setTableData, setOpenActionModal);
  };

  const formSchema = z.object({
    firstname: z.string().min(1, { message: "First name is required" }),
    middlename: z.string().optional(),
    lastname: z.string().min(1, { message: "Last name is required" }),
    birthdate: z.string({ required_error: "Birthdate is required" }),
    gender: z.enum(["Male", "Female"], {
      required_error: "Gender is required",
    }),
    address: z.string().min(1, { message: "Address is required" }),
    department_id: z.number().min(1, { message: "Department is required" }),
  });

  const defaultValues = {
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "Male",
    birthdate: new Date(), // Must be a Date object for z.date()
    address: "",
    department_id: undefined,
  };

  let values: any = defaultValues;

  if (action === "Edit") {
    Object.keys(editFields).forEach((key: any) => {
      if (key in values) {
        if (key.includes("date"))
          editFields[key] = formatDateYMD(editFields[key]);
        values[key] = editFields[key];
      }
    });
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: values,
  });

  return (
    <ModForm form={form} submitEvent={submitEvent} className="mt-2 pb-2">
      <ModFormField form={form} name="firstname" />
      <ModFormField form={form} name="middlename" />
      <ModFormField form={form} name="lastname" />
      <ModFormField
        form={form}
        name="birthdate"
        type="date"
        className="w-full"
      />
      <ModFormField form={form} name="address" />

      <ModFormSelect
        form={form}
        name="gender"
        optionData={[
          {
            label: "Male",
            value: "Male",
          },
          {
            label: "Female",
            value: "Female",
          },
        ]}
      />
      <ModFormWizard
        form={form}
        name="department_id"
        dataValue="department_id"
        dataLabel="department_name"
        default_value={foreign_key_value}
        url={`${process.env.NEXT_PUBLIC_API_URL}/department/search`}
      />
      <ModFormButton className="w-full" />
    </ModForm>
  );
}

async function fetchTableData(setTableData: any) {
  ModFetchEvent({
    url: searchApiUrl,
    name: entity,
    foreign_key: foreign_key,
    foreign_key_value: foreign_key_value,
    setTableData: setTableData,
    router: router,
  });
}

async function submitForm(
  value: any,
  setTableData: any,
  setOpenActionModal: any
) {
  ModAddEditEvent({
    addURL: addApiUrl,
    editURL: `${editApiUrl}/${current_id}`,
    name: entity,
    value: value,
    setTableData: setTableData,
    setOpenActionModal: setOpenActionModal,
    fetchTableData: fetchTableData,
    action: action,
    router: router,
  });
}

async function deleteEvent(setOpenDeleteModal: any, setTableData: any) {
  ModDeleteEvent({
    name: entity,
    url: `${deleteApiUrl}/${current_id}`,
    setOpenDeleteModal: setOpenDeleteModal,
    setTableData: setTableData,
    fetchTableData: fetchTableData,
    router: router,
  });
}
