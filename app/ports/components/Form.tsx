"use client";
import { PortData } from "@/app/types/ports";
import React, { useState } from "react";

type PortFormProps = {
  initialData?: PortData; // For update mode
  onSubmit: (data: PortData) => void; // For create/update
  onDelete?: () => void; // For delete
};

const PortForm: React.FC<PortFormProps> = ({
  initialData,
  onSubmit,
  onDelete,
}) => {
  const [formData, setFormData] = useState<PortData>(
    initialData || {
      id: "",
      name: "",
      city: "",
      country: "",
      alias: [],
      regions: [],
      coordinates: [0, 0],
      province: "",
      timezone: "",
      unlocs: [],
      code: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof PortData
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleCoordinatesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setFormData((prev) => {
      const newCoordinates = [...prev.coordinates];
      newCoordinates[index] = parseFloat(value);
      return {
        ...prev,
        coordinates: newCoordinates as [number, number],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 m-10 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ajman"
            required
          />
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            City*
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ajman"
            required
          />
        </div>

        {/* Country */}
        <div>
          <label
            htmlFor="country"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Country*
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="United Arab Emirates"
            required
          />
        </div>

        {/* Alias */}
        <div>
          <label
            htmlFor="alias"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Alias (comma-separated)
          </label>
          <input
            type="text"
            id="alias"
            value={formData.alias.join(", ")}
            onChange={(e) => handleArrayChange(e, "alias")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Alias1, Alias2"
          />
        </div>

        {/* Regions */}
        <div>
          <label
            htmlFor="regions"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Regions (comma-separated)
          </label>
          <input
            type="text"
            id="regions"
            value={formData.regions.join(", ")}
            onChange={(e) => handleArrayChange(e, "regions")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Region1, Region2"
          />
        </div>

        {/* Coordinates */}
        <div>
          <label
            htmlFor="coordinates"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Coordinates (latitude, longitude)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              id="latitude"
              value={formData.coordinates[0]}
              onChange={(e) => handleCoordinatesChange(e, 0)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Latitude"
            />
            <input
              type="number"
              id="longitude"
              value={formData.coordinates[1]}
              onChange={(e) => handleCoordinatesChange(e, 1)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Longitude"
            />
          </div>
        </div>

        {/* Province */}
        <div>
          <label
            htmlFor="province"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Province*
          </label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ajman"
            required
          />
        </div>

        {/* Timezone */}
        <div>
          <label
            htmlFor="timezone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Timezone*
          </label>
          <input
            type="text"
            id="timezone"
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Asia/Dubai"
            required
          />
        </div>

        {/* UN/LOCODEs */}
        <div>
          <label
            htmlFor="unlocs"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            UN/LOCODEs (comma-separated)
          </label>
          <input
            type="text"
            id="unlocs"
            value={formData.unlocs.join(", ")}
            onChange={(e) => handleArrayChange(e, "unlocs")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="AEAJM"
          />
        </div>

        {/* Code */}
        <div>
          <label
            htmlFor="code"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Code*
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="52000"
            required
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {initialData ? "Update" : "Create"}
        </button>
        {initialData && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default PortForm;
