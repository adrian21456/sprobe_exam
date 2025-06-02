"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDateYMD, pluralize, proper } from "@/lib/helpers";
import { Pencil, PlusCircle, Trash2Icon } from "lucide-react";
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
  ModFormFile,
  ModFormSelect,
  ModFormWizard,
  ModTable,
  ModTableAction,
  ModTableHeader,
} from "@/components/ui/mods";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useSearchParams, useRouter } from "next/navigation";

const entity = "employee_file";
const pk_column = `${entity}_id`;
const properName = proper(entity);
const properNameLowercase = properName.toLowerCase();
const plural = proper(pluralize(entity));
const pluralLowercase = plural.toLowerCase();
const addApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/employee_file`;
const editApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/employee_file`;
const deleteApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/employee_file`;
const searchApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/employee_file/search`;
let action = "Add";
let editFields = [{}];
let current_id: any = null;
let foreign_key: any = null; //(Set to null when not specified)
let foreign_key_value: any = null; //Observe Type (Set to null when not specified)
let router: any;
const files = ["file_upload"];

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
      id: "employee_full_name",
      label: "Employee Name",
    }),
    ...ModTableHeader({
      id: "file_file_name",
      label: "File Name",
    }),
    ...ModTableHeader({
      id: "description",
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
    file_id: z.number().min(1, { message: "File is required" }),
    employee_id: z.number().min(1, { message: "Employee is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    file_upload: z.any(),
  });

  const defaultValues = {
    file_id: "",
    employee_id: "",
    description: "",
    file_upload: "",
  };

  let values: any = defaultValues;

  if (action === "Edit") {
    Object.keys(editFields).forEach((key: any) => {
      if (key in values) {
        if (!files.includes(key)) {
          if (key.includes("date"))
            editFields[key] = formatDateYMD(editFields[key]);
          values[key] = editFields[key];
        }
      }
    });
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: values,
  });

  return (
    <ModForm form={form} submitEvent={submitEvent} className="mt-2 pb-2">
      <ModFormWizard
        form={form}
        name="employee_id"
        label="Employee"
        url={`${process.env.NEXT_PUBLIC_API_URL}/employee/search`}
        dataLabel="full_name"
        dataValue="employee_id"
        default_value={foreign_key_value}
      />
      <ModFormWizard
        form={form}
        name="file_id"
        label="File"
        url={`${process.env.NEXT_PUBLIC_API_URL}/file/search`}
        dataLabel="file_name"
        dataValue="file_id"
        default_value={foreign_key_value}
      />
      <ModFormField form={form} name="description" />
      <ModFormFile
        form={form}
        name="file_upload"
        multiple={true}
        label="File"
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
    files: files,
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
