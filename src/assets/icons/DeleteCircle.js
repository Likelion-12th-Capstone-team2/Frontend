import * as React from 'react';
const SvgDeleteCircle = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 26 26"
    {...props}
  >
    <path
      fill="#FFA100"
      d="M13.366 23.112c5.753 0 10.416-4.664 10.416-10.417S19.12 2.278 13.366 2.278 2.949 6.942 2.949 12.695s4.664 10.417 10.417 10.417"
    />
    <path
      stroke="#fff"
      strokeLinecap="square"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m16.49 9.57-6.25 6.25M10.24 9.57l6.25 6.25"
    />
  </svg>
);
export default SvgDeleteCircle;
