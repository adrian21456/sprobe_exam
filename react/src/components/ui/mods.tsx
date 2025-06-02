import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import {
  flattenObject,
  generateRandomKey,
  pluralize,
  proper,
} from "@/lib/helpers";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Checkbox } from "./checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import {
  ArrowUpDown,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  CircleX,
  MoreHorizontal,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import React, { useEffect, useRef, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import axios from "axios";
import { triggerLatestEvents } from "@/lib/events";
import { useRouter } from "next/navigation";

function ModForm({
  form,
  submitEvent,
  className,
  style,
  children,
}: {
  form: UseFormReturn | any;
  submitEvent: any;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitEvent)}
        className={cn("space-y-8", className)}
        style={style}
      >
        {children}
      </form>
    </Form>
  );
}

function ModFormButton({
  className,
  style,
  label = "Submit",
}: {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}) {
  return (
    <Button className={className} style={style} type="submit">
      {label}
    </Button>
  );
}

function ModFormField({
  form,
  name,
  label,
  description,
  description_location = "top",
  type,
  placeholder,
  className,
  style,
  containerClassName,
  containerStyle,
}: {
  form: any;
  name: string;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  label?: React.ReactNode;
  description?: React.ReactNode;
  description_location?: "top" | "bottom";
  type?: string;
  placeholder?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName} style={containerStyle}>
          <FormLabel>{label ?? proper(name)}</FormLabel>
          {description && description_location === "top" && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className={className}
              style={style}
            />
          </FormControl>
          {description && description_location === "bottom" && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ModFormFile({
  form,
  name,
  label,
  description,
  description_location = "top",
  className,
  style,
  containerClassName,
  containerStyle,
  accept,
  multiple = false,
}: {
  form: any;
  name: string;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  label?: React.ReactNode;
  description?: React.ReactNode;
  description_location?: "top" | "bottom";
  accept?: string;
  multiple?: boolean;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName} style={containerStyle}>
          <FormLabel>{label ?? proper(name)}</FormLabel>
          {description && description_location === "top" && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormControl>
            <Input
              type="file"
              className={className}
              style={style}
              accept={accept}
              multiple={multiple}
              name={field.name}
              // onChange={(e) => field.onChange(e.target.files)}
              onChange={(e) => {
                const files = e.target.files;
                if (!files) return;
                form.setValue(name, multiple ? Array.from(files) : files[0]);
              }}
              ref={field.ref}
            />
          </FormControl>
          {description && description_location === "bottom" && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ModFormSelect({
  form,
  name,
  optionData,
  label,
  description,
  description_location = "top",
  placeholder,
  className,
  style,
  containerClassName,
  containerStyle,
}: {
  form: any;
  name: string;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  label?: React.ReactNode;
  description?: React.ReactNode;
  description_location?: "top" | "bottom";
  placeholder?: string;
  optionData: { label: string; value: string }[];
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName} style={containerStyle}>
          <FormLabel>{label ?? proper(name)}</FormLabel>
          {description && description_location === "top" && (
            <FormDescription>{description}</FormDescription>
          )}
          <Select {...field} onValueChange={field.onChange}>
            <SelectTrigger className={cn("w-full", className)} style={style}>
              <SelectValue
                placeholder={placeholder ?? `Select ${label ?? proper(name)}`}
              />
            </SelectTrigger>
            <SelectContent>
              {optionData?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && description_location === "bottom" && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ModFormRadioGroup({
  form,
  name,
  optionData,
  label,
  description,
  description_location = "top",
  className,
  style,
  groupClassName,
  groupStyle,
  containerClassName,
  containerStyle,
  labelClassName,
  labelStyle,
}: {
  form: any;
  name: string;
  className?: string;
  style?: React.CSSProperties;
  groupClassName?: string;
  groupStyle?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  label?: React.ReactNode;
  description?: React.ReactNode;
  description_location?: "top" | "bottom";
  optionData?: { label: string; value: string }[];
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName} style={containerStyle}>
          <FormLabel>{label ?? proper(name)}</FormLabel>
          {description && description_location === "top" && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn("gap-0 flex flex-col space-y-1", groupClassName)}
              style={groupStyle}
            >
              {optionData?.map((option) => (
                <FormItem
                  key={option.value}
                  className={cn(
                    "flex items-center space-x-3 space-y-0",
                    className
                  )}
                  style={style}
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel
                    className={cn("font-normal", labelClassName)}
                    style={labelStyle}
                  >
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {description && description_location === "bottom" && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ModFormWizard({
  form,
  name,
  url,
  dataLabel,
  dataValue,
  label,
  description,
  description_location = "top",
  placeholder,
  className,
  style,
  containerClassName,
  containerStyle,
  default_value = null,
}: {
  url: string;
  dataLabel: string;
  dataValue: string;
  form: any;
  name: string;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  label?: React.ReactNode;
  description?: React.ReactNode;
  description_location?: "top" | "bottom";
  placeholder?: string;
  default_value: any;
}) {
  const [optionData, setOptionData] = useState<{ label: string; value: any }[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data && res.data.status) {
          const result = res.data.result;
          let formatted = result
            .filter((obj: any) => {
              if (
                default_value != null &&
                !Number.isNaN(default_value) &&
                default_value != undefined
              ) {
                return obj[dataValue] === default_value;
              }
              return true;
            })
            .map((obj: any) => ({
              label: obj[dataLabel],
              value: obj[dataValue],
            }));
          setOptionData(formatted);
          console.log(formatted);
        }
      } catch (err) {
        console.error("Error submitting form:", err);
        triggerLatestEvents({
          title: "Process Failed!",
          description: `Failed to retrieve form wizard options for ${proper(
            name
          )}.`,
          icon: <CircleX className="w-4 h-4" />,
          color: "red",
        });
      }
    };

    fetchData();
  }, [url, dataLabel, dataValue, name]);

  return (
    <ModFormComboBox
      form={form}
      name={name}
      default_value={default_value}
      optionData={optionData}
      label={label ?? proper(dataLabel)}
      description={description}
      description_location={description_location}
      placeholder={placeholder ?? "Select " + proper(dataLabel)}
      className={className}
      style={style}
      containerClassName={containerClassName}
      containerStyle={containerStyle}
    />
  );
}

function ModFormCheckboxGroup({
  form,
  name,
  optionData,
  label,
  description,
  description_location = "top",
  className,
  style,
  groupClassName,
  groupStyle,
  containerClassName,
  containerStyle,
  labelClassName,
  labelStyle,
}: {
  form: any;
  name: string;
  className?: string;
  style?: React.CSSProperties;
  groupClassName?: string;
  groupStyle?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  label?: React.ReactNode;
  description?: React.ReactNode;
  description_location?: "top" | "bottom";
  optionData: { label: string; value: string }[];
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className={containerClassName} style={containerStyle}>
          <FormLabel>{label ?? proper(name)}</FormLabel>
          {description && description_location === "top" && (
            <FormDescription>{description}</FormDescription>
          )}
          <div
            className={cn("gap-0 flex flex-col space-y-1", groupClassName)}
            style={groupStyle}
          >
            {optionData.map((option) => (
              <FormField
                key={option.value}
                control={form.control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={option.value}
                      className={cn(
                        "flex flex-row items-start space-x-3 space-y-0",
                        className
                      )}
                      style={style}
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(option.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, option.value])
                              : field.onChange(
                                  field.value.filter(
                                    (v: string) => v !== option.value
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel
                        className={cn("font-normal", labelClassName)}
                        style={labelStyle}
                      >
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          {description && description_location === "bottom" && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ModFormComboBox({
  form,
  name,
  optionData,
  label,
  description,
  description_location = "top",
  className,
  style,
  groupClassName,
  groupStyle,
  containerClassName,
  containerStyle,
  labelClassName,
  labelStyle,
  placeholder,
  default_value = null,
}: {
  form: any;
  name: string;
  className?: string;
  style?: React.CSSProperties;
  groupClassName?: string;
  groupStyle?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  labelClassName?: string;
  placeholder?: string;
  labelStyle?: React.CSSProperties;
  label?: React.ReactNode;
  description?: React.ReactNode;
  description_location?: "top" | "bottom";
  optionData: { label: string; value: string }[];
  default_value: any;
}) {
  const [open, setOpen] = React.useState(false);

  // Set default value on mount if not yet set
  React.useEffect(() => {
    if (default_value != null && !form.getValues(name)) {
      form.setValue(name, default_value);
    }
  }, [default_value, form, name]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName} style={containerStyle}>
          <FormLabel>{label ?? proper(name)}</FormLabel>
          {description && description_location === "top" && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {field.value
                    ? optionData.find(
                        (framework) => framework.value === field.value
                      )?.label
                    : `Select ${label ?? proper(name)} ...`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder={`Search ${label ?? proper(name)} ...`}
                  />
                  <CommandList>
                    <CommandEmpty>
                      No {label ?? proper(name)} found.
                    </CommandEmpty>
                    <CommandGroup>
                      {optionData.map((framework) => (
                        <CommandItem
                          className={labelClassName}
                          style={labelStyle}
                          key={framework.value}
                          onSelect={() => {
                            field.onChange(framework.value);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              String(field.value) === String(framework.value)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          {description && description_location === "bottom" && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ModTableHeader({
  id,
  label,
  type = "string",
  sortable = true,
  concealable = true,
  headerClass = "",
  cellClass = "",
  hidden = false,
}: any): ColumnDef<any>[] {
  return [
    {
      accessorKey: id,
      enableSorting: sortable,
      enableHiding: concealable,
      meta: { hidden: hidden },
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="!px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className={cn("", headerClass)}>{label ?? proper(id)}</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        let value = row.getValue(id) as React.ReactNode;
        if (type === "number") {
          value = row.getValue(id) as number;
        }
        if (type === "date") {
          const date = new Date(row.getValue(id));
          value = date
            .toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })
            .replace(",", ".");
        }
        return <div className={cn("text-sm ", cellClass)}>{value}</div>;
      },
    },
  ];
}

function ModTableAction({ menus }: { menus: any }) {
  return [
    {
      id: "actions",
      enableHiding: false,
      size: 0,
      cell: ({ row }: any) => {
        const data = row.original;

        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {menus.map((menu: any) => {
                  return (
                    <DropdownMenuItem
                      key={generateRandomKey()}
                      onClick={() => {
                        menu.event(data);
                      }}
                    >
                      <div className="flex justify-left gap-2 align-middle">
                        <div>{menu.icon ?? {}}</div>
                        <div>{menu.label}</div>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}

function DataTablePagination<TData>({ table }: any) {
  return (
    <div className="flex items-center justify-between px-2 mt-2">
      {/* <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[1, 3, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ModTable({ data, columns }: { data: any; columns: any }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Search..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        minWidth: header.column.columnDef.size,
                        maxWidth: header.column.columnDef.size,
                        width: header.column.columnDef.size,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div> */}
      <DataTablePagination table={table} />
    </div>
  );
}

function ModActionModal({
  name,
  openActionModal,
  setOpenActionModal,
  children,
}: any) {
  const properName = proper(name);
  const properNameLowercase = properName.toLowerCase();
  const isDesktop = useIsMobile();
  if (!isDesktop) {
    return (
      <Dialog open={openActionModal} onOpenChange={setOpenActionModal}>
        <DialogContent className="sm:max-w-[425px] max-h-7/8 overflow-y-auto ">
          <DialogHeader>
            <DialogTitle>{properName} Details</DialogTitle>
            <DialogDescription>
              Enter all {properNameLowercase} details.
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={openActionModal} onOpenChange={setOpenActionModal}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{properName} Details</DrawerTitle>
          <DrawerDescription>
            Enter all {properNameLowercase} details.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 h-fit overflow-y-auto">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}

function ModDeleteModal({
  name,
  openDeleteModal,
  setOpenDeleteModal,
  deleteEvent,
}: any) {
  const properName = proper(name);
  const properNameLowercase = properName.toLowerCase();
  const isDesktop = useIsMobile();
  if (!isDesktop) {
    return (
      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent className="sm:max-w-[425px] max-h-7/8 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Delete {properName}</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this {properNameLowercase} record?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="destructive" onClick={deleteEvent}>
              Yes
            </Button>
            <Button variant="outline" onClick={() => setOpenDeleteModal(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Delete {properName}</DrawerTitle>
          <DrawerDescription>
            Are you sure you want to remove this {properNameLowercase} record?
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 h-fit overflow-y-auto flex justify-end gap-2">
          <Button variant="destructive" onClick={deleteEvent}>
            Yes
          </Button>
          <Button variant="outline" onClick={() => setOpenDeleteModal(false)}>
            Cancel
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

async function ModDeleteEvent({
  name,
  url,
  setOpenDeleteModal,
  setTableData,
  fetchTableData,
}: any) {
  const properName = proper(name);
  const properNameLowercase = properName.toLowerCase();
  try {
    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.data && res.data.status) {
      triggerLatestEvents({
        title: "Process Completed!",
        description: `${properName} record has been removed.`,
        icon: <CheckCircle className="w-4 h-4" />,
        color: "blue",
      });
    }
  } catch (err) {
    console.error("Error submitting form:", err);
    triggerLatestEvents({
      title: "Process Failed!",
      description: `Failed to delete ${properName} records.`,
      icon: <CircleX className="w-4 h-4" />,
      color: "red",
    });
  } finally {
    setOpenDeleteModal(false);
    fetchTableData(setTableData);
  }
}

async function ModAddEditEvent({
  name,
  addURL,
  editURL,
  action,
  value,
  setTableData,
  setOpenActionModal,
  fetchTableData,
  files = [],
}: any) {
  const properName = proper(name);
  console.log(value);
  if (action === "Add") {
    try {
      const formData = new FormData();
      for (const key in value) {
        if (!(files.includes(key) && !value[key])) {
          if (files.includes(key) && Array.isArray(value[key])) {
            value[key].forEach((file) => {
              formData.append(`${key}[]`, file);
            });
          } else {
            formData.append(key, value[key]);
          }
        }
      }
      const res = await axios.post(addURL, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data && res.data.status) {
        if (res.data.message.includes("fail")) {
          triggerLatestEvents({
            title: "Process Failed!",
            description: `An error has occured while processing ${properName} record.`,
            icon: <CircleX className="w-4 h-4" />,
            color: "red",
          });
        } else {
          triggerLatestEvents({
            title: "Process Completed!",
            description: `${properName} record has been saved.`,
            icon: <CheckCircle className="w-4 h-4" />,
            color: "blue",
          });
        }
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      triggerLatestEvents({
        title: "Process Failed!",
        description: `Failed to save ${properName} record.`,
        icon: <CircleX className="w-4 h-4" />,
        color: "red",
      });
    } finally {
      fetchTableData(setTableData);
      setOpenActionModal(false);
    }
  }

  if (action === "Edit") {
    try {
      const formData = new FormData();
      for (const key in value) {
        if (!(files.includes(key) && !value[key])) {
          if (files.includes(key) && Array.isArray(value[key])) {
            value[key].forEach((file) => {
              formData.append(`${key}[]`, file);
            });
          } else {
            formData.append(key, value[key]);
          }
        }
      }
      const res = await axios.post(editURL, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data && res.data.status) {
        triggerLatestEvents({
          title: "Process Completed!",
          description: `${properName} record has been updated.`,
          icon: <CheckCircle className="w-4 h-4" />,
          color: "blue",
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      triggerLatestEvents({
        title: "Process Failed!",
        description: `Failed to update ${properName} record.`,
        icon: <CircleX className="w-4 h-4" />,
        color: "red",
      });
    } finally {
      setOpenActionModal(false);
      fetchTableData(setTableData);
    }
  }
}

async function ModFetchEvent({
  setTableData,
  url,
  name,
  foreign_key = null,
  foreign_key_value = null,
  router,
}: any) {
  const properName = proper(name);
  let data = {};
  if (foreign_key !== null && foreign_key_value !== null) {
    data = {
      [foreign_key]: foreign_key_value,
    };
  }

  console.log(foreign_key, foreign_key_value);
  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.data && res.data.status) {
      const result = res.data.result;
      const clone = [];
      for (const [key, value] of Object.entries(result)) {
        clone.push(flattenObject(value));
      }
      console.log(clone);
      setTableData(clone);
    }
  } catch (err: any) {
    if (err.response.data.message == "Unauthenticated.") {
      router.push("/login");
      return;
    }
    console.error("Error submitting form:", err);
    triggerLatestEvents({
      title: "Process Failed!",
      description: `Failed to retrieve ${properName} records.`,
      icon: <CircleX className="w-4 h-4" />,
      color: "red",
    });
  }
}

export {
  ModFormField,
  ModFormSelect,
  ModFormWizard,
  ModFormRadioGroup,
  ModFormCheckboxGroup,
  ModFormComboBox,
  ModForm,
  ModFormButton,
  ModFormFile,
  ModTableHeader,
  ModTableAction,
  ModTable,
  ModActionModal,
  ModDeleteModal,
  ModDeleteEvent,
  ModAddEditEvent,
  ModFetchEvent,
};
