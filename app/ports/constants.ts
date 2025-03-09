import type { ColData } from "../components/Table";

export const COL_DATA: ColData[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  {
    key: "city",
    label: "City",
    sortable: true,
    filter: {
      type: "select",
      options: [
        { label: "San Lorenzo", value: "San Lorenzo" },
        { label: "San Pedro", value: "San Pedro" },
        { label: "Ajman", value: "Ajman" },
      ],
    },
  },
  {
    key: "country",
    label: "Country",
    sortable: true,
    filter: {
      type: "select",
      options: [
        { label: "UAE", value: "United Arab Emirates" },
        { label: "Angola", value: "Angola" },
        { label: "Argentina", value: "Argentina" },
      ],
    },
  },
];
