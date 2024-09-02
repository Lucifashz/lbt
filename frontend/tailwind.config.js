<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
=======
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
>>>>>>> bd117058ee4d01e6fc9596bc87d402f7f452659e
  ],
  theme: {
    extend: {},
  },
  plugins: [
<<<<<<< HEAD
    require('flowbite/plugin')
  ],
};
=======
    nextui(),
  ],
}
>>>>>>> bd117058ee4d01e6fc9596bc87d402f7f452659e
