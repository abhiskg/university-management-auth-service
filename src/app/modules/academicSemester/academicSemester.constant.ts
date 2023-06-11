import type { IAcademicSemesterCodes } from "./academicSemester.interface";

export const academicSemesterMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const academicSemesterTitles = ["Autumn", "Summer", "Fall"] as const;

export const academicSemesterCodes: IAcademicSemesterCodes[] = [
  "01",
  "02",
  "03",
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};
